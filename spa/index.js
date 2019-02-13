import Vue from 'vue';
import VueRouter from 'vue-router';

import App from './components/App.vue';
import PageGoodMyPage from './components/PageGoodMyPage.vue';
import PageBadMyPage from './components/PageBadMyPage.vue';
import PageNotFound from './components/PageNotFound.vue';

const constants = require('../constants');

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: constants.GOOD_MYPAGE_PATH,
      component: PageGoodMyPage,
    },
    {
      path: constants.BAD_MYPAGE_PATH,
      component: PageBadMyPage,
    },
    {
      path: '*',
      component: PageNotFound,
    },
  ],
});

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    router,
    render: h => h(App),
  }).$mount('#app');
});
