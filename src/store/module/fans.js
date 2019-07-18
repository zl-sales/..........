// 调用的是 @/api/fans 里面的请求后台的方法
import {
  getFansData
} from '@/api/fans'

/**
 * vuex的核心是：store (state,getter,actions,mutations,module)
 * 每个应用将包含一个store实例
 */
export default {
  /**
     *  如果想改变state中的值需要跳用mutation中的方法（不能直接改变）
     */
  state: {
    fansdata: []
  },
  /**
     * mutation必须是同步函数
     * 改变store中的状态唯一途径就是 (commit mutation)
     */
  mutations: {
    setFansData (state, data) {
      state.fansdata = data
    }
  },
  /*
    getter怎么理解呢？通俗的理解可以认为是getter里的函数就是vuex里的计算属性，类似于computed函数。
    */
  getters: {
    fansdata: state => state.fansdata // 用户列表数据
  },

  /**
     *  Action 提交的是 mutation，而不是直接变更状态。
        Action 可以包含任意异步操作。
     */
  actions: {
    reqFans ({ state, commit }) {
      return new Promise((resolve, reject) => {
        getFansData({}).then(res => {
          console.info('粉丝列表请求数据')
          console.log(res)
          const data = res.data
          commit('setFansData', res.data.data)
          // console.log(state.fansdata)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
