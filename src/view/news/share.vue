<template>
  <div id="main">
    <!-- <div class="topicdetail" v-wechat-title="meta.title" img-set="meta.cover"></div> -->
    <div class="app-container" id="news_article">
      <div class="weixin-share-portal"></div>
      <div class="top-banner-container">
        <div>
          <img src="@/assets/images/fnlogo.png" class="logo" />
          <span class="slogan"></span>
          <div class="open">
            <a style="color:#fff;" v-on:click="open_or_download_app">打开</a>
          </div>
        </div>
      </div>

      <article class="article" v-if="article">
        <div ref="articleblock" class="article-block" style="height1: 748px;">
          <div class="article__header">
            <h1 class="article__title">{{ article.title }}</h1>
            <div class="article__author" v-if="article.user && article.user.id>1">
              <span class="avatar">
                <img
                  v-if="article.user"
                  :src="article.user.header"
                  class="avatar__image"
                  style="transition: opacity 200ms ease 0s; opacity: 1;"
                />
                <span class="avatar__mask"></span>
              </span>
              <span class="author-name" v-if="article.user">{{ article.user.userName }}</span>
              <span class="article-info">
                <span class="new-style-test-article-publish-time" style="display:none;">1天前</span>
                <span class="dot" style="display:none;"></span>
                <span class="new-style-test-article-comment" v-if="article">{{ article.comment }}评论</span>
              </span>
            </div>
          </div>
          <div class="article__content" id="article_content">
            <div v-html="article.content"></div>
            <div v-for="(video, i) in article.videos" :key="`video-${i}`">
              <xgplayer :options="config"></xgplayer>
            </div>

            <div class v-for="(image, i) in article.images" :key="`image-${i}`">
              <img :src="image.url" />
            </div>
          </div>
        </div>

        <div class="unfold-field unfold-field-download" style="display:none;">
          <div class="btn-wrapper">
            <div class="unflod-field__mask" @click="hideMask"></div>
            <a
              href="javascript:void(0)"
              class="download-text"
              v-on:click="open_or_download_app"
            >打开APP阅读全文</a>
          </div>
        </div>
      </article>

      <article v-else style="font-size:15px;">
        <div style="text-align:center;margin-top:50px;">文章不存在，请打开App，查看更多家乡资讯。</div>
      </article>
      <!-- 评论 -->
      <div class="cmt" v-show="showcmt">
        <div class="title">
          <p class="line"></p>
          <span>用户评论</span>
        </div>
        <div class="cmtlist" v-if="list.length !== 0">
          <div class="cmtbox" v-for="(item,i) in list" :key="i">
            <div class="cmtuser">
              <div class="useravatar" @click="open_or_download_app">
                <img :src="item.user.header" class="avatar" />
              </div>
              <div class="cmtcontent">
                <div class="username">{{item.user.name}}</div>
                <div class="good" @click="open_or_download_app">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-31dianzan" />
                  </svg>
                  <!-- <Icon type="md-thumbs-up" /> -->
                  {{item.likeCount}}
                </div>
                <div class="cmtcon">{{item.content}}</div>
                <!-- <div class="huifu" @click="open_or_download_app">
                  12回复
                  <Icon type="ios-arrow-forward" />
                </div>-->
              </div>
            </div>
          </div>
          <div class="large" @click="open_or_download_app">
            查看全部评论
            <Icon type="ios-arrow-forward" />
          </div>
        </div>
        <div id="tips" v-else>暂无相关评论</div>
      </div>
      <!-- 推荐 -->
      <!-- <div class="recommend">
        <div class="title">
          <p class="line"></p>
          <span>热门推荐</span>
        </div>
        <div class="recommendlist" @click="open_or_download_app">
          <template>
            <div class="recommendbox">
              <div class="box_title">
                全世界最大烂尾工程迪拜“世界岛”
                <div class="box_time">打开APP查看家乡最新资讯</div>
              </div>
              <div class="box_cover">
                <img src="../../../../20181104105054_uZC5C.jpeg" />
              </div>
            </div>
            <div class="recommendbox3" @click="open_or_download_app">
              <div class="box_title3">行人撞上停放在车位上的汽车后死亡，车主是否承担责任？</div>
              <div class="box_cover3">
                <img src="../../../../20181104105054_uZC5C.jpeg" />
                <img src="../../../../20181104105054_uZC5C.jpeg" />
                <img src="../../../../20181104105054_uZC5C.jpeg" />
              </div>
              <div class="box_time3">打开APP查看家乡最新资讯</div>
            </div>
          </template>
        </div>
      </div>-->

      <div class="bottom-banner-container show-banner-undefined">
        <div class="slogan-wrapper">
          <img src="@/assets/images/fnlogo.png" class="logo" />
        </div>
        <div class="open">
          <a style="color:#fff;" v-on:click="open_or_download_app">打开</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
@import "./share.less";
</style>

<script>
  require('./iconfont.js')

import config from "@/config";

import wx from "weixin-js-sdk";

import { getShareNews, getWxConfig, getcomment } from "@/api/article.js";

import { mapActions, mapGetters, mapState } from "vuex";
const {
  downAppURl,
  downWeixin,
  iphoneSchema,
  iphoneDownUrl,
  androidSchema,
  androidDownUrl
} = config;

export default {
  created() {
    this.getcomment();
    getWxConfig({ url: location.href }).then(res => {
      const { data } = res.data;
      var timestamp = data.timestamp;
      var nonceStr = data.nonceStr;
      var signature = data.signature;
      var _this = this;
      wx.config({
        debug: false,
        appId: "wxdc1be2ff2684db96",
        timestamp: timestamp,
        nonceStr: nonceStr,
        signature: signature,
        jsApiList: [
          // 必填，需要使用的JS接口列表
          "updateAppMessageShareData",
          "updateTimelineShareData",
          // 微信新版1.4.0暂不支持安卓，故这里要两个接口一起调用下
          "onMenuShareAppMessage",
          "onMenuShareTimeline"
        ]
      });
    });
  },
  name: "share-article",
  data() {
    return {
      showcmt:false,
      article: [],
      meta: {
        title: "",
        cover: ""
      },
      list: [],
      config: {
        url: "",
        volume: 1,
        playsinline: true,
        width: "1200",
        height: "1400",
        fluid: true, // 流式布局
        videoInit: true, // 封面显示当前视频的第一帧
        preloadTime: 10,
        poster: ""
      }
    };
  },
  methods: {
    // 获取评论
    getcomment() {
      let shareCode = this.$route.params.id;
      getShareNews({ shareCode }).then(res => {
        console.log(res);
        if (res.data.code == 500) {
          this.$message.warning("您查看的资讯不存在");
          return false;
        }
        const { data } = res.data;
        getcomment({ infoId: data.id, pageNo: 1, pageSize: 3 }).then(scc => {
          console.log(scc.data.data.list);
          this.list = scc.data.data.list;
          console.log(this.list);
        });
        var imgUrl;
        if (data.images.length !== 0) {
          imgUrl = data.images[0].url;
        } else if (data.images.length !== 0) {
          imgUrl = data.videos[0].coverImage;
        } else if (data.images.length == 0 && data.videos.length == 0) {
          imgUrl = "https://zixunapp.oss-cn-qingdao.aliyuncs.com/logo.png";
        }
        wx.ready(function() {
          // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
          wx.onMenuShareTimeline({
            title: data.title, // 分享标题
            desc: data.synopsis,
            link: location.href, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function(res) {
              // 用户确认分享后执行的回调函数
              console.log("成功");
              consolo.log(res);
            },
            error: function(err) {
              // 用户取消分享后执行的回调函数
              console.log("失败");
              console.log(err);
            }
          });

          wx.onMenuShareAppMessage({
            title: data.title, // 分享标题
            desc: data.synopsis,
            link: location.href, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function(res) {
              // 用户确认分享后执行的回调函数
              console.log("成功" + res);
            },
            error: function(err) {
              // 用户取消分享后执行的回调函数
              console.log("失败" + err);
            }
          });
          wx.updateAppMessageShareData({
            title: data.title, // 分享标题
            desc: data.synopsis,
            link: location.href, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function(res) {
              // 用户确认分享后执行的回调函数
              console.log("成功" + res);
            },
            error: function(err) {
              // 用户取消分享后执行的回调函数
              console.log("失败" + err);
            }
          });
          wx.updateTimelineShareData({
            title: data.title, // 分享标题
            desc: data.synopsis,
            link: location.href, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function(res) {
              // 用户确认分享后执行的回调函数
              console.log("成功" + res);
            },
            error: function(err) {
              // 用户取消分享后执行的回调函数
              console.log("失败" + err);
            }
          });
        });
      });
    },
    hideMask() {
      $(".unfold-field").hide();
      $(".article-block").height("auto");
    },
    isWeixin: function() {
      // 判断是否是微信
      var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
      } else {
        return false;
      }
    },
    nl2br(str, is_xhtml) {
      var breakTag =
        is_xhtml || typeof is_xhtml === "undefined" ? "<br />" : "<br>";
      return (str + "").replace(
        /([^>\r\n]?)(\r\n|\n\r|\r|\n)/g,
        "$1" + breakTag + "$2"
      );
    },
    open_or_download_app() {
      var this_ = this;
      if (this.isWeixin()) {
        // 微信
        window.location = downWeixin;
      } else {
        // 非微信浏览器
        if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
          var loadDateTime = new Date();
          window.setTimeout(function() {
            var timeOutDateTime = new Date();
            if (loadDateTime && timeOutDateTime - loadDateTime < 1500 + 200) {
              window.location = iphoneDownUrl; // ios下载地址
            } else {
              window.close();
            }
          }, 2000); // 此处时间有待确定
          window.location = iphoneSchema;
        } else if (navigator.userAgent.match(/android/i)) {
          var loadDateTime = new Date();
          var ifrSrc = androidSchema;
          if (!ifrSrc) {
            return;
          }
          var ifr = document.createElement("iframe");
          ifr.src = ifrSrc;
          ifr.style.display = "none";
          document.body.appendChild(ifr);
          var TimeLoad = setTimeout(function() {
            document.body.removeChild(ifr);
            window.location = androidDownUrl; // android下载地址
          }, 2000);
          window.onblur = function() {
            clearTimeout(TimeLoad);
          };
        } else {
          // 非ios、非安卓
          window.location = downAppURl;
        }
      }
    }
  },
  mounted() {
    let shareCode = this.$route.params.id;
    getShareNews({ shareCode }).then(res => {
      if (res.data.code == 500) {
        return false;
      }
      console.log(window.location.href);
      const { data } = res.data;
      console.log(data);

      if (res.data.data == undefined) {
        this.article = null;
        return;
      }
      this.article = res.data.data;

      this.meta.title =
        this.article.title != "" ? this.article.title : this.article.content;
      this.meta.cover =
        this.article.images.length > 0
          ? this.article.images.length[0]
          : "@/assets/images/fnlogo.png";

      // 一下类型内容为纯文本
      if (
        this.article.type == 10 ||
        this.article.type == 9 ||
        this.article.type == 8 ||
        this.article.type == 6
      ) {
        if (this.article.content != undefined) {
          this.article.content =
            "<p>" + this.nl2br(this.article.content) + "</p>";
        }
        this.article.title = "";
      }

      this.$nextTick(() => {
        let c_height = $(".article-block").height();
        if (c_height > 748) {
          $(".unfold-field").show();
          $(".article-block").height("748px");
        }
      });

      if (this.article.videos[0] != undefined) {
        this.config.poster = this.article.videos[0].coverImage;
        // this.playerOptions.sources[0].src = this.article.videos[0].url;
        this.config.poster = this.article.videos[0].coverImage;
        this.config.url = this.article.videos[0].url;
      }

      // 如果内容中包含图片，则不显示图片列表
      if(this.article.content != undefined){
        let content = this.article.content;
        let m_img = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
        let rs_img = content.match(m_img);
        if (rs_img != undefined && rs_img!=null && rs_img.length) {
          this.article.images = [];
        }
      }
      this.showcmt = true
      // resolve();
    });
  }
};
</script>
