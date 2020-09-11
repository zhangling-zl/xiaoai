import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '../views/layout/Layout.vue'
// import { nextTick } from 'vue/types/umd'

Vue.use(VueRouter)

const routes = [
  // //把首页重定向
  // {
  //   path: '/home',
  //   redicect: '/'
  // },
  // //父子路由
  // {
  //   path: '/',
  //   component: Layout,
  //   children: [
  //     {
  //       path: '',
  //       name: 'Home',
  //       component: Home,
  //       meta: {
  //         title: '首页'
  //       }
  //     },
  //   ]

  // },
  {
    path: '/',
    redirect: '/home'
  },
  //首页
  {
    path: '/',
    component: Layout,
    meta: {
      icon: 'el-icon-s-home'
    },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home,
        meta: {
          title: '首页',
          parentpath: '/home',
          icon: 'el-icon-s-home'
        }
      },

    ]
  },
  //用户管理
  {
    path:'users',
    component: Layout,
    meta: {
      icon: 'el-icon-user'
    },
    children:[
      {
        path:'users',
        name:'Users',
        component:()=>import('../views/users/Users.vue'),
        meta: {
          title: '用户列表',
          parentpath: '/users/users',
          icon: 'el-icon-folder-opened'
        }
      }
    ]

  },



  //权限管理
  {
    path:'rights',
    component: Layout,
    meta: {
      icon: 'el-icon-folder'
    },
    children:[
      {
        path:'roles',
        name:'Roles',
        component:()=>import('../views/rights/Roles.vue'),
        meta: {
          title: '角色列表',
          parentpath: '/rights/roles',
          icon: 'el-icon-setting'
        }
      },
      {
        path:'rights',
        name:'Rights',
        component:()=>import('../views/rights/Rights'),
        meta: {
          title: '权限列表',
          parentpath: '/rights/rights',
          icon: 'el-icon-setting'
        }
      }
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
