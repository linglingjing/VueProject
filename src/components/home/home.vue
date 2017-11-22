<template>
  <div class="home-cp">
    <div class="header">
      <div ref="searchWrapper" class="search">
        <search></search>
      </div>
      <carousel class="carousel" :banner="homeData.carousel"></carousel>
      <div class="info-wrapper">
        <ul class="info-ul">
          <li class="info-item"><span class="icon icon-circle"></span>全场包邮</li>
          <li class="info-item"><span class="icon icon-zheng"></span>先付赔款</li>
          <li class="info-item"><span class="icon icon-wubianxing"></span>7天无忧退</li>
          <li class="info-item"><span class="icon icon-collect"></span>退货补贴</li>
        </ul>
      </div>
    </div>
    <channel class="channel" :channel="homeData.channel"></channel>
    <entry class="entry" :entry="homeData.entry"></entry>
    <popularing class="popularing" :popularing="homeData.popular"></popularing>
    <div class="product-wrapper">
      <div class="product-title">
        <i class="icon icon-diamond-01"></i>
        <span class="title">流行单品</span>
      </div>
      <div class="products">
        <div class="product-item" v-for="item in popProducts.popProducts">
          <product :product="item" @click=""></product>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import search from '../search/search.vue'
  import carousel from '../carousel/carousel.vue'
  import channel from '../channel/channel.vue'
  import entry from '../entry/entry.vue'
  import popularing from '../popularing/popularing.vue'
  import product from '../product/product.vue'
  import {mapActions} from 'vuex'
  export default {
    name: 'homeComponent',
    props: {
      homeData: {
        type: Object,
        default: {}
      }
    },
    data () {
      return {
        popProducts: {}
      }
    },
    methods: {
      ...mapActions(['createID', 'AddEventListenerFn']),
      getPopProducts () {
        let self = this
        // 获取数据
        this.$axios.get('./api/popularProducts')
          .then((res) => {
            res = res.data
            if (res.error === 0) {
              self.popProducts = res.data
            }
          })
          .catch((error) => {
            alert(error)
          })
      },
      callback () {
        let self = this
        if (this.$refs.searchWrapper) {
          if (window.scrollY > 5) {
            self.$refs.searchWrapper.style.transition = 'background .5s ease'
            self.$refs.searchWrapper.style.background = '#fff'
          } else {
            self.$refs.searchWrapper.style.transition = 'background .5s ease'
            self.$refs.searchWrapper.style.background = 'transparent'
          }
        }
      },
      setSearchStyle () {
        this.AddEventListenerFn({obj: window, callback: this.callback})
      }
    },
    components: {
      search,
      carousel,
      channel,
      entry,
      popularing,
      product
    },
    watch: {
      homeData (val) {
        if (val) {
          this.$nextTick(() => {
            this.setSearchStyle()
          })
        }
      }
    },
    created () {
      this.getPopProducts()
      this.$nextTick(() => {
        this.setSearchStyle()
      })
    },
    mounted () {
      this.setSearchStyle()
    }
  }
</script>

<style scoped lang="less">
  .home-cp {
    background: rgba(210, 210, 210, 0.54);
    .header {
      height: 260px;
      position: relative;
      background: #ffffff;
      .search {
        position: fixed;
        top: 0;
        z-index: 99;
        width: 100%;
      }
      .carousel {
        position: absolute;
        top: 0;
      }
      .info-wrapper {
        position: absolute;
        bottom: 0;
        width: 100%;
        background: #ffffff;
        .info-ul {
          display: table;
          width: 100%;
          padding: 12px 0;
          margin: 0;
          .info-item {
            display: table-cell;
            text-align: center;
            color: #93999f;
            font-size: 14px;
            .icon {
              display: inline-block;
              padding-right: 5px;
            }
          }
        }
      }
    }
    .channel {
      background: #ffffff;
    }
    .product-wrapper {
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      margin: 5px 0 40px 0;
      background: #ffffff;
      .product-title {
        padding: 15px 10px;
        font-size: 15px;
        i {
          font-size: 16px;
          vertical-align: middle
        }
        span {
          vertical-align: middle
        }
      }
      .products {
        text-align: center;
        .product-item {
          margin: 0 3px 25px 10px;
          display: inline-block;
        }
      }
    }
  }
</style>
