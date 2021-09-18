<template>
  <div class="app-container">
    <div class="body-content">
      <div class="filter-container">
        <el-row>
          <el-col :span="2" class="col-label">
            销方企业名称
          </el-col>
          <el-col :span="4">
            <el-input type="text" :size="$FormInputSize"></el-input>
          </el-col>
          <el-col :span="2" class="col-label">
            <span>项目名称</span>
          </el-col>
          <el-col :span="4">
            <el-input type="text" :size="$FormInputSize"></el-input>
          </el-col>
          <el-col :span="2" class="col-label">
            <span>车场名称</span>
          </el-col>
          <el-col :span="4">
            <el-input type="text" :size="$FormInputSize"></el-input>
          </el-col>
          <el-col :span="2" class="col-label">
            <span>发票号码</span>
          </el-col>
          <el-col :span="4">
            <el-input type="text" :size="$FormInputSize"></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2" class="col-label">支付时间</el-col>
          <el-col :span="10">
            <el-date-picker :clearable="false" :size="$FormInputSize" type="datetimerange" start-placeholder="开始时间" end-placeholder="结束时间" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
          </el-col>
          <el-col :span="2" class="col-label">开票日期</el-col>
          <el-col :span="10">
            <el-date-picker :clearable="false" :size="$FormInputSize" type="datetimerange" start-placeholder="开始时间" end-placeholder="结束时间" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2" class="col-label">
            购方名称
          </el-col>
          <el-col :span="4">
            <el-input type="text" :size="$FormInputSize"></el-input>
          </el-col>
          <el-col :span="2" class="col-label">
            <span>手机号</span>
          </el-col>
          <el-col :span="4">
            <el-input type="text" :size="$FormInputSize"></el-input>
          </el-col>
          <el-col :span="12" class="col-label">
            <el-button type="primary" :size="$FormInputSize">查询</el-button>
            <el-button type="default" :size="$FormInputSize">重置</el-button>
            <el-button type="primary" :size="$FormInputSize">导出</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="table-container">
        <el-table key="__001" :data="list" v-loading="listLoading" element-loading-text="数据加载中" header-row-class-name="j__table" fit stripe :size="$FormInputSize">

          <el-table-column align="center" label="发票代码" prop="invoiceCode"></el-table-column>
          <el-table-column align="center" label="发票号码" prop="invoiceNumber"></el-table-column>
          <el-table-column align="center" label="发票金额" prop="invoiceAmount"></el-table-column>
          <el-table-column align="center" label="销方企业名称" prop="companyName"></el-table-column>
          <el-table-column align="center" label="购买方名称" prop="buyerName"></el-table-column>
          <el-table-column align="center" label="开票日期" prop="openInvoiceDate"></el-table-column>
          <el-table-column align="center" label="手机号" prop="telephone"></el-table-column>
          <el-table-column align="center" label="邮箱" prop="email"></el-table-column>
          <el-table-column align="center" label="支付订单号" prop="orderNumber"></el-table-column>
          <el-table-column align="center" label="项目名称" prop="projectName"></el-table-column>
          <el-table-column align="center" label="车场名称" prop="parkingLotName"></el-table-column>
          <el-table-column align="center" label="车牌号码" prop="carNumber"></el-table-column>
          <el-table-column align="center" label="应收金额" prop="receivableAmount"></el-table-column>
          <el-table-column align="center" label="实收金额" prop="actualAmount"></el-table-column>
          <el-table-column align="center" label="优惠金额" prop="discountAmount"></el-table-column>
          <el-table-column align="center" label="入场时间" prop="inTime"></el-table-column>
          <el-table-column align="center" label="支付时间" prop="payTime"></el-table-column>
          <el-table-column align="center" label="开票渠道" prop="invoicingChannel"></el-table-column>
          <el-table-column align="center" label="支付渠道" prop="paymentChannel"></el-table-column>
          <el-table-column align="center" label="操作" fixed="right" width="120">
            <template slot-scope="scope">
              <el-button type="text">下载发票</el-button>
              <el-button type="text">红冲</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination-container">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="query.pageNum" :page-sizes="[10, 20, 30, 50]" :page-size="query.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
const initQuery = {
  pageIndex: 1,
  pageSize: 10,
  companyName: "",
  projectName: "",
  parkingLotName: "",
  invoiceNumber: "",
  payTimeStart: "",
  payTimeEnd: "",
  openInvoiceStart: "",
  openInvoiceEnd: "",
  customerName: "",
  telephone: "",
}
export default {
  data() {
    return {
      query: {...initQuery},
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
        url: "/order/openQuery",
        method: "post",
        params: this.query,
      })
        .then((re) => {
          this.listLoading = false;
          console.log(this.query, re.respData);
          this.list = re.respData.data
        })
        .catch(() => {
          console.log(111)
          this.list = [];
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
    this.getList()
  },
};
</script>

<style lang="scss" scoped>
</style>
