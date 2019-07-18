<template>
  <Row>
    <i-col span="24">
      <Card shadow dis-hover>
        <p slot="title">最近作品</p>
        <Dropdown slot="extra" class="margin-left-20">
          <Button type="primary">
            发表
            <Icon type="ios-arrow-down"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem>
              <router-link to="/release">文章</router-link>
            </DropdownItem>
            <DropdownItem v-show="false">
              <router-link to="/release/release">视频</router-link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <div class="pgc-article-card" v-for="(infor, i) in homelist" :key="`infor-${i}`">
          <row>
            <i-col>
              <div class="pgc-article-card-wrapper">
                <a class="pgc-article-card-img" :href="infor.url">
                  <img :src="infor.imagesurl" v-if="infor.type !== 12" />

                  <img :src="item.coverImage" v-else v-for="(item,a) in infor.videos" :key="a" />
                </a>
                <div class="pgc-article-card-body">
                  <a
                    class="pgc-article-card-content"
                    style="font-weight:bold;"
                    :href="infor.url"
                  >{{infor.title}}</a>
                  <div class="pgc-article-card-count wtt-count">
                    <span>赞&nbsp;{{infor.like}}</span>
                    <span>评论&nbsp;{{infor.comment}}</span>
                    <span>阅读&nbsp;{{infor.views}}</span>
                  </div>
                  <div class="pgc-article-card-status wtt-status">
                    <span>{{infor.time}}</span>
                  </div>
                </div>
                <div class="pgc-article-card-status wtt-audit">
                  <p v-if="infor.status=='A'" class="success">已发布</p>
                  <p v-else-if="infor.status=='B'" class="draft">草稿</p>
                  <p v-else-if="infor.status=='D'" class="not">审核未通过</p>
                  <p v-else-if="infor.status=='G' || infor.status=='1' || infor.status=='C'" class="review">审核中</p>
                </div>
              </div>
            </i-col>
            <Divider />
          </row>
        </div>

        <div class="page" v-if="homelist.length > 0">
          <Page
            :total="pageTotal"
            :current="pageNo"
            :page-size="pageSize"
            show-total
            placement="top"
            @on-change="changepage"
            prev-text="上一页"
            next-text="下一页"
          ></Page>
        </div>
        <div v-else>
          <div style="text-align:center;margin:40px 0;">您还没有发表过作品，请点击发文进行作品发表。</div>
        </div>
      </Card>
    </i-col>
  </Row>
</template>
<script>
import { getContentList } from '@/api/homepage.js'
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  name: 'home-content',
  data () {
    return {
      homelist: [],
      pageTotal: 0,
      pageNo: 1,
      pageSize: 5,
      requestDate: ''
    }
  },
  methods: {
    ...mapActions(['reqhomepage']),
    // 页数变化的时候改变每一页的内容
    changepage (pageNo) {
      var pageSize = this.pageSize
      this.reqhomepage({ pageNo, pageSize }).then(res => {
        console.log(res)
        this.pageTotal = this.$store.state.homepage.homedata.totalCount
        this.pageSize = this.$store.state.homepage.homedata.pageSize
        this.homelist = this.$store.state.homepage.homedata.list
        console.log(this.homelist)
        for (var i in this.homelist) {
          if (this.homelist[i].images[0] == undefined) {
            this.homelist[
              i
            ].imagesurl = require('../../../assets/images/no-img.png')
          } else {
            this.homelist[i].imagesurl = this.homelist[i].images[0].url
          }
          this.homelist[i].url = 'newsinfo/' + this.homelist[i].id
        }
      })
    }
  },
  mounted () {
    var pageNo = this.pageNo
    this.changepage(pageNo)
  },
  computed: {},
  watch: {}
}
</script>
<style lang="less"scoped>
@import "./home-content.less";
.draft {
  font-size: 16px;
}
.success,
.review,
.not {
  font-size: 16px;
}
.success {
  color: greenyellow;
}
.review {
  color: red;
}
.not {
  color: #ccc;
}
</style>
