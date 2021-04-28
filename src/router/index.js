import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/login.vue')
  },
  {
    path: '/index',
    name: 'index',
    children:[],
    component: () => import(/* webpackChunkName: "about" */ '../views/index.vue')
  },
  // {path:'/task?pid=:id&name=:name',name:'DBinfo',component: () => import(/* webpackChunkName: "about" */ '../views/Taskinfo.vue')},
  {path:'/task',name:'task',component: () => import(/* webpackChunkName: "about" */ '../views/Taskinfo.vue')},
  {path:'/list',name:'list',component: () => import(/* webpackChunkName: "about" */ '../views/list.vue')},
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
