import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './router/permission'
import './icons'
import './plugins'
import Element from 'element-ui'
import './assets/styles/element-variables.scss'

import 'normalize.css'
import './assets/styles/index.scss'
import * as filters from './filters'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.use(Element)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
