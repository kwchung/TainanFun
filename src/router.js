import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Attractions from '@/components/Attractions';
import Weather from '@/components/Weather';
import Wishlist from '@/components/Wishlist';
import Hello from '@/components/HelloWorld';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/wishlist',
    name: 'Wishlist',
    component: Wishlist,
  }, {
    path: '/',
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
  }, {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
  },
  ],
});
