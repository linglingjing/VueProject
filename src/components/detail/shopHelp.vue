<template>
  <div class="shop-help" v-if="showDetail">
    <img :src="showDetail.image" alt="购物帮助" width="100%">
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

</style>
