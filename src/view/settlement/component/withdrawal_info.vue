<template>
  <div>
    <row class="info-row">
      <i-col :xs="{ span: 3}">
        <span class="info-label">支付宝姓名</span>
      </i-col>
      <i-col :xs="{ span: 21}">
        <span>{{alipayName}}</span>
      </i-col>
    </row>
    <row class="info-row">
      <i-col :xs="{ span: 3}">
        <span class="info-label">支付宝号码</span>
      </i-col>
      <i-col :xs="{ span: 21}">
        <span>{{alipay}}</span>
      </i-col>
    </row>
  </div>

</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'withdrawal_info',
  data () {
    return {
    }
  },
  computed: {
    alipay () {
      return this.$store.state.user.alipay
    },
    alipayName () {
      return this.$store.state.user.alipayName
    }
  },
  methods: {}
}
</script>
