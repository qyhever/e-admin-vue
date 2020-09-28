import Vue from 'vue'
import ProgressComponent from './progress'
const Progress = Vue.extend(ProgressComponent)

let instance = null

export default {
  open(percent) {
    if (!instance) {
      instance = new Progress({
        el: document.createElement('div')
      })
      document.body.appendChild(instance.$el)
    }
    instance.percent = percent > 100 ? 100 : percent
  }
}
