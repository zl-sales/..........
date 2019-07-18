<template>
  <Row>
    <i-col span="24">
      <Card shadow dis-hover :bordered="false">
        <p slot="title">公告</p>
        <Row>
          <i-col :xs="{ span: 24}" v-for="(infor, i) in announcementData" :key="`infor-${i}`">

            <div class="pgc-notice-item">
              <a target="_blank"  rel="noopener noreferrer">
                {{infor.msg}} <span>{{infor.new}}</span>
              </a>
              <span class="create-time">{{infor.time}}</span></div>

          </i-col>
        </Row>
        <div class="page">
          <page :total="100"  prev-text="上一页" next-text="下一页" />
        </div>
      </Card>

    </i-col>
  </Row>
</template>
<script>
export default {
  name: 'announcement',
  data () {
    return {
      announcementData: [{
        msg: '关于青鸟号后台改版的公告',
        time: '2018-01-10 13:14',
        new: 'new'
      }, {
        msg: '青鸟号平台打击滥用声明原创功能行为的公告（12-1月）new',
        time: '2018-01-11 14:41',
        new: 'new'
      }, {
        msg: '关于「图文赞赏功能」优化的公告',
        time: '2018-01-12 15:51',
        new: 'new'
      }, {
        msg: '关于青鸟号平台视频分成策略调整的公告',
        time: '2018-01-13 16:14'
      }, {
        msg: '青鸟号平台持续打击违规帐号的公告｜2019年1月11日new',
        time: '2018-01-14 17:44'
      }, {
        msg: '国庆期间青云计划奖励发布安排',
        time: '2018-01-15 18:59'
      }]
    }
  }
}
</script>
<style lang="less">
    @import "./announcement.less";
</style>
