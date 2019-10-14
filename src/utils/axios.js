import axios from 'axios'
import qs from 'qs'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'
import { getToken } from '@/utils/local'
import baseURL from '@/config/api'

// axios.defaults.headers.post['Content-Type'] = 'application/json charset=UTF-8'
const instance = axios.create({
  baseURL,
  paramsSerializer(params) {
    const data = {}
    for (const k in params) {
      const value = params[k]
      if (value !== '' && value !== null && value !== undefined) {
        data[k] = value
      }
    }
    return qs.stringify(data, {arrayFormat: 'brackets'})
  }
})

instance.interceptors.request.use(config => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = token
  }
  store.commit('app/TOGGLE_LOADING', true)
  return config
}, (error) => {
  return Promise.reject(error)
})

instance.interceptors.response.use(response => {
  if (response.data.code === 1) { // 成功
    response.data = response.data || {}
    response.data.success = true
  } else {
    Message.closeAll()
    Message.error(response.data.msg)
  }
  store.commit('app/TOGGLE_LOADING', false)
  return response.data
}, (error) => {
  store.commit('app/TOGGLE_LOADING', false)
  if (error.response) {
    const status = error.response.status
    // const msg = error.response.data.msg
    if (status === 401) {
      Message.warning('登录状态失效，请重新登录')
      store.dispatch('user/resetToken').then(() => {
        router.replace('/login')
      })
    }
  
    if (status === 404) {
      Message.error('404 NOT FOUND')
    }
  
    if (status === 500) {
      Message.error('服务器异常')
    }
  } else {
    Message.warning('网络错误，请稍后再试')
  }
  return Promise.reject(error)
})

export default instance
