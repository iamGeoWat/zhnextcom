import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Platform from '@/components/platform/Platform'
import PlatformMain from '@/components/platform/PlatformMain'

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

  ],
  mode:"history"
})