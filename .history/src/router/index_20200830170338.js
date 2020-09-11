import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { nextTick } from 'vue/types/umd'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      title:'首页'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component:() =>import('../views/login/Login.vue'),
    meta:{
      title:'登录'
    }
  },
  
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to,from,nrxt)=>{
  document.title=to.meta.title
  next()
})
export default router
