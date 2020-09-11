import api from '../../http/api'
import router from '../../router'//引进router
import { Message } from 'element-ui'//引进Message


export default {
    //开启命名空间
    namespaced: true,
    //存储共享的数据
    state: {
        menus: []
    },
    //同步修改state的值
    mutations: {
        setMenus(state, data) {
            state.menus = data
        }
    },
    //异步提交mutations
    actions: {
        // //所有的请求都要放在mutations里面
        //mutations里面的方法可以传两个参数 第一个参数是store(vuex的参数)用commit解构赋值，第二个参数是请求的参数

        //侧边导航栏列表
        async getMenus({ commit }) {
            console.log(commit);
            let res = await api.getMenus()
            if (res.meta.status === 200) {
                //请求成功之后，提交mutations
                //解构赋值
                commit('getMenus', res.data)
            }
        },
        //登录 
        async login({ commit }, { username, password }) {
            console.log(commit);
            let res = await api.login({
                username, password
            })
            if (res.meta.status === 200) {
                //存储信息
                localStorage.setItem('adminToken', res.data.token)
                localStorage.setItem('adminUser', JSON.stringify(res.data))
                //跳转路由
                //router = this.$router
                router.push('/')
                //提示用户
                Message.success('登录成功')
            } 
            if (res.meta.status === 400) {
                Message.error(res.meta.msg)
            }
        }
    },
}