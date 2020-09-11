// 商品
import api from '../../http/api'
import dayjs from 'dayjs'
// import { Message } from 'element-ui'
// import { Message } from 'element-ui'
export default {
    //开启命名空间
    namespaced: true,
    //存储共享的数据
    state: {
        goodslist: [],//商品列表
        total: 0,//总条数
        categories: [],//商品参数
    },
    //同步修改state的值
    mutations: {
        setgoods(state, data) {
            state.goodslist = data
        },
        setTotal(state, data) {
            state.total = data
        },
        setCategories(state, data) {
            state.categories = data
        },

    },
    //异步提交mutations
    actions: {
        //商品列表
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
        //删除商品
        async deleteGoods({ dispatch }, { query, pagenum, pagesize, id }) {
            let res = await api.deleteGoods({ query, pagenum, pagesize, id })
            if (res.meta.status === 200) {
                dispatch('getGoods', { query, pagenum, pagesize })
                // Message.success('删除成功')
            }
        },
        //分类参数列表
        async getCategories({ commit }, { type, pagenum, pagesize }) {
            let res = await api.getCategories({ type, pagenum, pagesize })
            if (res.meta.status === 200) {
                res.data.map(item => {
                    item.label = item.cat_name
                    item.children.map(item1 => {
                        item1.label = item1.cat_name
                       item1.children.map(item2=>{
                        item2.label = item2.cat_name
                       })
                    })
                })
                commit('setCategories', res.data)
                console.log(res.data, '分类参数');
            }
        }
    }
}