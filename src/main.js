import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/resrt.css'
import less from 'less'

Vue.use(less)
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.directive('title', {
  inserted: function (el) {
    document.title = el.dataset.title
  }
})

let startApp = function() {
  axios.get('url.json').then((res) => {
    // 基础地址
    Vue.prototype.url = res.data.url;
    Vue.config.productionTip = false;

    new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount('#app')
  });
};
startApp();
