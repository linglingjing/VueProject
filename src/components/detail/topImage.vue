<template>
  <div class="topiamge-cp">
    <div class="itemInfo" v-if="itemInfo">
      <div class="image-wrapper" ref="imageWrapper">
        <div class="topImage" id="topimg" ref="topImage">
          <img v-for="item in itemInfo.topImages" :src="item" width="320">
        </div>
      </div>
      <div class="price-wrapper">
        <h4>{{itemInfo.title}}</h4>
        <p class="price">{{itemInfo.price}}</p>
      </div>
      <ul class="msg-wrapper">
        <li>销量 {{itemInfo.cFav}}</li>
        <li>收藏{{itemInfo.cartNum}}人</li>
        <li>{{itemInfo.extra.deliveryTime}}小时内发货</li>
        <li>{{itemInfo.extra.sendAddress}}</li>
      </ul>
      <compensate></compensate>
    </div>
  </div>
</template>
<script>
  import IScroll from 'iscroll/build/iscroll-probe'
  import compensate from '../detail/compensate.vue'
  export default{
    props: {
      itemInfo: Object
    },
    methods: {
      initImgDIV () {
        if (this.$refs.topImage) {
          var imgDiv = this.$refs.topImage
          var imgWidth = imgDiv.firstChild.offsetWidth
          var imgMarginLeft = 5
          var num = this.itemInfo.topImages.length
          imgDiv.style.width = num * (imgWidth + imgMarginLeft * 2) + 'px'
        }
      },
      initScrollTemplate () {
        this.initImgDIV()
        if (this.$refs.imageWrapper) {
          this.imageScroll = new IScroll(this.$refs.imageWrapper, {
            scrollX: true,
            scrollY: false,
            hScrollbar: false,
            vScrollbar: false,
            vScroll: false
          })
        }
      }
    },
    components: {
      compensate
    },
    watch: {
      itemInfo (val) {
        if (val) {
          this.$nextTick(() => { // 等待整个页面渲染完毕之后再设置长度
            this.initScrollTemplate()
          })
        }
      }
    },
    created () {
      this.$nextTick(() => {
        this.initScrollTemplate()
      })
    },
    mounted () {
      this.$nextTick(() => {
        this.initScrollTemplate()
      })
    }
  }
</script>
<style lang="less" scoped>
  @import "../../common/less/common.less";

  .topiamge-cp {
    padding: 0 10px;
    background: #ffffff;
    margin-top: 50px;
    .itemInfo {
      .image-wrapper {
        width: 100%;
        height: 450px;
        overflow: hidden;
        margin-bottom: 15px;
        .topImage {
          display: table;
          img {
            display: inline-block;
            margin: 0 5px;
          }
        }
      }
      .price-wrapper {
        h4 {
          color: #000;
          line-height: 1.3em;
        }
        .price {
          color: @mainColor;
          font-size: 2em;
          font-weight: 500;
        }
      }
      .msg-wrapper {
        display: table;
        width: 100%;
        li {
          display: table-cell;
          font-size: 1.1em;
          color: #999;
        }
      }
    }
  }

</style>
