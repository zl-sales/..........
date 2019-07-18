<template>
  <div class="feedback">
    <template v-if="feedbackList !== []">
      <div v-for="(item,i) in feedbackList" :key="i" @click="link(item.guestbookId)" >
        <el-card :class="{isRead:item.read}">
          <div class="cri" v-if="item.isRead !== 1"></div>
          <div class="text">{{item.text}}</div>
          <div>
            <span v-if="item.isReply == 0">未反馈</span>
            <span v-else>已反馈</span>
            <span class="feeddate">{{item.creationDate | times}}</span>
          </div>
        </el-card>
      </div>
    </template>
    <div class="tips" v-else>暂无反馈</div>
  </div>
</template>

<script>
import { getfeedbackList } from "@/api/feedback";
import backdetailVue from "./backdetail.vue";
export default {
  created() {
    var token = this.$route.params.token;
    getfeedbackList({ pageNo: 1, pageSize: 100, token: token }).then(res => {
      let { data } = res.data;
      this.feedbackList = data.list;
      this.feedbackList.forEach(item => {
        if (item.isRead !== 1) {
          item.read = false;
        } else {
          item.read = true;
        }
      });
      console.log(this.feedbackList)
    });
  },
  name: "feedbackList",
  data() {
    return {
      feedbackList: []
    };
  },
  methods: {
    link(id) {
      var token = this.$route.params.token;
      this.$router.push({
        name: "backdetail",
        params: {
          token: token,
          id: id
        }
      });
    }
  }
};
</script>

<style scoped>
@import "./feedbackList.css";
</style>
