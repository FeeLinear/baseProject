<template>
  <div class="page__navbar">
    <el-menu class="navbar" mode="horizontal">
      <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
      <breadcrumb></breadcrumb>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img class="user-avatar" src="../../../assets/user-avatar.png">
          <span class="user-name">{{currentUser && currentUser.accountName ? currentUser.accountName : ''}}
            <i class="el-icon-caret-bottom"></i>
          </span>
        </div>
        <el-dropdown-menu class="user-dropdown" slot="dropdown">
          <el-dropdown-item>
            <span @click="logout" style="display:block;">
              <svg-icon icon-class="icon-logout" style="margin-right: 5px;" />退出登录
            </span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import auth from "@/utils/auth";

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  watch: {
    //
  },
  computed: {
    ...mapGetters(["sidebar"]),
    currentUser() {
      return auth.get("currentUser");
    }
  },
  data() {
    return {
      //
    };
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("ToggleSideBar");
    },
    logout() {
      const currentUser = this.currentUser;
      const params = {
        accountNo:
          !!currentUser && !!currentUser.accountNo ? currentUser.accountNo : ""
      };
      this.$store.dispatch("LogOut", params).then(() => {
        this.$store.dispatch("ResetPermission"); // 重置用户权限
        location.reload(); // 为了重新实例化vue-router对象 避免bug
      });
    }
  }
};
</script>

<style lang="scss">
.user-dropdown {
  top: 45px !important;
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  margin-left: 10px;
  // box-shadow: 6px 0px 18px rgba(144, 164, 183, 0.22);

  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 10px;
    .avatar-wrapper {
      cursor: pointer;
      position: relative;
      height: 50px;
      line-height: 50px;
      vertical-align: middle;
      padding: 5px;
      min-width: 80px;

      .user-avatar {
        position: relative;
        width: 40px;
        height: 40px;
        border-radius: 10px;
        vertical-align: top;
      }
      .user-name {
        display: inline-block;
        height: 50px;
        line-height: 50px;
        position: relative;
        top: -5px;
        left: 5px;
        vertical-align: top;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 50%;
        line-height: 0;
        font-size: 12px;
      }
    }
  }
}
.update-pwd-dialog {
  display: inline-block;
  width: 60%;
  min-width: 420px;
  max-width: 420px;
  text-align: left;
}
</style>

