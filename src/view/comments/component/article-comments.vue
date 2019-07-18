<template>
  <div>
    <Card shadow dis-hover :bordered="false" >
      <ButtonGroup size="large">
          <Button size="large" :type="type.primary" v-on:click="articleType(0)">
              别人给我的评论
          </Button>
          <Button size="large" :type="type.default" v-on:click="articleType(1)">
              我给别人的评论
          </Button>
      </ButtonGroup>
      <Input search slot="extra" placeholder="请输入图文标题关键字" style="width:300px" />
    </Card>
    <ForOther v-show="showFlag === 1"/>
    <ForMe v-show="showFlag === 0"/>
  </div>
</template>
<script>
import ForOther from './forOther.vue'
import ForMe from './forMe.vue'
export default {
  name: 'article-comments',
  data () {
    return {
      showFlag: 0,
      type: {
        primary: 'primary',
        default: 'default'
      }
    }
  },
  components: {
    ForOther,
    ForMe
  },
  methods: {
    articleType: function (type) {
      if (type === 0) {
        this.type.primary = 'primary'
        this.type.default = 'default'
      } else if (type === 1) {
        this.type.primary = 'default'
        this.type.default = 'primary'
      }
      this.showFlag = type
    }
  }
}
</script>
