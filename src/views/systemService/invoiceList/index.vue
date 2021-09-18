<template>
  <div class="app-container">
    <div class="body-section-v2">
      <el-row class="body-header">
        <el-col :span="4">
          <span class="body-header--title">评估报告</span>
        </el-col>
      </el-row>
      <div class="body-content">
        <div class="filter-container">
          <el-row>
            <el-col :span="6">
              
            </el-col>
            <el-col :span="2" style="text-align:right;white-space:nowrap;">
              <span>评估模型：</span>
            </el-col>
            <el-col :span="4">
              
            </el-col>
            <el-col :span="2" style="text-align:right;white-space:nowrap;">
              <span>物业组织：</span>
            </el-col>
            <el-col :span="4">
              
              
            </el-col>
            <el-col :span="2">
            </el-col>
          </el-row>
        </div>
        <div class="table-container">
          <el-table key="__001" :data="list" v-loading="listLoading" element-loading-text="数据加载中" header-row-class-name="j__table" fit stripe>
            
            <el-table-column align="center" label="车场名称" prop="projectName"></el-table-column>
            <el-table-column align="center" label="评估时段">
              <template slot-scope="scope">
                <span>{{scope.row.evalStartDateFst}}</span>
              </template>
            </el-table-column>
            
          </el-table>
        </div>
        <div class="pagination-container">
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="query.pageNum" :page-sizes="[10, 20, 30, 50]" :page-size="query.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: {
        pageNum: 1,
        pageSize: 10,
      },
      listLoading: false,
      total: 0,
      list: [],
    };
  },
  watch: {},
  methods: {
    handleFilter() {
      this.query.pageNum = 1;
      this.$nextTick(() => {
        this.getList();
      });
    },
    getList() {
      
      this.listLoading = true;
      this.$dataService({
        url: "/web/v1/eval-report/page",
        method: "post",
        params: this.query,
      })
        .then((rs) => {
          this.listLoading = false;
          const respData = rs.data.respData;
          this.list = respData.list;
          this.total = respData.total;
          console.log(this.query, respData.list);
        })
        .catch(() => {
          this.list = []
          this.listLoading = false;
        });
    },
    handleSizeChange(val) {
      this.query.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.query.pageNum = val;
      this.getList();
    },
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
</style>
