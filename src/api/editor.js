import axios from '@/libs/api.request'

export const uploadImage = () => {
  return axios.request({
    url: 'http://eti.local/voda/test.php',
    params: {},
    method: 'post'
  })
}
