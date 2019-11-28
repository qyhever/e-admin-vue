/**
 * register plugins
 */
import Vue from 'vue'
import globalConstant from './global-constant'
import globalFunction from './global-function'
import './global-component'

Vue.use(globalConstant)
Vue.use(globalFunction)
