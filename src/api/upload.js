import axios from '@/libs/api.request'

export const ossupload = () => {
  const data = {
  }
  return axios.request({
    url: 'api/v1/web/upload/upload',
    data: data,
    method: 'post'
  })
}
