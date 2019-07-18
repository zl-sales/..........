<template>
  <div class="upload">
    <Upload action="//jsonplaceholder.typicode.com/posts/">
      <button type="button" class="tui2-btn tui2-btn-size-default tui2-btn-primary upload-button">
        <span class="tui2-btn-content">上传视频</span>
      </button>
    </Upload>
  </div>
</template>
<script>
export default {
  name: 'release-video'
}
</script>
<style lang="less">
    @import "./release-video.less";
</style>
