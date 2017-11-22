<template>
  <div class="size-detail" v-if="showDetail">
    <ul class="size-table" v-if="tableInfo && tableInfo!= null">
      <li v-for="item in tableInfo">
        <span v-for="data in item">{{data}}</span>
      </li>
    </ul>
    <div v-if="sizeImage">
      <img v-for="item in sizeImage" :src="item" width="100%">
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      showDetail: Object
    },
    computed: {
      sizeImage () {
        return this.showDetail.info.images
      },
      tableInfo () {
        return this.showDetail.rule.tables
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../common/less/mixin.less";
  @import "../../common/less/common.less";
  .size-detail{
    .size-table{
      display: table;
      width: 100%;
      margin: 10px;
      border-collapse:separate;
      border-spacing:10px 15px;
      li{
        display: table-row;
        span{
          display: table-cell;
          font-size: 1.2em;
          color: #666666;
        }
        span:first-child{
          text-align: left;
        }
      }
      li:first-child {
        span:not(:first-child){
          color: @mainColor;
        }
      }
    }
  }
</style>
