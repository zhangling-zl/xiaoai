import api from '../../http/api'
import dayjs from "dayjs";

export default {
    //开启命名空间
    namespaced: true,
    //存储共享的数据
    state: {
        goods:[],
        total:0,
        kuaidi:[]
    },
    //同步修改state的值
    mutations: {
        setOrders(state, data) {
            state.goods = data
        },
        setTotal(state, data) {
            state.total = data
        },
        setKuaidi(state, data) {
            state.kuaidi = data
        },

    },
    //异步提交mutations
    actions: {
        //订单列表
        async getOrders({ commit }, { query, pagenum, pagesize, user_id, pay_status, is_send, order_fapiao_title, order_fapiao_company, order_fapiao_content, consignee_addr }) {
            console.log(commit);
            let res = await api.getOrders({
                query, pagenum, pagesize, user_id, pay_status, is_send, order_fapiao_title, order_fapiao_company, order_fapiao_content, consignee_addr
            })
            if (res.meta.status === 200) {
                res.data.goods.map(item=>{
                    if(item.pay_status==="0"){
                       item.text = '已付款',
                       item.type = 'danger'
                    }
                    if(item.pay_status==="1"){
                        item.text = '未付款',
                        item.type = 'warning'
                     }
                    item.update_time=dayjs(item.update_time).format("YYYY-MM-DD HH:mm:ss")
                })
                //解构赋值
                commit('setOrders', res.data.goods)
                commit('setTotal', res.data.total)
                // console.log(res.data.goods,'订单列表数据');
            }

        },
        //获取物流信息
        async getKuaidi({commit},id){
            let res = await api.getKuaidi({id})
            if(res.meta.status === 200){
                commit('setKuaidi',res.data)
            }
            console.log(res.data);
        }
    }


}