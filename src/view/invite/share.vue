<template>
  <div id="app">

   <div data-reactroot="" class="share-invite-lite" style="">
    <!-- react-empty: 7 -->
    <div class="invite">
     <div style="overflow: hidden; height: 0.48rem;">
      <div id="marquee"  style="position: relative; height: 0.96rem; transition: transform 1000ms ease 0s; transform: translate(0px, 0rem);">
       <a class="scroll-bar-item" href="javascript:;"><img class="fire-icon" src="@/assets/images/laba.png" alt="" /><span class="item-text">suix***邀请118个好友，获得150元现金</span></a>
       <a class="scroll-bar-item" href="javascript:;"><img class="fire-icon" src="@/assets/images/laba.png" alt="" /><span class="item-text">xiaox***邀请223个好友，获得324元现金</span></a>
      <a class="scroll-bar-item" href="javascript:;"><img class="fire-icon" src="@/assets/images/laba.png" alt="" /><span class="item-text">新佳***邀请125个好友，获得172元现金</span></a>
      <a class="scroll-bar-item" href="javascript:;"><img class="fire-icon" src="@/assets/images/laba.png" alt="" /><span class="item-text">15932***邀请120个好友，获得152元现金</span></a>
      <a class="scroll-bar-item" href="javascript:;"><img class="fire-icon" src="@/assets/images/laba.png" alt="" /><span class="item-text">口不遮***邀请225个好友，获得345元现金</span></a>
      <a class="scroll-bar-item" href="javascript:;"><img class="fire-icon" src="@/assets/images/laba.png" alt="" /><span class="item-text">万利***邀请145个好友，获得234元现金</span></a>
      <a class="scroll-bar-item" href="javascript:;"><img class="fire-icon" src="@/assets/images/laba.png" alt="" /><span class="item-text">蓉蓉***邀请214个好友，获得336元现金</span></a>
      <a class="scroll-bar-item" href="javascript:;"><img class="fire-icon" src="@/assets/images/laba.png" alt="" /><span class="item-text">YQdl***邀请122个好友，获得224元现金</span></a>
      <a class="scroll-bar-item" href="javascript:;"><img class="fire-icon" src="@/assets/images/laba.png" alt="" /><span class="item-text">Love***邀请172个好友，获得324元现金</span></a>
      <a class="scroll-bar-item" href="javascript:;"><img class="fire-icon" src="@/assets/images/laba.png" alt="" /><span class="item-text">鸟不***邀请125个好友，获得172元现金</span></a>
      </div>
     </div>
    </div>
    <div class="mentor">
     <img class="mertor-header" :src="userdata.avatarUrl" />
     <span class="mertor-name">{{ userdata.username }}</span>
     <span class="mertor-cong">邀请您下载</span>
    </div>
    <div class="redpacket">
     <img class="redpacket-bg" src="@/assets/images/invite_wallet.png" />
     <div class="map-area"></div>
     <div class="redpacket-inner">
      <div class="redpacket-reward">
       <div class="redpacket-reward-number">
        {{ userdata.rewardAmount }}.00
       </div>
       <div class="redpacket-reward-unit">
        元
       </div>
      </div>
     </div>
     <div class="my-invite-code">
      <div class="my-invite-code-copy">
       <span>
        <!-- react-text: 33 -->我的邀请码：
        <!-- /react-text -->
        <!-- react-text: 34 -->{{ userdata.inviteCode }}
        <!-- /react-text --></span>
       <span class="copy-invite-code-btn" v-clipboard:copy="inviteClipboard" v-clipboard:success="copySuccess">复制</span>
      </div>
      <div class="invite-btn" v-clipboard:copy="inviteClipboard" @click="open_or_download_app">
       立即下载领取
      </div>
     </div>
    </div>
   </div>
  </div>
</template>

<style lang="less">
    @import "./share.less";
</style>

<script>

import config from '@/config'

import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'

import { getInviterInfo } from '@/api/invite.js'

import { mapActions, mapGetters, mapState } from 'vuex'

require('@/assets/js/invite/jquery.liMarquee.js')
require('@/assets/css/share_invite.css')
require('@/assets/css/liMarquee.css')
const {
  downAppURl, downWeixin, iphoneSchema, iphoneDownUrl, androidSchema, androidDownUrl
} = config
Vue.use(VueClipboard)
export default {
  name: 'share-article',
  data () {
    return {
      userdata: [],
      inviteClipboard: ''
    }
  },
  methods: {
    copySuccess (e) {
      this.$Message.success('复制成功')
    },
    isWeixin: function () { // 判断是否是微信
      var ua = navigator.userAgent.toLowerCase()
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true
      } else {
        return false
      }
    },
    open_or_download_app () {
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        window.location = iphoneDownUrl
      } else {
        window.location = androidDownUrl
      }
    }

  },
  mounted () {
    $('#marquee').liMarquee({
      direction: 'up'
    })

    let userId = this.$route.params.id
    // var shareCode = '1234567890';
    getInviterInfo({ userId }).then(res => {
      this.userdata = res.data.data
      this.inviteClipboard = '青鸟快讯邀请码【' + this.userdata.inviteCode + '】'
      resolve()
    }).catch(err => {
      // reject(err)
    })
  },
  computed: {},
  watch: {}
}
</script>
