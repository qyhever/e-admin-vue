/**
 * global components
 */
import Vue from 'vue'
// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('@/components', true, /\.vue$/)

modulesFiles.keys().forEach(modulePath => {
  // set './CountUp.Vue' => 'CountUp'
  // const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const component = modulesFiles(modulePath).default
  // register global components, you can user it through 'ComCountUp' or 'com-count-up'
  Vue.component('Com' + component.name, component)
})
