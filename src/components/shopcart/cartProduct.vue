<template>
  <div class="pro-item">
    <span class="check-box"
          :class="{active: isSelected}"
          @click.stop="selectProduct((parseInt(cartProduct.price) / 100).toFixed(2), cartProduct.buyCount)"
    ></span>
    <div class="pro-info">
      <img :src="cartProduct.img" width="100px">
      <div class="extra">
        <p class="title">{{cartProduct.title}}</p>
        <p class="info">
          <span class="style">颜色:{{cartProduct.style}}</span>
          <span class="size">尺码:{{cartProduct.size}}</span>
        </p>
        <p class="price-count">
          <span class="price">&yen;{{(parseInt(cartProduct.price) / 100).toFixed(2)}}</span>
          <span class="count">&times; {{cartProduct.buyCount}}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapActions} from 'vuex'
  export default {
    props: {
      cartProduct: Object
    },
    data () {
      return {
        isSelected: false,
        price: 0
      }
    },
    computed: {},
    methods: {
      ...mapActions(['getPrice']),
      selectProduct (price, buyCount) {
        this.isSelected = !this.isSelected
        this.price = price * buyCount
        this.getPrice({price: parseInt(this.price), flag: this.isSelected})
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../common/less/common.less";
  @import "../../common/less/mixin.less";

  .pro-item {
    padding: 15px 10px;
    .check-box {
      display: inline-block;
      width: 20px;
      height: 20px;
      border-radius: 50px;
      border: 1px solid #999999;
      &.active {
        background: url("../../common/img/OK.png") no-repeat center;
        background-size: contain;
        border: none;
      }
    }
    .pro-info {
      display: inline-block;
      max-width: calc ( 100% - 32px );
      vertical-align: middle;
      padding: 15px 0;
      .border-bottom(@mainBorderColor);
      img {
        margin: 0 5px;
      }
      .extra {
        display: inline-block;
        max-width: 248px;
        vertical-align: middle;
        .info {
          color: #999999;
          font-size: 1em;
          margin: 15px 0 25px 0;
          span {
            margin-right: 15px;
          }
        }
        .price-count {
          display: table;
          font-size: 1.2em;
          width: 100%;
          span {
            display: table-cell;
          }
          .count {
            text-align: right;
          }
        }
      }
    }
  }
</style>
