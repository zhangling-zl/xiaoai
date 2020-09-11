import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//完整引入element-ui组件库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './globalComponents'
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
