import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

import 'normalize.css/normalize.css'; //css resets
import '@/styles/index.scss'; // global css
import '@arcgis/core/assets/esri/themes/dark/main.css';

import './icons'; //icon

import './permission'; // 路由导航守卫

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
Vue.use(Antd);

import config from '@/config/index';

Vue.use(config);

import scrollBar from '@/components/scrollBar';
import '@/components/scrollBar/index.scss';
Vue.component('scroll-bar', scrollBar);
// import esriConfig from '@arcgis/core/config.js'

// esriConfig.assetsPath = '/assets'
// esriConfig.apiKey =
//   'AAPK693e54004a2e498d8ee7f5dec424fadbimrhpS3whlfKgZO_376pDdaZpFs0GzutnG4Nvv1IpWuk36yPcYv17W89eZGHR5nO'

import { mockXHR } from '../mock';
if (process.env.NODE_ENV === 'production') {
  mockXHR();
}

import loading from '@/components/loading/loading'; // 引入loading
Vue.use(loading); // 全局使用loading

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
