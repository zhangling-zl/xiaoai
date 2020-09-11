import api from '../../http/api'

export default {
    //开启命名空间
    namespaced: true,
    //存储共享的数据
    state: {
        goods:[],
        total:0,
    },
    //同步修改state的值
    mutations: {
        setOrders(state, data) {
            state.goods = data
        },
        setTotal(state, data) {
            state.total = data
        },

    },
    //异步提交mutations
    actions: {
        async getOrders({ commit }, { query, pagenum, pagesize, user_id, pay_status, is_send, order_fapiao_title, order_fapiao_company, order_fapiao_content, consignee_addr }) {
            console.log(commit);
            let res = await api.getOrders({
                query, pagenum, pagesize, user_id, pay_status, is_send, order_fapiao_title, order_fapiao_company, order_fapiao_content, consignee_addr
            })
            if (res.meta.status === 200) {
                res.res.data.goods.map(item=>{
                    if(item.pay_status===0){
                       item.text = '已付款',
                       item.type = 'danger'
                    }
                })
                //解构赋值
                commit('setOrders', res.data.goods)
                commit('setTotal', res.data.total)
                // console.log(res.data.goods);
            }

        }
    }


}