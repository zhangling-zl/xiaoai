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

//
import ZkTable from 'vue-table-with-tree-grid'
Vue.use(ZkTable)

import './globalComponents'
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
