import api from '../../http/api'

export default {
    //开启命名空间
    namespaced: true,
    //存储共享的数据
    state: {
        Role: []
    },
    //同步修改state的值
    mutations: {
        //所有角色列表
        setRole(state, data) {
            state.Role = data
        }
    },
    //异步提交mutations
    actions: {
        //所有角色列表
        async getRole({ commit }) {
            let res = await api.getRole()
            if (res.meta.status === 200) {
                console.log(res.data, 'juesse');
                commit('setRole', res.data)
            }
        },
    }

}