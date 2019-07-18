import axios from '@/libs/api.request'

// export const getContentList = () => {
//   return axios.request({
//     url: 'https://www.easy-mock.com/mock/5c6cfdb19b8fd95f87e05f28/example/home',
//     method: 'get'
//   })
// }
export const getContentList = ({ userId, pageNo, pageSize }) => {
  const data = {
    pageNo: pageNo,
    pageSize: pageSize,
    requestDate: '',
    userId: userId
  }
  return axios.request({
    url: 'api/v1/web/info/getContentList',
    data: data,
    method: 'post'
  })
}
