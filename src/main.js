import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'normalize.css'
import './assets/styles/index.scss'

import './router/permission'
import './icons'
import Element from 'element-ui'
import './assets/styles/element-variables.scss'
Vue.use(Element)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
