import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 全局样式
import "@/styles/index.scss";


// 引入 Vant
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);                // 全局注册 声明中间件

// 使用 vue-resource
import VueResource from 'vue-resource';
Vue.use(VueResource);             // this.$http.get    Vue.http

// 使用 axios
import { http } from "@/utils/axios";
Vue.prototype.$axios = http;      // 全局使用 axios （this.$axios = axios）

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
