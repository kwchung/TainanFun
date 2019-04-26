// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'element-ui/lib/theme-chalk/index.css'
import 'moment/locale/zh-tw'
import App from './App'
import axios from 'axios';
import ElementUI from 'element-ui'
import router from './router'
import Vue from 'vue'
import VueChart from 'vue-charts'
import VueMoment from 'vue-moment'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(ElementUI)
Vue.use(VueChart)
Vue.use(VueMoment)

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
