import api from '../../http/api'
import { Message } from 'element-ui'

export default {
    //开启命名空间
    namespaced: true,
    //存储共享的数据
    state: {
        Role: [],
        total: 0,
        rights:[],//权限列表

    },
    //同步修改state的值
    mutations: {
        //所有角色列表
        setRole(state, data) {
            state.Role = data
        },
        setTotal(state, data) {
            state.total = data
        },
        setRights(state,data){
            state.rights=data
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
                console.log(res.data,'角色分配');
            }
        },
        //删除角色
        async deleteRoles({ dispatch }, id) {
            let res = await api.deleteRoles(id)
            if (res.meta.status === 200) {
                dispatch('getRole')
            }
        },
        //编辑角色
        async putRoles({ dispatch }, { id, roleName, roleDesc }) {
            let res = await api.putRoles({ id, roleName, roleDesc })
            if (res.meta.status === 200) {
                //编辑请求成功之后再调用一次角色列表请求
                Message.success('修改成功')
                dispatch('getRole')
            }
        },
        //添加角色
        async postRoles({dispatch}, {roleName,roleDesc}){
            let res = await api.postRoles({roleName, roleDesc })
            if(res.meta.status === 201){
                Message.success('添加成功')
                dispatch('getRole')
            }
        },
        // //权限列表
        async getRights({ commit }, {type}) {
            let res = await api.getRights({type})
            if (res.meta.status === 200) {
                //解构赋值
                // res.data.map(item=>{
                //     if(item.level==='0'){
                //       item.text = '一级'
                //       item.type = 'danger'
                //     }
                //     if(item.level==='1'){
                //         item.text = '二级'
                //         item.type = 'success'
                //     }
                //     if(item.level==='2'){
                //         item.text = '三级'
                //         item.type = 'warning'
                //     }
                // })
                commit('setRights', res.data)
                console.log(res.data);
            }
        }
        
    }

}