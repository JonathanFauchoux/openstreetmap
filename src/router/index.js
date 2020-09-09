import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login  from '../views/Login.vue'
import SignUp  from '../views/SignUp.vue'
import Organise from '../views/Organise.vue'
import Participer from '../views/Participer.vue'
import Tour from '../views/Tour.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/organise',
    name: 'Organise',
    component: Organise
  },
  {
    path: '/participer',
    name: 'Participer',
    component: Participer
  },
  {
    path: '/tour',
    name: 'Tour',
    component: Tour
  },
 /*  {
    path: '/about',
    name: 'About', */
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
   // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  //}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
