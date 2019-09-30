/**
 * global constants
 */

export default {
  install(Vue) {
    Vue.prototype.pageSizes = [ 10, 20, 30, 40 ]
    Vue.prototype.paginationLayout = 'total, sizes, prev, pager, next, jumper'
    Vue.prototype.dialogModalClose = false
    Vue.prototype.dialogEscClose = false
  }
}
