/**
 * global methods
 */
import Vue from 'vue'

Vue.prototype.getRandomStr = () => {
  return new Date().getTime() + Math.random().toString(16).slice(2)
}
