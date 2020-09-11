// import api from '../../http/api'

export default {
    //开启命名空间
    namespaced: true,
    //存储共享的数据
    state: {

    },
    //同步修改state的值
    mutations: {
        // setMenus(state, data) {
        //     state.menus = data
        // },
    },
    //异步提交mutations
    actions: {
        //     //删除单个用户
        // async deleteUsers({ dispatch }, { id, pagenum, pagesize, query }) {
        //     let res = await api.deleteUsers({ id, pagenum, pagesize, query })
        //     if (res.meta.status === 200) {
        //         // Message.success(res.meta.msg)
        //         dispatch('getUsers', { pagenum, pagesize, query })
        //     }
        // }, 
    }

}