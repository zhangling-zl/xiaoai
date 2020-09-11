import api from '../../http/api'
export default {
    //开启命名空间
    namespaced:true,
    //存储共享的数据
    state: {
      menus:[]
    },
    //同步修改state的值
    mutations: {
        setMenus(state,data){
            state.menus=data
        }
    },
    //异步提交mutations
    actions: {
        //所有的请求都要放在mutations里面
    },
}