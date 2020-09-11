// import api from '../../http/api'
// import router from '../../router'//引进router
// import { Message } from 'element-ui'//引进Message

export default {
    //开启命名空间
    namespaced: true,
    //存储共享的数据
    state: {
        reports:[]

    },
    //同步修改state的值
    mutations: {
        setReports(state,data){
            state.reports=data
        }

    },
    //异步提交mutations
    actions: {
        //数据报表
        async getReports({ commit },) {
            let res = await api.getReports()
            if (res.meta.status === 200) {
            
                commit('setReports', res.data)
                console.log(res.data);
            }
        }
    }
}