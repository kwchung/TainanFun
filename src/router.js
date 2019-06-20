import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Attractions from '@/components/Attractions';
import Weather from '@/components/Weather';
import Wishlist from '@/components/Wishlist';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/wishlist',
    name: 'Wishlist',
    component: Wishlist,
  }, {
    path: '/attractions',
    name: 'Attractions',
    component: Attractions,
  }, {
    path: '/weather',
    name: 'Weather',
    component: Weather,
  }, {
    path: '/',
    name: 'home',
    component: Home,
  },
  ],
});
