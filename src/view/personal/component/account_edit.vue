<template>
<div class="m-nameandbriefedititem module module_name">
  <div class="m-avataruploader m-nameandbriefedititem__avatar">
    <div class="m-avataruploader__imagewrapper active"><img class="imagewrapper__image-url" src="http://p2.pstatp.com/large/4376000311ce96d8b3d1">
      <div class="imagewrapper__image-op">
        <div class=" upload-handler"><input type="file" accept="image/*"></div>
      </div>
    </div>
  </div>
  <div class="m-nameandbriefedititem__info">
    <div class="m-nameandbriefedititem">
    <div class="item__inputwrapper">
      <span class="tui2-input-wrapper">
        <input class="tui2-input" id="" type="text" value="荒料">
      </span>
      <span class="inputwrapper__len">4/20</span>
    </div>
    <span class="item__tip">2-10个汉字，请勿使用包含特殊符号或含有明显营销推广意图的媒体名</span>
    <div class="item__inputwrapper item__inputwrapper-brief">
      <span class="tui2-input-wrapper">
        <textarea type="textarea" class="tui2-input textarea" id="">关注电影，每天为大家提供最新的精彩预告片，精彩影片剪辑。</textarea>
      </span>
      <span class="inputwrapper__len">28/30</span>
    </div>
    <p class="item__tip"> 0-30个汉字，良好的简介内容更容易收获用户的关注。</p>
    <div class="item__btnwrapper">
      <button type="button" class="tui2-btn tui2-btn-size-default tui2-btn-primary item__btn item__btn_save">
        <span class="tui2-btn-content">保存</span>
      </button>
      <button type="button" class="tui2-btn tui2-btn-size-default tui2-btn-default item__btn">
        <span class="tui2-btn-content" @click="cancelModifyPersonal">取消</span>
      </button>
    </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: 'accountEdit',
  data () {
    return {
      phone: '',
      desc: ''
    }
  },
  methods: {
    cancelModifyPersonal: function () {
      this.$emit('cancelModifyPersonal', true)
    }
  }
}
</script>
