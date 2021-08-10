import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../components/index'
import home from '../components/home'
import users from '../components/users'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: home
  },
  {
    path: '/users',
    name: 'UsersPage',
    component: index
  },
  {
    path: '/asd',
    name: 'asd',
    component: users
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
