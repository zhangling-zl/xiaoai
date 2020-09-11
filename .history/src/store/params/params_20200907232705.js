// 分类参数
import api from '../../http/api'
// import router from '../../router'//引进router
// import { Message } from 'element-ui'//引进Message

export default {
    //开启命名空间
    namespaced: true,
    //存储共享的数据
    state: {
        goodslist: [],//商品列表
        total: 0,//总条数

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
        // async getCategories({ commit }, {id,sel}) {
        //     let res = await api.getCategories({id,sel})
        //     if (res.meta.status === 200) {
        //         //解构赋值
        //         commit('setRights', res.data)
        //         console.log(res.data);
        //     }
        // },
        async getGoods({ commit }, { query, pagenum, pagesize }) {
            let res = await api.getGoods({ query, pagenum, pagesize })
            if (res.meta.status === 200) {
                res.data.goods.map(item => {
                    item.add_time = dayjs(item.add_time).format('YYYY-MM-DD hh:mm:ss')
                })
                commit('setgoods', res.data.goods)
                commit('setTotal', res.data.total)
                console.log(res.data.goods);
            }
        },
    }
}