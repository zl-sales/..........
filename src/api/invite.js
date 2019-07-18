import axios from '@/libs/api.request'

export const getInviterInfo = ({
  userId
}) => {
  const data = {
    userId: userId
  }
  return axios.request({
    url: 'api/v1/extension/getInviterInfo',
    data: data,
    method: 'post'
  })
}
