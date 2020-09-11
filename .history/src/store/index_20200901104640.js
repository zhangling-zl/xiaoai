import Vue from 'vue'
import Vuex from 'vuex'

//引进user这个模块
import user from './user/user'

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
    rights
  }
})
