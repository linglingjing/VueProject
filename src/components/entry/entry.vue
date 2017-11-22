<template>
  <div class="entry-cp">
    <img v-for="item in entry" :src="item.image" width="100%">
  </div>
</template>

<script>
  export default{
    props: {
      entry: {
        type: Array
      }
    }
  }
</script>
<style scoped lang="less">
  .entry-cp{
    margin-top: 5px;
  }
</style>
