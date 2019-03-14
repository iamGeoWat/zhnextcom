// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import echarts from 'echarts' //引入echarts
import i18n from './i18n/lang'


axios.defaults.baseURL = 'http://45.32.61.88:8877';
// axios.defaults.baseURL = 'http://192.168.0.197:8877';
Vue.prototype.$http= axios;
Vue.prototype.$echarts = echarts ;//引入组件
Vue.use(ElementUI);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>'
});
