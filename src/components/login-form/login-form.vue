<template>
  <!-- 监听 事件 @keydown.enter.native -->
  <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
    <!-- login 登录  -->
    <FormItem prop="phone">
      <!-- v-model.number 这里不能加number，加上判断就显示输入框里不能为空 -->
      <i-input type="text" v-model="form.phone" placeholder="请输入手机号" :maxlength="11"/>
    </FormItem>
    <!-- 暂时忽略验证码 -->
    <!-- <FormItem prop="validationBbox" class="validationBbox">
    <Input type="text" v-model="form.validation" placeholder="验证码" class="validation"/>
    生成图片验证码的插件   请求后台返回来的是一张图片
    <s-identify :identifyCode="form.identifyCode" class="prompt"></s-identify>
    </FormItem> -->
    <!-- login 手机验证码 -->
    <FormItem prop="password">
      <i-input type="text" v-model="form.password" placeholder="请输入手机验证码" :maxlength="6">
        <!-- 倒计时 -->
        <Button slot="append" @click="getCode" :disabled="!form.show">
          {{form.validateName}}
          <span v-show="form.show"></span>
          <span v-show="!form.show" class="count">{{form.count}}秒后重发</span>
        </Button>
      </i-input>
    </FormItem>
    <FormItem style="text-align:center;">
      <span>
        登录即表示您同意
        <a href="/user_agreement">用户协议</a>&nbsp;和&nbsp;
        <a href="/user_privacy">隐私条款</a>
      </span>
    </FormItem>
    <FormItem>
      <Button @click="handleSubmit" type="primary" class="login-btn" long>登录</Button>
    </FormItem>
  </Form>
</template>
<script>
import SIdentify from './identify.vue'
import { getVrtifyCode } from '@/api/index'
import { fail } from 'assert'
export default {
  name: 'LoginForm',
  components: {
    SIdentify
  },
  data () {
    return {
      userinfo: {},
      form: {
        phone: '',
        validation: '',
        password: '',
        // identifyCode: '1234', // 验证码插件
        getCode: '',
        disabled: true,
        show: true,
        count: true,
        timer: '',
        validateName: '获取验证码'
      }
    }
  },
  props: {
    phoneRules: {
      type: Array,
      default: () => {
        return [
          {
            required: true,
            // type:'number',
            message: '请输入正确的手机号码',
            trigger: 'blur'
          },
          // 手机号验证
          {
            pattern: /^((13|14|15|17|18)[0-9]{1}\d{8})$/,
            // type:'number',
            message: '请输入正确的手机号码',
            trigger: 'blur'
          }
        ]
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [
          {
            required: true,
            // type:'number',
            message: '手机验证码不能为空',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    rules () {
      return {
        phone: this.phoneRules,
        validation: this.validation,
        password: this.passwordRules
      }
    }
  },
  methods: {
    // 倒计时
    getCode () {
      const TIME_COUNT = 60 // && this.form.validation !== ''
      if (!this.form.timer && this.form.phone !== '') {
        console.log(this)
        this.form.count = TIME_COUNT
        this.form.show = false
        this.form.validateName = ''
        this.form.timer = setInterval(() => {
          if (this.form.count > 1 && this.form.count <= TIME_COUNT) {
            this.form.count--
          } else {
            this.form.validateName = '获取验证码'
            this.form.show = true
            clearInterval(this.form.timer)
            this.form.timer = null
          }
        }, 1000)
        // 验证码
        const params = {
          codeKey: '',
          identify: '',
          phone: this.form.phone,
          verifyCode: ''
        }
        getVrtifyCode(params)
          .then(res => {
            this.userinfo = res.data
          })
      }
      // }else if(this.form.phone.length !== 11){
      //   this.$Message.warning('请输入正确的手机号码！');
      //   return false
      // }else if(this.form.validation == ''){
      //   this.$Message.warning('请输入验证码！');
      //   return false}
      // }else if(this.form.validation == ''){
      //   this.$Message.warning('请输入手机号码！');
      //   return false
      // }
    }, // log报错

    // 登录：
    handleSubmit () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$emit('on-success-valid', {
            phone: this.form.phone,
            validation: this.form.validation,
            password: this.form.password
          })
        }
      })
    }
  }
}
</script>
<style lang="less">
@import "./login-form.less";
</style>
