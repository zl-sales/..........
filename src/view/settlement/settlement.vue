<template>
  <Tabs value="earnings">
    <TabPane label="我的收益" name="earnings">
      <Earnings/>
    </TabPane>
  </Tabs>
</template>
<script>
import Earnings from './component/earnings.vue'
import WithdrawalInfo from './component/withdrawal_info.vue'
import WithdrawalEdit from './component/withdrawal_edit.vue'
export default {
  created () {
    // 在页面加载时读取sessionStorage里的状态信息
    if (localStorage.getItem('UserInfo')) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(localStorage.getItem('UserInfo'))
        )
      )
    }
  },
  name: 'settlement',
  inject: ['reload'],
  data () {
    return {
      info: true,
      edit: false,
      ebtn: true
    }
  },
  components: {
    Earnings,
    WithdrawalInfo,
    WithdrawalEdit
  },
  methods: {
    showEdit: function () {
      this.info = false
      this.edit = true
      this.ebtn = false
    },
    showInfo: function (info) {
      this.info = info
      this.edit = false
      this.ebtn = true
    }
  },
  watch: {}
}
</script>
<style lang="less">
@import "./settlement.less";
</style>

<style scoped>
.withdrawal-body {
  position: relative;
  padding: 0 40px;
  overflow: hidden;
  font-size: 14px !important;
  font-weight: bold;
}

.info-row {
  padding: 15px 0;
}
</style>
