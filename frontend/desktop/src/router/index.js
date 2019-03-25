import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Platform from '../components/platform/Platform'
import PlatformMain from '../components/platform/PlatformMain'
import AdminPlat from '../components/platform-admin/Platform'
import AdminPlatformMain from '../components/platform-admin/PlatformMain'
import MarketPage from '../components/market/MarketPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/platform',
      name: 'Platform',
      component: Platform,
      meta: {
        requireAuth: true,            // 添加该字段，表示进入这个路由是需要登录的
      },
      children:[
        {
          path: '/platform/1',
          name: 'PlatformMain',
          component: PlatformMain
        },
      ]
    },
    {
      path: '/admin',
      name: 'AdminPlat',
      component: AdminPlat,
      meta: {
        requireAuth: true,            // 添加该字段，表示进入这个路由是需要登录的
      },
      children:[
        {
          path: '/admin/1',
          name: 'AdminPlatformMain',
          component: AdminPlatformMain
        },
      ]
    },
    {
      path: '/market',
      name: 'MarketPage',
      component: MarketPage,
      meta: {
        requireAuth: false,            // 添加该字段，表示进入这个路由是需要登录的
      }
    },

  ],
  mode:"history"
})
