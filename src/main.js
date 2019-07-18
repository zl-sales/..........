// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import iView from "iview";
import config from "@/config";
import { directive as clickOutside } from "v-click-outside-x";
import installPlugin from "@/plugin";
import "./index.less";
import "@/assets/icons/iconfont.css";

import ELEMENT from "element-ui";
// import "element-ui/lib/theme-chalk/index.css";

import VueWechatTitle from "vue-wechat-title";

import moment from "moment";

import VueXgplayer from "vue-xgplayer";
Vue.use(VueXgplayer, {
  playsinline: true
});
// Vue.use(ELEMENT);

console.log = function () {
  return false;
}

// Import and use Vue Froala lib.
// import VueFroala from 'vue-froala-wysiwyg'
// Vue.use(VueFroala)
// froala end

// 实际打包时应该不引入mock
/* eslint-disable
if (process.env.NODE_ENV !== 'production') require('@/mock')
*/

let currentUrl = window.location.href;
if (currentUrl.indexOf("/#/") != -1) {
  window.location.href = currentUrl.replace("/#/", "/");
}
// Vue.use(VueQuillEditor /* { default global options } */)
Vue.use(VueWechatTitle);

//  Vue.use(iView)

/**
 * @description 注册admin内置插件
 */
installPlugin(Vue);
/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false;
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config;
/**
 * 注册指令
 */
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});

Vue.filter("time", v => {
  return moment(v).format("YYYY-MM-DD HH:mm:ss");
});
Vue.filter("times", v => {
  return moment(v).format("YYYY.MM.DD  HH:mm");
});
