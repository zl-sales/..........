import { getContentList } from '@/api/homepage'

export default {
  state: {
    homedata: []
  },
  mutations: {
    setHomeData (state, data) {
      state.homedata = data
    }
  },
  getters: {
    homedata: state => state.homedata // 初始数据：数组
  },
  actions: {
    reqhomepage ({ state, commit }, {
      pageNo, pageSize
    }) {
      const userId = this.state.user.userId
      return new Promise((resolve, reject) => {
        getContentList({ userId, pageNo, pageSize }).then(res => {
          // console.info('首页最近作品请求数据')
          console.log(res)//  请求成功
          const data = res.data.data
          commit('setHomeData', res.data.data)
          // console.log(state.homedata)
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
