<template>
  <div id="app">
    <router-view
      :homeData="homeData"
      :classifyData="classifyData"
      :mineData="mineData"
      :products="cartProducts">
    </router-view>
    <div class="bottom-nav">
      <div class="nav-item">
        <router-link to='/home'>
          <span class="icon icon-home"></span>
          <span class="text">首页</span>
        </router-link>
      </div>
      <div class="nav-item">
        <router-link to='/classify'>
          <span class="icon icon-classify"></span>
          <span class="text">分类</span>
        </router-link>
      </div>
      <div class="nav-item">
        <router-link to='/shopcart'>
          <span class="icon icon-shopping"></span>
          <span class="text">购物车</span>
        </router-link>
      </div>
      <div class="nav-item">
        <router-link to='/mine'>
          <span class="icon icon-avatar4"></span>
          <span class="text">我的</span>
        </router-link>
      </div>
    </div>

    <!--单品详情页面-->
    <transition name="slide">
      <div class="detail-wrapper" v-show="isShowDetail">
        <div class="tool-bar">
          <span class="icon icon-back" @click.stop="hideDetail()"></span>
          <span class="icon icon-share"></span>
          <span class="icon icon-shopcart" @click.stop="showCart()"></span>
        </div>
        <div class="contain-wrapper" ref="containWrapper">
          <div ref="content">
            <topImage :itemInfo="itemInfo"></topImage>
            <rating :rate="rate"></rating>
            <shopInfo :shopInfo="shopInfo"></shopInfo>
            <recommend></recommend>
            <!--<div class="drag-tags">继续拖动，查看图文详情</div>-->
            <detailInfo></detailInfo>
          </div>
        </div>
        <div class="cart-wrapper">
          <cartTool class="cart-tool"></cartTool>
        </div>
        <compensateAll class="show-compensate" :compensate="compensate" v-show="isShowCompensate"></compensateAll>
        <addToCart :skuInfo="skuInfo"></addToCart>
      </div>
    </transition>
    <transition name="slide">
      <shopCart :products="cartProducts" class="show-cart" v-show="isShowCart"></shopCart>
    </transition>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import topImage from './components/detail/topImage.vue'
  import cartTool from './components/detail/cartTool.vue'
  import rating from './components/detail/rating.vue'
  import shopInfo from './components/detail/shopInfo.vue'
  import recommend from './components/detail/recommend.vue'
  import detailInfo from './components/detail/detail.vue'
  import compensateAll from './components/detail/compensateAll.vue'
  import addToCart from './components/cart/addToCart.vue'
  import shopCart from './components/shopcart/shopcart.vue'
  export default {
    name: 'app',
    data () {
      return {
        homeData: {},
        classifyData: {},
        mineData: {}
      }
    },
    computed: {
      ...mapGetters(['cartProducts']),
      // 详情页面滑动控制
      isShowDetail () {
        return this.$store.state.isShowDatail
      },
      isShowCompensate () {
        return this.$store.state.isShowCompensate
      },
      isShowCart () {
        return this.$store.state.isShowCart
      },
      skuInfo () {
        return this.$store.state.detail.skuInfo
      },
      itemInfo () {
        return this.$store.state.detail.itemInfo
      },
      rate () {
        return this.$store.state.detail.rate
      },
      compensate () {
        return this.$store.state.detail.compensate
      }, // 超时赔付,
      shopInfo () {
        return this.$store.state.detail.shopInfo
      }
//      products () {
//        console.log(this.$store)
//       return this.$store.cart.cartProducts
//      }
    },
    methods: {
      hideDetail () { // 隐藏详情页面
        this.$store.state.isShowDatail = false
        // 清空vuex中的detail信息
        this.$store.state.detail = []
      },
      showCart () {
        this.$store.state.isShowCart = true
      },
      getData () {
        let self = this
        // 首页数据
        this.$axios.get('./api/home')
          .then((res) => {
            res = res.data
            if (res.error === 0) {
              self.homeData = res.data
            }
          })
          .catch((error) => {
            alert(error)
          })
        // 分类数据
        this.$axios.get('./api/classify')
          .then((res) => {
            res = res.data
            if (res.error === 0) {
              self.classifyData = res.data
            }
          })
          .catch((error) => {
            alert(error)
          })
        // “我的” 数据
        this.$axios.get('./api/mine')
          .then((res) => {
            res = res.data
            if (res.error === 0) {
              self.mineData = res.data
            }
          })
          .catch((error) => {
            alert(error)
          })
      }
    },
    components: {
      topImage,
      cartTool,
      rating,
      shopInfo,
      recommend,
      detailInfo,
      compensateAll,
      addToCart,
      shopCart
    },
    created () {
      this.getData()
    }
  }
</script>

<style scoped lang="less">
  @import "common/css/icomoon.css";
  @import "common/less/common.less";

  #app {
    .bottom-nav {
      display: flex;
      position: fixed;
      bottom: 0px;
      width: 100%;
      border: 1px solid #e1e1e1;
      text-align: center;
      background: #ffffff;
      .nav-item {
        flex: 1;
        padding: 8px 0;
        & > a {
          display: block;
          text-decoration: none;
          color: #bfbfbf;
          vertical-align: middle;
          &.active {
            color: @mainColor;
            .icon:before {
              color: @mainColor;
            }
          }
          .icon {
            font-size: 26px;
            display: block;
          }
          .text {
            display: block;
            font-size: 16px;
            line-height: 15px;
            margin-left: 2px;
            padding-top: 3px;
          }
        }
      }
    }
    .detail-wrapper {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 3000;
      background: #ffffff;
      &.slide-enter-active, &.slide-leave-active {
        transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
      }
      &.slide-enter {
        transform: translateX(100%);
      }
      &.slide-leave-to {
        transform: translateX(100%);
      }
      .tool-bar {
        padding: 15px;
        position: fixed;
        width: 100%;
        background: #ffffff;
        z-index: 30;
        .icon {
          font-size: 1.7em;
        }
        .icon:nth-of-type(2) {
          position: absolute;
          right: 2em;
        }
        .icon:last-child {
          position: absolute;
          right: 10px;
        }
      }
      .contain-wrapper {
        height: 100%;
        overflow: auto;
        padding-bottom: 70px;
        background: @mainBgColor;
        .drag-tags {
          height: 70px;
          line-height: 70px;
          background: #eeeeee;
          font-size: 1.2em;
          text-align: center;
          color: #666;
        }
      }
      .cart-wrapper {
        position: fixed;
        width: 100%;
        bottom: -3px;
      }
    }
    .show-cart {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 3000;
      background: #ffffff;
      &.slide-enter-active, &.slide-leave-active {
        transition: all .4s ease;
      }
      &.slide-enter {
        transform: translateX(100%);
      }
      &.slide-leave-to {
        transform: translateX(100%);
      }
    }
  }
</style>
