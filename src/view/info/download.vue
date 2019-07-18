<template>
  <div>

    <div id="download">

      <a v-on:click="checkPlatform" class="btn-strong normal btn-blue" id="btn-fast-download">
                    <div class="normal status">
                        <div class="text">
                            <div class="icon-myapp icon"></div>
                            <span id="normal-text">立即下载</span>

                        </div>
                    </div>
                </a>
    </div>

  </div>
</template>

<script>

import config from '@/config'
const {
  downAppURl, downWeixin, iphoneSchema, iphoneDownUrl, androidSchema, androidDownUrl
} = config

export default {
  methods: {
    checkPlatform () {
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        window.location = iphoneDownUrl
      } else {
        window.location = androidDownUrl
      }
    }
  }
}
</script>

<style>

#download {
  background-image: url("../../assets/images/download_bg.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height:700px;
  width:100%;
}

.btn-strong, .btn-strong:link, .btn-strong:visited, .btn-strong:hover, .btn-strong:active {
    color: #fff;
}

.btn-strong {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-flex: 1;
    -webkit-flex: 1 1 0;
    flex: 1 1 0;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    position: relative;
    line-height: 1em;
    font-size: 14px;
    -webkit-border-radius: 3px;
    border-radius: 3px;
    -webkit-background-clip: padding-box;
    background-clip: padding-box;
    background: #56bfff;
    -webkit-box-shadow: 0 0 1px 1px #2fb0ff,inset 0 2px 1px 1px rgba(255,255,255,0.2),0px 1px 1px 1px rgba(0,0,0,0.2);
    box-shadow: 0 0 0 1px #2fb0ff,inset 0 2px 0 rgba(255,255,255,0.2),0px 1px 0 1px rgba(0,0,0,0.2);
}

.btn-strong {
    width: 216px;
    height: 37px;
    margin:0 auto;
    position: absolute;
    top:320px;
    left:50%;
    margin-left:-108px;
}

</style>
