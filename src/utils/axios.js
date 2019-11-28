import axios from 'axios'
import qs from 'qs'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'
import { getToken } from '@/utils/local'
import baseURL from '@/config/api'

const codeMessage = {
  400: '请求错误',
  401: '登录状态失效，请重新登录',
  403: '拒绝访问',
  404: '请求地址不存在',
  500: '服务器错误，请稍后再试',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时'
}

const paramsSerializer = params => {
  const data = {}
  for (const k in params) {
    const value = params[k]
    if (value !== '' && value !== null && value !== undefined) {
      data[k] = value
    }
  }
  return qs.stringify(data, {arrayFormat: 'brackets'})
}

const _setLoading = (setLoading, value) => {
  if (setLoading) {
    store.commit('app/TOGGLE_LOADING', value)
  }
}

const instance = axios.create({
  baseURL,
  // 只作用于 params（手动拼接在 url 后的参数不走这里）
  paramsSerializer
})

/**
 * @param {Object} options 请求配置参数
 * @param {Boolean} [options.getResponseSchema=false] 是否直接返回 axios Response Schema
 * @param {Boolean} [options.showWarningMsg=true] 是否显示接口错误提示（请求成功，但接口状态码非成功状态）
 * @param {Boolean} [options.showErrorMsg=true] 是否显示请求错误提示（请求失败）
 * @param {Boolean} [options.setLoading=false] 是否设置全局状态 app.loading
 * @param {Function} fn loading 状态回调
 * @return {Promise} Promise
 */
const _request = (
  {
    getResponseSchema = false,
    showWarningMsg = true,
    showErrorMsg = true,
    setLoading = false,
    ...options
  } = {},
  fn = () => {} // eslint-disable-line
) => {
  instance.interceptors.request.use(config => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = token
    }
    _setLoading(setLoading, true)
    return config
  }, error => {
    return Promise.reject(error)
  })
  return instance(options)
    .then(response => {
      if (getResponseSchema) { // return the axios Response Schema
        return response
      }
      const responseData = response.data || {}
      if (responseData.code === 1) { // success code
        responseData.success = true
      } else { // not success code
        if (showWarningMsg) {          
          Message.closeAll()
          Message.warning(responseData.msg || '操作失败')
        }
      }
      return responseData
    })
    .catch(error => {
      let msg = ''
      if (error.response) {
        const status = error.response.status
        msg = codeMessage[status] || '操作失败'
        if (status === 401) {
          store.dispatch('user/clearInfo').then(() => {
            router.replace('/login')
          })
        }
      } else {
        if (error.message.indexOf('timeout') >= 0) {
          msg = '请求超时！请检查网络是否正常'
        } else {
          msg = '网络错误，请检查网络是否已连接！'
        }
      }
      if (showErrorMsg) {        
        Message.closeAll()
        Message.error(msg)
      }
      throw error
    })
    .finally(() => {
      _setLoading(setLoading, false)
      fn(false)
    })
}

export default param => {
  const typeRes = typeof param
  // the first param is a function, example: request(value => this.loading = value)(options)
  if (typeRes === 'function') {
    param(true)
    return options => _request(options, param)
  }
  // the first param is not a function, example: request(options)
  if (typeRes === 'object' && typeRes !== null) return _request(param)
}
