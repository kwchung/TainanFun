// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui'
import VueResource from 'vue-resource'
import VueMoment from 'vue-moment'
import VueChart from 'vue-charts'
import 'moment/locale/zh-tw'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueResource)
Vue.use(VueMoment)
Vue.use(VueChart)

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
