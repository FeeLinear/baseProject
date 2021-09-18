<template>
  <!-- :style="{height:boxHeight+'px'}" -->
  <div
    class="commonTree"
    :style="{width:treeWidth+'px','height':`calc(100% - 30px - ${getButtonLength*80+(isShowInput?0:40)}px)`}"
  >
    <div class="nx-common-filter" v-show="isShowInput">
      <el-input
        @blur="(e) => (orgTreeFilterText = e.target.value)"
        @change="(val) => (orgTreeFilterText = val)"
        v-model="orgTreeFilterText"
        suffix-icon="el-icon-search"
        clearable
        :size="size"
        :placeholder="placeholder"
      >
        <template slot="prefix">
          <span
            class="el-input-size-mini"
            @click="$phSpt.click"
          >{{$phSpt.ifSpt || orgTreeFilterText ? '' : '输入关键字'}}</span>
        </template>
      </el-input>
    </div>
    <!-- <div class="nx-common-container devided" :style="{height:boxHeight+'px',width:treeWidth+'px'}" v-loading="orgTreeLoading"> -->
    <div
      :class="['nx-common-org-tree', 'js-tpl-scroll',{dl_tree:!showCheckbox}, {dt_tree:showCheckbox},{pt0:!isShowInput},{m_top:isShowInput}]"
      :style="{'height':`calc(100% - ${getButtonLength*80+(isShowInput?55:0)}px)`}"
    >
      <el-tree
        v-if="showCheckbox"
        key="code"
        :data="orgTreeData"
        :filter-node-method="orgTreeNodeFilter"
        node-key="code"
        ref="orgTreeRef"
        :expand-on-click-node="true"
        highlight-current
        :default-expand-all="false"
        :show-checkbox="showCheckbox"
        :default-expanded-keys="defaultkeys"
        @check="orgTreeNodeClick"
        :check-strictly="!iscCheckStrictly"
        :props="{
                        children: 'children',
                        label: 'name',
                    }"
        empty-text="暂无数据"
      >
        <div slot-scope="{ node, data }" :class="['tree_text_color',{'isXm':data.checked},]">
          <span :title="data.name">{{data.name}}</span>
        </div>
      </el-tree>
      <el-tree
        v-else
        key="code"
        :data="orgTreeData"
        :filter-node-method="orgTreeNodeFilter"
        @node-click="orgTreeNodeClick"
        node-key="code"
        ref="orgTreeRef"
        :expand-on-click-node="false"
        highlight-current
        :default-expand-all="false"
        :show-checkbox="showCheckbox"
        :default-expanded-keys="defaultkeys"
        check-strictly
        :props="{
                    children: 'children',
                    label: 'name',
                    disabled:'disabled',
                }"
        empty-text="暂无数据"
      >
        <div slot-scope="{ node, data }" :class="['tree_text_color',{'isproject':data.isProject}]">
          <span :title="data.name">{{data.name}}</span>
        </div>
      </el-tree>
      <!-- :style="{width:treeWidth+'px','min-width':treeWidth+'px','max-width':treeWidth+'px'}"  -->
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
// import * as orgService from '@/api/orgService'
import GlobalStoreService from "@/utils/auth";

export default {
  name: "OrgTree",
  // props: ['defaultChecked', 'showCheckbox', 'orgTreeData', 'boxChecked', 'isShowInput', 'treeWidth', 'boxHeight', 'contentHeight', 'code', 'iscCheckStrictly'],
  props: {
    placeholder: {
      type: String,
      required: false,
      default: "请输入组织或项目名称"
    },
    defaultChecked: {
      // 默认选择第一个,defaultChecked为true则不选中
      type: Boolean,
      default: false
    },
    showCheckbox: {
      type: Boolean,
      default: false
    },
    orgTreeData: {
      type: Array,
      default: []
    },
    boxChecked: {
      type: Object / Array
      // default:[],
    },
    isShowInput: {
      type: Boolean,
      default: true
    },
    treeWidth: {
      type: Number,
      default: 230
    },
    boxHeight: {
      type: Number,
      default: 300
    },
    code: {
      type: String,
      default: ""
    },
    iscCheckStrictly: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      // 组织树
      orgTreeKey: +new Date(),
      orgTreeLoading: false, // 组织树loading
      // orgTreeData: null,
      CheckStrictly: true, // 是否全选子节点,true 为不全选
      orgTreeCurKey: null,
      orgTreeFilterText: "", // 组织树过滤条件
      defaultkeys: [], // 默认展开的树数组
      treeHeight: "", // 树的高度
      getButtonLength: 0
    };
  },

  computed: {
    currentUser() {
      return GlobalStoreService.get("currentUser");
    }
  },
  mounted() {
    this.orgTreeFilterText = "";
    // this.treeHeight = (window.innerHeight - 200) +'px'
    // this.queryOrgTreeData() // 预加载...
    this.getdefaultKeyId();
  },
  methods: {
    // 获取树前两层keyid
    getdefaultKeyId() {
      if (!this.code) {
        this.$nextTick(() => {
          for (let i = 0; i < this.orgTreeData.length; i++) {
            this.defaultkeys.push(this.orgTreeData[i].code);
          }
        });

        if (!this.defaultChecked && !this.showCheckbox) {
          // 默认选择第一个,defaultChecked为true则不选中
          // alert(this.defaultChecked)
          this.$nextTick(() => {
            if (this.orgTreeData[0] && this.orgTreeData[0].code) {
              this.$refs.orgTreeRef.setCurrentNode({
                code: this.orgTreeData[0].code
              }); // 默认高亮
              this.$refs.orgTreeRef.setChecked(
                this.orgTreeData[0].code,
                true,
                true
              );
              this.$emit("node-clickList", this.orgTreeData[0]);
              this.$emit("node-click", this.orgTreeData[0]);
            }
          });
        }
      } else {
        console.log(12, this.code);
        this.$nextTick(() => {
          this.defaultkeys = [this.code];

          this.$refs.orgTreeRef.setCurrentNode({
            code: this.code
          });
          this.$refs.orgTreeRef.setChecked(this.code, true, true);

          const nodeclickList = this.$refs.orgTreeRef.getCheckedNodes();
          // this.$emit('node-clickList', nodeclickList[0])
          this.$emit("node-click", nodeclickList[0]);
        });
      }
    },
    // 左侧组织树， start
    orgTreeNodeFilter(value, data) {
      // 权限树过滤
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },

    orgTreeNodeClick(obj, node, cp) {
      // console.log(obj, node, cp)
      const _self = this;
      if (obj && obj.code) {
        // alert(3)
        // console.log(node)
        // console.log(obj)
        if (
          (node.checked && this.showCheckbox) ||
          (node.checkedKeys && node.checkedKeys.indexOf(obj.code) < 0)
        ) {
          _self.$refs.orgTreeRef.setChecked(obj.code, false, true);
          // console.log( _self.$refs.orgTreeRef.getCheckedKeys())
          const nodeclickList = _self.$refs.orgTreeRef.getCheckedNodes();
          _self.$emit("node-clickList", nodeclickList); // 返回选中keyId数组
        } else {
          _self.$emit("node-click", obj);

          _self.$nextTick(() => {
            _self.$refs.orgTreeRef.setCurrentNode({
              code: obj.code
            }); // 默认高亮
            _self.$refs.orgTreeRef.setChecked(obj.code, true, true);

            // console.log( _self.$refs.orgTreeRef.getCheckedKeys())
            const nodeclickList = _self.$refs.orgTreeRef.getCheckedNodes();

            _self.$emit("node-clickList", nodeclickList); // 返回选中keyId数组
            // console.log('[orgTreeNodeClick] _self.$refs.orgTreeRef.getCurrentNode |', _self.$refs.orgTreeRef.getCurrentNode())
          });
        }
      } else {
        this.$message({
          type: "error",
          message: "查询失败，数据异常！"
        });
        _self.$refs.orgTreeRef.setCurrentKey(null);
        // _self.$refs.orgTreeRef.setChecked( obj.id,true,true)
        _self.$emit("node-click", null);
      }
    },
    setChecked(code) {
      console.log(code, "code");
      this.$refs.orgTreeRef.setChecked(code, true, true);
      this.$refs.orgTreeRef.setCurrentNode({ code });
    }
  },
  watch: {
    // iscCheckStrictly(nv,ov){
    //    this.CheckStrictly = nv
    //     this.$nextTick(()=>{

    //         alert(this.CheckStrictly)
    //     })

    // },
    orgTreeFilterText(nv, ov) {
      this.$refs.orgTreeRef.filter(nv);
    },
    orgTreeData(val, oval) {
      if (val) {
        this.orgTreeFilterText = "";
        this.getdefaultKeyId();
      }
    },
    code(newCode, oldCode) {
      if (newCode) {
        this.$nextTick(() => {
          this.$refs.orgTreeRef.setCurrentNode({
            code: newCode
          }); // 默认高亮
          this.$refs.orgTreeRef.setChecked(newCode, true, true);
        });
      }
    },
    boxChecked(val, oval) {
      this.$refs.orgTreeRef.setCheckedKeys(val);
      this.$refs.orgTreeRef.setCheckedNodes(val);

      this.defaultkeys = val;
      this.$nextTick(() => {
        const nodeclickList = this.$refs.orgTreeRef.getCheckedNodes();
        this.$emit("node-clickList", nodeclickList); // 返回选中keyId数组
      });
    }
  }
};
</script>


<style lang="scss" scoped>
.commonTree {
  position: relative;
  clear: both;
  height: 100%;
  padding: 15px;
  background: #fff;
  box-sizing: border-box;
  // min-width: 1.5rem;
  overflow: hidden;
  .nx-common-org-tree {
    // position: relative;
    // width: 100%;
    overflow: auto;
    overflow-y: auto;
    overflow-x: auto;
    .el-tree {
      // position: absolute;
      font-size: 13.5px;
      min-width: 100%;
      display: inline-block;
      // overflow: auto;
      .isXm {
        color: #4e84fe;
      }
      .isproject {
        color: #0ab6d4;
      }
    }
  }
}
</style>
<style lang="scss">
.nx-common-org-tree {
  .el-tree__empty-text {
    position: absolute;
  }
}
.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
  background: #f5f5f5;
}
</style>