<template>
  <div class="g-grid-row m-nameandbriefedititem module module_name">
    <div class="g-grid-row">
      <div class="m-avataruploader m-nameandbriefedititem__avatar">
        <div class="m-avataruploader__imagewrapper">
          <img class="imagewrapper__image-url" :src="portrait"></div>
      </div>
      <div class="m-nameandbriefedititem__info"><span class="item__label item__label-name">荒料</span>
        <span class="item__label item__label-brief">关注电影，每天为大家提供最新的精彩预告片，精彩影片剪辑。</span>
      </div>
    </div>
    <button type="button" class="tui2-btn tui2-btn-size-default tui2-btn-default item__btn" @click="modifyPersonal">
        <span class="tui2-btn-content">修改信息</span>
    </button>
  </div>
</template>
<script>
import portrait from '@/assets/images/icon.png'
export default {
  name: 'accountInfo',
  data () {
    return {
      portrait
    }
  },
  methods: {
    modifyPersonal: function () {
      this.$emit('modifyPersonal', true)
    }
  }
}
</script>
