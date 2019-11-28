/**
 * global constants
 */

export default {
  install(Vue) {
    Vue.prototype.pageSizes = [ 10, 20, 30, 40 ]
    Vue.prototype.paginationLayout = 'total, sizes, prev, pager, next, jumper'
    Vue.prototype.dialogModalClose = false
    Vue.prototype.dialogEscClose = false
    Vue.prototype.QINIU_UPLOAD_URL = 'https://upload-z2.qiniup.com'
    Vue.prototype.QINIU_PREFIX = 'https://qiniu.test.qyhever.com/'
  }
}
