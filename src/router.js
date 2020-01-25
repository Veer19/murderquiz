import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Questions from './views/Questions.vue'
import Finish from './views/Finish.vue'
import Admin from './views/Admin.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component : Home
    },
    {
      path: '/questions',
      name: 'questions',
      component : Questions
    },
    {
      path: '/finish',
      name: 'finish',
      component : Finish
    },
    {
      path: '/admin',
      name: 'admin',
      component : Admin
    }
  ]
})
