import axios from '@/libs/api.request'

export const NewsDetail = ({ infoId }) => {
  const data = {
    infoId: infoId
  }
  return axios.request({
    url: '/api/v1/web/info/getNewsDetail',
    data: data,
    method: 'post'
  })
}
