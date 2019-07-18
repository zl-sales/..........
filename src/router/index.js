import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import store from '@/store'
import iView from 'iview'
import {
  setToken,
  getToken,
  canTurnTo,
  setTitle
} from '@/libs/util'
import config from '@/config'
const {
  homeName
} = config

Vue.use(Router)
const router = new Router({
  fallback: true,
  routes: routes,
  mode: 'history',
  base: '/'
})
const LOGIN_PAGE_NAME = 'login'

const turnTo = (to, access, next) => {
  if (canTurnTo(to.name, access, routes)) next() // 有权限，可访问
  else {
    next({
      replace: true,
      name: 'error_401'
    })
  } // 无权限，重定向到401页面
}

router.beforeEach((to, from, next) => {
  // iView.LoadingBar.start()
  /* 判断该路由是否需要登录权限 */
  const token = getToken()
  if (!token) {
    if (to.matched.some(record => record.meta.requireAuth)) {
      next({
        name: LOGIN_PAGE_NAME
      })
    } else {
      next()
    }
  } else {
    if (to.name === LOGIN_PAGE_NAME) {
      next({
        name: homeName
      })
    } else {
      next()
    }
  }
})

router.afterEach(to => {
  setTitle(to, router.app)
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
