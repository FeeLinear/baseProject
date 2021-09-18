<template>
    <div style="min-height: 280px;" v-loading="loading" element-loading-text="正在导入...">
        <el-upload
            class="tpl-upload-frame"
            action="/jfw-portal/function/importExcel"
            :headers="uploadRqHeader"
            auto-upload
            ref="uploadRef"
            :show-file-list="false"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :before-upload="beforeUpload"
            accept=".xlsx,.xls">
            <el-button
                slot="trigger"
                icon="el-icon-upload"
                size="small"
                type="primary">
                上传
            </el-button>
        </el-upload>
        <a href="../static/jfw-portal/functionImportTemplate.xlsx" download="批量导入功能模板.xlsx">(下载模板)</a>
    </div>
</template>

<script>
import CommonUtil from '@/utils/commonUtil'

export default {
  data() {
    return {
      loading: false
    }
  },
  computed: {
    uploadRqHeader() {
      return CommonUtil.getRqHeader()
    }
  },
  methods: {
    uploadSuccess(res, file) {
      this.loading = false
      // console.log('[uploadSuccess suc] res |', res)
      if (res.success) {
        this.$notify({
          message: '导入成功！',
          type: 'success'
        })
      } else { // 导入失败
        this.$message({
          message: res.respMsg ? res.respMsg : '导入失败！',
          type: 'error'
        })
      }
    },
    uploadError(res, file) {
      this.loading = false
      // console.log('[uploadError err] res |', res)
      this.$message({
        message: '导入失败！',
        type: 'error'
      })
    },
    beforeUpload(file) {
      const filename = file.name
      const SPLIT_TAG = '.'
      let type = ''
      if (typeof filename === 'string' && filename.indexOf(SPLIT_TAG) >= 0) {
        type = filename.split(SPLIT_TAG)[1]
      }
      const isxls = (type === 'xls') || (type === 'xlsx')
      // console.log('[uploadError err] isxls |', isxls, file)
      if (!isxls) {
        this.$message({
          message: '请上传.xlsx/.xls文件！',
          type: 'warning'
        })
        return false
      }
      this.loading = true
      return isxls
    }
  }
}
</script>

<style lang="scss" scoped>
.tpl-upload-frame{
    display: inline-block;
}
</style>
