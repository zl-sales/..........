<template>
  <div>
    <el-alert title="已载入保存的草稿" v-show="alert" close-text="取消"></el-alert>
    <row>
      <i-col :xs="{span: 24}" class="pagelet-write newVersion">
        <div class="edit-wrap common-container-wrapper">
          <div class="syl-editor no-columncard">
            <div>
              <div class="syl-editor-input">
                <span class="tui2-input-wrapper">
                  <input
                    v-model="title"
                    placeholder="请输入文章标题（5-50个汉字）"
                    class="tui2-input editor-title"
                    ref="title"
                    autocomplete="off"
                    type="text"
                    value
                    maxlength="50"
                  />
                </span>
                <span class="title_tip">{{titleNumber}}/50</span>
              </div>
              <div class="tui-notification-container tui-notification-container-empty">
                <div></div>
              </div>
            </div>
            <div class="text-editor">
              <feditor ref="froalaEditor" />
            </div>
          </div>
          <div class="form-wrap">
            <div class="edit-cell">
              <div class="edit-label">封面</div>
              <div class="edit-input">
                <div>
                  <div class="article-cover">
                    <RadioGroup v-model="articleimg">
                      <Radio label="singleimg">
                        <span>单图</span>
                      </Radio>
                      <Radio label="multimg">
                        <span>三图</span>
                      </Radio>
                      <Radio label="noimg">
                        <span>无图</span>
                      </Radio>
                    </RadioGroup>
                    <div>
                      <div class="article-cover-images">
                        <!-- v-for="(infor, i) in titleImageList"
                        :key="`infor-${i}`"-->
                        <!-- 单图，三图，无图，显示图片的地方 -->
                        <div
                          class="article-cover-add"
                          v-if="articleimg !== 'noimg'"
                          v-on:click="selectImage"
                        >
                          <img src="@/assets/images/add.png" id="img" />
                        </div>
                        <div
                          class="article-cover-add"
                          v-if="articleimg !== 'singleimg' && articleimg !== 'noimg'"
                          v-on:click="selectImage"
                        >
                          <img src="@/assets/images/add.png" id="img" />
                        </div>
                        <div
                          class="article-cover-add"
                          v-if="articleimg !== 'noimg' && articleimg !== 'singleimg'"
                          v-on:click="selectImage"
                        >
                          <img src="@/assets/images/add.png" id="img" />
                        </div>
                        <!-- <div
                          v-if="showadd"
                          class="article-cover-add"
                          v-for="(infor, i) in chooseImgDiv"
                          :key="`infor-${i}`"
                          v-on:click="selectImage"
                        >
                          <Icon type="md-add" class="icon-add"/>
                        </div>-->
                      </div>
                      <div class="article-cover-preview" v-show="false">
                        <div id="pgc-figure-cover-preview">
                          <button
                            type="button"
                            class="tui2-btn tui2-btn-size-default tui2-btn-default show-dialog-btn"
                          >
                            <span class="tui2-btn-content">客户端预览</span>
                          </button>
                        </div>
                        <div class="article-cover-tip">优质的封面有利于推荐，请使用清晰度较高的图片，避免使用GIF、带大量文字的图片。</div>
                      </div>
                    </div>
                    <!-- 图片选择框 开始 -->
                    <Modal v-model="chooseImage" width="800">
                      <p slot="header">
                        <Icon type="md-photos" />
                        <span>正文图片</span>
                      </p>
                      <div>
                        <row>
                          <i-col span="6" v-for="(infor, i) in imgList" :key="`infor-${i}`">
                            <div v-on:click="setTitleImage(infor.src)">
                              <div class="img-item" :id="infor.src">
                                <img :src="infor.src" />
                              </div>
                            </div>
                          </i-col>

                          <div
                            style="text-align:center;margin:30px 0;font-size:14px;"
                            v-if="imgList.length<=0"
                          >文章正文内无图片，请先在正文内添加图片, 或选择封面无图选项。</div>
                        </row>
                      </div>
                      <div slot="footer">
                        <el-tooltip
                          class="item"
                          effect="dark"
                          content="点击取消，清空所选封面"
                          placement="top-end"
                        >
                          <Button type="default" size="large" @click="cancel">取消</Button>
                        </el-tooltip>
                        <Button type="primary" size="large" @click="ok">确认</Button>
                      </div>
                    </Modal>
                    <!-- 图片选择框 结束 -->
                  </div>
                </div>
              </div>
            </div>

            <div class="edit-cell">
              <div class="edit-label">
                <Poptip placement="right" width="200">
                  <Button style="font-size: 14px;" v-on:click="loadChannel">{{channelBtn}}</Button>
                  <div class="api" slot="content">
                    <row>
                      <i-col
                        :xs="{span :12}"
                        v-for="(infor, i) in tabData "
                        :key="`infor-${i}`"
                        class="center"
                      >
                        <Tag color="primary">
                          <a
                            type="text"
                            class="label"
                            v-on:click="addTag(infor.id,infor.tab)"
                          >{{infor.tab}}</a>
                        </Tag>
                      </i-col>
                    </row>
                  </div>
                </Poptip>
              </div>
              <div class="edit-input">
                <div class="channel-input">
                  <div v-show="baseChannel">
                    <span>青鸟号作品默认发布到作者家乡频道中，如需发布到其他频道请选择</span>
                  </div>
                  <div v-show="tagChannel">
                    <Input
                      icon="ios-add-circle-outline"
                      v-model="customTag"
                      placeholder="自定义频道"
                      style="width:200px"
                      v-on:keyup.enter.native="customAddTag()"
                    />&nbsp;
                    <Tag
                      color="warning"
                      closable
                      v-for="(infor, i) in tagList"
                      :key="`infor-${i}`"
                      :name="infor.id"
                      @on-close="handleClose"
                    >{{infor.tab}}</Tag>
                    <!-- <Tag color="warning" closable  v-for="(infor, i) in tagList" :key="`infor-${i}`"  @on-close="handleClose">{{infor.tagName}}</Tag> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="publish-footer">
            <button
              id="publish"
              type="button"
              v-on:click="subArticle"
              class="tui2-btn tui2-btn-size-default tui2-btn-primary publish-btn"
            >
              <span class="tui2-btn-content">发表</span>
            </button>
            <button
              type="button"
              class="tui2-btn tui2-btn-size-default tui2-btn-default publish-btn"
              @click="show"
            >
              <span class="tui2-btn-content">预览</span>
            </button>
            <button
              type="button"
              class="tui2-btn tui2-btn-size-default tui2-btn-default publish-btn"
              @click="draft"
            >
              <span class="tui2-btn-content">存为草稿</span>
            </button>
            <span
              v-show="false"
              style="font-size: 14px; color: rgb(158, 158, 158); float: left; line-height: 40px;"
            >
              字数
              0（已保存）
            </span>
          </div>
        </div>
      </i-col>
      <div id="content_hide" style="display:none;"></div>

      <div id="ct_content" style="display:none;">
        <div style="padding-right:40px;">
          <p style="font-size:16px;line-height:30px;color:#000;">
            应网络实名制要求，请先进行实名认证，实名认证通过后才能继续发文.
            <br />请使用当前登录方式（登录此青鸟号的手机号、微信等）登录最新版本的青鸟快讯客户端，
            点击「我的」，找到「实名认证」，并按照引导完成实名认证。
          </p>
          <img
            style="width:180px;display:block;padding-top:20px;margin:0 auto;"
            src="@/assets/images/code.jpg"
          />
          <p style="text-align:center;font-size:16px;line-height:38px;color:#000;">扫码下载最新青鸟快讯APP客户端</p>
        </div>
      </div>
    </row>

    <!-- 预览手机 -->
    <div class="bg" @click="conceal">
      <div class="phone">
        <img src="@/assets/images/phone.png" alt />
        <div class="main">
          <div class="screen">
            <img src="@/assets/images/bg@2x.png" alt />
          </div>
          <div class="content">
            <div class="title">
              <h2>{{phone_title}}</h2>
            </div>
            <div class="user">
              <img :src="$store.state.header" alt />
            </div>
            <div class="info">
              <div class="name">{{$store.state.name}}</div>
              <div class="date">{{date | time}}</div>
            </div>
            <div class="text">
              <!-- <p class="text-header">{{phone_title}}</p> -->
              <div v-html="phone_content">
                <!-- 手机内容 -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 内容开始 -->
  <!-- 内容结束 -->
</template>
<script>
import Vue from 'vue'
import VueFroala from 'vue-froala-wysiwyg'

import { draft, issue, updata } from '@/api/release'
import { NewsDetail } from '@/api/newsdetail'

import fEditor from '_c/froala-editor/froala-editor.vue'
import { mapActions, mapGetters, mapState } from 'vuex'
Vue.use(VueFroala)

export default {
  name: 'release-article',
  components: {
    feditor: fEditor
  },

  created () {
    this.template()
  },
  data () {
    return {
      alert: false,
      date: new Date().getTime(),
      phone_title: '',
      phone_content: '',
      count: 0,
      content: '',
      articleimg: 'noimg',
      channelBtn: '频道选择',
      baseChannel: true,
      tagChannel: false,
      customTag: '',
      chooseImage: false,
      tabData: [],
      chooseImgDiv: [],
      uploadList: [],
      title: '',
      titleNumber: 0,
      imgList: [],
      titleSelect: [
        {
          title: '单图',
          number: 1
        },
        {
          title: '三图',
          number: 3
        },
        {
          title: '无图',
          number: 0
        }
      ],
      titleImageList: [],
      showImg: true,
      showadd: true,
      nodeId: '',
      tagNames: [],
      type: 1,
      err: 1
    }
  },
  inject: ['reload'],
  methods: {
    ...mapActions(['reqNodeList', 'reqTagList', 'reqIssue']),
    // 将获取到的内容渲染到编辑器中
    template () {
      // this.reload()
      let infoId = this.$route.query.id
      var that = this
      if (typeof infoId === 'number' || typeof infoId === 'string') {
        NewsDetail({ infoId }).then(res => {
          const { data } = res
          if (data.code == 200) {
            this.title = data.data.title
            this.$refs.froalaEditor.Context = data.data.content
            this.alert = true
          }
        })
      }
    },
    // 转存为草稿并跳转到内容管理页面
    draft () {
      let title = this.title
      if (this.title === null || this.title === '') {
        this.$Message.info('请输入文章标题!')
        return
      }

      let content = this.$refs.froalaEditor.editor.html.get(true)
      if (content === null || content === '') {
        this.$Message.info('请输入文章内容!')
        return
      }
      let images = this.titleImageList
      let nodeId = this.nodeId
      let tagIds = []
      this.tagList.map((item, index) => {
        if (item.id != null && item.id != '') {
          tagIds.push(item.id)
        }
      })
      let tagNames = this.tagNames

      let type = this.type

      $('#content_hide').html(content)
      $('#content_hide p[data-f-id="pbf"]').remove()
      content = $('#content_hide')
        .html()
        .replace(/<p><br><\/p>/g, '')

      if (type == '2' && images.length < 1) {
        this.$Message.info('请选择一张封面!')
        return
      }
      if (type == '3' && images.length < 3) {
        this.$Message.info('请选择三张封面!')
        return
      }
      var that = this
      let status = 'B'
      let infoId = this.$route.query.id
      if (typeof infoId === 'undefined') {
        draft({
          content,
          images,
          nodeId,
          tagIds,
          tagNames,
          title,
          type,
          status
        }).then(res => {
          const { data } = res
          if (data.code == 200) {
            this.$Modal.success({
              title: '保存成功',
              content: '草稿保存成功',
              onOk: () => {
                this.$router.push({ path: 'content' })
              }
            })
          }
        })
      } else {
        updata({
          content,
          images,
          nodeId,
          infoId,
          tagIds,
          tagNames,
          title,
          type,
          status
        }).then(res => {
          const { data } = res
          if (data.code == 200) {
            this.$Message.success('修改成功')
            that.$router.push('/content')
          }
        })
      }
    },
    // 点击按钮显示预览
    show () {
      let c = this.$refs.froalaEditor.editor.html.get(true)
      if (this.title == '' || c == '') {
        this.$Message.info('请编辑标题与内容后点击预览')
        return false
      } else {
        this.date = new Date().getTime()
        this.phone_title = this.title
        this.phone_content = c
        $('.bg').show()
      }
    },
    // 预览隐藏
    conceal () {
      $('.bg').hide()
    },
     addTag: function(id, tab) {
      this.channelBtn = tab;

      this.nodeId = id;
      let nodeId = id;

      this.$el.click();
    },
    handleClose (event, name) {
      // const index = this.tagList.indexOf(name);
      let delIndex = $.inArray(imgSrc, this.tagList)
      this.tagList.splice(delIndex, 1)
    },
    customAddTag: function () {
      this.tagNames.push(this.customTag)
      this.tagList.push({
        tab: this.customTag
      })
      this.customTag = ''
    },
    catchData (value) {
      this.content = value // 在这里接受子组件传过来的参数，赋值给data里的参数
    },
    loadChannel () {
      this.reqNodeList().then(() => {
        let pcAdmin = this.$store.state.user.pcAdmin
        // 向后台发送请求的拿到数据以后做一些
        this.tabData = []
        if (pcAdmin) {
          this.tabData.push({
            id: 160,
            tab: '推荐'
          })
        }
        this.tabData.push({
          id: 143,
          tab: '家乡'
        })
        this.$store.state.release.tabData.map((item, index) => {
          if (pcAdmin) {
            this.tabData.push(item)
          } else if (item.id == 124 || item.id == 120) {
            // 伦理，八卦
            this.tabData.push(item)
          }
        })
      })
    },
    // 发表文章
    subArticle () {
      let title = this.title
      if (this.title === null || this.title === '') {
        this.$Message.info('请输入文章标题!')
        return
      }

      let content = this.$refs.froalaEditor.editor.html.get(true)
      if (content === null || content === '') {
        this.$Message.info('请输入文章内容!')
        return
      }
      if (this.titleImageList.length !== 0) {
        this.titleImageList.forEach(function (item, i) {
          var str = 'blob'
          if (item.indexOf(str) != -1) {
            this.$Message.info('图片上传中，稍后再试')
          }
        })
      }
      this.count++
      if (this.count == 1) {
        let images = this.titleImageList
        let nodeId = this.nodeId
        let tagIds = []
        this.tagList.map((item, index) => {
          if (item.id != null && item.id != '') {
            tagIds.push(item.id)
          }
        })
        let tagNames = this.tagNames

        let type = this.type

        $('#content_hide').html(content)
        $('#content_hide p[data-f-id="pbf"]').remove()
        content = $('#content_hide')
          .html()
          .replace(/<p><br><\/p>/g, '')
        if (type == '2' && images.length < 1) {
          this.$Message.info('请选择一张封面!')
          return
        }
        if (type == '3' && images.length < 3) {
          this.$Message.info('请选择三张封面!')
          return
        }

        issue({
          content,
          images,
          nodeId,
          tagIds,
          tagNames,
          title,
          type
        }).then(res => {
          const data = res.data
          if (data.msg == '操作成功') {
            this.$Modal.success({
              title: '提交成功',
              content: '文章提交成功，进入审核中',
              onOk: () => {
                this.$router.push({ path: 'home' })
              }
            })
          } else if (data.code == '500') {
            this.count = 0
            var ct_content = $('#ct_content').html()
            this.$Modal.info({
              title: '实名认证提示',
              width: 700,
              content: ct_content
            })
          } else {
            this.$Message.info('发表失败，请稍后再试')
          }
        })
      }
    },
    // 选择标题图
    selectImage () {
      this.chooseImage = true
      let $c = $(this.$refs.froalaEditor.editor.html.get(true))
      let $i = $c.find('img')
      let imgArr = Array()
      $i.each(function () {
        imgArr.push({
          src: $(this).attr('src')
        })
      })
      this.imgList = imgArr
    },
    ok () {
      this.showImg = false
      this.chooseImage = false
    },
    cancel () {
      this.chooseImage = false
      this.titleImageList = []
      let list = $('.article-cover-add #img')
      for (var i = 0; i < list.length; i++) {
        list[i].src =
          'http://zixunapp.oss-cn-qingdao.aliyuncs.com/pc/images/335/1561369646791.png'
      }
    },
    // 设置标题图
    setTitleImage (imgSrc) {
      let numberFlag = false
      let list = $('.article-cover-add #img')
      if (this.titleImageList.length < this.chooseImgDiv.length) {
        this.titleImageList.push(imgSrc)
        $(document.getElementById(imgSrc)).toggleClass('checked')
        if (this.titleImageList.length == 1) {
          list[0].src = imgSrc
        } else if (this.titleImageList.length == 2) {
          list[1].src = imgSrc
        } else if (this.titleImageList.length == 3) {
          list[2].src = imgSrc
        }
      } else {
        this.titleImageList.map((item, index) => {
          if (imgSrc === item) {
            this.titleImageList.splice(item, 1)
            $(document.getElementById(imgSrc)).toggleClass('checked')
          } else {
            numberFlag = true
          }
        })
      }
      if (numberFlag) {
        this.$Message.info('已超过图片选择上限')
      }
    }
  },
  computed: {
    tagList () {
      return this.$store.state.release.tagList
    }
  },
  mounted () {},
  watch: {
    tagList (newValue) {
      if (this.tagList.length === 0) {
        this.baseChannel = true
        this.tagChannel = false
        this.channelBtn = '频道选择'
      }
    },
    articleimg (radioValue) {
      this.chooseImgDiv = []
      var list
      // 单图
      if (radioValue === 'singleimg') {
        this.chooseImgDiv = []
        this.showadd = true
        if (this.titleImageList.length == 0) {
          this.showImg = true
          this.chooseImgDiv.push('1')
        } else {
          this.chooseImgDiv = []
          this.showadd = false
          list = this.titleImageList.splice(1)
        }
        this.type = 2
      }

      // 三图
      if (radioValue === 'multimg') {
        this.chooseImgDiv = []
        this.showadd = true
        if (this.titleImageList.length == 0) {
          this.chooseImgDiv = []
          this.showImg = true
          this.chooseImgDiv.push('1', '1', '1')
        } else if (this.titleImageList.length == 1) {
          this.chooseImgDiv = []

          this.showImg = false
          this.chooseImgDiv.push('1', '1')
        } else if (this.titleImageList.length == 2) {
          this.chooseImgDiv = []
          this.titleImageList = [...this.titleImageList, ...list]
          this.showImg = false
          this.chooseImgDiv.push('1')
        } else {
          this.chooseImgDiv = []
          this.showadd = false
        }
        this.type = 3
      }
      if (radioValue === 'noimg') {
        this.titleImageList = []
        this.showadd = false
        this.showImg = true
        this.type = 1
        this.chooseImgDiv = []
      }
    },
    // 监听输入的标题
    title (value) {
      this.titleNumber = value.length
    }
  }
}
</script>
<style lang="less">
@import "./release-article.less";
.img-item {
  width: 142px;
  height: 120px;
  position: relative;
  display: inline-block;
  border: 1px solid #e8e8e8;
  margin: 10px;
  cursor: pointer;
}

.img-item img {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 100%;
  max-height: 100%;
  margin: auto;
}

.checked:after {
  content: "";
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  z-index: 2;
  font-size: 30px;
  color: #fffacd;
}

.checked:before {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.5);
  background-image: url("../../../assets/images/checks.png");
  -moz-background-size: 40px 40px;
  background-size: 40px 40px;
  background-position: 100% 0;
  background-repeat: no-repeat;
  text-align: center;
  color: #fffacd;
}

a[href="https://froala.com/wysiwyg-editor"], a[href="https://www.froala.com/wysiwyg-editor?k=u"] {
  display: none !important;
  position: absolute;
  top: -99999999px;
}

.pagelet-write .publish-footer {
  padding-bottom: 80px;
}

body {
  overflow: auto !important;
}
/* 预览 */
.bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 100000000;
  display: none;
}

.phone {
  width: 350px;
  height: 713px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
}

.phone img {
  width: 100%;
  height: 100%;
}

.screen {
  position: absolute;
  top: 70px;
  left: 20px;
  right: 20px;
}

.screen img {
  height: 614px;
}

.content {
  position: absolute;
  top: 60px;
  left: 39px;
  width: 272px;
  height: 440px;
  /* background-color: pink; */
}

.user {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
  margin-top: 20px;
}

.user img {
  width: 100%;
  height: 100%;
}

.title {
  margin-top: 48px;
}

.title h2 {
  font-size: 17px;
}

.user {
  display: inline-block;
}

.info {
  display: inline-block;
  margin-left: 8px;
}

.info .name {
  font-size: 10px;
}

.info .date {
  font-size: 9px;
  color: #999999;
}

.text {
  height: 400px;
  /* height: 100%; */
  /* background-color: red; */
  font-size: 14px;
  margin-top: 8px;
  overflow-y: auto;
}

.text-header {
  display: block;
  margin-bottom: 16px;
}

.text::-webkit-scrollbar {
  width: 0 !important;
}

.text {
  -ms-overflow-style: none;
}

.text {
  overflow: -moz-scrollbars-none;
}

.text div {
  width: 100%;
  word-break: break-word;
}
.el-alert--info.is-light {
  height: 40px;
  background: rgba(241, 103, 54, 0.3);
  color: #292828;
}
.el-alert__title {
  font-size: 16px;
}
.el-alert.is-light .el-alert__closebtn {
  color: #f16736;
  font-size: 16px;
  left: 166px;
}
</style>
