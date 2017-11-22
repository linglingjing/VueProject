<template>
  <div class="channel-cp">
    <ul class="channel-ul">
      <li class="channel-item" v-for="item in channel">
        <img :src="item.image" class="img">
        <span class="channel-title">{{item.title}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default{
    props: {
      channel: {
        type: Array
      }
    }
  }
</script>

<style scoped lang="less">
  .channel-cp {
    margin-top: 5px;
    .channel-ul {
      display: table;
      width: 100%;
      padding: 20px 0;
      margin: 0;
      .channel-item {
        display: table-cell;
        text-align: center;
        .img {
          width: 80%;
        }
        .channel-title {
          display: block;
          padding-top: 15px;
          font-size: 15px;
        }
      }
    }
  }
</style>
