<template>
  <div v-if="$ifJfw2Jportal">
    <app-main></app-main>
  </div>

  <div class="app-wrapper page__subsys" :class="classObj" v-else>
    <div v-if="device != 'mobile' && sidebar.opened" class="invoiceServer-logo-container">
      <i class="invoiceServer-logo"></i>
    </div>
    <div v-if="device=='mobile'&& sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
    <div v-if="!sidebar.opened" class="invoiceServer-logo-mini-container">
      <i class="invoiceServer-logo-mini"></i>
    </div>
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <navbar></navbar>
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from "./components";
import ResizeMixin from "./mixin/ResizeHandler";

export default {
  name: "layout",
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar;
    },
    device() {
      return this.$store.state.app.device;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device == "mobile"
      };
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch("CloseSideBar", { withoutAnimation: false });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: auto;
  min-height: 100%;
  width: 100%;
  background-color: #e7ecef;
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
.invoiceServer-logo-container {
  display: inline-block;
  width: 190px;
  height: 50px;
  position: absolute;
  text-align: center;
  top: 0;
  left: 0;
  background-color: #ffffff;
  border: 0;
  box-shadow: 6px 0px 18px rgba(144, 164, 183, 0.22);

  .invoiceServer-logo {
    display: inline-block;
    width: 190px;
    height: 50px;
    line-height: 50px;
    background: #ffffff url("../../assets/dashboard_logo_HD.svg") no-repeat;
    background-size: 190px 50px;
  }
}
.invoiceServer-logo-mini-container {
  display: inline-block;
  width: 46px;
  height: 50px;
  vertical-align: middle;
  position: absolute;
  text-align: center;
  top: 0;
  left: 0;
  background-color: #ffffff;
  border: 0;
  // box-shadow: 6px 0px 18px rgba(144, 164, 183, 0.22);

  .invoiceServer-logo-mini {
    display: inline-block;
    width: 46px;
    height: inherit;
    background: url("../../../favicon.png") no-repeat center;
  }
}
</style>
