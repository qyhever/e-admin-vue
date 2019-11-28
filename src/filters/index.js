import Vue from 'vue'
import * as enums from '@/utils/enum'
import moment from 'moment'

const filters = {
  formatDate(date) {
    return moment(date).format('YYYY-MM-DD')
  },
  formatDateTime(date) {
    return moment(date).format('YYYY-MM-DD HH:mm:ss')
  }
}

// add enum filters
Object.keys(enums).forEach(key => {
  const filterName = key.replace('enum', 'filter')
  filters[filterName] = value => {
     if (value === undefined || value === null) {
       return ''
     }
     return enums[key].obj[String(value)]
  }
})
// register filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
