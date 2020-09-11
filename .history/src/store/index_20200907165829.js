import Vue from 'vue'
import Vuex from 'vuex'

//引进user这个模块
import user from './user/user'
import rights from './rights/rights'
import orders from './orders/orders'
import reports from './reports/reports'
import roles from './roles/roles'

Vue.use(Vuex)

export default new Vuex.Store({
  //存储共享的数据
  state: {
  },
  //同步修改state的值
  mutations: {
  },
  //异步提交mutations
  actions: {
  },
  //模块
  modules: {
    //类似于注册
    user,
    rights,
    orders,
    reports,
    roles,//角色列表
    goods//商品列表
  }
})
