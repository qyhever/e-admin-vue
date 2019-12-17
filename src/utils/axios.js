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
  return qs.stringify(data, { arrayFormat: 'brackets' })
}

const _setLoading = (setLoading, value) => {
  if (setLoading) {
    store.commit('app/TOGGLE_LOADING', value)
  }
}
// 声明一个 Map 用于存储每个请求的标识 和 取消函数
const pending = new Map()
/**
 * 添加请求
 * @param {Object} config 
 */
const addPending = (config) => {
  const url = [
    config.method,
    config.url,
    qs.stringify(config.params),
    qs.stringify(config.data)
  ].join('&')
  config.cancelToken = config.cancelToken || new axios.CancelToken(cancel => {
    if (!pending.has(url)) { // 如果 pending 中不存在当前请求，则添加进去
      pending.set(url, cancel)
    }
  })
}
/**
 * 移除请求
 * @param {Object} config 
 */
const removePending = (config) => {
  const url = [
    config.method,
    config.url,
    qs.stringify(config.params),
    qs.stringify(config.data)
  ].join('&')
  if (pending.has(url)) { // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
    const cancel = pending.get(url)
    cancel(url)
    pending.delete(url)
  }
}
/**
 * 清空 pending 中的请求（在路由跳转时调用）
 * @param {Object} config
 */
export const clearPending = () => {
  for (const [url, cancel] of pending) {
    cancel(url)
  }
  pending.clear()
}

const instance = axios.create({
  baseURL,
  // 只作用于 params（手动拼接在 url 后的参数不走这里）
  paramsSerializer
})

/**
 * @param {Object} options 请求配置参数
 * @param {Boolean} [options.getResponse=false] 是否直接返回 axios Response Schema
 * @param {Boolean} [options.showWarningMsg=true] 是否显示接口错误提示（请求成功，但接口状态码非成功状态）
 * @param {Boolean} [options.showErrorMsg=true] 是否显示请求错误提示（请求失败）
 * @param {Boolean} [options.setLoading=false] 是否设置全局状态 app.loading
 * @param {Function} fn loading 状态回调
 * @return {Promise} Promise
 */
const _request = (
  {
    getResponse = false,
    showWarningMsg = true,
    showErrorMsg = true,
    setLoading = false,
    ...options
  } = {},
  fn = () => {} // eslint-disable-line
) => {
  removePending(options) // 在请求开始前，对之前的请求做检查取消操作
  addPending(options)
  const token = getToken()
  if (token) {
    options.headers = options.headers || {}
    options.headers.Authorization = token
  }
  _setLoading(setLoading, true)
  return instance(options)
    .then(response => {
      removePending(response) // 在请求结束后，移除本次请求
      if (getResponse) { // return the axios Response Schema
        return response
      }
      const responseData = response.data || {}
       // success code
      if (responseData.code === 1) {
        responseData.success = true
        return responseData.data || {}
      }
      // not success code
      if (showWarningMsg) {
        Message.closeAll()
        Message.warning(responseData.msg || '操作失败')
      }
      const err = new Error(JSON.stringify(responseData, null, 2))
      err.name = 'warning'
      throw err
    })
    .catch(error => {
      if (error.name === 'warning') {
        throw error
      }
      if (axios.isCancel(error)) {
        console.log('repeated request: ' + error.message)
        // if (showErrorMsg) {
        //   Message.closeAll()
        //   Message.warning('正在请求中，请不要重复操作')
        // }
      } else {
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
