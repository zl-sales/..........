<template>
  <row>
    <i-col>
      <Card shadow dis-hover :bordered="false">
        <p slot="title">粉丝管理</p>
        <row>
          <i-col :xs="{ span: 6}" v-for="(infor, i) in fanslist" :key="`infor-${i}`">
            <div class="user-info">
              <a class="user-img" target="_blank" rel="noopener noreferrer">
                <img :src="infor.avatar_img" role="presentation">
              </a>
              <div class="user-name">{{infor.fansName}}</div>
              <div class="user-follow">
                <a>关注</a>
              </div>
            </div>
          </i-col>
        </row>
        <div class="page">
          <page :total="100" prev-text="上一页" next-text="下一页"/>
        </div>
      </Card>
    </i-col>
  </row>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  name: 'fans',
  data () {
    return {
      fanslist: []
    }
  },
  created: function () {},
  methods: {
    ...mapActions(['reqFans'])
  },
  mounted () {
    this.reqFans().then(() => {
      this.fanslist = this.$store.state.fans.fansdata
    })
  },
  computed: {
    // ...mapGetters(["fansdata"]),
    // fanslist :function(){
    //   return this.$store.state.fans.fansdata;
    // }
  },
  watch: {}
}
</script>
<style lang="less">
@import "./fans.less";
</style>
