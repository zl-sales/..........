<template>
  <div class="pgc-home">
    <!-- <HomeContentHeader/> -->
    <HomeContent/>
  </div>
</template>
<script>
// home-content-header
import HomeContentHeader from "./component/home-content-header.vue";
import HomeContent from "./component/home-content.vue";
import { KeyInfo } from "@/api/ossInfo";

import "@/assets/crypto1/crypto/crypto.js";
import "@/assets/crypto1/hmac/hmac.js";
import "@/assets/crypto1/sha1/sha1.js";
const Base64 = require("base-64");

export default {
  name: "home",
  components: {
    HomeContentHeader,
    HomeContent
  },
  beforeCreate() {
    KeyInfo().then(res => {
      var { data } = res.data;
      console.log(data);
      var policyText = {
        expiration: data.expiration,
        conditions: [["content-length-range", 0, 1048576000]]
      };
      // this.config.imageUploadToS3.params.stsToken = data.securitytoken;
      let policy = Base64.encode(JSON.stringify(policyText));

      let bytes = Crypto.HMAC(Crypto.SHA1, policy, data.accessKeySecret, {
        asBytes: true
      });

      let Signature = Crypto.util.bytesToBase64(bytes);

      data.Signature = Signature;
      data.policy = policy;
      console.log(123);
      window.sessionStorage.setItem("Uploads", JSON.stringify(data));
      console.log(data);
    });
  },
  created() {
    // 在页面加载时读取sessionStorage里的状态信息
    if (localStorage.getItem("UserInfo")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(localStorage.getItem("UserInfo"))
        )
      );
    }
  }
};
</script>
<style lang="less">
@import "./home.less";
</style>
