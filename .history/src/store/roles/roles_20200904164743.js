import api from '../../http/api'

export default {
    //开启命名空间
    namespaced: true,
    //存储共享的数据
    state: {
        Role: [],
        total:0

    },
    //同步修改state的值
    mutations: {
        //所有角色列表
        setRole(state, data) {
            state.Role = data
        },
        setTotal(state, data) {
            state.total = data
        }
    },
    //异步提交mutations
    actions: {
        //所有角色列表
        async getRole({ commit }) {
            let res = await api.getRole()
            if (res.meta.status === 200) {
                // console.log(res.data, 'juesse');
                commit('setRole', res.data)
                commit('setTotal', res.data.length)
            }
        },
        //删除角色
        async deleteRoles({dispatch}, id){
            let res = await api.deleteRoles(id)
            if(res.meta.status === 200){
               dispatch('getRole')
            }
        },
        //编辑角色
        async putRoles({},{id,roleName,roleDesc}){
            let res = await api.putRoles({id,roleName,roleDesc})
        }
    }

}