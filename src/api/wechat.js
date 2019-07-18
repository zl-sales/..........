import axios from '@/libs/api.request'

export const getWechatCode = () => {
  return axios.request({
    url: 'api/v1/web/user/getWechatCode',
    methods: 'post'
  })
}
