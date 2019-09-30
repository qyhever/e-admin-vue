import axios from '@/utils/axios'

export const getResources = params => {
  return axios({
    method: 'get',
    url: '/resource',
    params
  })
}
