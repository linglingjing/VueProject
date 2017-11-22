<template>
  <div class="cart-tool">
    <ul class="left">
      <li>
        <span class="icon icon-thank"></span>
        <span class="text">客服</span>
      </li>
      <li>
        <span class="icon icon-store"></span>
        <span class="text">店铺</span>
      </li>
      <li>
        <span class="icon icon-collect2"></span>
        <span class="text">收藏</span>
      </li>
    </ul>
    <ul class="right">
      <li @click.stop="showAddToCart()">加入购物车</li>
      <li>购买</li>
    </ul>
  </div>
</template>
<script>
  export default {
    methods: {
      showAddToCart () {
        this.$store.state.isAddToCart = true
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "../../common/less/common.less";
  @height: 50px;
  .cart-tool{
    width: 100%;
    height: @height + 20px;
    border-top: 1px solid rgba(3, 3, 3, 0.07);
    background: #ffffff;
    ul{
      float: left;
      margin: 0;
    }
    ul.right,ul.left{
      display: table;
      width: 50%;
      height: @height;
      li{
        display: table-cell;
        text-align: center;
      }
    }
    ul.left{
      li{
        padding: 5px 0;
        .text{
          font-size: 1.1em;
          color: #999999;
        }
        .icon{
          display: block;
          font-size: 2em;
          padding: 5px 0;
        }
      }
    }
    ul.right{
      li{
        font-size: 1.2em;
        padding: 10px 0;
        line-height: @height;
        width: 50%;
      }
      li:first-child{
        background: @addCart-btn;
        color: #333333;
      }
      li:last-child{
        background: @mainColor;
        color: #ffffff;
      }
    }
  }
</style>
