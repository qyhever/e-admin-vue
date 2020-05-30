import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { getLocalCity } from '@/utils'

import './router/permission'
import './icons'
import './plugins'
import Element from 'element-ui'
import './assets/styles/element-variables.scss'

import './assets/styles/index.scss'
import './filters'
getLocalCity().then(console.log)
Vue.use(Element)
store.dispatch('user/initUser')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
