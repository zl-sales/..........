import { getParams } from '@/libs/util'
const USER_MAP = {
  super_admin: {
    name: 'super_admin',
    user_id: '1',
    access: ['super_admin', 'admin'],
    token: 'super_admin',
    avator: 'http://localhost:8080/img/icon.3cc71b0b.png' // 头像青鸟
  },

  admin: {
    name: 'admin',
    user_id: '2',
    access: ['admin'],
    token: 'admin',
    avator: 'https://avatars0.githubusercontent.com/u/20942571?s=460&v=4' // 头像B
  },

  18698677535: {
    name: '18698677535',
    user_id: '3',
    access: ['18698677535'],
    token: '18698677535',
    avator: 'https://avatars0.githubusercontent.com/u/20942571?s=460&v=4' // 头像B
  }
}

export const login = req => {
  console.log('mock login:拦截')
  req = JSON.parse(req.body)
  console.log(req)
  return {
    code: 200,
    token: USER_MAP[req.phone].token
  }
}

export const getUserInfo = req => {
  const params = getParams(req.url)
  return USER_MAP[params.token]
}

export const logout = req => {
  return null
}
