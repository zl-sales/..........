<template>
  <div>
    <Card shadow class="margin-top-20">
      <Row>
        <div class="articles garr-container-white gray-wrap">
          <a name="article-list"></a>
          <div id="article-list" class="article-list common-container-wrapper">
            <div class="article-card">
              <div class="article-card-wrap">
                <div class="article-card-bone">
                  <div class="title-wrap">
                    <div class="master-title"><a href="http://mp.toutiao.com/preview_article/?pgc_id=6646334156965937668"
                        target="_blank" rel="noopener noreferrer">确认重新提交表单</a></div>
                  </div>
                  <ul class="count "></ul>
                  <div class="abstruct">
                    <ul class="count ">
                      <li>点赞 6654</li>
                      <li>阅读 105</li>
                      <li>评论 0</li>
                    </ul>
                  </div>
                  <div><span class="label create-time">2019-01-14 20:50</span></div>
                </div>
              </div>
              <ul class="count article-action-list actions" style="top: 45px;">
                <li><span class="icon-text undefined">
                    <Icon type="ios-trash-outline" /><span>删除</span></span></li>
              </ul>
            </div>
          </div>
          <div id="article-list" class="article-list common-container-wrapper">
            <div class="article-card">
              <div class="article-card-wrap has-image">
                <a class="image" href="http://toutiao.com/item/6501087197108634126/" target="_blank" rel="noopener noreferrer">
                  <img src="https://p.pstatp.com/list/190x124/4e7d0002bfae8a23019e" role="presentation" />
                </a>
                <div class="article-card-bone">
                  <div class="title-wrap">
                    <div class="master-title">
                      <a href="http://toutiao.com/item/6501087197108634126/" target="_blank" rel="noopener noreferrer">「前端」Bootstrap
                        网页模版 detail Admin</a>
                    </div>
                  </div>
                  <ul class="count ">
                    <li>点赞 6654</li>
                    <li>阅读 105</li>
                    <li>评论 0</li>
                  </ul>
                  <div class="abstruct hidden">
                    <span class="article-status-label orange">已发表</span>
                    <span class="article-status-label blue">已投头条广告</span>
                  </div>
                  <div>
                    <span class="label create-time">2017-12-19 10:58</span>
                  </div>
                </div>
              </div>
              <div class="article-action-list middle-50">
                <div class="pgc-hover-popup more">
                  <Icon type="ios-trash-outline" /><span>删除</span>
                </div>
              </div>
            </div>
          </div>
          <div class="page">
            <page :total="100" />
          </div>
        </div>
      </Row>
    </Card>
  </div>
</template>
<script>
export default {
  name: 'content-video'
}
</script>
<style lang="less">
@import "./content-video.less";
</style>
