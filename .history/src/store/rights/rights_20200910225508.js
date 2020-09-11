import api from '../../http/api'
// import router from '../../router'//引进router
// import { Message } from 'element-ui'//引进Message

export default {
    //开启命名空间
    namespaced: true,
    //存储共享的数据
    state: {
        rightsSS:[]

    },
    //同步修改state的值
    mutations: {
        setRights(state,data){
            state.rightsSS=data
        }

    },
    //异步提交mutations
    actions: {
        async getRights({ commit }, {type}) {
            let res = await api.getRights(type)
            if (res.meta.status === 200) {
                //解构赋值
                res.data.map(item=>{
                    if(item.level==='0'){
                      item.text = '一级'
                      item.type = 'danger'
                    }
                    if(item.level==='1'){
                        item.text = '二级'
                        item.type = 'success'
                    }
                    if(item.level==='2'){
                        item.text = '三级'
                        item.type = 'warning'
                    }
                })
                commit('setRights', res.data)
                
            }
            console.log(res.data,555);
        }
    }
}