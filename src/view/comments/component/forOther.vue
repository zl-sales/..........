<template>
  <div>
    <Card shadow dis-hover :bordered="false" class="comments">
      <row>
        <i-col class="comments-avatar">
          <Avatar icon="ios-person" size="large" />
          <label class="label">青鸟号作者</label>
        </i-col>
      </row>
      <row>
        <i-col>
          <p class="comments-text"> "2018年8月28日 -
            iViewadmin是基于Vue.js,搭配使用iViewUI组件库形成的一套后台集成解决方案简介iViewadmin是基于Vue.js,搭配使用iViewUI组件库形成的一套后台集成解..."</p>
        </i-col>
      </row>
      <row>
        <Card class="card" dis-hover>
          <row>
            <i-col :xs={span:4}>
              <div class="card-wrapper">
                <a class="card-img">还没有设置配图哦</a>
              </div>

            </i-col>
            <i-col :xs={span:20}>
              <p class="comments-text"><a>@李先生说：</a>7岁女孩替妈妈写假条看哭网友 公司准假5天发1000元旅游费</p>
              <div class="comments-text count card-count">
                <span>赞&nbsp;{{333}}</span>
                <span>阅读&nbsp;{{333}}</span>
                <span>评论&nbsp;{{333}}</span>
              </div>
            </i-col>
          </row>
        </Card>
      </row>
      <row class="margin-top-10">
        <i-col :xs={span:20}>
          <div class="count card-count">
            <span>赞&nbsp;{{333}}</span>
            <span>评论&nbsp;{{333}}</span>
            <span>2019-01-04 12:12</span>
          </div>
        </i-col>
        <i-col :xs={span:4}>
          <div class="del-btn" @click="delmodal = true">
            <Icon type="ios-trash-outline" /><span>删除</span>
          </div>
          <Modal v-model="delmodal" title="" @on-ok="ok" @on-cancel="cancel">
            <p slot="header">
              <span>删除确认</span>
            </p>
            <div style="text-align:center">
              <p>删除后讲无法恢复此评论，确认删除此评论？</p>
            </div>
            <div slot="footer center">
              <Button>取消</Button>
              <Button type="primary">确认</Button>
            </div>
          </Modal>
        </i-col>
      </row>
      <Divider />
    </Card>
    <div class="page">
      <page :total="100" prev-text="上一页" next-text="下一页" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'for-other',
  data () {
    return {
      delmodal: false
    }
  },
  methods: {
    ok () {
      this.$Message.info('Clicked ok')
    },
    cancel () {
      this.$Message.info('Clicked cancel')
    }
  }
}
</script>
<style scoped>
.comments .comments-avatar {
  padding: 0 5px;
}

.comments .comments-text {
  padding: 0 5px;
  margin-top: 10px;
}

.comments .card {
  flex: auto;
  background: #f5f7f9;
  width: 100%;
  font-weight: 100;
}

.comments .card-wrapper {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
}

.comments .card-img {
  margin-right: 40px;
  width: 154px;
  height: 100px;
  vertical-align: top;
  position: relative;
  overflow: hidden;
  background: url(data:image/png;base64,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);
  background-size: 45px;
  background-color: #eee;
  font-size: 12px;
  color: #ddd;
  text-align: center;
  line-height: 159px;
}

.comments .card-img img {
  width: 100%;
  height: 100%;
}

.comments .count {
  color: #666;
  font-size: 14px;
  margin-top: 4px;
}

.comments .count span {
  margin-right: 10px;
}

.comments .del-btn {
  text-align: right;
}

.comments .card-count {
  color: #666;
  font-size: 14px;
  margin-top: 4px;
}

.comments .card-count span:not(:first-child):before {
  content: "\FF65";
  margin: 0 8px;
  font-size: 20px;
  line-height: 0;
  position: relative;
  top: 2px;
}
</style>
