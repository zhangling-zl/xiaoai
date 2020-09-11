// 商品
import api from '../../http/api'
import { Message } from 'element-ui'
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
        setCategories(state, data) {
            state.goods = data
        },
        setTotal(state, data) {
            state.total = data
        },
        
    },
    //异步提交mutations
    actions: {
        async categories({ commit }, { type, pagenum, pagesize }) {
            let res = await api.categories({ type, pagenum, pagesize })
            if (res.meta.status === 200) {
                commit('setCategories', res.data.result)
                commit('setCategories', res.data.total)
                console.log(res.data.result);
            }
        }
    }
}