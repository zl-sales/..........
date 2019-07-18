<template>
  <div class="article">
    <!-- 结算提现  收益提现 -->
    <Card shadow dis-hover :bordered="false">
      <row>
        <i-col :xs="{ span: 6}">
          <div class="earnings-dashboard-column dashboard-column">
            <div class="earnings-dashboard-title">{{earningsData.earn.title}}</div>
            <div class="earnings-dashboard-primary">{{countMoney}} 元</div>
            <div class="earnings-dashboard-secondary">{{earningsData.earn.desc}}{{checkCount}}</div>
          </div>
        </i-col>
        <!-- 表2 -->
        <i-col :xs="{ span: 6}">
          <div class="earnings-dashboard-column dashboard-column">
            <div class="earnings-dashboard-title">{{earningsData.canWithdraw.title}}</div>
            <div class="earnings-dashboard-primary">{{balanceMoney}} 元</div>
            <!-- 申请提现  点击方法-->
            <div class="earnings-dashboard-secondary">
              <a @click="withdrawalModel = true" href="#">{{earningsData.canWithdraw.desc}}</a>
            </div>
            <!-- 点击收益提现  显示收益提现 (取消/确定)是否确认提现 -->
            <Modal v-model="withdrawalModel" title>
              <p slot="header">
                <span>收益提现</span>
              </p>
              <!-- can apply cash -->
              <div>
                <row class="item">
                  <i-col span="8" class="left-label">可提现金额为:</i-col>
                  <i-col span="16">
                    <p>{{balanceMoney}} 元</p>
                  </i-col>
                </row>
                <row class="item" v-if="!existApplyCash">
                  <i-col span="24">
                    <p>帐户金额需大于1元才可申请提现。</p>
                  </i-col>
                </row>
                <row class="item" v-if="existApplyCash">
                  <i-col span="8" class="left-label">请输入本次提现金额:</i-col>
                  <i-col span="16">
                    <InputNumber :number="true" :min="1" :step="1" v-model="money" placeholder="本次提现金额" style="width:200px;"/></InputNumber>
                  </i-col>
                </row>
              </div>
              <div slot="footer">
                <Button type="default" size="large" @click="cancel">取消</Button>
                <Button v-if="existApplyCash" type="primary" size="large" @click="ok">确认提现</Button>
              </div>
            </Modal>
            <!--  表2 收益提现 提现申请已提交 等待处理  提现完成 -->
            <Modal width="360" v-model="wCompiledModal">
              <p slot="header">
                <span>收益提现</span>
              </p>
              <div style="text-align:center">
                <span class="head-text">提现申请已提交，等待银行处理</span>
                <Card shadow dis-hover :bordered="false">
                  <row>
                    <i-col span="8">
                      <span>发起提现申请</span>
                      <p class="withdrawal-label">提交申请 01-12 12:33</p>
                    </i-col>
                    <i-col span="8">
                      <span>银行处理中</span>
                      <p class="withdrawal-label">预计到账</p>
                      <p class="withdrawal-label">01-12 17:33</p>
                    </i-col>
                    <i-col span="8">
                      <span>到账成功</span>
                      <p></p>
                    </i-col>
                  </row>
                </Card>
              </div>
              <div slot="footer">
                <Button type="error" size="large">确认</Button>
              </div>
            </Modal>
          </div>
        </i-col>
        <!-- 表3 提现明细 -->
        <i-col :xs="{ span: 6}">
          <div class="earnings-dashboard-column dashboard-column">
            <div class="earnings-dashboard-title">{{earningsData.totalWithdraw.title}}</div>
            <div class="earnings-dashboard-primary">{{numFilter(countMoney - balanceMoney)}} 元</div>
            <!-- 提现明细 点击方法 -->
            <div class="earnings-dashboard-secondary">
              <a @click="searchWithdrawList('')" href="#">{{earningsData.totalWithdraw.desc}}</a>
            </div>
            <Modal v-model="withdrawalDetailModel" :footer-hide="true" width="800">
              <p slot="header">
                <span>收益提现</span>
              </p>
              <div style="text-align:center">
                <Row>
                  <i-col span="6" style="margin-top: 5px; ">
                    <span class="gray-label">日期选择</span>
                  </i-col>
                  <i-col span="18" style="text-align: left;">
                    <DatePicker type="daterange" show-week-numbers placement="bottom-end" placeholder="开始日期 - 结束日期"
                      style="width: 200px" @on-change="searchWithdrawList" v-model=withdrawalTimer></DatePicker>
                  </i-col>
                </Row>
                <Row>
                  <i-col span="24">
                    <Card shadow dis-hover :bordered="false">
                      <!-- 收益提现明细表 -->
                      <i-table :columns="wdColumns" :data="wdData" size="small" height="400"></i-table>
                      <Page v-show="false" :total="100" :current="1" @on-change="searchWithdrawList"></Page>
                    </Card>
                  </i-col>
                </Row>
              </div>
            </Modal>
          </div>
        </i-col>
        <i-col :xs="{ span: 6}">
          <div class="earnings-dashboard-column dashboard-column">
            <div class="earnings-dashboard-title">{{earningsData.recentlyWithdraw.title}}</div>
            <div class="earnings-dashboard-primary">{{latelyMoney}} 元</div>
            <div class="earnings-dashboard-secondary">
              {{latelyTime}}
            </div>
          </div>
        </i-col>
      </row>
    </Card>
    <Card shadow dis-hover :bordered="false" class="margin-top-20">
      <row>
        提现请使用本账号对应的手机号登录App， 即可轻松提现！
      </row>
    </Card>
  </div>
</template>
<script>
import {
  mapActions,
  mapGetters,
  mapState
} from 'vuex'
import Vue from 'vue'
// 想写一个公共的函数，但是页面调用报错
// import { formatDate } from "@/libs/fn";
export default {
  name: 'earnings',
  inject: ['reload'],
  data () {
    return {
      money: '', // 绑定为手动输入的金额
      timer: {},
      withdrawalTimer: '',
      withdrawalModel: false, // 2 申请提现
      withdrawalDetailModel: false, // 表3 提现明细
      wCompiledModal: false,
      countMoney: '',
      balanceMoney: '',
      myIncomeList: [],
      latelyMoney: '',
      latelyTime: '',
      checkCount: '',
      existApplyCash: false, // 是否可提现
      earningsData: {
        earn: {
          title: '累计收益',
          desc: '过审:'
        },
        canWithdraw: {
          title: '可提现金额'
        },
        totalWithdraw: {
          title: '累计提现金额',
          content: '0',
          desc: '提现明细'
        },
        recentlyWithdraw: {
          title: '最近提现'
        }
      },
      eColumns: [{
        title: '收益日期',
        key: 'createTime'
      }, {
        title: '图文过审收益',
        key: 'checkMoney'
      }, {
        title: '视频过审收益',
        key: 'readMoney'
      }, {
        title: '话题热点收益',
        key: 'clickMoney'
      }],
      // withdrawal details
      wdColumns: [{
        title: '交易单号',
        key: 'orderNumber',
        width: 320
      }, {
        title: '提现日期',
        key: 'createTime',
        width: 150
      }, {
        title: '提现金额',
        key: 'amount'
      }, {
        title: '交易状态',
        key: 'state'
      }],
      wdData: []
    }
  },
  methods: {
    numFilter (value) {
      // 截取当前数据到小数点后两位
      let realVal = parseFloat(value).toFixed(2) // num.toFixed(2)获取的是字符串
      return parseFloat(realVal)
    },
    // 申请提现
    ok () {
      // 表2
      if (this.balanceMoney >= 1) {
        // const applyMoney = this.balanceMoney;
        if (this.money > this.balanceMoney) {
          this.$Message.info('本次提现金额超出了可提现金额范围!')
          return
        }
        if (String(this.money).indexOf('.') > -1) {
          this.$Message.info('提现金额必须为整数!')
          return
        }
        if (this.money === '' || this.money === null) {
          this.$Message.info('请输入提现金额')
          return
        } else {
          this.withdrawalModel = false
        }
        let applyMoney = this.money
        this.applyCash({
          applyMoney
        }).then(() => {
          this.$Modal.success({
            title: '申请提现',
            content: '提现成功',
            onOk: () => {
              this.reload()
            }
          })
          // this.wCompiledModal = true;
        })
      } else {
        this.$Message.info('提现失败')
      }
    },
    cancel () {
      this.withdrawalModel = false
    },
    ...mapActions(['earningsInfo', 'applyCash', 'withdrawalsList']),
    // 提现明细
    searchWithdrawList (time) {
      this.withdrawalDetailModel = true
      let startDate = ''
      let endDate = ''
      if (time != null && time != '') {
        startDate = time[0]
        endDate = time[1]
        var timeRegex =
                        '^(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468[048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29)$'
        var Regex = new RegExp(timeRegex)
        if (!Regex.test(startDate)) {
          this.$Message.info('请输入合法的开始日期')
          return
        }
        if (!Regex.test(endDate)) {
          this.$Message.info('请输入合法的结束日期')
          return
        }
      }
      this.withdrawalsList({
        startDate,
        endDate
      }).then(() => {
        this.wdData = this.$store.state.earnings.withdrawalDetails
        this.wdData.filter(function (number) {
          if (number.state === 0) {
            number.state = '提现中'
          }
          if (number.state === 1) {
            number.state = '交易成功'
          }
        })
      })
    }
  },
  created: function () {},
  mounted () {
    this.earningsInfo().then(() => {
      this.countMoney = this.$store.state.earnings.countMoney
      this.balanceMoney = this.$store.state.earnings.balanceMoney
      if (this.balanceMoney >= 1) {
        this.existApplyCash = true
      }
      this.myIncomeList = this.$store.state.earnings.myIncomeList
      this.latelyMoney = this.$store.state.earnings.latelyMoney
      this.latelyTime = this.$store.state.earnings.latelyTime
      this.checkCount = this.$store.state.earnings.checkCount
    })
  },
  watch: {
    // 监听时间控件，每次重新点击的时候清除原来的数据
    withdrawalDetailModel (val, oldVal) {
      // 普通的watch监听
      this.withdrawalTimer = ''
    },
    withdrawalModel () {
      // 监听点击申请提现后清空文本框之前输入的值
      this.money = ''
    }
  },
  computed: {}
}
</script>
<style scoped>
    .article {
        background-color: #f5f7f9 !important;
    }

    .withdrawal-label {
        font-size: 12px;
        color: #999;
    }

    .dashboard-column {
        overflow: hidden;
        height: 150px;
        position: relative;
        margin: 0 7px 14px;
        padding: 25px 10px 0;
        -webkit-box-shadow: 0 0 3px #f1f1f1;
        box-shadow: 0 0 3px #f1f1f1;
        border-radius: 5px;
        -webkit-transition: -webkit-box-shadow 0.3s;
        transition: -webkit-box-shadow 0.3s;
        transition: box-shadow 0.3s;
        transition: box-shadow 0.3s, -webkit-box-shadow 0.3s;
        background: #f5f7f9;
    }
</style>
