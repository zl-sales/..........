<template>
      <div class="garr-container">
        <Row>
          <i-col span="24">
            <Tabs :animated="false" >
              <TabPane label="图文"><ContentArticle/></TabPane>
              <!-- <TabPane label="视频" ><ContentVideo/></TabPane> -->
            </Tabs>
          </i-col>
        </Row>
      </div>
</template>
<script>
import ContentArticle from './component/content-article.vue'
import ContentVideo from './component/content-video.vue'
export default {
  name: 'content-manage',
  components: {
    ContentArticle,
    ContentVideo
  }
}
</script>
<style lang="less">
    @import "./content.less";
</style>
