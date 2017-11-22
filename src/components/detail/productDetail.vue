<template>
  <div class="show-detail" v-if="showDetail">
    <div class="text">
      <p @click.stop="test()">{{showDetail.desc}}</p>
      <p>{{showDetail.detailImage[0].desc}}</p>
      <p class="key">{{showDetail.detailImage[0].key}}</p>
    </div>
    <img v-for="item in showDetail.detailImage[0].list" :src="item" alt="详情大图" width="100%">
  </div>
</template>
<script>
  export default {
    props: {
      showDetail: Object
    }
  }
</script>

<style lang="less" scoped>
  .show-detail{
    .text{
      color: #727272;
      font-size: 1.2em;
      line-height: 1.3em;
      padding: 10px;
     .key{
       color: #000000;
       font-size: 1.1em;
     }
    }
  }
</style>
