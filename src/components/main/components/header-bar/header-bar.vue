<template>
  <div class="header-bar">
    <div class="custom-content-con">
      <div class="logo-con">
        <img v-show="!collapsed" :src="maxLogo" key="max-logo" />
        <img v-show="collapsed" :src="minLogo" key="min-logo" />
      </div>
      <slot></slot>
    </div>
  </div>
</template>
<script>
import siderTrigger from './sider-trigger'
import customBreadCrumb from './custom-bread-crumb'
import minLogo from '@/assets/images/fnlogo.png'
import maxLogo from '@/assets/images/fnlogo.png'
import './header-bar.less'
export default {
  name: 'HeaderBar',
  components: {
    siderTrigger,
    customBreadCrumb
  },
  data () {
    return {
      minLogo,
      maxLogo

    }
  },
  props: {
    collapsed: Boolean
  },
  computed: {
    breadCrumbList () {
      return this.$store.state.app.breadCrumbList
    }
  },
  methods: {
    handleCollpasedChange (state) {
      this.$emit('on-coll-change', state)
    }
  }
}
</script>
