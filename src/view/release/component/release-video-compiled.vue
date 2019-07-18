<template>
  <div>
    <img src="@/assets/images/upload video@2x.png" alt class="img" id="video" />
    <div class="upload">
      <el-upload
        ref="upload1"
        :http-request="uploadSectionFile"
        :beforeUpload="beforeUpload"
        multiple
        :limit="1"
        :show-file-list="false"
        :on-exceed="handleExceed"
      >
        <el-button size="small" type="primary" medium>点击上传</el-button>
      </el-upload>
    </div>
    <div class="progressbox" style="display:none">
      <div class="txt">
        <p>{{status}}</p>
        <div class="try">
          <span class="again">
            <el-upload
              ref="upload2"
              :http-request="uploadSectionFileChange"
              multiple
              :limit="1"
              :show-file-list="false"
              :on-exceed="handleExceed"
              :beforeUpload="beforeUpload"
            >
              <el-button size="small" type="text" medium>重新上传</el-button>
            </el-upload>
          </span>
          <span @click="deleteVideo">删除视频</span>
        </div>
      </div>
      <div class="progressline">
        <el-progress :text-inside="true" :stroke-width="24" :percentage="progress" status="success"></el-progress>
      </div>
      <template v-if="filesize">
        <div class="filename">{{filename}}</div>
        <div class="filesize">大小：{{filesizes}}</div>
        <p class="filelong">时长：{{times}}</p>
      </template>
      <video :src="url" style="display:none" controls="controls"></video>
    </div>
    <div class="one" v-if="filesize">
      <h2>基本信息</h2>
      <el-form label-position="top" label-width="80px" :model="formVideo" :rules="Videorules">
        <el-form-item label="标题 标题为5～50字，需清晰、准确概括视频内容，突出视频主题" label-width="800px" prop="title">
          <el-input
            placeholder="请输入标题（5～30字）"
            maxlength="50"
            show-word-limit
            v-model="formVideo.title"
          ></el-input>
        </el-form-item>
        <el-form-item label="封面(默认为视频第一帧)" prop="coverurl">
          <img :src="formVideo.coverurl" class="show" />
          <!-- <el-upload
            :http-request="uploadSectionFileImage"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            limit="1"
            :file-list="fileList"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="formVideo.imgurl" alt />
          </el-dialog>-->
        </el-form-item>
        <el-form-item label="简介" prop="desc">
          <el-input
            placeholder="请输入简介（0～400字）"
            maxlength="400"
            show-word-limit
            v-model="formVideo.desc"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="node">
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="publish-footer">
        <button
          id="publish"
          type="button"
          v-on:click="issueVideo"
          class="tui2-btn tui2-btn-size-default tui2-btn-primary publish-btn"
        >
          <span class="tui2-btn-content">发表</span>
        </button>
        <!-- <button
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
        </span>-->
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";
import { setTimeout } from "timers";
import { issueVideo } from "@/api/article.js";
export default {
  name: "release-video-compiled",
  beforeCreate() {
    if (sessionStorage.getItem("Uploads")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("Uploads"))
        )
      );
    }
  },
  data() {
    return {
      customTag: "",
      baseChannel: true,
      nodeId: "",
      tagChannel: false,
      tagNames: [],
      tabData: [],
      channelBtn: "频道选择",
      videoUrl: "",
      progress: 0,
      status: "上传中",
      filename: "",
      filesize: "",
      time: "",
      url: "",
      dialogVisible: false,
      formVideo: {
        title: "",
        coverurl: "",
        desc: ""
      },
      Videorules: {
        title: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 5, max: 50, message: "长度在 5 到 50 个字符", trigger: "blur" }
        ],
        coverurl: [
          { required: true, message: "请选择封面图片", trigger: "change" }
        ],
        desc: [
          {
            min: 5,
            max: 400,
            message: "长度在 5 到 400 个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    ...mapActions(["reqNodeList", "reqTagList", "reqIssue"]),
    // 文件上传签的大小限制
    beforeUpload(file) {
      const isVideo = file.name.split(".")[1];
      console.log(isVideo);
      const isLt2M = file.size / 1024 / 1024 < 100;
      if (isVideo != "mp4") {
        this.$message({
          message: "文件格式不正确，请上传mp4格式视频文件",
          type: "warning"
        });
        return false;
      }
      if (!isLt2M) {
        this.$message({
          message: "上传文件大小不能超过 100MB!",
          type: "warning"
        });
        return false;
      }
    },
    issueVideo() {
      let coverImage = this.formVideo.coverurl;
      let latitude = 0;
      let longitude = 0;
      let nodeId = this.nodeId;
      let size = this.filesize;
      let time = this.time;
      let title = this.formVideo.title;
      let type = 12;
      let url = this.videoUrl;
      let content = this.formVideo.desc;
      issueVideo({
        coverImage,
        latitude,
        longitude,
        nodeId,
        size,
        time,
        title,
        type,
        url,
        content
      }).then(res => {
        console.log(res);
        this.$Modal.success({
          title: "提交成功",
          content: "文章提交成功，进入审核中",
          onOk: () => {
            this.$router.push({ path: "home" });
          }
        });
      });
    },
    addTag: function(id, tab) {
      this.channelBtn = tab;
      this.nodeId = id;
      let nodeId = id;
      this.$el.click();
    },
    handleClose(event, name) {
      // const index = this.tagList.indexOf(name);
      let delIndex = $.inArray(imgSrc, this.tagList);
      this.tagList.splice(delIndex, 1);
    },
    customAddTag: function() {
      this.tagNames.push(this.customTag);
      this.tagList.push({
        tab: this.customTag
      });
      this.customTag = "";
    },
    loadChannel() {
      this.reqNodeList().then(() => {
        let pcAdmin = this.$store.state.user.pcAdmin;
        // 向后台发送请求的拿到数据以后做一些
        this.tabData = [];
        if (pcAdmin) {
          this.tabData.push({
            id: 160,
            tab: "推荐"
          });
        }
        this.tabData.push({
          id: 143,
          tab: "家乡"
        });
        this.$store.state.release.tabData.map((item, index) => {
          if (pcAdmin) {
            this.tabData.push(item);
          } else if (item.id == 124 || item.id == 120) {
            // 伦理，八卦
            this.tabData.push(item);
          }
        });
      });
    },
    // 删除上传视频
    deleteVideo() {
      this.$confirm("是否删除上传视频", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$refs.upload2.clearFiles();
        this.videoUrl = "";
        this.progress = 0;
        this.url = "";
        this.formVideo.coverurl = "";
        this.status = "上传视频";
        this.filesize = "0";
        this.$message({
          type: "success",
          message: "删除成功!"
        });
      });
    },
    // 重新上传
    uploadSectionFileChange(param) {
      this.$refs.upload2.clearFiles();
      this.videoUrl = "";
      this.url = "";
      this.formVideo.coverurl = "";
      console.log($("video"));
      this.status = "上传中";
      this.progress = 0;
      this.uploadSectionFile(param);
    },
    // 文件数量超出限制
    handleExceed() {
      this.$message.warning("文件数量超出限制，只能上传一个文件");
    },
    // 上传封面图
    handlePictureCardPreview(file) {
      this.formVideo.coverurl = file.url;
      this.dialogVisible = true;
    },
    uploadSectionFileImage(param) {
      // const OSS = require("ali-oss");
      var client = new OSS({
        region: "oss-cn-qingdao",
        bucket: "zixunapp",
        accessKeyId: this.$store.state.accessKeyId,
        accessKeySecret: this.$store.state.accessKeySecret,
        stsToken: this.$store.state.securitytoken
      });
      // 截取文杰后缀
      var index = param.file.type.lastIndexOf("/");
      var str = param.file.type.substring(index + 1, param.file.type.length);
      var obj = Date.now();
      // 文件名

      const filename = `pc/images/${this.$store.state.user.userId}/${obj}.${str}`;
      client.multipartUpload(filename, param.file).then(results => {
        const { res } = results;
        var url = res.requestUrls[0];
        if (url.indexOf("?") != -1) {
          url = url.split("?")[0];
          this.formVideo.coverurl = url;
        }
        this.formVideo.coverurl = url;
      });
    },
    uploadSectionFile: function(param) {
      $(".img").hide();
      $(".upload").hide();
      $(".progressbox").show();
      // const OSS = require("ali-oss");

      var client = new OSS({
        region: "oss-cn-qingdao",
        bucket: "zixunapp",
        accessKeyId: this.$store.state.accessKeyId,
        accessKeySecret: this.$store.state.accessKeySecret,
        stsToken: this.$store.state.securitytoken
      });

      // 截取文杰后缀
      var index = param.file.type.lastIndexOf("/");
      var str = param.file.type.substring(index + 1, param.file.type.length);
      var obj = Date.now();

      var _this = this;
      this.filename = param.file.name;
      this.filesize = param.file.size;
      this.url = URL.createObjectURL(param.file);

      // 获取视频封面并上传oss
      let video = document.querySelector("video");
      let source = document.createElement("source");
      source.src = _this.videoUrl;
      source.type = "video/mp4";
      video.appendChild(source);

      video.addEventListener("loadeddata", function() {
        clearTimeout(timeout);
        var timeout = setTimeout(() => {
          // 获取视频时长
          _this.time = this.duration;
          var canvas = document.createElement("canvas");
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          canvas
            .getContext("2d")
            .drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
          var img = document.querySelector(".show");
          let imgsrc = canvas.toDataURL("image/png");
          console.log(imgsrc);
          var i = _this.blobToFile(_this.dataURLtoBlob(imgsrc), "cover");
          console.log(i);
          // var coverimg = _this.dataURLtoFile(imgsrc, "cover");

          const filename = `pc/images/${_this.$store.state.user.userId}/${obj}.png`;
          client.multipartUpload(filename, i).then(results => {
            const { res } = results;
            var url = res.requestUrls[0];
            if (url.indexOf("?") != -1) {
              url = url.split("?")[0];
              _this.formVideo.coverurl = url;
            }
            _this.formVideo.coverurl = url;
            console.log(url);
          });
        }, 1000);
      });

      // 文件名
      const filename = `pc/video/${_this.$store.state.user.userId}/${obj}.${str}`;
      client
        .multipartUpload(filename, param.file, {
          progress: function(p) {
            _this.progress = Math.floor(p * 100);
            if (_this.progress == "100") {
              _this.status = "上传成功";
            }
          }
        })
        .then(results => {
          const { res } = results;
          var url = res.requestUrls[0];
          if (url.indexOf("?") != -1) {
            url = url.split("?")[0];
            this.videoUrl = url;
          }
          this.videoUrl = url;
          console.log(this.videoUrl);
        })
        .catch(err => {
          _this.status = "上传失败";
          $(".progressbox").css(background, "#FFF4F4");
          $(".try").css(color, "#E43F3F");
          $(".el-progress-bar__inner").css(backgroundColor, "#FCE3E3");
        });
    },
    // dataurl转为file对象
    dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },
    dataURLtoBlob(dataurl) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    }, //将blob转换成file
    blobToFile(theBlob, fileName) {
      theBlob.lastModifiedDate = new Date();
      theBlob.name = fileName;
      return theBlob;
    }
  },
  computed: {
    filesizes() {
      var num = 1024.0; // byte
      if (this.filesize < num) return this.filesize + "B";
      if (this.filesize < Math.pow(num, 2)) {
        return (this.filesize / num).toFixed(2) + "K";
      } // kb
      if (this.filesize < Math.pow(num, 3)) {
        return (this.filesize / Math.pow(num, 2)).toFixed(2) + "M";
      } // M
      if (this.filesize < Math.pow(num, 4)) {
        return (this.filesize / Math.pow(num, 3)).toFixed(2) + "G";
      } // G
      return (this.filesize / Math.pow(num, 4)).toFixed(2) + "T"; // T
    },
    times() {
      return this.time + "秒";
    },
    tagList() {
      return this.$store.state.release.tagList;
    }
  },
  watch: {
    tagList(newValue) {
      if (this.tagList.length === 0) {
        this.baseChannel = true;
        this.tagChannel = false;
        this.channelBtn = "频道选择";
      }
    }
  }
};
</script>
<style type="less" scoped>
@import "./video-compiled.less";
</style>
