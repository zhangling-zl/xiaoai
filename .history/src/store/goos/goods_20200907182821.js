// 商品
import api from '../../http/api'
// import { Message } from 'element-ui'
export default {
    //开启命名空间
    namespaced: true,
    //存储共享的数据
    state: {
        goodslist: [],//商品列表
        total:'',//总条数
    },
    //同步修改state的值
    mutations: {
        setgoods(state, data) {
            state.goodslist = data
        },
        setTotal(state, data) {
            state.total = data
        },
        
    },
    //异步提交mutations
    actions: {
        async getGoods({ commit }, { query, pagenum, pagesize }) {
            let res = await api.getGoods({ query, pagenum, pagesize })
            if (res.meta.status === 200) {
                commit('setgoods', res.data.goods)
                commit('setTotal', res.data.total)
                console.log(res.data);
            }
        }
    }
}