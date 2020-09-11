import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//完整引入element-ui组件库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

//鼠标右键事件（组件）
import VueContextMenu from 'vue-contextmenu'
Vue.use(VueContextMenu)

//表格组件
import ZkTable from 'vue-table-with-tree-grid'
Vue.use(ZkTable)

import './globalComponents'
Vue.use(ElementUI);


//文本编辑器
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// use
Vue.use(mavonEditor)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
