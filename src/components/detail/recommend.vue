<template>
  <div class="recommend" v-if="recommend">
    <div class="header">为你推荐</div>
    <div class="img-wrapper" ref="imageWrapper">
      <ul ref="ulWrapper">
        <li v-for="item in recommend">
          <img :src="item.image" class="pic" width="92">
          <span class="price">{{item.price}}</span>
        </li>
      </ul>
    </div>
    <div class="circle-wrapper">
      <span class="circle" v-for="(item, index) in circleNum" :class="{'active': currentIndex == index}"></span>
    </div>
  </div>
</template>
<script>
  import IScroll from 'iscroll/build/iscroll-probe'
  export default {
    data () {
      return {
        currentIndex: 0
      }
    },
    computed: {
      recommend () {
        return this.$store.state.detail.recommend
      },
      circleNum () {
        var arr = []
        var length = this.$store.state.detail.recommend.length
        var num = 8
        for (var i = 0; i < length; i++) {
          if (i % num === 0) {
            arr.push(i)
          }
        }
        return arr
      }
    },
    methods: {
      initUL () {
        let length = this.recommend.length
        let UL = this.$refs.ulWrapper
        let imgWidth = UL.firstElementChild.getElementsByClassName('pic')[0].offsetWidth
        let marginLeft = 3 * 2
        UL.style.width = parseInt(length / 2) * (imgWidth + marginLeft) + 'px'
      },
      initScrollTemplate () {
        this.initUL()
        let translateWidth = this.$refs.imageWrapper.clientWidth
        if (this.$refs.imageWrapper) {
          this.imageScroll = new IScroll(this.$refs.imageWrapper, {
            scrollX: true,
            scrollY: false,
            hScrollbar: false,
            vScrollbar: false,
            vScroll: false
          })
        }
        this.imageScroll.on('scroll', function () {
          console.log(translateWidth + 'px' + this.y)
        }, {passive: true})
      }
    },
    watch: {
      recommend (val) {
        if (val) {
          this.$nextTick(() => {
            this.initScrollTemplate()
          })
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .recommend {
    background: #ffffff;
    margin-top: 5px;
    padding: 0 5px;
    .header {
      padding: 15px 10px;
      font-size: 1.2em;
      font-weight: 500;
    }
    .img-wrapper {
      width: 100%;
      overflow: hidden;
      padding-bottom: 15px;
      ul {
        text-align: center;
        li {
          display: inline-block;
          .pic {
            border-radius: 5px;
            margin: 10px 3px;
          }
          .price {
            display: block;
            font-size: 1.1em;
            color: #000000;
          }
        }
      }
    }
    .circle-wrapper {
      width: 100%;
      padding: 10px;
      text-align: center;
      .circle {
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: rgba(0, 0, 0, .4);
        margin: 5px;
        .active {
          background: #f60;
        }
      }
    }
  }
</style>
