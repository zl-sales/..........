<template>
  <div class="bg">
    <div class="bg_title">{{content.title}}</div>
    <div class="user">
      <div class="avatar">
        <img :src="avatarUrl" class="avatarUrl" />
        <div class="username">{{username}}</div>
        <div class="datetime">{{content.sendTime | time}}</div>
      </div>
    </div>
    <div class="context" v-html="content.content"></div>
    <p class="a">
      <video id="show"
        v-for="(item,i) in content.videos"
        :key="i"
        :src="item.url"
        autoplay="autoplay"
        controls="controls"
        tabindex="2"
        mediatype="video"
      ></video>
    </p>
  </div>
</template>

<script>
import { NewsDetail } from '@/api/newsdetail'
export default {
  name: 'draft',
  created () {
    this.getNewsDetail()
    // 在页面加载时读取sessionStorage里的状态信息
    if (localStorage.getItem('UserInfo')) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(localStorage.getItem('UserInfo'))
        )
      )
    }
  },
  data () {
    return {
      content: {},
      avatarUrl: '',
      username: ''
    }
  },
  methods: {
    async getNewsDetail () {
      const infoId = this.$route.params.id
      const { data } = await NewsDetail({ infoId })
      console.log(data)
      this.content = data.data
      this.avatarUrl = data.data.user.header
      this.username = data.data.user.name
    }
  }
}
</script>

<style scoped>
@import "./draft.css";
</style>
