<template>
    <el-dialog title="巡更APP下载" :close-on-click-modal="false" :visible.sync="ifShow" width="800px">
        <el-row class="nx-share-app-title">
            <el-col :span="12">
                Android
            </el-col>
            <el-col :span="12">
                IOS
            </el-col>
        </el-row>
        <el-row class="nx-share-app">
            <el-col :span="12">
                <img :src="AndroidPng">
            </el-col>
            <el-col :span="12">
                <img :src="IOSPng">
            </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
            <el-button @click="ifShow = false">取消</el-button>
        </div>
    </el-dialog>
</template>

<script>
import AndroidPng from './img/Android.png'
import IOSPng from './img/IOS.png'

export default {
  name: 'ShareApp',
  props: {
    //
  },
  data() {
    return {
      ifShow: true,
      AndroidPng,
      IOSPng
    }
  },
  watch: {
    ifShow(nv, ov) {
      if (!nv) {
        this.$emit('close-dialog')
      }
    }
  },
  computed: {
    //
  },
  methods: {
    //
  }
}
</script>

<style lang="scss" scoped>
.nx-share-app-title{
    text-align: center;
    font-weight: bold;
}
.nx-share-app{
    text-align: center;
    margin: 15px 0;

    img{
        width: 300px;
    }
}
.nx-share-app-tips{
    color: #909399
}
</style>
