// 商品
// import api from '../../http/api'
export default {
    //开启命名空间
    namespaced: true,
    //存储共享的数据
    state: {
        goods: [],//商品列表
    },
    //同步修改state的值
    mutations: {
        setCategories(state, data) {
            state.goods = data
        }
    },
    //异步提交mutations
    actions: {
        async categories({ commit }, { type, pagenum, pagesize }) {
            let res = await api.getRights({ type, pagenum, pagesize })
            if (res.meta.status === 200) {
                commit('setRights', res.data)
                console.log(res.data);
            }
        }
    }
}