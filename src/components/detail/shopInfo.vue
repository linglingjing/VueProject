<template>
  <div class="shop-info" v-if="shopInfo">
    <div class="name-wrapper">
      <div class="left">
        <img :src="shopInfo.shopLogo" class="shop-logo">
        <span class="name">{{shopInfo.name}}</span>
      </div>
      <div class="right">
        <a href="javascript:;">
          <span class="icon icon-plus"></span>
          收藏
        </a>
      </div>
    </div>
    <div class="score-wrapper">
      <ul class="left">
        <li>
          <span class="sells">{{Math.round(shopInfo.cSells / 10000).toFixed(1)}}万</span>
          总销量
        </li>
        <li>
          <span class="goods">{{shopInfo.cGoods}}</span>
          全部宝贝
        </li>
      </ul>
      <ul class="right" v-if="shopInfo.score">
        <li v-for="item in shopInfo.score">
          {{item.name}}
          <span class="score">{{item.score}}</span>
          <span class="icon icon-rise"></span>
        </li>
      </ul>
    </div>
    <div class="btn-wrapper">
      <ul>
        <li><a href="javascript:;">进店逛逛</a></li>
        <li><a href="javascript:;">全部商品</a></li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      shopInfo: {
        type: Object
      }
    },
    methods: {
      getShopID () {
        this.$store.state.shopId = this.shopInfo.shopId
      }
    },
    watch: {
      shopInfo (val) {
        if (val) {
          this.$nextTick(() => { // 等待整个页面渲染完毕之后再设置长度
            this.getShopID()
          })
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "../../common/less/mixin.less";
  @import "../../common/less/common.less";

  .shop-info {
    background: #ffffff;
    margin-top: 5px;
    padding: 10px;
    .name-wrapper {
      display: table;
      width: 100%;
      padding: 10px 0;
      div {
        display: table-cell;
      }
      div.left {
        img.shop-logo {
          width: 50px;
          border-radius: 50px;
          border: 1px solid #ddd;
          vertical-align: middle;
        }
        .name {
          vertical-align: middle;
          font-size: 1.2em;
          margin-left: 10px;
        }
      }
      div.right {
        text-align: right;
        a {
          color: #ffffff;
          padding: 7px 15px;
          border-radius: 20px;
          background: @mainColor;
          font-size: 1.2em;
        }
      }
    }
    .score-wrapper {
      display: table;
      width: 100%;
      ul {
        display: table-cell;
        vertical-align: middle;
        text-align: center;
        li {
          line-height: 2em;
          font-size: 1.2em;
        }
      }
      ul.left {
        border-right: 1px solid @mainBorderColor;
        li {
          display: inline-block;
          color: #999;
          font-size: 1.1em;
          span {
            display: block;
            font-size: 1.5em;
            color: #000;
          }
        }
      }
      ul.right {
        color: #666666;
        .score {
          color: #f13e3a;
        }
      }
    }
    .btn-wrapper {
      width: 100%;
      text-align: center;
      margin: 15px 0;
      ul {
        background: #f2f5f8;
        border-radius: 20px;
        width: 80%;
        margin-left: 10%;
        display: table;
        li {
          display: table-cell;
          a {
            display: block;
            padding: 7px;
            color: #666666;
            font-size: 1.3em;
          }
        }
        li:first-child {
          border-right: 1px solid #ffffff;
        }
      }
    }
  }
</style>
