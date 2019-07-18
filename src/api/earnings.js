import axios from '@/libs/api.request'
// 我的收益
export const getMyIncomeInfo = ({
  userId // 参数
}) => {
  const data = {
    userId: userId
  }
  return axios.request({
    url: 'api/v1/web/cash/getMyIncomeInfo',
    data,
    method: 'post'
  })
}

// 申请提现
export const doApplyCash = ({
  userId,
  applyMoney
}) => {
  const data = {
    userId: userId,
    applyMoney: applyMoney
  }
  return axios.request({
    url: 'api/v1/web/cash/applyCash',
    data,
    method: 'post'
  })
}

// 提现记录
export const getWithdrawalsList = ({
  userId,
  startDate,
  endDate
}) => {
  const data = {
    userId: userId,
    startDate: startDate,
    endDate: endDate
  }
  return axios.request({
    url: 'api/v1/web/cash/getWithdrawalsList',
    data,
    method: 'post'
  })
}

//  修改提现设置
export const updateCashInfo = ({
  userId,
  alipay,
  alipayName
}) => {
  const data = {
    userId: userId,
    alipay: alipay,
    alipayName: alipayName
  }
  return axios.request({
    url: 'api/v1/web/cash/updateCashInfo',
    data,
    method: 'post'
  })
}
