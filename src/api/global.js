import request from '@/api/request'

export function getQiniuToken() {
  return request({
    url: '/upload/qiniu_token'
  })
}

export function getTotalRoles(loadingCb) {
  return request({
    url: '/role/total',
    loadingCb
  })
}

export const getTotalDirs = loadingCb => {
  return request({
    method: 'get',
    url: '/resource/dir',
    loadingCb
  })
}

export const getTotalResources = loadingCb => {
  return request({
    method: 'get',
    url: '/resource/total',
    loadingCb
  })
}
