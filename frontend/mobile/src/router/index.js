import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Visitor from '@/components/Visitor'
import Platform from '@/components/platform/Platform'
import PlatformMain from '@/components/platform/PlatformMain'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children:[
        {
          path: 'login',
          name: 'Login',
          component: Login,
        },
        {
          path: 'visitor',
          name: 'Visitor',
          component: Visitor,
        }
      ]
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
