// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import { ClickOutsideDirective, ToastPlugin, AlertPlugin, ConfirmPlugin, Popup } from 'vux'
import * as filters from './filters'
import infiniteScroll from 'vue-infinite-scroll'
import VueLazyload from 'vue-lazyload'
import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/radar'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/dataZoom'
// require styles
import 'swiper/dist/css/swiper.css'
import { mapActions } from 'vuex'

// register component to use
Vue.component('chart', ECharts)
Vue.use(infiniteScroll)

const errorImg = require('./assets/image/default-avatar.png')
const loadingImg = require('./assets/image/default.svg')

Vue.use(VueLazyload, {
    lazyComponent: true,
    preLoad: 1.3,
	error: errorImg,
	loading: loadingImg,
	attempt: 1
})

Vue.directive('clickoutside', ClickOutsideDirective)

// register global utility filters.
Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})

Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)

Vue.config.productionTip = false

Vue.component('popup', Popup)

Vue.mixin({
    computed: {
        logTitle() {
            const { name, meta } = this.$route
            return meta.logTitle || name
        },
        viewedOrgId() {
            console.log('this.$route.query.viewedOrgId->', this.$route.query.viewedOrgId)
            return this.$route.query.viewedOrgId || ''
        },
        isPart() {
            return this.$route.query.isPart || 0
        }
    },
	methods: {
		...mapActions(['saveOperatelLog'])
	}
})

router.beforeEach(async (to, from, next) => {
    if (to.path.indexOf('user') !== -1) {
        const StaffID = to.params.StaffID
        const params = {
            staffId: to.params.StaffID
        }
        if (!store.state.userInfo) {
            await store.dispatch('getUserInfo', params)
        } else if (store.state.userInfo.StaffID !== StaffID) {
            await store.dispatch('getUserInfo', params)
        }
        next()
        return
    }
    next()
})

export const vueInstance = new Vue({
	el: '#app',
	router,
	store,
	components: { App },
	template: '<App :isShowLoading="isShowLoading" />',
	data() {
		return {
			isShowLoading: true
		}
	},
	watch: {
		isShowLoading(s) {
            this.$nextTick(() => {
                this.isShowLoading = s
            })
		}
	},
	methods: {
	}
})
