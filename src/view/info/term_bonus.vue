<template>
  <div>
    <div class="header">
      <div class="con-title">
        <img
          src="../../assets/images/website.png"
          alt="网站"
        >
        <div></div>
      </div>
      <div class="rule-list">
        <div class="rule">
          <h6>青鸟号作品评选规则</h6>
          <div class="rule-border"></div>
        </div>
        <div class="rule-con">
          <p>1、内容必须为家乡本地题材，可以是您身边发生的趣事，您身边的名人故事，也可以是本地的重大新闻、热点事件，也可以是本地广为流传的经商创业、孝顺父母等典型人物和事迹等。有详细地点和时间的真实故事，是重要的加分选项。</p>

          <p>2、内容可以完全原创，也可以是个人整理的，但必须通过查重，而且完全原创是重要加分项。</p>

          <p>3、文章类内容字数应不少于900字，个别优秀的可放宽条件。图片展示类内容图片应不少于6张。</p>

          <p>4、立场中立，观点客观，不偏激不臆测。</p>

          <p>5、标题党、正文错别字多、营销软文、通稿类不予奖励。</p>

          <p>6、严禁反动、暴力、色情。</p>

          <p>7、本活动由北京智慧云媒科技有限公司提供，与苹果公司Apple.lnc无关系。</p>
        </div>
      </div>
      <div class="con-box">
        <div class="rule">
          <h6>青鸟作品奖励规则</h6>
          <div class="rule-border"></div>
        </div>
        <div class="con-list">
          <div class="con-list-nan">1</div>
          <div class="con-list-con">本活动奖励对象为家乡题材的原创内容，主办方会根据评选规则择优进行奖励。</div>
        </div>
        <div class="con-list">
          <div class="con-list-nan">2</div>
          <div class="con-list-con">单日奖5～100篇，根据评优等级奖金5～500元不等，并获得平台的优先推送权。</div>
        </div>
        <div class="con-list">
          <div class="con-list-nan">3</div>
          <div class="con-list-con">根据浏览量提成，浏览量每增加万次奖励100元，上不封顶。</div>
        </div>
        <div class="con-list">
          <div class="con-list-nan">4</div>
          <div class="con-list-con">
            每个自然月平台会综合评优等级和浏览量，遴选出5～10篇，直接奖励500～1000元。</div>
        </div>
        <div class="con-list">
          <div class="con-list-nan">5</div>
          <div class="con-list-con">单日奖评选根据文章的发布时间评选，起止时间是前一天18：00到当天18：00。获奖结果于次日10：00由平台在系统中公布。</div>
        </div>
        <div class="con-list">
          <div class="con-list-nan">6</div>
          <div class="con-list-con">

            月度奖励起止时间按照自然月进行，获奖结果于次月1日下午14：00由平台在系统中公布。</div>
        </div>
        <div class="con-list">
          <div class="con-list-nan">7</div>
          <div class="con-list-con">

            评选结果公布后，作者即可申请奖励金提现，提现实时到账。</div>
        </div>
        <div class="con-list">
          <div class="con-list-nan">8</div>
          <div class="con-list-con">如获奖内容存在抄袭、洗稿等违规嫌疑，经核实后平台有权撤回、追缴奖励。欢迎广大用户共同监督、举报。</div>
        </div>
        <div class="con-list">
          <div class="con-list-nan">9</div>
          <div class="con-list-con">本活动最终解释权归青鸟快讯所有。<br>
            咨询电话：18940901781</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
.con-box {
  padding-bottom: 50px;
}
.header {
  background: #fff;
}
.con-title {
  width: 100%;
  background-image: url("../../assets/images/title-bg.png");
  background-size: 100% 100%;
  height: 200px;
}
.con-title img {
  display: block;
  margin: 0 auto;
  width: 65%;
  padding-top: 10%;
}
.con-list {
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  margin-top: 20px;
}
.con-list-nan {
  background: url("../../assets/images/entry-bg.png");
  height: 26px;
  width: 40px;
  background-size: 100% 100%;
  display: block;
  text-align: center;
  color: #ffffff;
  font-size: 17px;
  line-height: 26px;
  flex: 1;
}
.con-list-con {
  padding-left: 10px;
  font-size: 15px;
  font-weight: 400;
  flex: 12;
}
.rule-list {
  padding: 20px;
  margin-top: 0px;
}
.rule h6 {
  text-align: center;
  font-size: 18px;
  font-weight: 700;
}
.rule-border {
  height: 4px;
  width: 70px;
  background: #f16736;
  margin: 0 auto;
  margin: 0 auto 20px;
}
.rule-con {
  padding: 5px 20px;
  background: #f7f7f7;
  border-radius: 10px;
  margin-bottom: 50px;
}
.rule-con p {
  font-size: 15px;
  color: #333333;
  margin: 10px auto;
  line-height: 25px;
  font-weight: 400;
}
</style>
