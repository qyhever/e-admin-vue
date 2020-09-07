import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './router/permission'
import './plugins'
import './assets/styles/index.scss'
import './assets/icons'
import './filters'
Vue.config.productionTip = false
if (process.env.NODE_ENV !== 'development') {
  console.log(`latest delopy: %c${process.env.NOW}`, 'color: #67C23A')
}

store.dispatch('user/initUser')
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
