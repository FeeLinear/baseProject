<template>
  <section class="wrap-orgs">
    <el-input v-model="searchStr" type="text" size="mini" class="wrap-input" placeholder="请输入组织名称" suffix-icon="el-icon-search" clearable>
    </el-input>
    <div class="wrap-tree">
      <el-tree ref="orgTree" v-loading="loadingTree" :data="orgs" :props="{
          label: 'orgName',
          children: 'children',
          disabled: 'disabled',
        }" node-key="orgCode" check-strictly :filter-node-method="filterNode" default-expand-all :expand-on-click-node="false" :default-checked-keys="checkedKeys" @node-click="handleNodeClick" check-on-click-node>
        <span class="jsst-org-node" slot-scope="{ node, data }">
          <span :title="data.orgName">{{ data.orgName }}</span>
        </span>
      </el-tree>
      <!-- 
              :default-expanded-keys="[selectedOrg.orgCode]"
              highlight-current
              show-checkbox
              accordion
            -->
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["rootOrgCode", "disabNodeCode", "org"],
  computed: {
    ...mapGetters(["currentUser"])
  },
  data() {
    return {
      loadingTree: false,
      orgs: [],
      selectedOrg: {},
      checkedKeys: [],
      searchStr: "",
    };
  },
  watch: {
    disabNodeCode(nv, ov) {
      this.handleDisabNode();
    },
    searchStr(val) {
      this.$refs.orgTree.filter(val);
    },
    selectedOrg() {
      if (
        this.selectedOrg &&
        (this.selectedOrg.orgCode || 0 === this.selectedOrg.orgCode)
      ) {
        this.$emit("org-select", this.selectedOrg);
      }
    },
    org(nv, ov) {
      console.log("Orgs org changed, nv:", nv, ", ov:", ov);
      // if(nv && (nv.orgCode || 0 === nv.orgCode)) {
      //   this.selectNode(nv.orgCode);
      // }
    },
  },
  methods: {
    handleDisabNode() {
      console.log("handle disab Node trigger");
      let nodes = _.cloneDeep(this.orgs);
      this.disableNodeBelow(nodes, this.disabNodeCode);
      this.orgs = nodes;
    },
    disableNodeBelow(nodes, disabRootCode) {
      if (nodes && nodes.length > 0) {
        var i = 0;
        for (i = 0; i < nodes.length; i++) {
          var node = nodes[i];
          if (disabRootCode === node.orgCode) {
            node["disabled"] = true;
          }
          var _children = node.children;
          if (_children && _children.length > 0) {
            if (disabRootCode === node.orgCode) {
              this.disableNode(_children);
            } else {
              this.disableNodeBelow(_children, disabRootCode);
            }
          }
        }
      }
      return nodes;
    },
    disableNode(nodes) {
      if (nodes && nodes.length > 0) {
        var i = 0;
        for (i = 0; i < nodes.length; i++) {
          var node = nodes[i];
          node["disabled"] = true;
          var _children = node.children;
          if (_children && _children.length > 0) {
            this.disableNode(_children);
          }
        }
      }
      return nodes;
    },
    /**
     * 根据resourceCode查找节点
     * @param {*} val
     * @param {*} nodes
     * @param {*} key
     */
    findNode(val, nodes, key) {
      var _node = null;
      if (nodes && nodes.length > 0) {
        var i = 0;
        for (i = 0; i < nodes.length; i++) {
          var node = nodes[i];
          if (val == node[key]) {
            _node = node;
            break;
          } else {
            var _children = node.children;
            if (_children && _children.length > 0) {
              var result = this.findNode(val, _children, key);
              if (result) {
                _node = result;
                break;
              }
            }
          }
        }
      }
      return _node;
    },
    selectNode(orgCode) {
      let _node = this.findNode(orgCode, this.orgs, "orgCode");
      console.log(`orgTree findNode:${orgCode}, _node:`, _node);
      if (_node && (_node.orgCode || 0 === _node.orgCode)) {
        this.$refs.orgTree.setCheckedKeys([_node.orgCode]);
        this.selectedOrg = _node;
      } else {
        this.$refs.orgTree.setCheckedKeys([this.rootOrgCode]);
        this.selectedOrg = this.findNode(
          this.rootOrgCode,
          this.orgs,
          "orgCode"
        );
      }
    },
    fetchTree() {
      if(this.orgs && this.orgs.length){
        return;
      }
      var params = {
        functionNo: this.currentUser.funcNo
      };
      this.loadingTree = true;
      this.$dataService({
        method: "post",
        url: "/web/v1/eval-report/orz-tree",
        params,
      }).then(
        (json) => {
          console.log("[queryOrganizeTree], json:", json);
          this.loadingTree = false;
          let { success, respCode, respData, respMsg } = json.data;
          if (success) {
            let orgs = [...respData];
            this.preOrgData(orgs)
            this.orgs = orgs;
            if (this.disabNodeCode) {
              this.handleDisabNode();
            }
            // this.selectNode(
            //   this.org && (this.org.orgCode || 0 === this.org.orgCode)
            //     ? this.org.orgCode
            //     : this.rootOrgCode
            // );
            this.selectNode(
              this.orgs[0] && this.orgs[0].orgCode
            );
          } else {
            this.$message.error(respMsg);
          }
        },
        (err) => {
          this.loadingTree = false;
          this.$message.error("网络繁忙");
        }
      );
    },
    preOrgData(list) {
      list.forEach((item) => {
        if(item.projectList && item.projectList.length){
          if(!item.children){
            item.children = []
          }
          item.projectList.forEach(pro => {
            item.children.push({
              orgCode: pro.projectNo,
              orgName: pro.projectName,
              isProject: true
            })
          })
        }
        if(item.children){
          this.preOrgData(item.children)
        }
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.orgName.indexOf(value) !== -1;
    },
    handleNodeClick(o, node, comp) {
      console.log("[handleNodeClick], o:", o, ", node:", node);
      if (o["disabled"]) {
        this.$refs.orgTree.setCheckedKeys([this.org.orgCode]);
        return false;
      } else {
        this.selectedOrg = Object.assign({}, o);
        this.$refs.orgTree.setCheckedKeys([o.orgCode]);
      }
    },
  },
  mounted() {
    // console.log('[Orgs] mounted')
    //this.fetchTree();
  },
};
</script>

<style lang="scss">
.wrap-orgs {
  height: 100%;
  .wrap-input {
    box-sizing: border-box;
    padding-bottom: 10px;
    > input {
      background-color: transparent;
    }
    .el-input__inner {
      height: 30px;
      line-height: 30px;
    }
    .el-input__suffix {
      .el-input__icon {
        height: 30px;
        line-height: 30px;
      }
    }
  }
  .wrap-tree {
    border: 1px solid #e8efff;
    box-sizing: border-box;
    max-height: 400px;
    padding: 0;
    overflow: auto;
    .el-tree {
      background-color: transparent;
      .el-tree-node {
        > .el-tree-node__content {
          user-select: none;
        }
        /* > .el-tree-node__children {
          overflow: unset; */ /* 水平滚动
        } */
        &[aria-checked] {
          > .el-tree-node__content {
            /* background-color: #409eff;
            color: #ffffff; */
            background-color: #e1e7ef;
            color: #4e84fe;
            user-select: none;
            > .el-tree-node__expand-icon {
              /* background-color:#e1e7ef;
              color: #4e84fe; */
              &.is-leaf {
                color: transparent;
              }
            }
            /* >.jsst-org-node {
              display: inline-block;
              height: 26px;
              line-height: 26px;
              background-color:#e1e7ef;
              color: #4e84fe;
            } */
          }
        }
        &[aria-disabled] {
          color: #c0c4cc;
        }
      }
    }
  }
}
</style>