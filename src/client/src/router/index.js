import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/routes/Main/Main'
import Login from '@/components/routes/Login/Login'

import UsersBrowser from '@/components/routes/Main/UsersBrowser/UsersBrowser'
import EditProfile from '@/components/routes/Main/EditProfile/EditProfile'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Main,
      children: [
        {
          path: '',
          name: 'UsersBrowser',
          component: UsersBrowser
        },
        {
          path: '/visit/:userId',
          name: 'VisitUser',
          component: UsersBrowser
        },
        {
          path: '/you',
          name: 'EditProfile',
          component: EditProfile
        },
        {
          path: '/you/preview',
          name: 'ProfilePreview',
          component: EditProfile
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
