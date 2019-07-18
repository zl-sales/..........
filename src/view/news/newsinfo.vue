<template>
  <div id="main">
    <Card shadow dis-hover class="app-container" id="news_article">
      <a slot="title" type="primary" href="/home">< 返回</a>
      <article class="article">
        <div class="article-block" style>
          <div class="article__header">
            <h1 class="article__title">{{ article.title }}</h1>
          </div>
          <div class="article__content" id="article_content">
            <div>
              <div v-html="article.content"></div>
              <div class v-for="(video, i) in article.videos" :key="`video-${i}`">
                <p class="t">
                  <video
                    class="v"
                    style="width:100%;"

                    autoplay
                    controls="controls"
                    tabindex="2"
                    mediatype="video"
                    :src="video.url"
                  ></video>
                </p>
              </div>

              <div class v-for="(image, i) in article.images" :key="`image-${i}`">
                <p>
                  <img :src="image.url" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Card>
  </div>
</template>

<style lang="less">
@import "./newsinfo.less";
</style>

<script>
import { getNewsDetail } from "@/api/article.js";

import { mapActions, mapGetters, mapState } from "vuex";
export default {
  name: "share-article",
  data() {
    return {
      article: []
    };
  },
  methods: {},
  mounted() {
    let infoId = this.$route.params.id;
    // var shareCode = '1234567890';
    getNewsDetail({ infoId })
      .then(res => {
        this.article = res.data.data;

        // 一下类型内容为纯文本
        if (
          this.article.type == 10 ||
          this.article.type == 9 ||
          this.article.type == 8 ||
          this.article.type == 6
        ) {
          this.article.content = "<p>" + this.article.content + "</p>";
          this.article.title = "";
        }

        // 如果内容中包含图片，则不显示图片列表
        var content = this.article.content;
        var m_img = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
        var rs_img = content.match(m_img);
        if (rs_img.length) {
          this.article.images = [];
        }
        resolve();
      })
      .catch(err => {
        // reject(err)
      });
  },
  computed: {},
  watch: {}
};
</script>
