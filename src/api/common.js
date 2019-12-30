import axios from '@/utils/axios'

export const getQiniuToken = (fn) => {
  return axios(fn)({
    method: 'get',
    url: '/upload/qiniu_token',
    params: {
      t: new Date().getTime()
    }
  })
}
