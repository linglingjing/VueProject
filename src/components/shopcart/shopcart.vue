<template>
  <div class="shopcart-cp">
    <ul class="top-bar">
      <li><span class="icon icon-back" v-show="isShowCart" @click.stop="hideCart()"></span></li>
      <li><h3>购物车</h3></li>
      <li><span class="edit-btn">编辑</span></li>
    </ul>
    <div class="cart-wrapper">
      <div class="list-wrapper">
        <div class="shop">
          <ul class="list" ref="shopUL">
            <li v-for="(item, index) in products">
              <cartProduct :cartProduct="item"></cartProduct>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="cart-bottom-tool">
      <ul class="item">
        <li>
          <span class="check-box"></span><label>全选</label>
        </li>
        <li>
          <span class="total-price">总价:<strong>&yen;{{totalPrice}}</strong></span>
          <span class="carriage">不含运费、优惠扣减</span>
        </li>
        <li>
          <a href="javascript:;" class="balance">去结算</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import cartProduct from './cartProduct.vue'
  export default {
    props: {
      products: Array
    },
    data () {
      return {
        totalNum: 0,
        isSelectAll: false,
        isSelectShop: false,
        isSelected: false,
        currentIndex: null
      }
    },
    computed: {
      ...mapGetters(['totalPrice']),
      isShowCart () {
        return this.$store.state.isShowCart
      }
    },
    methods: {
      ...mapActions(['RemoveEventListenerFn']),
      hideCart () {
        this.$store.state.isShowCart = false
      },
      removeEventLinstener () {
        this.RemoveEventListenerFn({obj: window})
      }
    },
    components: {
      cartProduct
    },
    created () {
      this.$nextTick(() => {
        this.removeEventLinstener()
      })
    }
  }
</script>

<style scoped lang="less">
  @import "../../common/less/common.less";
  @import "../../common/less/mixin.less";

  .shopcart-cp {
    background: #ffffff;
    .top-bar {
      position: fixed;
      top: 0;
      height: 40px;
      z-index: 100;
      line-height: 40px;
      display: table;
      width: 100%;
      padding: 10px 0;
      background: #ffffff;
      li {
        display: table-cell;
        vertical-align: middle;
        padding: 0 10px;
        span {
          vertical-align: middle;
          color: #555555;
        }
        .icon-back:before {
          font-size: 1.5em;
          color: #555555;
        }
        .edit-btn {
          font-size: 20px;
        }
        h3 {
          flex: 1 1 auto;
          text-align: center;
          vertical-align: middle;
          margin: 0;
          padding: 0;
        }
      }
      li:last-child {
        text-align: right;
      }
    }
    .cart-wrapper {
      position: absolute;
      top: 50px;
      height: 100%;
      width: 100%;
      overflow: auto;
      border-top: 8px solid #eee;
      .list-wrapper {
        background: #ffffff;
        .shop {
          .shop-name {
            width: 100%;
            padding: 15px 0;
            .border-bottom(@mainBorderColor);
            .check-box {
              display: inline-block;
              width: 20px;
              height: 20px;
              border-radius: 50px;
              border: 1px solid #999999;
              margin: 0 10px;
              vertical-align: middle;
              &.active {
                background: url("../../common/img/OK.png") no-repeat center;
                background-size: contain;
              }
            }
            label {
              font-size: 1.3em;
              margin: 0;
              vertical-align: middle;
            }
          }
          .list {
            display: table;
            li {
              display: table-row;
              vertical-align: middle;
              font-size: 1.1em;
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
            }
          }
        }
      }
    }
    .cart-bottom-tool {
      position: absolute;
      bottom: 20px;
      width: 100%;
      background: #ffffff;
      .item {
        width: 100%;
        padding: 0;
        margin: 0;
        li {
          display: inline-block;
          vertical-align: middle;
          width: 96% / 3;
        }
        li:first-child {
          font-size: 1.3em;
          .check-box {
            display: inline-block;
            width: 20px;
            height: 20px;
            border-radius: 50px;
            border: 1px solid #999999;
            margin: 0 10px;
            vertical-align: middle;
            &.active {
              background: url("../../common/img/OK.png") no-repeat center;
              background-size: contain;
            }
            label {
              margin: 0;
              vertical-align: middle;
            }
          }
        }
        li:nth-child(2) {
          margin-right: 5px;
          span {
            display: block;
            font-size: 1.05em;
            padding-top: 5px;
          }
          .total-price {
            text-align: left;
            color: @mainColor;
            strong {
              font-style: normal;
              font-weight: bold;
              font-size: 1.1em;
            }
          }
        }
        li:last-child {
          .balance {
            display: block;
            background: @mainColor;
            color: #ffffff;
            font-size: 1.3em;
            padding: 18px 0;
            text-align: center;
          }
        }
      }
    }
  }
</style>
