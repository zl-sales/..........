<template>
  <row>
    <i-col span="24">
      <Card shadow dis-hover :bordered="false">
        <p slot="title">账号信息</p>
        <row class="m-accountinfo">
          <div class="m-accountinfo__body">
            <div class="m-accountinfo__tip"></div>
            <!-- personal begin -->
            <accountInfo v-show="info" :edit="edit" @modifyPersonal="showEdit"/>
            <accountEdit v-show="edit" :info="info" @cancelModifyPersonal="showInfo"/>
            <!-- personal end -->
            <div class="module">
              <div class="module__left">帐号信息</div>
              <div class="module__right">
                <div class="module__item">
                  <span class="item__label">青鸟号类型</span>
                  <div class="item__content">
                    个人
                    <span class="item__btn_edit item__btn_disabled">更改类型</span>
                  </div>
                </div>
                <div class="module__item">
                  <div class="item__label">青鸟号ID</div>
                  <div class="item__content">1621970181603341</div>
                </div>
              </div>
            </div>
            <div class="module">
              <div class="module__left">登录方式</div>
              <div class="module__right">
                <div class="module__item">
                  <div class="item__label">绑定手机</div>
                  <div class="item__content">
                    186****7535
                    <span class="item__btn_edit" @click="phoneModal = true">更换手机</span>
                    <Modal v-model="phoneModal" class-name="vertical-center-modal">
                      <p slot="header">
                        <span>手机号修改</span>
                      </p>
                      <div style="text-align:center">
                        <Card shadow dis-hover :bordered="false">
                        <Form :model="phoneForm">
                          <FormItem>
                            <Row>
                              <i-col span="6">
                                <label class="label">原手机号</label>
                              </i-col>
                              <i-col span="18">
                                <Input v-model="phoneForm.phone" size="default" disabled placeholder="166*****33"/>
                              </i-col>
                            </Row>
                          </FormItem>
                          <FormItem>
                            <Row>
                              <i-col span="6">
                                <label class="label">手机验证码</label>
                              </i-col>
                              <i-col span="13">
                                <Input v-model="phoneForm.verificationCode" size="default" placeholder="请输入短信验证码"/>
                              </i-col>
                              <i-col span="3" style="margin-left: 5px;">
                                <Button type="default" @click="ok">发送验证码</Button>
                              </i-col>
                            </Row>

                          </FormItem>
                        </Form>
                        </Card>
                      </div>
                      <div slot="footer" style="text-align: center">
                        <Button type="primary" size="large" @click="ok">下一步</Button>
                      </div>
                    </Modal>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </row>
      </Card>
    </i-col>
  </row>
</template>
<script>
import accountInfo from './component/account_info.vue'
import accountEdit from './component/account_edit.vue'

export default {
  name: 'personal',
  components: {
    accountInfo,
    accountEdit
  },
  data () {
    return {
      phoneModal: false,
      phoneForm: {
        phone: '',
        verificationCode: ''
      },
      info: true,
      edit: false
    }
  },
  methods: {
    ok () {
      this.$Message.info('Clicked ok')
    },
    showEdit: function (edit) {
      this.edit = edit
      this.info = false
    },
    showInfo: function (info) {
      this.info = info
      this.edit = false
    }
  }
}
</script>
<style lang="less">
@import "./personal.less";
</style>
<style lang="less" scoped>
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;
  .ivu-modal {
    top: 0;
  }
}
</style>
