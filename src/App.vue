<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>
<script>
import {
  setToken,
  setUserId
} from '@/libs/util'
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload
    };
  },
  mounted() {
    // window.onbeforeunload = function(e) {
    //   window.localStorage.clear();
    //   window.sessionStorage.clear();
    //   setToken('')
    //   setUserId('')
    // };
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>
<style lang="less">
.size {
  width: 100%;
}
html,
body {
  .size;
  margin: 0;
  padding: 0;
  background: #f5f7f9 !important;
}
#app {
  .size;
}
.ivu-menu-item {
  color: rgb(34, 34, 34) !important;
}
</style>
