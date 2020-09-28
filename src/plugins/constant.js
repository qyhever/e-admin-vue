/**
 * 挂载在 Vue.prototype 上的属性，约定以 $ 开头
 */
import Vue from 'vue'
import progress from '@/components/progress'

Vue.prototype.$pageSizes = [ 10, 20, 30, 40 ]
Vue.prototype.$paginationLayout = 'total, sizes, prev, pager, next, jumper'
Vue.prototype.$dialogModalClose = false
Vue.prototype.$dialogEscClose = false
Vue.prototype.$QINIU_UPLOAD_URL = 'https://upload-z2.qiniup.com'
Vue.prototype.$QINIU_PREFIX = 'https://qiniu.qyhever.com/'
Vue.prototype.$progress = progress
