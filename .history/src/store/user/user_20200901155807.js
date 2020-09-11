import api from '../../http/api'
import router from '../../router'//引进router
import { Message } from 'element-ui'//引进Message


export default {
    //开启命名空间
    namespaced: true,
    //存储共享的数据
    state: {
        menus: [],
        users: [],
        userstotal: 0,

    },
    //同步修改state的值
    mutations: {
        setMenus(state, data) {
            state.menus = data
        },
        setUsers(state, data) {
            state.users = data
        },
        setTotal(state, data) {
            state.userstotal = data
        },
    },
    //异步提交mutations
    actions: {
        // //所有的请求都要放在mutations里面
        //mutations里面的方法可以传两个参数 第一个参数是store(vuex的参数)用commit解构赋值，第二个参数是请求的参数

        //侧边导航栏列表
        async getMenus({ commit }) {
            let res = await api.getMenus()
            if (res.meta.status === 200) {
                //请求成功之后，提交mutations

                //给数组添加对象
                res.data.unshift({ id: 100, authName: '首页', path: 'home', icon: 'el-icon-s-home' })

                res.data.map(item => {
                    //给数组每一项的path添加一个/
                    item.path = '/' + item.path
                    // console.log(router.options.routes,'1111')
                    // 拿到路由里面的东西
                    router.options.routes.map(item2 => {
                        if (item.children && item.children.length > 0) {
                            if (item.path === item2.path) {
                                item.icon = item2.meta.icon
                                if (item2.children && item2.children.length > 0) {
                                    item2.children.map(item3 => {
                                        item.children.map(item4 => {
                                            if (item4.path === item3.path) {
                                                item4.icon = item3.meta.icon
                                            }
                                        })
                                    })
                                }
                            }
                        }
                    })
                    //拼接父路由和子路由的路径
                    if (item.children && item.children.length > 0) {
                        item.children.map(item1 => {
                            item1.path = item.path + '/' + item1.path
                        })
                    }

                })
            }
            //解构赋值
            commit('setMenus', res.data)
            // console.log(res.data);
            // console.log(router.options.routes);
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
                //跳转路由 登录成功之后跳转到首页
                //router = this.$router
                router.push('/')
                //提示用户 登录成功
                Message.success('登录成功')
            }
            else {
                Message.error(res.meta.msg)
            }
        },
        //用户列表
        async getUsers({ commit }, { pagenum, pagesize }) {
            let res = await api.getUsers({ pagenum, pagesize })
            //解构赋值
            commit('setUsers', res.data.users)
            commit('setTotal', res.data.total)

        },
        //添加用户
        async postAddusers({ dispatch }, { username, password, email, mobile,pagenum, pagesize }) {
            let res = await api.postAddusers({ username, password, email, mobile,pagenum, pagesize })
            if (res.meta.status === 201) {
                Message.success(res.meta.msg)
                dispatch('getUsers', { pagenum, pagesize })
               
            }
        }

    },
}