/**
 * 挂载在 Vue.prototype 上的方法，约定以 $ 开头
 */
import Vue from 'vue'

Vue.prototype.$imageErrorHandler = function() {
  return true
}
