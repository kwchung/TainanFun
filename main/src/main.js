import 'vuetify/dist/vuetify.min.css';
import 'moment/locale/zh-tw';
import axios from 'axios';
import Vue from 'vue';
import VueMoment from 'vue-moment';
import Vuetify from 'vuetify';
import router from './router';
import store from './store';

import App from './App.vue';

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.use(Vuetify);
Vue.use(VueMoment);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
