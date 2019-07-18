import { getMyIncomeInfo, doApplyCash, getWithdrawalsList, updateCashInfo } from '@/api/earnings'

export default {
  state: {
    countMoney: '',
    balanceMoney: '',
    myIncomeList: [],
    latelyMoney: '',
    latelyTime: '',
    checkCount: '',
    withdrawalDetails: []
  },
  mutations: {
    setCountMoney (state, countMoney) {
      state.countMoney = countMoney
    },
    setBalanceMoney (state, balanceMoney) {
      state.balanceMoney = balanceMoney
    },
    setMyIncomeList (state, myIncomeList) {
      state.myIncomeList = myIncomeList
    },
    setLatelyMoney (state, latelyMoney) {
      state.latelyMoney = latelyMoney
    },
    setLatelyTime (state, latelyTime) {
      state.latelyTime = latelyTime
    },
    setChackCount (state, checkCount) {
      state.checkCount = checkCount
    },
    setWithdrawalDetails (state, withdrawalDetails) {
      state.withdrawalDetails = withdrawalDetails
    }
  },
  getters: {
    balanceMoney: state => state.balanceMoney
  },
  actions: {
    // 提现设置 初始化数据
    earningsInfo ({ state, commit }) {
      const userId = this.state.user.userId
      return new Promise((resolve, reject) => {
        getMyIncomeInfo({
          userId
        }).then(res => {
          const data = res.data.data
          console.log(res) // 返回的数据?
          console.log(data)
          // balanceMoney 可提现金额 99.99
          commit('setBalanceMoney', data.balanceMoney) // data.balanceMoney
          // countMoney 累计收益
          commit('setCountMoney', data.countMoney)
          // checkCount 过审数量
          commit('setChackCount', data.checkCount)
          // latelyMoney 最近一比提现金额
          commit('setLatelyMoney', data.latelyMoney)
          // latelyTime 最近一笔提现时间
          commit('setLatelyTime', data.latelyTime)
          // myIncomeList 收益明细列表
          commit('setMyIncomeList', data.myIncomeList)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 申请提现
    applyCash ({ state, commit }, {
      applyMoney
    }) {
      const userId = this.state.user.userId
      console.log(applyMoney)
      return new Promise((resolve, reject) => {
        doApplyCash({
          userId,
          applyMoney
        }).then(res => {
          const data = res
          console.log(data)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 提现明细列表
    withdrawalsList ({ state, commit }, {
      startDate,
      endDate
    }) {
      const userId = this.state.user.userId
      return new Promise((resolve, reject) => {
        getWithdrawalsList({
          userId,
          startDate,
          endDate
        }).then(res => {
          const data = res.data
          commit('setWithdrawalDetails', data.data)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    //
    updateAlipayCashInfo ({ state, commit }, { alipay, alipayName }) {
      const userId = this.state.user.userId
      return new Promise((resolve, reject) => {
        updateCashInfo({
          userId,
          alipay,
          alipayName
        }).then(res => {
          const data = res
          console.log(data)
          this.dispatch('getUserInfo').then(user => {}).catch(() => {
            setToken('')
            next({
              name: 'login'
            })
          })
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    }

  }
}
