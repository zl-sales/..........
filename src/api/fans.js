import axios from '@/libs/api.request'
export const getFansData = () => {
  return axios.request({
    url: 'https://www.easy-mock.com/mock/5c6cfdb19b8fd95f87e05f28/example/fans',
    method: 'get'
  })
}
