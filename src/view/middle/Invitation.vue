<template>
  <div class="yaoqing">
    <template v-if="ios">
      <div class="title">
        <p class="line"></p>
        <span>邀请好友瓜分千万奖励金</span>
      </div>
      <div class="boxs">
        <div class="box">
          <img src="../../assets/images/Base map icon.png" alt />
          <div class="content">
            <div class="txt">
              首次
              <br />邀请好友
            </div>
            <div class="cny">
              奖励
              <span class="money">3</span>元
            </div>
          </div>
        </div>
        <div class="box">
          <img src="../../assets/images/Base map icon.png" alt />
          <div class="content">
            <div class="txt">
              邀请2~50位
              <br />好友
            </div>
            <div class="cny">
              每位奖励
              <span class="money">1</span>元
            </div>
          </div>
        </div>
        <div class="box">
          <img src="../../assets/images/Base map icon.png" alt />
          <div class="content">
            <div class="txt">
              邀请51~9999
              <br />位好友
            </div>
            <div class="cny">
              每位奖励
              <span class="money">2</span>元
            </div>
          </div>
        </div>
      </div>
    </template>
    <div class="title">
      <p class="line"></p>
      <span>规则说明</span>
    </div>
    <div class="list">
      <ul>
        <li>1、分享给好友，让好友通过您的分享链接下载注册，邀请成功立得三元奖励。</li>
        <li>2、好友成功下载App并成功登录后，直接获得1元奖励，秒提现。</li>
        <li>3、邀请2至50位好友，没邀请成功1人奖励1元，邀请51至9999位好友，每成功邀请一人奖励2元。</li>
        <li>4、邀请好友无上限，邀请越多奖励越多</li>
        <li>5、每个新用户只能被邀请一次，同一个设备或同一个提现账户都视为同一用户。注意：新用户10天内才能填写邀请码。</li>
        <li>6、被邀请好友提现成功后，视为有效好友，奖励发放</li>
        <li>7、为了控制风险，如果用户存在刷机、其他平台和网站发布任务盗取奖励金等行为，获取的金额可能被清零，严重者会被“封号”。</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    var _this = this
    $(function() {
      var u = navigator.userAgent,
        app = navigator.appVersion;
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //g
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
        _this.ios = true
      }
      if (isIOS) {
        _this.ios = false
      }
    });
  },
  data() {
    return {
      ios: true
    };
  }
};
</script>

<style scoped>
@import "./Invitation.css";
</style>
