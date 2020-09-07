import axios from 'axios'
import request from '@/api/request'

export const getUsers = (params, loadingCb) => {
  return request({
    method: 'get',
    url: '/user',
    params,
    loadingCb
  })
}

export const saveUser = (data, loadingCb, cancelCallback) => {
  return request({
    method: 'post',
    url: '/user',
    data,
    loadingCb,
    cancelToken: new axios.CancelToken(cancelCallback)
  })
}

export const updateUser = data => {
  return request({
    method: 'put',
    url: '/user',
    data
  })
}

export const patchUser = (data, loadingCb) => {
  return request({
    method: 'patch',
    url: '/user',
    data,
    loadingCb
  })
}

export const deleteUser = (params, loadingCb) => {
  return request({
    method: 'delete',
    url: `/user/${params.id}`,
    params,
    loadingCb
  })
}
