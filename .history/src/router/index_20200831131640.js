import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '../views/layout/Layout.vue'
// import { nextTick } from 'vue/types/umd'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home,
  //   meta:{
  //     title:'首页'
  //   }
  // },

  //把首页重定向
  {
    path: '/home',
    redicect: '/'
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home,
        meta: {
          title: '首页'
        }
      },
    ]

  },

  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/Login.vue'),
    meta: {
      title: '登录',
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//路由源信息
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})
export default router
