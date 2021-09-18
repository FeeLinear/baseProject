<template>
  <div>
    <el-radio-group v-model="timeType" :size="$FormInputSize">
      <el-radio-button label="year">年</el-radio-button>
      <el-radio-button label="season">季</el-radio-button>
      <el-radio-button label="month">月</el-radio-button>
      <el-radio-button label="week">周</el-radio-button>
      <el-radio-button label="day">日</el-radio-button>
    </el-radio-group>
  </div>
</template>

<script>
export default {
  data(){
    return {
      timeType:""
    }
  }
};
</script>

<style lang="scss" scoped>
</style>