import {
  getNotice
} from '@/api/notice'

export default {
  state: {
    noticedata: []
  },
  mutations: {
    stateNotice (state, data) {
      state.noticedata = data
    }
  },
  getters: {
    noticedata: state => state.noticedata // 初始数据：数组
  },
  actions: {
    reqNotice ({ state, commit }) {
      console.log(state) //  notice.vue  mothods   ...mapActions(["reqNotice"])
      return new Promise((resolve, reject) => {
        getNotice({}).then(res => { // getNotice  api/notice请求的方法名
          console.info('消息通知请求数据')
          console.log(res)
          const data = res.messageData // const data = res.data.messageList
          commit('stateNotice', res.data.data.messageData)
          // console.log("state.noticedata"+ state.noticedata.messageData)//state.noticedata.messageData
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    }
  }

}
