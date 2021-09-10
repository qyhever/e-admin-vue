import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './utils/visit'
import './router/permission'
import './plugins'
import './assets/styles/index.scss'
import './assets/icons'
import './filters'
Vue.config.productionTip = false

store.dispatch('user/initUser')
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
