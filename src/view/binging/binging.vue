<template>
  <div class="big">
      <div class="logo">
          <img src="../../assets/images/fnlogo.png" alt="">
      </div>
    <div class="bg">
      <div class="form">
        <el-form>
          <el-input placeholder="手机号"></el-input>
          <el-input placeholder="验证码">
            <el-button slot="append" class="identifying">获取验证码</el-button>
          </el-input>
          <el-button type="danger">提交</el-button>
        </el-form>
        <div class="tips">
          <div class="h1">
            <h4>友情提示：</h4>
          </div>
          <div class="text">
            <p>1、这是提示内容这是提示内容这是提示内容这是提示内容这是提示内容这是提示内容。</p>
            <p>2、这是提示内容这是提示内容这是提示内容这是提示.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
@import "./binging.css";
</style>
