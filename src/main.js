// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入cookie方法
import * as cookieApi from './api/cookie'
Vue.prototype.cookieApi = cookieApi;

// 注册axios为全局属性
import axios from 'axios'
// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = '/api';
// http request 拦截器，通过这个，我们就可以把Cookie传到后台
// axios.interceptors.request.use(
//   config => {
//     const token = cookieApi.getTokenCookie(); //获取Cookie
//     config.data = JSON.stringify(config.data);
//     if (token) {
//       config.params = {'token': token} //后台接收的参数，后面我们将说明后台如何接收
//     }
//     return config;
//   },
//   err => {
//     return Promise.reject(err);
//   }
// );
Vue.prototype.$axios = axios;

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { Message } from 'element-ui';
Vue.prototype.$message = Message;
Vue.use(ElementUI);

// 引入图标
import 'font-awesome/css/font-awesome.min.css'

// 引入websocket
import * as socketApi from './api/socket'
Vue.prototype.socketApi = socketApi

Vue.config.productionTip = false;

// 路由权限检查
router.beforeEach((to, from, next) => {
  // 判断该路由是否需要登录权限
  if (to.matched.some(record => record.meta.isLogin)){
    // 判断当前的token是否存在
    if (sessionStorage.getItem("auth")) {
      //console.log(sessionStorage.getItem("auth"), to.meta.auth)
      if (sessionStorage.getItem("auth") == to.meta.auth){
        next();
      }
      else{
        // 用户类型不匹配
        next({
          path: '/login',
          // 将跳转的路由path作为参数，登录成功后跳转到该路由
          query: {redirect: to.fullPath}
        });
      }
    }
    else {
      next({
        path: '/login',
        // 将跳转的路由path作为参数，登录成功后跳转到该路由
        query: {redirect: to.fullPath}
      })
    }
  }
  else {
    next();
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  render: h => h(App),
  // 解决跨域问题
}).$mount('#app');

