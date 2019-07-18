import axios from '@/libs/api.request'
// import { TOKEN_KEY } from '../libs/util'

export const getVrtifyCode = ({ codeKey, identify, phone }) => {
  const data = {
    codeKey: 'LOGIN',
    identify: '12345678',
    phone
  }
  return axios.request({
    url: 'api/v1/login/getVrtifyCode',
    data,
    method: 'post'
  })
}
// 警告自己
// export const webLogin = ({ identify, phone, verifyCode }) => {
//   const data = {
//     identify: '12345678',
//     phone: this.form.phone,
//     verifyCode: this.form.identify
//   }
//   return axios.request({
//     url: 'api/v1/web/user/webLogin',
//     data: {},
//     method: 'post'
//   })
// }
