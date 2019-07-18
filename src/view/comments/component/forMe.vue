<template>
  <div>
    <Card shadow dis-hover :bordered="false">
      <Row>
        <i-col span="5">
          <Card shadow dis-hover :bordered="false">
            <p slot="title">我的图文</p>
            <div class="articles-list-all">
              <div class="articles-list">
                <div>
                  <div class="articles-list-item">
                    <div class="articles-list-item-title active">「前端」Bootstrap 网页模版 Light Dashboard Template</div>
                    <div class="articles-list-item-comment">1评论</div>
                  </div>
                  <div class="articles-list-item">
                    <div class="articles-list-item-title">「前端」Bootstrap 网页模版 Laravel Angular Admin</div>
                    <div class="articles-list-item-comment">0评论</div>
                  </div>
                </div>
                <div>
                  <div class="comment-no-data article-split-line">已显示全部文章</div>
                </div>
              </div>
            </div>
          </Card>
        </i-col>
        <i-col span="1">
          <div class="line"></div>
        </i-col>
        <i-col span="17">
          <Card shadow dis-hover :bordered="false">
            <p slot="title">评论</p>
            <row v-for="(infor, i) in commentsUsers" :key="`infor-${i}`" class="margin-bottom-20">
              <i-col :xs="{ span: 3}">
                <div>
                  <img class="forme-avatar" :src="infor.user.avatar_url">
                </div>
              </i-col>
              <i-col :xs="{ span: 21}">
                <p>
                  <label class="left-label">{{infor.user.screen_name}}</label>
                  <label class="label">{{infor.create_time}}</label>
                </p>
                <p class="content-text">{{infor.content}} </p>
                <p class="tool-text">
                  <span class="tool-span" v-on:click="showComment()">
                    <Icon type="md-text" size="18" />{{infor.comment_count}}评论</span>
                  <span class="tool-span">
                    <Icon type="md-thumbs-up" size="18" />{{infor.is_praise}}赞</span>
                </p>
                <Card class="margin-top-10" v-show="commentForOther">
                  <row>
                    <i-col :xs="{ span: 3}">
                      <Avatar shape="square" icon="ios-person" size="large" />
                    </i-col>
                    <i-col :xs="{ span: 21}">
                      <Input v-model="commentsText" type="textarea" :rows="4" placeholder="Enter something..." />
                    </i-col>
                  </row>
                  <div class="comments-btn-div">
                    <Button size="default" type="primary">发表评论</Button>
                  </div>
                  <row>
                    <i-col :xs="{ span: 3}">
                      <Avatar shape="square" icon="ios-person" size="large" />
                    </i-col>
                    <i-col :xs="{ span: 21}">
                      <p class="content-text">ss</p>
                    </i-col>
                  </row>
                </Card>
              </i-col>
            </row>
          </Card>
        </i-col>
      </Row>
    </Card>
  </div>
</template>
<script>
import { getComments } from '@/api/comments'
export default {
  name: 'for-me',
  data () {
    return {
      commentsText: '',
      commentForOther: false,
      commentsUsers: []
    }
  },
  methods: {
    showComment: function () {
      if (this.commentForOther) {
        this.commentForOther = false
      } else {
        this.commentForOther = true
      }
    }
  },
  created: function () {
    getComments()
      .then(res => {
        console.log(res.data)
        this.commentsUsers = res.data.data
        // console.log(this.commentsUsers)
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
<style>
.line {
  margin: 0 8px;
  display: inline-block;
  height: 600px;
  width: 1px;
  vertical-align: middle;
  position: relative;
  top: -0.06em;
  background: #e8eaec;
}

.ivu-card-head {
  border-bottom: 0px solid #e8eaec !important;
}

.articles-list {
  /* height: 860px; */
  overflow: auto;
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
  position: relative;
}

.articles-list::-webkit-scrollbar {
  width: 0 !important;
}

.articles-list .articles-list-item {
  margin-bottom: 10px;
  cursor: pointer;
  padding: 10px 10px;
}

.articles-list .articles-list-item:hover {
  background: #f5f7f9;
}

.articles-list .articles-list-item .articles-list-item-title {
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  color: #222;
  display: -webkit-box;
  font-size: 14px;
  margin-bottom: 6px;
  overflow: hidden;
  overflow-wrap: break-word;
  text-overflow: ellipsis;
  line-height: 24px;
  max-height: 48px;
}

.articles-list .articles-list-item .articles-list-item-title.active {
  color: #f85959;
}

.articles-list .articles-list-item .articles-list-item-comment {
  font-size: 14px;
  color: #999;
  letter-spacing: 0;
  line-height: 20px;
  height: 20px;
}

.article-split-line {
  position: relative;
  margin-top: 15px;
}

.comment-no-data {
  text-align: center;
  height: 104px;
  line-height: 44px;
  color: #666;
  font-size: 14px;
  padding-top: 60px;
}

.comment-no-data.article-split-line {
  padding-top: 0;
  height: 44px;
}

.forme-avatar {
  width: 60px;
}

.comments-btn-div {
  text-align: right;
  margin-top: 10px;
}
</style>
