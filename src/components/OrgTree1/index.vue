<template>
    <div>
        <div class="nx-common-filter">
            <el-input @blur="(e) => (orgTreeFilterText = e.target.value)" 
                @change="(val) => (orgTreeFilterText = val)" 
                v-model="orgTreeFilterText" 
                suffix-icon="el-icon-search" 
                size="mini"
                class="filter-item"  
                placeholder="输入关键字">
                <template slot="prefix">
                    <span class="el-input-size-mini" @click="$phSpt.click">{{$phSpt.ifSpt || orgTreeFilterText ? '' : '输入关键字'}}</span>
                </template>
            </el-input>
        </div>
        <div class="nx-common-container" v-loading="orgTreeLoading">
            <div class="nx-common-org-tree js-tpl-scroll">
                <el-tree
                    :key="orgTreeKey"
                    :data="orgTreeData"
                    :filter-node-method="orgTreeNodeFilter"
                    @node-click="orgTreeNodeClick"
                    node-key="id"
                    ref="orgTreeRef"
                    :expand-on-click-node="false"
                    highlight-current 
                    default-expand-all 
                    :props="{
                        children: 'children',
                        label: 'orgName'
                    }"
                    empty-text="暂无数据">
                </el-tree>
            </div>
        </div>
    </div>
</template>

<script>
import * as orgService from '@/api/orgService'
import GlobalStoreService from '@/utils/auth'

export default {
  name: 'OrgTree',
  props: {
    //
  },
  data() {
    return {
      // 组织树
      orgTreeKey: +new Date(),
      orgTreeLoading: false, // 组织树loading
      orgTreeData: null,
      orgTreeCurKey: null,
      orgTreeFilterText: '' // 组织树过滤条件
    }
  },
  watch: {
    orgTreeFilterText(nv, ov) {
      this.$refs.orgTreeRef.filter(nv)
    }
  },
  computed: {
    currentUser() {
      return GlobalStoreService.get('currentUser')
    }
  },
  mounted() {
    this.queryOrgTreeData() // 预加载...
  },
  methods: {
    // 左侧组织树， start
    orgTreeNodeFilter(value, data) { // 权限树过滤
      if (!value) return true
      return data.orgName.indexOf(value) !== -1
    },
    orgTreeNodeClick(obj, node, cp) {
      const _self = this
      if (obj && obj.id) {
        _self.$emit('node-click', obj.id)
        _self.$nextTick(() => {
          _self.$refs.orgTreeRef.setCurrentNode({
            id: obj.id
          }) // 默认高亮
          // console.log('[orgTreeNodeClick] _self.$refs.orgTreeRef.getCurrentNode |', _self.$refs.orgTreeRef.getCurrentNode())
        })
      } else {
        this.$message({
          type: 'error',
          message: '查询失败，数据异常！'
        })
        _self.$refs.orgTreeRef.setCurrentKey(null)
        _self.$emit('node-click', null)
      }
    },
    queryOrgTreeData() { // 查询组织树 data
      const _self = this
      const params = {
        accountNo: _self.currentUser.jsCurAccNo,
        funcNo: _self.currentUser.funcNo
      }
      _self.orgTreeLoading = true
      orgService.queryOrgTreeData(params)
        .then(rs => {
          _self.orgTreeLoading = false
          const respData = rs.data.respData
          _self.orgTreeData = respData

          /**
                     * 测试数据， start
                     */
          // _self.orgTreeData.push({
          //     id: 91,
          //     orgName: '测试'
          // })
          /**
                     * 测试数据， end
                     */

          // console.log('[orgService] queryOrgTreeData respData |', respData)
          if (respData instanceof Array && respData.length > 0) { // 有组织关系
            _self.orgTreeNodeClick(respData[0])
          } else { // 无组织信息
            _self.orgTreeNodeClick(null)
          }
        })
        .catch(() => {
          _self.orgTreeLoading = false
        })
    }
    // 左侧组织树， end
  }
}
</script>

<style lang="scss" scoped>
.nx-common-filter{
    text-align: left;
    position: absolute;
    z-index: 999;
    background-color: #fff;
}
.nx-common-container{
    display: inline-block;
    position: absolute;
    width: 225px;
    height: 480px;
    padding: 0;
    border-right: 1px solid #c0c4cc;
    overflow: hidden;
}
</style>
