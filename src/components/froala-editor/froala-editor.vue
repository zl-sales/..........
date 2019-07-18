<template>
  <div id="feditor">
    <froala ref="feditor" :config="config" tag="textarea" v-model="Context"></froala>
  </div>
</template>

<script>
import { async } from "q";
import { setTimeout, clearTimeout } from "timers";

require("font-awesome/css/font-awesome.css");
// Require Froala Editor js file. begin
require("@/assets/js/froala-editor/js/froala_editor.pkgd.min.js");

// Require Froala Editor css files.
require("@/assets/js/froala-editor/js/languages/zh_cn");
require("@/assets/js/froala-editor/css/froala_editor.pkgd.min.css");
require("@/assets/js/froala-editor/css/froala_style.min.css");

export default {
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
      // accessKey: "X00evHHDexcrrzTQLZsBFqIySa06t0",
      // dialogVisible: false,
      // oss上传配置
      Context: "",
      editor: null,
      config: {
        imageUploadToS3: {
          bucket: "zixunapp",
          // Your bucket region.
          region: "oss-cn-qingdao",
          keyStart: "pc/images/" + this.$store.state.user.userId + "/",
          params: {
            acl: "zixunapp", // ACL according to Amazon Documentation.
            OSSAccessKeyId: this.$store.state.accessKeyId, // Access Key from Amazon.
            accessKey: this.$store.state.accessKeySecret, // Policy string computed in the backend.
            Signature: this.$store.state.Signature,
            policy: this.$store.state.policy,
            "x-oss-security-token": this.$store.state.securitytoken
          }
        },
        videoUploadToS3: {
          bucket: "zixunapp",
          // Your bucket region.
          region: "oss-cn-qingdao",
          keyStart: `pc/video/${this.$store.state.user.userId}/`,
          params: {
            acl: "zixunapp", // ACL according to Amazon Documentation.
            OSSAccessKeyId: this.$store.state.accessKeyId, // Access Key from Amazon.
            accessKey: this.$store.state.accessKeySecret, // Policy string computed in the backend.
            Signature: this.$store.state.Signature,
            policy: this.$store.state.policy,
            "x-oss-security-token": this.$store.state.securitytoken
          }
        },
        toolbarButtons: [
          "bold",
          "italic",
          "align",
          "formatOL",
          "formatUL",
          "outdent",
          "indent",
          "quote",
          "insertLink",
          "insertImage",
          "insertVideo",
          "insertHR",
          "selectAll",
          "clearFormatting",
          "undo",
          "redo"
        ],
        placeholder: "请填写内容",
        language: "zh_cn",
        heightMin: 200,
        toolbarSticky: true,
        toolbarStickyOffset: 60,
        istAdvancedTypes: false,
        imageEditButtons: [
          "imageReplace",
          "imageAlign",
          "imageCaption",
          "imageRemove"
        ],
        imageInsertButtons: ["imageUpload"],
        videoInsertButtons: ["videoUpload"],
        quickInsertTags: [],
        imageUploadMethod: "POST",
        videoUploadMethod: "POST",
        requestHeaders: {
          qingniaopc: 1
        },
        imageDefaultWidth: 0,
        videoResponsive: true,
        videoResize: true,
        videoMaxSize: 1024 * 1024 * 200,
        videoDefaultWidth: 0,
        videoSplitHTML: true,
        toolbarSticky: true,
        theme: "gray", // 主题
        events: {
          "froalaEditor.initialized": (e, editor) => {
            this.editor = editor;
            // 编辑器初始化的赋值操作
          },
          "froalaEditor.contentChanged": (e, editor) => {
            this.$emit("on-change", editor.html.get(true));
            //
          },
          "froalaEditor.image.inserted": ($image,a,e) => {
            e.css('max-width','100%')
            e.css('display','block')
            //
          },
           'froalaEditor.video.inserted': function ($video,a,e) {
            e.children().css('max-width','100%')
            e.children().css('display','block')
          }
        }
      },
      model: "1"
    };
  },
  methods: {}
};
</script>
<style>
.fr-view img.fr-fic {
  max-height: 300px;
}
.fr-box.fr-basic .fr-element {
  font-size: 16px;
  color: #222;
  padding: 20px 50px;
}
.fr-box.fr-basic .fr-element p {
  margin: 1em 0;
}
.froalaView {
  background-color: #ccc;
  padding: 30px;
  display: none;
}
</style>
