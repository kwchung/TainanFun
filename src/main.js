import '@fortawesome/fontawesome-free/css/all.css';
import 'moment/locale/zh-tw';
import 'vuetify/dist/vuetify.min.css';
import axios from 'axios';
import Vue from 'vue';
import VueMoment from 'vue-moment';
import Vuetify from 'vuetify';
import router from './router';

import App from './App.vue';

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.use(Vuetify, {
  iconfont: 'fa',
});
Vue.use(VueMoment);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
