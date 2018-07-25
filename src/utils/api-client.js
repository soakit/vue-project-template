import fetch from 'isomorphic-fetch'
import LogicError from './logic-error'
import { vueInstance } from '@/main.js'

const methods = ['get', 'post', 'put', 'patch', 'del']
const APP_JSON_CONTENT_TYPE = 'application/json;charset=utf-8'
const inBrowser = typeof window !== 'undefined'
let requestNumber = 0

function formatUrl(path, noApi, fullPath = '') {
	if (fullPath) {
		return `${path}`
	}
	const adjustedPath = path[0] !== '/' ? '/' + path : path
	const api = noApi ? '' : (config.WebApiPrefix + '/WebAPI')
	return `${api}${adjustedPath}`
}

function ApiClient() {
	methods.forEach((method) =>
		this[method] = (path, {
			params,
			data,
			loading
		} = {}) => new Promise((resolve, reject) => {
			const options = {
				method: method,
				/*
					credentials（字符串） - 认证凭证模式。默认："omit"
						"omit" - 请勿在请求中包含身份验证凭证（例如Cookie）
						"same-origin" - 在相同网站的请求中包含凭据
						"include" - 在所有网站的请求中包含凭据
				 */
				credentials: 'same-origin',
				timeout: 10000,
				headers: {
					'Accept': APP_JSON_CONTENT_TYPE
				}
			}
			const isFullPath = path.indexOf('://') >= 0
			if (!isFullPath) {
				// 当传的不是全路径时才设置Content-Type
				options.headers['Content-Type'] = APP_JSON_CONTENT_TYPE
			}
			if (data) {
				data = data || {}
				options.body = JSON.stringify(data)
				/* options.body = JSON.stringify(data, (key, value) => {
					return value || undefined
				}) */
			}

			let url = formatUrl(path, false, isFullPath)

			if (isFullPath) {
				options.method = 'get'
			}

			if (params) {
				url += Object.keys(params).filter((key) => params[key] != null).reduce((acc, key) => (acc += `${key}=${params[key]}&`), '?')
				url = url.slice(0, url.length - 1)
			}
			// 只要不是false, 请求一次就加一个
			if (loading !== false) {
				if (requestNumber === 0) {
					vueInstance && (vueInstance.isShowLoading = true)
				}
				requestNumber++
			}
			return fetch(url, options).then(response => {
				// 只要不是false, 请求完成一次就减一个
				if (loading !== false) {
					requestNumber--
					if (requestNumber === 0) {
						vueInstance && (vueInstance.isShowLoading = false)
					}
				}
				if (~[403, 404].indexOf(response.status)) {
					console.error(`${response.url} status: ${response.status}, statusText:${response.statusText}`)
					return reject(new LogicError({
						status: response.status,
						message: `fetch ${url} fail, status=${response.status}, statusText=${response.statusText}`
					}))
				} else if (response.status === 418) {
					if (inBrowser) {
						window.location.reload()
					} else {
						console.error('Unexpected http status 418 when fetching via server side!')
					}
				} else if (response.status === 203) { // 解决203请求
					return {
						json: false,
						response
					}
				} else {
					// 解决204请求
					if (response.statusText === 'No Content') {
						return {
							json: {},
							response
						}
					}
					return response.json().then(json => {
                        // 权限校验:去简易卡片
                        if (config.actLog) {
                            console.log('\n', '------------------------------------------------------------')
                            console.log('\turl:', url)
                            console.log('\tparams:', params || data)
                            console.log('\tresponse:', json)
                            console.log('', '------------------------------------------------------------', '\n\n')
                        }
						return {
							json,
							response
						}
					})
				}
			}).then(({
				json,
				response
			}) => {
				if (!response.ok && response.status > 400) {
					reject(new LogicError({
						code: response.status,
						message: json.message
					}))
				} else {
					resolve(json)
				}
			}).catch((res) => {
				console.log('错误信息', res)
			})
		}))
}

export default ApiClient
