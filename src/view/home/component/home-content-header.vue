<template>
  <Row class="home-top-container">
    <i-col span="18" class="pgc-dashboard-new">
      <div class="pgc-dashboard-column">
        <a class="pgc-dashboard-wrapper" href="/profile_v3/index/audience-analysis/overview">
          <span class="pgc-dashboard-primary">249</span>
        </a>
        <div class="pgc-dashboard-secondary">
          <div class="pgc-dashboard-column-name">
            <div>粉丝数
              <div class="pgc-hover-popup"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="pgc-dashboard-column">
        <a class="pgc-dashboard-wrapper" href="/profile_v3/index/content-analysis/overview">
          <span class="pgc-dashboard-primary">106,388</span>
        </a>
        <div class="pgc-dashboard-secondary">
          <div class="pgc-dashboard-column-name">累计阅读量</div>
        </div>
      </div>
      <div class="pgc-dashboard-column">
        <a class="pgc-dashboard-wrapper" href="/profile_v3/index/checkout-center">
          <span class="pgc-dashboard-primary">25.11</span>
        </a>
        <div class="pgc-dashboard-secondary">
          <div class="pgc-dashboard-column-name">累计收入</div>
        </div>
      </div>
    </i-col>
    <i-col span="6" class="pgc-notice-card">
      <div class="pgc-notice-card-header">
        <span>公告</span>
        <router-link to="/announcement/announcement">
          <a class="home-go-more">更多</a>
        </router-link>
      </div>
      <div class="pgc-notice-card-body">
        <div class="tui2-carousel tui2-carousel-autoplay">
          <div class="tui2-carousel-wrapper">
            <div class="slick-slider slick-initialized" dir="ltr">
              <div class="slick-list">
                <div class="slick-track">
                  <div data-index="1" class="slick-slide" tabindex="-1" aria-hidden="true">
                    <div>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.toutiao.com/i6643970490731856388/"
                        class="pgc-notice-card-item"
                        tabindex="-1"
                        style="width: 100%; display: inline-block;"
                      >
                        <span class="pgc-notice-card-title">头条号平台打击滥用声明原创功能行为的公告（11-12月）</span>
                        <span class="pgc-notice-card-date">2019-01-08</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button class="carousel-prev">
              <i prefix="tui-iconfont" class="tui-iconfont tui-iconfont-topback"></i>
            </button>
            <button class="carousel-next">
              <i prefix="tui-iconfont" class="tui-iconfont tui-iconfont-topback"></i>
            </button>
          </div>
        </div>
      </div>
    </i-col>
  </Row>
</template>
<script>
export default {
  name: 'home-content-header'
}
</script>
<style lang="less">
@import "./home-content-header.less";
</style>
