<template>
  <section class="app-main">
    <transition name="fade-transform">
      <router-view v-if="isRouterReload"></router-view>
    </transition>
  </section>
</template>

<script>
export default {
  name: "AppMain",
  data() {
    return {
      isRouterReload: true
    };
  },
  watch: {
    $route(to, from) {
      this.isRouterReload = false;
      setTimeout(() => {
        this.isRouterReload = true;
      }, 500);
    }
  }
};
</script>

<style lang="scss" scoped>
.app-main {
  /* margin: 10px; */
  background-color: #ffffff;
  /* box-shadow:6px 0px 18px rgba(144,164,183,0.56); */
}
</style>
