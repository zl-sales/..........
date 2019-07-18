<template>
  <div>
    <div class="header">
      <p class="title" style="color:#999999;fontWeight:500">
        文章状态：
        <span>
          <el-button type="text" @click="status = null" :autofocus="true">全部</el-button>
          <el-button type="text" @click="status = 'A'">已发表</el-button>
          <el-button type="text" @click="status = 'D'">未通过</el-button>
          <el-button type="text" @click="status = 'B'">草稿</el-button>
          <el-button type="text" @click="status = 'C'">审核中</el-button>
        </span>
        <el-input
          placeholder="请输入标题关键字"
          v-model="search"
          size="small"
          @change="getContentList()"
          @clear="getContentList()"
          :clearable="true"
          :select-when-unmatched="true"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </p>
      <div class="block">
        时间选择：
        <Date-picker
          @on-change="dateChange"
          :options="DatePicker"
          type="daterange"
          format="yyyy-MM-dd"
          placeholder="开始日期 - 结束日期"
          style="width: 235px"
          placement="bottom-start"
        ></Date-picker>
      </div>
    </div>
    <div class="line"></div>

    <div class="cardlist">
      <div class="card">
        <el-card class="content_card">
          <div class="title">
            共找到了
            <span class="red">{{num}}</span>条符合条件的数据
          </div>
          <template v-if="num!==0">
            <el-card class="textlist" v-for="(item,i) in list" :key="i">
              <router-link :to="'/draft/'+ item.id" class="card_title" tag="div">{{item.title}}</router-link>
              <el-tag size="small" effect="plain" type="info" v-if="item.status == 'B'">草稿</el-tag>
              <el-tag size="small" effect="plain" type="success" v-else-if="item.status == 'A'">已发表</el-tag>
              <el-tag size="small" effect="plain" type="danger" v-else-if="item.status == 'D'">未通过</el-tag>
              <el-tag
                size="small"
                effect="plain"
                type="warning"
                v-else-if="item.status == 'G' || item.status == '1' || item.status=='C'"
              >审核中</el-tag>
              <div class="card_date">{{ item.sendTime | time}}</div>
              <div class="card_btn">
                <div class="editor" v-if="item.status == 'B'">
                  <i class="el-icon-edit"></i>
                  <el-button type="text" @click="editor(item.id)" >修改</el-button>
                </div>
                <div class="delete" @click="dele(item.id)">
                  <i class="el-icon-delete"></i>
                  <el-button type="text">删除</el-button>
                </div>
              </div>
            </el-card>
          </template>
          <div class="tips" v-if="num==0">暂无更多数据</div>
        </el-card>
        <Page :total="total" class="page" :page-size="5" @on-change="changepage" v-if="num!==0" />
      </div>
    </div>
  </div>
</template>

<script>
import { NewsDetail } from '@/api/newsdetail'
import { getContentList } from '@/api/article'
import { delNews } from '@/api/delete'
export default {
  created () {
    this.getContentList()
  },
  data () {
    return {
      disable:true,
      date: null,
      search: '',
      total: 1,
      num: 0,
      card_time: '',
      list: [],
      status: null,
      Time: []
    }
  },
  watch: {
    status (newstatus, oldstatus) {
      if (newstatus !== oldstatus) {
        this.getContentList()
      }
    }
  },
  methods: {
    dateChange (daterange) {
      this.Time = daterange
      this.getContentList()
    },
    // 点击修改
    editor (id) {
      this.$router.push({
        path: '/release',
        query: { id: id }
      })
    },
    getContentList (s) {
      let nowtime = new Date().getTime()
      let userId = this.$store.state.user.userId
      let pageNo = 1
      let pageSize = 5
      let status = this.status
      let title = this.search
      getContentList({
        endDate: this.Time[1],
        pageNo,
        pageSize,
        requestDate: nowtime,
        startDate: this.Time[0],
        status,
        title,
        userId
      }).then(res => {
        const { data } = res
        this.list = data.data.list
        this.num = data.data.totalCount
        this.total = data.data.totalCount
      })
    },
    // 删除当前草稿
    dele (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        var { data } = await delNews({ infoId: id })
        if (data.code == 200) {
          this.$message.success({
            type: 'succse',
            message: '删除成功'
          })
          this.getContentList()
        }
      })
    },
    // 修改页码
    changepage (newpage) {
      let startDate = 0
      let nowtime = new Date().getTime()
      let userId = this.$store.state.user.userId
      let pageNo = newpage
      let pageSize = 5
      let status = this.status
      let title = this.search
      getContentList({
        endDate: this.Time[1],
        pageNo,
        pageSize,
        requestDate: nowtime,
        startDate: this.Time[0],
        status: status,
        title,
        userId
      }).then(res => {
        const { data } = res
        if (data.code == 200) {
          this.list = data.data.list
        }
      })
    }
  }
}
</script>

<style scoped>
@import "./content-article.less";
</style>
