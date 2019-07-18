<template>
  <div class="user-avator-dropdown">
    <Dropdown @on-click="handleClick">
      <!-- <Badge :dot="!!messageUnreadCount"></Badge> -->
      <Avatar :src="avatarUrl" />
      <span class="new_user_name">{{userName}}</span>
      <Icon :size="18" type="md-arrow-dropdown"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem name="message" v-show="false">
          <!-- 消息中心<Badge style="margin-left: 10px" :count="messageUnreadCount"></Badge> -->
          <router-link to="/personal/personal">个人中心</router-link>
        </DropdownItem>
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import "./user.less";
import { mapActions } from "vuex";
import { getUserInfo } from "@/api/user.js";
export default {
  name: "User",
  created() {
    var id = this.getCookie("userId");
    console.log(id);
    getUserInfo(id).then(res => {
      const {data} = res.data
      this.UserInfo = data
      this.avatarUrl = data.header
      this.userName = data.name
    });
    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      localStorage.setItem("UserInfo", JSON.stringify(this.UserInfo));
    });
  },
  data() {
    return {
      UserInfo:{},
      avatarUrl:'',
      userName:''
    };
  },
  methods: {
    getCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
      }
      return "";
    },
    ...mapActions(["handleLogOut"]),
    logout() {
      this.handleLogOut().then(() => {
        this.$router.push({
          name: "login"
        });
      });
    },
    message() {
      this.$router.push({
        name: "message_page"
      });
    },
    handleClick(name) {
      switch (name) {
        case "logout":
          this.logout();
          break;
        case "message":
          this.message();
          break;
      }
    }
  }
};
</script>
<style scoped>
.new_user_name {
  font-size: 12px;
  color: #595959;
  margin: 0px 5px 0px 5px;
}
</style>
