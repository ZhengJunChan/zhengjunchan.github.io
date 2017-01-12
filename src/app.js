import Vue from 'vue';
import VueRouter from 'vue-router';

import App from './views/index.vue';
import RoutersConfigs from './router/index.js';

// 加载路由插件
Vue.use(VueRouter);

const router = new VueRouter(RoutersConfigs);

// 启动项目
new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
