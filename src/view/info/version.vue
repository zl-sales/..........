<template>
  <div>
    <div class="header">
      <div class="bg-hr"></div>
      <div class="vsn-wall">
        <div class="vsn-hr"></div>
        <div class="vsn-box">
          <div class="vsn-tit">
            <div>1.0.0.0</div>
            <div>2019年4月10日</div>
          </div>
          <div class="vsn-con">青鸟快讯1.0版本上线</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
.header {
  padding: 30px 15px;
  position: relative;
}
.vsn-tit {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dashed #5c8de0;
  padding-bottom: 5px;
}
.vsn-tit div:first-child {
  font-size: 22px;
  font-weight: 600;
  padding-left: 10px;
}
.vsn-tit div:last-child {
  font-size: 15px;
  font-weight: 300;
}
.vsn-con {
  font-size: 15px;
  margin-top: 10px;
  padding-left: 10px;
}
.vsn-hr {
  width: 26px;
  height: 26px;
  background: #5c8de0;
  border-radius: 50px;
}
.vsn-wall {
  display: flex;
  align-items: center;
}
.vsn-box {
  flex: 28;
}
.bg-hr {
  width: 2px;
  background: #5c8de0;
  position: absolute;
  height: 400px;
  left: 27px;
  top: 60px;
}
</style>
