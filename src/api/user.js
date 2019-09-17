import axios from '@/utils/axios'

export const login = data => {
  return axios({
    method: 'post',
    url: '/user/login',
    data
  })
}

export const getInfo = () => {
  return axios({
    method: 'get',
    url: '/user/current'
  })
}
