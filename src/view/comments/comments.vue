<template>
  <div>

    <row>
      <i-col>
        <Tabs :animated="false">
          <TabPane label="图文评论">
            <ArticleComments/>
          </TabPane>
          <TabPane label="视频评论">

          </TabPane>
        </Tabs>

      </i-col>
    </row>
  </div>
</template>
<script>
import ArticleComments from './component/article-comments.vue'
export default {
  name: 'comments',
  components: {
    ArticleComments
  }
}
</script>
<style lang="less">
    @import "./comments.less";
</style>
