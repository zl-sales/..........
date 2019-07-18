
import axios from '@/libs/api.request'

export const KeyInfo = () => {
  return axios.request({
    url: '/api/v1/cmn/getKeyInfo',
    method: 'post'
  })
}
