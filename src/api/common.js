import axios from '@/utils/axios'

export const getQiniuToken = () => {
  return axios({
    method: 'get',
    url: '/upload/qiniu_token'
  })
}
