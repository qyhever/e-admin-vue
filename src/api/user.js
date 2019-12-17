import axios from '@/utils/axios'

// export const testReq = () => {
//   return axios({
//     method: 'get',
//     url: 'http://localhost:3000/users',
//     getResponse: true
//   }).then(res => {
//     // getResponse: true 可以获取 headers 信息
//     // console.log(res.headers.total)
//     return res
//   })
// }

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

export const getUsers = params => {
  return axios({
    method: 'get',
    url: '/user',
    params
  })
}

export const createUser = params => {
  return axios({
    method: 'post',
    url: '/user',
    data: params
  })
}

export const updateUser = params => {
  return axios({
    method: 'put',
    url: '/user',
    data: params
  })
}

export const patchUser = params => {
  return axios({
    method: 'patch',
    url: '/user',
    data: params
  })
}

export const deleteUser = params => {
  return axios({
    method: 'delete',
    url: `/user/${params.id}`,
    params
  })
}
