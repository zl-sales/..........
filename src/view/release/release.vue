<template>
  <Row>
    <i-col span="24">
      <Tabs :animated="false">
        <TabPane label="图文">
          <ReleaseArticle/>
        </TabPane>
        <TabPane label="视频">
          <ReleaseVideoCompiled/>
        </TabPane>
      </Tabs>
    </i-col>
  </Row>
</template>
<script>
import ReleaseArticle from "./component/release-article.vue";
import ReleaseVideo from "./component/release-video.vue";
import ReleaseVideoCompiled from "./component/release-video-compiled.vue";
import { KeyInfo } from "@/api/ossInfo";

import "@/assets/crypto1/crypto/crypto.js";
import "@/assets/crypto1/hmac/hmac.js";
import "@/assets/crypto1/sha1/sha1.js";
const Base64 = require("base-64");

export default {
  destroyed(){
    this.$router.go(0)
  },
  created() {
    // 缓存ossinfo
    KeyInfo().then(res => {
      var data = res.data.data;
      var policyText = {
        expiration: data.expiration,
        conditions: [
          ["content-length-range", 0, 1048576000]
        ]
      };
      // this.config.imageUploadToS3.params.stsToken = data.securitytoken;
      let policy = Base64.encode(JSON.stringify(policyText));

      let bytes = Crypto.HMAC(Crypto.SHA1, policy, data.accessKeySecret, {
        asBytes: true
      });

      let Signature = Crypto.util.bytesToBase64(bytes);

      data.Signature = Signature;
      data.policy = policy;
      window.sessionStorage.setItem("Uploads", JSON.stringify(data));
      console.log(data)
    });


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
  },
  name: "release",
  components: {
    ReleaseArticle,
    ReleaseVideo,
    ReleaseVideoCompiled,
  },
  props: ["id"],
  methods: {}
};
</script>
<style lang="less">
@import "./release.less";
</style>;
