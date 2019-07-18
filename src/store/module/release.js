import {
  getNodeList,
  getTagList,
  issue
} from '@/api/release'
export default {
  state: {
    // 例子： noticedata: [],
    // noticedata == channel
    // stateNotice == stateChannel
    // noticedata: state => state.noticedata ,
    tabData: [],
    tagList: []
  },
  mutations: {
    setTabData (state, data) {
      state.tabData = data
    },
    setTagList (state, data) {
      state.tagList = data
    }

  },
  getters: {
    tabData: state => state.tabData // 初始数据：数组
  },
  actions: {
    // getNodeList
    reqNodeList ({
      state,
      commit
    }) {
      return new Promise((resolve, reject) => {
        getNodeList({}).then(res => {
          console.log(res)
          const data = res.data
          commit('setTabData', data.data.tabData)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    // getTagList
    reqTagList ({
      state,
      commit
    }, {
      nodeId
    }) {
      return new Promise((resolve, reject) => {
        getTagList({
          nodeId
        }).then(res => {
          const data = res.data
          console.info('tag请求数据')
          console.log(data)
          commit('setTagList', data.data.tabData)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    reqIssue ({
      state,
      commit
    }, {
      content,
      images,
      nodeId,
      tagIds,
      tagNames,
      title,
      type
    }) {
      return new Promise((resolve, reject) => {
        issue({
          content,
          images,
          nodeId,
          tagIds,
          tagNames,
          title,
          type
        }).then(res => {
          const data = res.data

          // console.log(data);
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
