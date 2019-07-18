 <template>
  <Row>
    <i-col span="24">
      <Card shadow dis-hover :bordered="false">
        <p slot="title">消息通知</p>
        <Row class="message-info">
          <i-col :xs="{ span: 24}" v-for="(infor, i) in messageList" :key="`infor-${i}`">
            <div class="message-wrapper">
              <div class="sys-notice-cell">
                <div class="sys-notice-bar">
                  <div class="sys-content">
                    <div class="sys-notice-sysicon">
                      <Avatar icon="md-mail" size="large"/>
                    </div>
                    <span class="sys-notice-msg">
                      <span>{{infor.title}}</span>
                    </span>
                    <span class="sys-notice-msg margin-top-10">
                      <span>{{infor.time}}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </i-col>
        </Row>
        <div class="page">
          <page :total="100" prev-text="上一页" next-text="下一页"/>
        </div>
      </Card>
    </i-col>
  </Row>
</template>
<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  name: 'notice',
  data () {
    return {
      messageList: []
    }
  },
  created: function () {},
  methods: {
    ...mapActions(['reqNotice'])
  },
  mounted () {
    this.reqNotice().then(() => { // 向后台发送请求的拿到数据以后做一些
      this.messageList = this.$store.state.notice.noticedata
    })
  },
  computed: {},
  watch: {}
}
</script>
<style lang="less">
@import "./notice.less";
</style>
