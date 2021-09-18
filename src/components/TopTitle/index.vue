<template>
    <div class="topTitle">
        <label :class="{'listClass':isListTitle}"></label>
        <span :style="{fontSize:Size+'px'}">{{title}}</span>
    </div>
</template>
<script>
export default {
  props: {
    title: {
      required: true,
      type: String
    },
    Size: {
      type: Number,
      default: 16
    },
    isListTitle: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {

    }
  },
  mounted() {

  }
}
</script>
<style scoped >
  .listClass{
      height: 25px;
       margin: 0 5px 0px 18px;
  }
.topTitle {
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    color: #262626;
    background: #fff;
    margin-bottom: 5px;
    /* box-shadow: 6px 0 18px rgba(144,164,183,.56); */
}
  label{
          width:4px;
          height: 18px;
          background:#4E84FE;
          display: inline-block;
          margin-right: 5px;
          vertical-align: middle
      }
   span{
       vertical-align: middle
   }   
</style>

