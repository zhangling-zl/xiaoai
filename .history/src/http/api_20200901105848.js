//1.引进index.js（service）文件 
import service from './index'

export default {
    //传参数的时候通通把{}加上

    //1.登录
    login({username,password}){
        return service.post('/login',{
            username,password
        })
    },
    //2.侧边导航栏
    getMenus(){
        return service.get('/menus')
    },
    //3.用户列表
    getUsers({pagenum,pagesize}){
        return service.get(`/users?pagenum=${pagenum}&pagesize=${pagesize}`)
    },
    //修改用户状态
    putState({uid,type}){
        return service.put(`/users/${uid}/state/${type}`)
    },
    //权限列表
    getRights(type){
      return service.get(`/rights/${type}`)
    }
    
}