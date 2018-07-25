import * as constants from '../utils/constants'

export function host(url) {
	const host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
	const parts = host.split('.').slice(-3)
	if (parts[0] === 'www') parts.shift()
	return parts.join('.')
}

export function timeAgo(time) {
	const between = Date.now() / 1000 - Number(time)
	if (between < 3600) {
		return pluralize(~~(between / 60), ' minute')
	} else if (between < 86400) {
		return pluralize(~~(between / 3600), ' hour')
	} else {
		return pluralize(~~(between / 86400), ' day')
	}
}

function pluralize(time, label) {
	if (time === 1) {
		return time + label
	}
	return time + label + 's'
}

// 过滤html代码
export function filterEditor(html) {
	return html.replace(/<\s?img[^>]*>/gi, '[图片]').replace(/<(?:.|\s)*?>/g, '').replace(/&nbsp;/g, ' ')
}

export function dateFormat() {
	return constants.getDateStr(...arguments)
}

export function returnDate(str) {
	return constants.returnDate(str)
}
// 日期天数差
export function dateDiff(str) {
	const today = constants.getDateStr(new Date(), 1)
	const days = Math.abs(constants.returnDate(str).getTime() - constants.returnDate(today).getTime())
	return parseInt(days / (1000 * 60 * 60 * 24))
}

export function yearDiff(str1, str2 = new Date()) {
	const date1 = constants.returnDate(str1)
	const date2 = constants.returnDate(str2)
	return date2.getFullYear() - date1.getFullYear()
}

export function monthDiff(str1, str2 = new Date()) {
	const days = Math.abs(constants.returnDate(str1).getTime() - constants.returnDate(str2).getTime())
	const months = parseInt(days / (1000 * 60 * 60 * 24 * 31))
	const remainMonth = months % 12
	if (remainMonth === 0) {
		return months / 12 + '年'
	}
	return `${parseInt(months / 12)}年${remainMonth}个月`
}

export function cnExpress(num) {
	if (num > 10000) {
		num = (num / 10000).toFixed(1) + '万'
		return num
	}
	return num || 0
}

export function fmoney(num, decimal = 4) {
	num -= 0
	if (num === 0 || !num) {
		return 0
	}
	const times = Math.pow(10, decimal + 1),
		des = parseInt(num * times),
		rest = des % 10
	if (rest === 5) {
		return ((parseFloat(des) + 1) / times).toFixed(decimal) - 0
	} else if (rest === -5) {
		return ((parseFloat(des) - 1) / times).toFixed(decimal) - 0
	}
	return parseFloat(num.toFixed(decimal))
}

export function returnPreMonth(str) {
	return constants.getPreMonth(str)
}
export function returnCountDays(str) {
	return constants.getCountDays(str)
}
export function toast() {
	return constants.toast(...arguments)
}
export function alert() {
	return constants.alert(...arguments)
}
export function imageLoadOnError(event) {
	return constants.imageLoadOnError(event)
}
export function changeTitle(t) {
	return constants.changeTitle(t)
}

export function avatarFm(RtxName) {
	return config.avatarPrefix.replace(/___name___/g, RtxName)
}

export function nullFm(value) {
	if (!value || value === '0') {
		return '-'
	}
	return value
}
