<template>
  <div class="compensate" v-if="title" @click.stop="showCompensate()">
    <ul class="part">
      <li v-for="item in title">
        <span class="icon icon-right"></span>
        <span class="name">{{item.name}}</span>
      </li>
      <li><span class="icon icon-more"></span></li>
    </ul>
  </div>
</template>
<script>
  export default {
    computed: {
      title () {
        var arr = []
        for (var i = 0; i < 3; i++) {
          arr.push(this.$store.state.detail.shopInfo.services[i])
        }
        return arr
      }
    },
    methods: {
      showCompensate () {
        this.$store.state.isShowCompensate = true
      }
    }
  }
</script>
<style lang="less" scoped>
  .compensate {
    padding: 1.5em 0;
    ul.part {
      display: table;
      width: 100%;
      li {
        display: table-cell;
        span {
          display: inline-block;
          vertical-align: middle;
        }
        span.icon {
          font-size: 1.3em;
        }
        span.name {
          font-size: 1.1em;
          color: #666;
        }
      }
    }
  }
</style>
