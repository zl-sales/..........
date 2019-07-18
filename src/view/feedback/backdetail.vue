<template>
  <div class="bg">
    <div class="createDate">{{detail.creationDate}}</div>
    <div class="clearfloat">
      <div class="avatarright">
        <img src="https://zixunapp.oss-cn-qingdao.aliyuncs.com/images/timg.jpeg" />
      </div>
      <div class="tooltipright">
        <div class="cont">{{detail.text}}</div>
        <div id="triangle-right"></div>
      </div>
    </div>

    <div v-if="detail.replyDate">
      <div class="createDate">{{detail.replyDate}}</div>
      <div class="clearfloat">
        <div class="avatarleft">
          <img src="@/assets/images/icon.png" />
        </div>
        <div class="tooltipleft">
          <div class="cont">
            <p>{{detail.replyText}}</p>
          </div>
          <div id="triangle-left"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getfeedbackDetail } from "@/api/feedback";

export default {
  name: "backdetail",
  created() {
    var id = this.$route.params.id;
    var token = this.$route.params.token;
    getfeedbackDetail({ guestbookId: id, token: token }).then(res => {
      const { data } = res.data;
      this.detail = data;
      console.log(data);
    });
  },
  props: ["id"],
  data() {
    return {
      detail: {}
    };
  }
};
</script>

<style scoped>
@import "./backdetail.css";
</style>
