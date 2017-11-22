<template>
  <div class="carousel">
    <ul class="carousel-ul" v-if="banner" ref="carouselUL">
      <li class="carousel-item" v-for="item in banner.concat([banner[0]])">
        <img :src="item.image" width="100%">
      </li>
    </ul>
    <!--  // 创建小圆点-->
    <div class="circle-wrapper" ref="circleWrapper" v-if="banner">
      <transition-group name="list" tag="div">
        <span class="circle"
              v-for="(item, index) in banner"
              :key="index"
              :class="{'active': index == imgIndex}"></span>
      </transition-group>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions, mapMutations} from 'vuex'
  export default {
    props: {
      banner: {
        type: Array
      }
    },
    computed: {
      ...mapGetters(['imgIndex'])
    },
    methods: {
      ...mapActions(['startCarousel', 'listenTransitionEnd', 'transitionAgain']),
      ...mapMutations(['RECEIVE_LENGTH']),
      callback () {
        this.transitionAgain({obj: this.$refs.carouselUL})
      },
      initCarousel () {
        let carouselUL = this.$refs.carouselUL
        this.startCarousel({obj: carouselUL, width: carouselUL.clientWidth})
        this.listenTransitionEnd({obj: carouselUL, callback: this.callback})
      }
    },
    watch: {
      banner (val) {
        if (val) {
          this.$nextTick(() => { // 等待整个页面渲染完毕之后再获取ul
            this.RECEIVE_LENGTH(this.banner.length)
            this.initCarousel()
          })
        }
      }
    },
    created: function () {
      if (this.banner) {
        this.$nextTick(() => {
          this.RECEIVE_LENGTH(this.banner.length)
          this.initCarousel()
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .carousel {
    position: relative;
    .carousel-ul {
      display: table;
      .carousel-item {
        display: table-cell;
      }
    }
    .circle-wrapper {
      width: 100%;
      height: 20px;
      text-align: center;
      position: absolute;
      bottom: 10px;
      z-index: 10;
      .circle {
        display: inline-block;
        height: 8px;
        width: 8px;
        background: #fff;
        margin: 0 8px;
        border-radius: 4px;
        &.list-enter-active, &.list-leave-active {
          transition: all 2s;
          width: 20px;
          background: #c2efb2;
        }
        &.list-enter, &.list-leave-to {
          transition: all 2s;
          width: 8px;
          background: #c2efb2;
        }
        &.active {
          width: 20px;
        }
      }
    }
  }
</style>
