import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '../views/layout/Layout.vue'
// import { nextTick } from 'vue/types/umd'

Vue.use(VueRouter)

const routes = [
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
    path: '/users',
    component: Layout,
    meta: {
      icon: 'el-icon-user'
    },
    children: [
      {
        path: 'users',
        name: 'Users',
        component: () => import('../views/users/Users.vue'),
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
    path: '/rights',
    component: Layout,
    meta: {
      icon: 'el-icon-folder'
    },
    children: [
      {
        path: 'roles',
        name: 'Roles',
        component: () => import('../views/rights/Roles.vue'),
        meta: {
          title: '角色列表',
          parentpath: '/rights/roles',
          icon: 'el-icon-setting'
        }
      },
      {
        path: 'rights',
        name: 'Rights',
        component: () => import('../views/rights/Rights'),
        meta: {
          title: '权限列表',
          parentpath: '/rights/rights',
          icon: 'el-icon-c-scale-to-original'
        }
      }
    ]

  },
  //商品管理
  {
    path: '/goods',
    component: Layout,
    meta: {
      icon: 'el-icon-goods'
    },
    children: [
      {
        path: 'goods',
        name: 'Goods',
        component: () => import('../views/goods/Goods.vue'),
        meta: {
          title: '商品列表',
          parentpath: '/goods/goods',
          icon: 'el-icon-help'
        }
      },
      {
        path: 'Addgoods',
        name: 'addgoods',
        component: () => import('../views/goods/Addgoods.vue'),
        meta: {
          title: '添加商品',
          parentpath: '/goods/goods',
          icon: 'el-icon-help'
        }
      },
      {
        path: 'params',
        name: 'Params',
        component: () => import('../views/goods/Params.vue'),
        meta: {
          title: '分类参数',
          parentpath: '/goods/params',
          icon: 'el-icon-bell'
        }
      },
      {
        path: 'categories',
        name: 'Categories',
        component: () => import('../views/goods/Categories'),
        meta: {
          title: '商品分类',
          parentpath: '/goods/categories',
          icon: 'el-icon-date'
        }
      },

    ]

  },
  //订单管理
  {
    path: '/orders',
    component: Layout,
    meta: {
      icon: 'el-icon-s-order'
    },
    children: [
      {
        path: 'orders',
        name: 'Orders',
        component: () => import('../views/orders/Orders.vue'),
        meta: {
          title: '订单列表',
          parentpath: '/orders/orders',
          icon: 'el-icon-folder-add'
        }
      },
    ]
  },
 //订单管理
  {
    path: '/reports',
    component: Layout,
    meta: {
      icon: 'el-icon-message'
    },
    children: [
      {
        path: 'reports',
        name: 'Reports',
        component: () => import('../views/reports/Reports.vue'),
        meta: {
          title: '数据报表',
          parentpath: '/reports/reports',
          icon: 'el-icon-position'
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
