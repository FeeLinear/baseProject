<template>
  <div class="nx-fw-index">
    <i class="el-icon-loading"></i>正在进行身份验证，请稍候...
  </div>
</template>

<script>
import store from "@/store/index";
import CommonUtil from "@/utils/commonUtil";

export default {
  name: "fwIndex",
  created() {
    const _href = window.location.href;
    console.log("[iframe] _href ", _href);
    let queryObj = {};
    let _key = "";
    let _val = "";
    const _hashP2 = _href.split("?")[1]; // jstoken=42342&h5url=wewrewr
    if (!_hashP2) {
      this.$router.push({ path: "/404" });
      return;
    }
    const paramsList = _hashP2.split("&"); // ['jstoken=42342', 'h5url=wewrewr']
    if (paramsList instanceof Array && paramsList.length > 0) {
      paramsList.map((items) => {
        if (items.indexOf("=") >= 0) {
          _key = items.split("=")[0];
          _val = items.split("=")[1].replace("#/loading", "");
          queryObj[_key] = decodeURIComponent(_val);
        }
      });
    }
    // 根据jsToken 等， 获取用户信息  然后决定跳转
    //此为非标项目， 直接跳转
    this.saveAndGo(queryObj);
  },
  methods: {
    handleNoAccess() {
      // 无有效权限
      this.$confirm("无权限！", "系统提示", {
        confirmButtonText: "重新登录",
        cancelButtonText: "关闭",
        type: "warning",
      })
        .then(() => {
          CommonUtil.fwLogout(); // 主框架注销登录，跳转登录页
        })
        .catch(() => {});
    },
    handleAccessTo(path) {
      this.$router.push({ path });
    },
    saveAndGo(queryObj) {
      let NEXT_ROUTER = "";
      store.dispatch("LoadUserInfo", queryObj).then(() => {
        console.log("[LoadUserInfo] queryObj ", queryObj);
        if (typeof queryObj.busH5Url === "string") {
          if (queryObj.busH5Url.indexOf("#") >= 0) {
            const _urls = queryObj.busH5Url.split("#");
            NEXT_ROUTER = _urls[1] ? _urls[1] : "/404";
          } else {
            NEXT_ROUTER = queryObj.busH5Url;
          }
        } else {
          NEXT_ROUTER = "/404";
        }
        this.handleAccessTo(NEXT_ROUTER);
        // 此处还需要根据token查询保存用户权限后续控制菜单按钮权限
      });
    },
    getPermission(queryObj) {
      let NEXT_ROUTER = "";
      store.dispatch("LoadUserInfo", queryObj).then(() => {
        console.log("[LoadUserInfo] queryObj ", queryObj);
        if (typeof queryObj.busH5Url === "string") {
          if (queryObj.busH5Url.indexOf("#") >= 0) {
            const _urls = queryObj.busH5Url.split("#");
            NEXT_ROUTER = _urls[1] ? _urls[1] : "/404";
          } else {
            NEXT_ROUTER = queryObj.busH5Url;
          }
        } else {
          NEXT_ROUTER = "/404";
        }
        this.$dataService({
          url: "/web/v1/user/auth",
          method: "post",
          params: {},
        })
          .then((rs) => {
            const respData = rs.data.respData;
            console.log("[/access/check] respData ", respData);
            if (respData && respData.length) {
              const funcNoList = respData.map((item) => item.funcNo);
              store
                .dispatch("InitPermissionCodeList", funcNoList) // 初始化用户权限列表
                .then(() => {
                  this.handleAccessTo(NEXT_ROUTER);
                })
                .catch(() => {
                  this.handleNoAccess();
                });
            } else {
              this.handleNoAccess();
            }
          })
          .catch((err) => {
            // 统一异常处理
            console.log("[/access/check] err ", err);
            this.handleAccessTo("/err");
          });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.nx-fw-index {
  font-size: 14px;
  width: 100%;
  height: 100%;
  line-height: 100%;
  text-align: center;
  vertical-align: middle;
  padding-top: 35px;

  i {
    margin-right: 5px;
  }
}
</style>

