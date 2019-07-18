import {
  login,
  logout,
  getUserInfo,
  getMessage,
  getContentByMsgId,
  hasRead,
  removeReaded,
  restoreTrash,
  getUnreadCount
} from "@/api/user";

import {
  setToken,
  getToken,
  setUserId,
  getUserId,
  getPcAdmin,
  setPcAdmin
} from "@/libs/util";

export default {
  state: {
    phone: "",
    userId: getUserId(),
    pcAdmin: getPcAdmin(),
    avatarUrl: "",
    token: getToken(),
    // is new
    access: "",
    hasGetInfo: false,
    unreadCount: 0,
    messageUnreadList: [],
    messageReadedList: [],
    messageTrashList: [],
    messageContentStore: {},
    // is new
    alipay: "",
    alipayName: "",
    userName: ""
  },
  mutations: {
    setAvator(state, avatorPath) {
      state.avatorImgPath = avatorPath;
    },
    setUserId(state, id) {
      state.userId = id;
      setUserId(id);
    },
    setPcAdmin(state, pcAdmin) {
      state.pcAdmin = pcAdmin;
      setPcAdmin(pcAdmin);
    },
    setPhone(state, phone) {
      state.phone = phone;
    },
    setAccess(state, access) {
      state.access = access;
    },
    setToken(state, token) {
      state.token = token;
      setToken(token);
    },
    setHasGetInfo(state, status) {
      state.hasGetInfo = status;
    },
    setMessageCount(state, count) {
      state.unreadCount = count;
    },
    setMessageUnreadList(state, list) {
      state.messageUnreadList = list;
    },
    setMessageReadedList(state, list) {
      state.messageReadedList = list;
    },
    setMessageTrashList(state, list) {
      state.messageTrashList = list;
    },
    updateMessageContentStore(state, { msg_id, content }) {
      state.messageContentStore[msg_id] = content;
    },
    moveMsg(state, { from, to, msg_id }) {
      const index = state[from].findIndex(_ => _.msg_id === msg_id);
      const msgItem = state[from].splice(index, 1)[0];
      msgItem.loading = false;
      state[to].unshift(msgItem);
    },
    // 获取用户信息
    setGetUserInfo(state, userInfo) {
      state.getUserInfo = userInfo;
    },
    setUserName(state, userName) {
      state.userName = userName;
    },
    setAlipay(state, alipay) {
      state.alipay = alipay;
    },
    setAlipayName(state, alipayName) {
      state.alipayName = alipayName;
    },
    setAvatarUrl(state, avatarUrl) {
      state.avatarUrl = avatarUrl;
    }
  },
  getters: {
    messageUnreadCount: state => state.messageUnreadList.length,
    messageReadedCount: state => state.messageReadedList.length,
    messageTrashCount: state => state.messageTrashList.length,
    updateAlipay: state => state.alipay,
    updateAlipayName: state => state.alipayName
  },
  actions: {
    // 登录
    handleLogin({ commit }, { phone, password }) {
      phone = phone.trim();
      // Promise 是否是 es6  的 Promise
      return new Promise((resolve, reject) => {
        login({
          phone,
          password
        })
          .then(res => {
            const data = res.data.data;
            // 228关于登录
            commit("setToken", data.token); // 以后需要打开
            // commit('setToken', '12312312312')//临时token
            commit("setHasGetInfo", true);
            commit("setUserId", data.userId);
            commit("setPcAdmin", data.pcAdmin);
            commit("setUserName", data.userName);
            commit("setAvatarUrl", data.avatarUrl);
            resolve();
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    // 退出登录
    handleLogOut({ state, commit }) {
      return new Promise((resolve, reject) => {
        commit("setToken", "");
        commit("setAccess", []);
        window.sessionStorage.clear();
        window.localStorage.clear();
        resolve();
      });
    },
    // 获取用户相关信息
    getUserInfo({ state, commit }) {
      const userId = this.state.user.userId;
      return new Promise((resolve, reject) => {
        try {
          getUserInfo(userId)
            .then(res => {
              const data = res.data.data;
              commit("setAlipay", data.alipay);
              commit("setAlipayName", data.alipayName);
              commit("setUserName", data.name);
              commit("setAvatarUrl", data.header);
              resolve(data);
            })
            .catch(err => {
              reject(err);
            });
        } catch (error) {
          reject(error);
        }
      });
    },
    // 此方法用来获取未读消息条数，接口只返回数值，不返回消息列表
    getUnreadMessageCount({ state, commit }) {
      getUnreadCount().then(res => {
        const { data } = res;
        commit("setMessageCount", data);
      });
    },
    // 获取消息列表，其中包含未读、已读、回收站三个列表
    getMessageList({ state, commit }) {
      return new Promise((resolve, reject) => {
        getMessage()
          .then(res => {
            const { unread, readed, trash } = res.data;
            commit(
              "setMessageUnreadList",
              unread.sort(
                (a, b) => new Date(b.create_time) - new Date(a.create_time)
              )
            );
            commit(
              "setMessageReadedList",
              readed
                .map(_ => {
                  _.loading = false;
                  return _;
                })
                .sort(
                  (a, b) => new Date(b.create_time) - new Date(a.create_time)
                )
            );
            commit(
              "setMessageTrashList",
              trash
                .map(_ => {
                  _.loading = false;
                  return _;
                })
                .sort(
                  (a, b) => new Date(b.create_time) - new Date(a.create_time)
                )
            );
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // 根据当前点击的消息的id获取内容
    getContentByMsgId({ state, commit }, { msg_id }) {
      return new Promise((resolve, reject) => {
        let contentItem = state.messageContentStore[msg_id];
        if (contentItem) {
          resolve(contentItem);
        } else {
          getContentByMsgId(msg_id).then(res => {
            const content = res.data;
            commit("updateMessageContentStore", {
              msg_id,
              content
            });
            resolve(content);
          });
        }
      });
    },
    // 把一个未读消息标记为已读
    hasRead({ state, commit }, { msg_id }) {
      return new Promise((resolve, reject) => {
        hasRead(msg_id)
          .then(() => {
            commit("moveMsg", {
              from: "messageUnreadList",
              to: "messageReadedList",
              msg_id
            });
            commit("setMessageCount", state.unreadCount - 1);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // 删除一个已读消息到回收站
    removeReaded({ commit }, { msg_id }) {
      return new Promise((resolve, reject) => {
        removeReaded(msg_id)
          .then(() => {
            commit("moveMsg", {
              from: "messageReadedList",
              to: "messageTrashList",
              msg_id
            });
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // 还原一个已删除消息到已读消息
    restoreTrash({ commit }, { msg_id }) {
      return new Promise((resolve, reject) => {
        restoreTrash(msg_id)
          .then(() => {
            commit("moveMsg", {
              from: "messageTrashList",
              to: "messageReadedList",
              msg_id
            });
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
};
