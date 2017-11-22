<template>
  <div class="compensate" v-if="compensate">
    <transition name="show">
      <div class="layer" @click.stop="hideCompensate()" v-show="isShowCompensate"></div>
    </transition>
    <transition name="vertical-slide">
      <div class="all-wrapper" v-show="isShowCompensate">
        <div class="title">服务说明</div>
        <ul class="all">
          <li v-for="item in compensate">
            <span class="icon icon-right"></span>
            <span class="name">{{item.name}}</span>
            <p class="declare">{{item.detail}}</p>
          </li>
        </ul>
        <div class="btn" @click.stop="hideCompensate()">完成</div>
      </div>
    </transition>
  </div>
</template>
<script>
  export default {
    props: {
      compensate: Array
    },
    computed: {
      isShowCompensate () {
        return this.$store.state.isShowCompensate
      }
    },
    methods: {
      hideCompensate () {
        this.$store.state.isShowCompensate = false
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "../../common/less/mixin.less";
  @import "../../common/less/common.less";

  .compensate {
    padding: 1.5em 0;
    height: 100%;
    .border-1px(@mainBorderColor);
    .title {
      padding: 15px 0;
      text-align: center;
      font-size: 1.4em;
      font-weight: 600;
      margin-bottom: 15px;
      .border-bottom(@mainBorderColor);
    }
    .all-wrapper {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      z-index: 3000;
      background: #ffffff;
      &.vertical-slide-enter-active, &.vertical-slide-leave-active {
        transition: all .6s cubic-bezier(1.0, 0.5, 0.8, 1.0);
      }
      &.vertical-slide-enter {
        transform: translateY(50%);
      }
      &.vertical-slide-leave-to {
        transform: translateY(50%);
      }
      ul.all {
        padding: 10px 20px;
        height: 320px;
        overflow: auto;
        li {
          margin-bottom: 25px;
          font-family: 'Microsoft Yahei', Helvetica, 'Hiragino Sans GB', '微软雅黑', Arial, sans-serif;
          span {
            display: inline-block;
            vertical-align: middle;
            font-size: 1.2em;
            color: #000;
            margin-bottom: 5px;
          }
          p {
            padding-left: 20px;
            font-size: 1.1em;
            color: #7d7575;
          }
        }
      }
      .btn {
        padding: 12px 0;
        width: 100%;
        color: #ffffff;
        font-size: 1.3em;
        text-align: center;
        background: @mainColor;
      }
    }
    .layer {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 3000;
      background: rgba(0, 0, 0, .4);
      &.show-enter-active, &.show-leave-active {
        transition: all .4s ease;
      }
      &.show-enter, &.show-leave-to {
        opacity: 0;
      }
    }
  }
</style>
