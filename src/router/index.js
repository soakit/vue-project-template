import Vue from 'vue'
import Router from 'vue-router'

import Albums from '@/views/albums'
import AlbumsOp from '@/views/albumsOp'

Vue.use(Router)

const router = new Router({
	mode: 'history',
	base: config.routerRoot || '/',
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			return { x: 0, y: 0 }
		}
	},
	routes: [{
		path: '/',
		component: {
			template: '<router-view></router-view>'
		},
		children: [{
            path: 'album/:uid',
            name: '个性相册',
            component: Albums
        }, {
            path: 'albumsOp/:uid',
            name: '相册操作',
            component: AlbumsOp,
            meta: {
                logTitle: '个性相册'
            }
		}, {
			path: '*',
			redirect: 'album/1'
		}]
	}]
})

export default router
