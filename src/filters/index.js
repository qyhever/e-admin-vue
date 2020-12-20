import Vue from 'vue'
import { formatDate, formatDateTime } from '@/utils/date'
// import * as enums from '@/utils/enum'

const filters = {
  formatDate,
  formatDateTime,
  formatCurrency
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

/**
 * 将数值四舍五入(保留2位小数)后格式化成金额形式
 *
 * @param num 数值(Number或者String)
 * @return 金额格式的字符串,如'1,234,567.45'
 */
function formatCurrency(num) {
  if (typeof num !== 'number') {
    return 0
  }
  num = num.toString().replace(/\$|,/g, '')
  const sign = num < 0 ? '-' : ''
  num = Math.floor(num * 100 + 0.50000000001)
  let cents = num % 100
  num = Math.floor(num / 100).toString()
  if (cents < 10) {
    cents = '0' + cents
  }
  for (let i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
    num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3))
  }
  return (sign + num + '.' + cents)
}
