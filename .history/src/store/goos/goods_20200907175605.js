// 商品
import api from '../../http/api'
// import { Message } from 'element-ui'
export default {
    //开启命名空间
    namespaced: true,
    //存储共享的数据
    state: {
        goods: [],//商品列表
        total:'',//总条数
    },
    //同步修改state的值
    mutations: {
        setgoods(state, data) {
            state.goods = data
        },
        setTotal(state, data) {
            state.total = data
        },
        
    },
    //异步提交mutations
    actions: {
        async goods({ commit }, { query, pagenum, pagesize }) {
            let res = await api.goods({ query, pagenum, pagesize })
            if (res.meta.status === 200) {
                commit('setgoods', res.data.result)
                commit('setTotal', res.data.total)
                console.log(res.data.result);
            }
        }
    }
}