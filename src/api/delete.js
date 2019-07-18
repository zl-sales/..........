import axios from '@/libs/api.request'

export const delNews = ({ infoId }) => {
  const data = {
    infoId: infoId
  }
  return axios.request({
    url: '/api/v1/web/info/delNews',
    data: data,
    method: 'post'
  })
}
