<template>
  <div class="pgc-checkout-setting">
    <div class="edit-data-info">
      <row>
        <i-col span="12">
          <Form ref="form" :model="withdrawalForm" :rules="rules" :label-width="100">
            <FormItem label="支付宝姓名" prop="alipayName">
              <i-input v-model="withdrawalForm.alipayName" placeholder="支付宝姓名"></i-input>
            </FormItem>
            <FormItem label="支付宝账号" prop="alipay">
              <i-input v-model="withdrawalForm.alipay" placeholder="请输入支付宝账号"></i-input>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSubmit()">提交</Button>
              <Button @click="cancelModifyPersonal()" style="margin-left: 8px">取消</Button>
            </FormItem>
          </Form>
        </i-col>
        <i-col span="12">

          <div class="edit-demo">
            <div class="checkout-title">示例：</div>
            <div class="info-box">
              <div>
                <div class="row info-row">
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 info-title">支付宝姓名</div>
                  <div class="col-xs-18 col-sm-18 col-md-18 col-lg-18 info-content">张三</div>
                </div>
                <div class="row info-row">
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 info-title">支付宝账号</div>
                  <div class="col-xs-18 col-sm-18 col-md-18 col-lg-18 info-content">440102198001021230</div>
                </div>
              </div>
            </div>
            <div class="checkout-title">提示：</div>
            <div class="info-box">
              <ul class="pgc-error-text demo-hint">
                <li>支付宝账号和姓名必须一致</li>
              </ul>
            </div>
          </div>
        </i-col>
      </row>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'
export default {
  name: 'withdrawal_edit',
  inject: ['reload'],
  data () {
    return {
      withdrawalForm: {
        alipayName: this.$store.state.user.alipayName,
        alipay: this.$store.state.user.alipay
      }
    }
  },
  props: {
    alipayNameRule: {
      type: Array,
      default: () => {
        return [
          {
            required: true,
            message: '请输入支付宝姓名',
            trigger: 'blur'
          }
        ]
      }
    },
    alipayRule: {
      type: Array,
      default: () => {
        return [
          {
            required: true,
            message: '请输入支付宝账号',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    ...mapActions(['updateAlipayCashInfo']),
    handleSubmit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          let alipay = this.$refs.form.model.alipay
          let alipayName = this.$refs.form.model.alipayName
          this.updateAlipayCashInfo({
            alipay,
            alipayName
          }).then(() => {
            this.$Modal.success({
              title: '提现设置',
              content: '提现设置成功',
              onOk: () => {
                this.$emit('cancelModifyPersonal', true)
              }
            })
          })
        } else {
          this.$Message.error('修改失败!')
        }
      })
    },
    cancelModifyPersonal: function () {
	  this.$emit('cancelModifyPersonal', true)
	  // 这个是当点击修改页面然后修改值以后点击取消返回info页面，在进来的时候值已经被修改了，所以要重置一下form的信息
	  this.$refs.form.resetFields()
    }
  },
  computed: {
    rules () {
      return {
        alipay: this.alipayRule,
        alipayName: this.alipayNameRule
      }
    },
    updateAlipay () {
      return this.$store.state.user.alipay
    }
  }
}
</script>
<style scoped>
.pgc-form .submit-area {
  text-align: center;
}
</style>
