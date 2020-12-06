import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)
// 隐藏vue-router在3.0版本控制台错误信息（跳转相同路径会报错）
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function(location) {
  return originalPush.call(this, location).catch(err => err)
}
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function(location) {
  return originalReplace.call(this, location).catch(err => err)
}

const router = new VueRouter({
  mode: process.env.VUE_APP_HASH ? 'hash' : 'history',
  base: process.env.VUE_APP_HASH ? '/' : process.env.BASE_URL,
  routes
})

export default router
