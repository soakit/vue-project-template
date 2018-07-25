import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import ApiClient from '../utils/api-client'

Vue.use(Vuex)
Vue.config.devtools = config.env !== 'production'
const client = new ApiClient()
const store = new Vuex.Store({
	strict: Vue.config.devtools,
	middlewares: Vue.config.devtools ? [createLogger()] : [],
	modules: {},
	state: {
        staffInfo: {
            StaffID: '00000001'
        },
		imgList: []
	},
	actions: {
		// 图片上传
		getUserImageList({ commit }, params) {
			return client.get('/Upload/GetUserImageList', { params }).then((data) => {
				commit('GET_USER_IMAGE_LIST', data)
				return data
			})
		},
		// 删除图片
		deleteImage({ commit }, data) {
			return client.post('/Upload/DeleteImage', { data }).then((data) => {
				return data
			})
		}
	},
	mutations: {
		GET_USER_IMAGE_LIST: (state, data) => {
			state.imgList = data
		}
	},
	getters: {
	}
})

export default store
