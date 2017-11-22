<template>
  <div class="detail">
    <div class="header">
      <ul v-if="titles">
        <li class="titles" v-for="(item, index) in titles">
          <span @click.stop="showDeatilInfo(index)" :class="{active: currentIndex==index}">{{item}}</span>
        </li>
      </ul>
    </div>
    <div class="content-wrapper">
      <div v-if="currentIndex==0">
        <productDetail :showDetail="showDetail"></productDetail>
      </div>
      <div v-if="currentIndex==1">
        <size :showDetail="showDetail"></size>
      </div>
      <div v-if="currentIndex==2">
        <shopHelp :showDetail="showDetail"></shopHelp>
      </div>
      <div v-if="currentIndex==3">
        <div class="list-wrapper" v-if="showDetail" v-for="item in showDetail">
          <product :product="item" class="product-item"></product>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import productDetail from '../detail/productDetail.vue'
  import size from '../detail/size.vue'
  import shopHelp from '../detail/shopHelp.vue'
  import product from '../../components/product/product.vue'
  export default {
    data () {
      return {
        titles: ['详情', '规格尺码', '购物帮助', '热卖推荐'],
        currentIndex: 0
      }
    },
    computed: {
      showDetail () {
        if (this.currentIndex === 0) {
          return this.$store.state.detail.detailInfo
        }
        if (this.currentIndex === 1) {
          return this.$store.state.detail.itemParams
        }
        if (this.currentIndex === 2) {
          return this.$store.state.detail.shopInfo.shopHelp
        }
        if (this.currentIndex === 3) {
          return this.$store.state.detail.hotRecommend
        }
      }
    },
    methods: {
      showDeatilInfo (index) {
        this.currentIndex = index
      }
    },
    components: {
      productDetail,
      size,
      shopHelp,
      product
    }
  }
</script>
<style lang="less" scoped>
  .detail {
    background: #ffffff;
    border-top: 8px solid #D2D2D2;
    .header {
      ul {
        display: table;
        width: 100%;
        li {
          display: table-cell;
          text-align: center;
          span {
            display: block;
            font-size: 1.3em;
            padding: 15px;
            color: #333333;
            .active {
              border-bottom: 2px solid #555;
              color: #000000;
            }
          }
        }
      }
    }
    .content-wrapper {
      .list-wrapper {
        margin: 0 3px 25px 10px;
        display: inline-block;
        .product-item {

        }
      }
    }
  }
</style>
