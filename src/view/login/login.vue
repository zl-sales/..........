<template>
  <div class="login">
    <!-- tina login logo  -->
    <Row :gutter="20">
      <i-col :xs="{ span: 5, offset:5 }">
        <a href="/">
          <img class="logo-wrap" :src="loginlogo" />
        </a>
      </i-col>
    </Row>

    <Row :gutter="20">
      <!-- tina login round-->
      <i-col :xs="{ span: 5, offset:2 }">
        <a href="#">
          <img class="round-wrap" :src="logoround" width="450px" />
        </a>
      </i-col>
      <!-- tina login -->
      <div class="login-con">
        <Card icon="log-in" :bordered="false">
          <div class="form-con">
            <!-- tina LoginForm组件 -->
            <login-form @on-success-valid="handleSubmit"></login-form>
            <!-- <Divider class="login-tip">第三方平台登录</Divider>
            <div class="wechat-div">
              <img :src="wechat" @click="wechatCode">
            </div>-->
          </div>
        </Card>
      </div>
    </Row>
  </div>
</template>

<script>
import LoginForm from "_c/login-form";
import loginlogo from "@/assets/images/fnlogo.png";
import logoround from "@/assets/images/logo-round.png";
import wechat from "@/assets/images/login-vx.png";
import { getWechatCode } from "@/api/wechat"; // 方法
// import Router from "@/router/router";

import { mapActions } from "vuex";
import { isError } from "util";

export default {
  created() {
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
      this.$message.warning(
        "检测到您浏览器版本过低，为了更好的体验，建议您更换Google浏览器或升级到最新版本"
      );
    } else {
      return;
    }
  },
  components: {
    LoginForm
  },
  data() {
    return {
      loginlogo,
      logoround,
      wechat
    };
  },
  mounted() {},
  methods: {
    wechatCode() {
      //  const shorturl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe0482afbe5ecf424&redirect_uri=http://5000.gr02e21d.ld2owfz8.b728a2.grapps.cn/api/v1/web/user/WeiXinTest&response_type=code&scope=snsapi_userinfo&state=35d1face5995478f88d7dbeabccfb24c#wechat_redirect"
      getWechatCode()
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log("微信请求失败" + err);
        });
    },

    ...mapActions(["handleLogin", "getUserInfo"]),
    handleSubmit({ phone, password }) {
      this.handleLogin({
        phone,
        password
      }).then(res => {
        // 获取用户相关信息
        this.getUserInfo().then(res => {
          this.$router.push({
            name: this.$config.homeName
          });
        });
      });
    }
  }
};
</script>
<style lang="less">
@import "./login.less";

body {
  overflow: hidden;
}
</style>
