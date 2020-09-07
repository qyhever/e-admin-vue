import Vue from 'vue'
import { formatDate, formatDateTime } from '@/utils/date'
// import * as enums from '@/utils/enum'

const filters = {
  formatDate,
  formatDateTime
}

// add enum filters
// Object.keys(enums).forEach(key => {
//   const filterName = key.replace('enum', 'filter')
//   filters[filterName] = value => {
//      if (value === undefined || value === null) {
//        return ''
//      }
//      return enums[key].obj[String(value)]
//   }
// })
// register filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
