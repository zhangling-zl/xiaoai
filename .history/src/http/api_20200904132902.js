//1.引进index.js（service）文件 
import service from './index'
import axios from 'axios'
export default {
  //传参数的时候通通把{}加上

  //1.登录
  login({ username, password }) {
    return service.post('/login', {
      username, password
    })
  },
  //2.侧边导航栏
  getMenus() {
    return service.get('/menus')
  },
  //3.用户列表
  getUsers({ pagenum, pagesize, query }) {
    return service.get(`/users?pagenum=${pagenum}&pagesize=${pagesize}&query=${query}`)
  },
  //添加用户
  postAddusers({ username, password, email, mobile }) {
    return service.post('/users', {
      username, password, email, mobile
    })
  },
  //修改用户状态
  putState({ uId, type }) {
    return service.put(`/users/${uId}/state/${type}`)
  },
  //删除单个用户
  deleteUsers(id) {
    return service.delete(`/users/${id}`)
  },
  //编辑用户提交
  putUsersid({ id, email, mobile }) {
    return service.put(`/users/${id}`, { email, mobile })
  },
  //权限列表
  getRights(type) {
    return service.get(`/rights/${type}`)
  },
  //根据id查询用户信息
  getUsersid({ id }) {
    return service.get(`/users/${id}`)
  },
  //所有角色列表
  getRole() {
    return service.get('/roles')
  },
  //分配用户角色
  putUsersRole({ id, rid }) {
    return service.put(`/users/${id}/role`, { rid })
  },
  //订单数据列表
  getOrders({ query, pagenum, pagesize, user_id, pay_status, is_send, order_fapiao_title, order_fapiao_company, order_fapiao_content, consignee_addr }) {
    return service.get(`/orders?query=${query}&pagenum=${pagenum}&pagesize=${pagesize}&user_id=${user_id}&pay_status=${pay_status}&is_send=${is_send}&order_fapiao_title=${order_fapiao_title}&order_fapiao_company=${order_fapiao_company}&order_fapiao_content=${order_fapiao_content}&consignee_addr=${consignee_addr}`)
  },
  //查看物流信息
  getKuaidi() {
    let token = localStorage.getItem('adminToken')
    return axios.get(`https://www.liulongbin.top:8888/api/private/v1/kuaidi/804909574412544600`, {
      headers: {
        Authorization: token
      }
    })
  },
  //数据报表
  getReports(){
     return service.get('/reports/type/1')
  },
  //删除角色
  deleteRoles(id){
    return service.delete(`/roles${id}`)
  }
  

}