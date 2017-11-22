<template>
  <div class="product-cp" @click.stop="getProductData()">
    <div class="img">
      <img :src="product.image" width="100%">
    </div>
    <div class="info-wrapper">
      <div class="title" v-if="product.title != '' && product.title.indexOf(' ') != -1">
        <span class="marks"
              v-if="product.marks != null"
              :style="{ background:product.marks.bgColor, color: product.marks.color }">{{product.marks.content}}</span>
        <span class="title-marks" v-for="item in product.title.split(' ')">{{item}}</span>
      </div>
      <div class="title2" v-if="product.title != '' && product.title.indexOf(' ') == -1">
        <span class="detail-title">{{product.title}}</span>
      </div>
      <div class="price-wrapper">
        <span class="price">&yen;{{product.price}}</span>
        <span class="collectNum pull-right">
          {{product.collectNum}}
          <i class="icon icon-collect"></i>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    props: {
      product: {
        type: Object,
        default: {}
      }
    },
    computed: {
      isShowDetail () {
        return this.$store.state.isShowDatail
      }
    },
    methods: {
      getProductData () {
        this.showDetail()
        var id = Math.ceil(Math.random() * (5 - 1) + 1)
        let self = this
        // 获取单凭数据
        this.$axios.get('./api/shop/product/0' + id)
          .then((res) => {
            res = res.data
            if (res.error === 0) {
              self.$store.state.detail = res.data
            }
          })
          .catch((error) => {
            alert(error)
          })
      },
      showDetail () { // 展示详情页面
        this.$store.state.isShowDatail = true
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "../../common/less/common.less";

  .product-cp {
    display: inline-block;
    background: #ffffff;
    border: 1px solid rgba(7, 17, 27, 0.1);
    border-radius: 4px;
    width: 182px;
    .img {
      height: 260px;
      overflow: hidden;
      width: 100%;
      img {
        border-radius: 4px 4px 0 0;
      }
    }
    .info-wrapper {
      padding: 8px;
      border-radius: 0 0 4px 4px;
      line-height: 2em;
      font-family: "Helvetica Neue";
      width: 100%;
      .title {
        overflow: hidden;
        text-align: left;
        height: 58px;
        .marks {
          display: inline;
          color: #333333;
          border-radius: 2px;
          padding: 1px 2px;
          margin: 5px 5px 5px 0;
        }
        .title-marks {
          display: inline-block;
          border-radius: 2px;
          margin: 0 5px 0px 0;
          white-space: pre-wrap;
        }
      }
      .title2 {
        overflow: hidden;
        text-align: left;
        .detail-title {
          display: block;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .price-wrapper {
        font-size: 15px;
        color: #000;
        text-align: left;
        .price {
          color: @mainColor;
        }
        .collectNum {
          .icon-collect:before {
            color: #dbdbdb;
          }
        }
      }
    }
  }
</style>
