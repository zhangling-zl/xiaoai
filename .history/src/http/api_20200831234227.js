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
    getUsers(pagenum,pagesize){
        return service.get(`/users?pagenum=${pagenum}&pagesize=${pagesize}`)
    }
}