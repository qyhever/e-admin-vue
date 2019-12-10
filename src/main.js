import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { getUser } from '@/utils/local'
import { getLocalCity } from '@/utils'

import './router/permission'
import './icons'
import './plugins'
import Element from 'element-ui'
import './assets/styles/element-variables.scss'

import 'normalize.css'
import './assets/styles/index.scss'
import './filters'
getLocalCity().then(console.log)
Vue.use(Element)
const user = getUser()
if (user) {
  store.dispatch('user/initUser', {userInfo: user})
} else {
  store.dispatch('user/clearInfo')
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
