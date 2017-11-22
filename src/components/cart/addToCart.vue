<template>
  <div class="add-to-cart-wrapper" v-if="skuInfo">
    <transition name="show">
      <div class="layer" v-show="isAddToCart"></div>
    </transition>
    <transition name="vertical-slide">
      <div v-show="isAddToCart" class="show-add">
        <ul class="add-to-cart">
          <li>
            <div class="img-wrapper">
              <img v-if="!photo" :src="cartfirstImage" width="80">
              <img v-else :src="photo" width="80">
            </div>
            <div class="productInfo" v-if="skuInfo">
              <p class="title">{{skuInfo.title}}</p>
              <p class="price-wrapper">
                <span class="price">{{skuInfo.priceRange}}</span>
                <span class="stock" v-if="stock == 0">(库存{{skuInfo.totalStock}}件)</span>
                <span class="stock" v-else>(库存{{stock}}件)</span>
              </p>
              <p class="tips" v-show="styleId && !sizeId">请选择尺码</p>
              <p class="tips" v-show="sizeId && !styleId">请选择颜色</p>
              <p class="tips" v-show="!styleId && !sizeId">请选择颜色、尺码</p>
            </div>
            <div class="cancel-btn" @click.stop="hiddenAddToCart()">
              <span class="icon icon-cancel"></span>
            </div>
          </li>
          <li v-if="skuInfo.props[0]">
            <p>{{skuInfo.props[0].label}}</p>
            <div ref="colorTags">
              <span class="color-tags"
                    v-for="(item, index) in colorList"
                    @click="colorFn(index, item.styleId)"
                    :class="{active: currentIndex1 === index}">{{item.name}}</span>
            </div>
          </li>
          <li v-if="skuInfo.props[1]">
            <p>{{skuInfo.props[1].label}}</p>
            <div ref="sizeTags">
               <span class="size-tags"
                     v-for="(item, index) in sizeList"
                     @click="sizeFn(index, item.sizeId)"
                     :class="{active: currentIndex2 === index}">{{item.name}}</span>
            </div>
          </li>
          <li>
            <p class="count-label">数量</p>
            <div class="count-btn">
              <span class="ins icon-minus" @click.stop="desFn()"></span>
              <span class="count">{{buyCount}}</span>
              <span class="des icon-plus" @click.stop="insFn()"></span>
            </div>
          </li>
        </ul>
        <div class="sure-btn" @click.stop="addToCartFn()">确定</div>
      </div>
    </transition>
  </div>
</template>
<script>
  import {mapActions, mapGetters} from 'vuex'
  export default {
    props: {
      skuInfo: Object
    },
    data () {
      return {
        count: 1,
        proStock: 0,
        arrColor: [],
        arrSize: [],
        image: '',
        cartPro: {}
      }
    },
    computed: {
      ...mapGetters(['currentIndex1', 'currentIndex2', 'styleId', 'sizeId']),
      isAddToCart () {
        return this.$store.state.isAddToCart
      },
      photo () {
        if (this.image && this.styleId && this.sizeId) {
          return this.image
        }
        return this.$store.state.detail.itemInfo.topImages[0]
      },
      stock () {
        return this.proStock
      },
      skus () {
        return this.$store.state.detail.skuInfo.skus
      },
      colorList () {
        return this.skuInfo.props[0].list
      },
      sizeList () {
        return this.skuInfo.props[1].list
      },
      newColorArr () {
        return this.arrColor
      },
      newSizeArr () {
        return this.arrSize
      },
      buyCount () {
        return this.count
      }
    },
    methods: {
      ...mapActions(['setCurrentIndex1', 'setCurrentIndex2', 'setStyleID', 'setSizeID', 'addToCart']),
      hiddenAddToCart () {
        this.$store.state.isAddToCart = false
      },
      colorFn (index, styleID) {
        this.arrSize = []
        if ((this.styleId && !this.sizeId) || (!this.styleId && !this.sizeId)) {
          this.setCurrentIndex1(index)
          this.getSizeFn(styleID)
          this.setStyleID(styleID)
        }
        let record = this.newColorArr.find(f => f === styleID)
        if (!record) {
          this.setCurrentIndex1(index)
          this.setStyleID(styleID)
        }
        if (this.styleId && this.sizeId) {
          this.setCurrentIndex1(index)
          this.findSkus()
        }
      },
      sizeFn (index, sizeID) {
        this.arrColor = []
        if ((!this.styleId && !this.sizeId) || (!this.styleId && this.sizeId)) {
          this.setCurrentIndex2(index)
          this.getColorFn(sizeID)
          this.setSizeID(sizeID)
        }
        let record = this.newSizeArr.find(f => f === sizeID)
        if (!record) {
          this.setCurrentIndex2(index)
          this.setSizeID(sizeID)
        }
        if (this.styleId && this.sizeId) {
          this.setCurrentIndex2(index)
          this.findSkus()
        }
      },
      setDisadledSize () {
        this.clearClass(this.$refs.sizeTags.childNodes)
        let self = this
        for (let i in this.newSizeArr) {
          self.sizeList.forEach((item, index) => {
            if (item.sizeId === self.newSizeArr[i]) {
              self.$refs.sizeTags.childNodes[index].className = 'disabled'
            }
          })
        }
      },
      setDisabledStyle () {
        this.clearClass(this.$refs.colorTags.childNodes)
        let self = this
        for (let i in this.newColorArr) {
          self.colorList.forEach((item, index) => {
            if (item.styleId === self.newColorArr[i]) {
              self.$refs.colorTags.childNodes[index].className = 'disabled'
            }
          })
        }
      },
      clearClass (EL) {
        EL.forEach(item => {
          item.className = 'normal'
        })
      },
      getSizeFn (styleID) {
        let self = this
        this.skus.forEach(item => {
          if (item.styleId === styleID && item.stock === 0) {
            self.arrSize.push(item.sizeId)
          }
        })
        this.setDisadledSize()
        console.log('newSizeArr', this.newSizeArr)
      },
      getColorFn (sizeID) {
        let self = this
        this.skus.forEach(item => {
          if (item.sizeId === sizeID && item.stock === 0) {
            self.arrColor.push(item.styleId)
          }
        })
        this.setDisabledStyle()
      },
      insFn () {
        if (this.count >= this.stock) {
          this.count = this.stock // 每款衣服的库存
        } else {
          this.count++
        }
      },
      desFn () {
        if (this.count <= 1) {
          this.count = 1
        } else {
          this.count--
        }
      },
      findSkus () {
        let obj = {}
        let self = this
        this.skus.forEach(item => {
          if (this.styleId === item.styleId && this.sizeId === item.sizeId) {
            this.proStock = item.stock
            this.image = item.img
            obj = item
            obj.title = self.$store.state.detail.skuInfo.title
            obj.shopID = self.$store.state.detail.shopInfo.shopId
            obj.shopName = self.$store.state.detail.shopInfo.name
            obj.proID = this.$store.state.detail.proID
            obj.isSelected = false
            this.cartPro = obj
          }
        })
      },
      addToCartFn () {
        if (this.styleId && this.sizeId && this.count >= 1) {
          this.addToCart({objCart: this.cartPro, buyCount: this.count})
        }
        this.hiddenAddToCart()
        // 清空选中单品颜色尺码信息
        this.count = 1
        this.clearClass(this.$refs.colorTags.childNodes)
        this.clearClass(this.$refs.sizeTags.childNodes)
        this.setStyleID(null)
        this.setSizeID(null)
        this.setCurrentIndex1(null)
        this.setCurrentIndex2(null)
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "../../common/less/common.less";
  @import "../../common/less/mixin.less";

  .add-to-cart-wrapper {
    .layer {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 3000;
      background: rgba(0, 0, 0, .4);
      &.show-enter-active, &.show-leave-active {
        transition: all .4s ease;
      }
      &.show-enter, &.show-leave-to {
        opacity: 0;
      }
    }
    .show-add {
      background: #fff;
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 70%;
      z-index: 3000;
      &.vertical-slide-enter-active, &.vertical-slide-leave-active {
        transition: all .6s cubic-bezier(1.0, 0.5, 0.8, 1.0);
      }
      &.vertical-slide-enter {
        transform: translateY(50%);
      }
      &.vertical-slide-leave-to {
        transform: translateY(50%);
      }
      .add-to-cart {
        li {
          margin: 0 15px;
          padding: 10px 0;
          .border-bottom(#ccc);
        }
        li:first-child {
          display: flex;
          .img-wrapper {
            flex: 0 0 80px;
          }
          .productInfo {
            flex: 1 1 auto;
            margin: 0 10px;
            .title {
              font-size: 1.2em;
              color: #000;
            }
            .price-wrapper {
              margin: 13px 0;
              .price {
                font-size: 1.3em;
                color: @mainColor;
                margin-right: 15px;
              }
              .stock {
                font-size: 1.1em;
                color: #777;
              }
            }
            .tips {
              font-size: 1.1em;
              color: #777;
            }
          }
          .cancel-btn {
            flex: 0 0 30px;
            font-size: 1.8em;
            font-weight: bold;
          }

        }
        li:nth-child(2), li:nth-child(3) {
          padding: 20px 0;
          p {
            font-size: 1.2em;
          }
          span {
            display: inline-block;
            font-size: 1.1em;
            width: 60px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            margin-right: 15px;
            color: #000;
            background: rgba(221, 221, 221, 0.76);
            &.active {
              color: #ffffff;
              background: @mainColor;
            }
            &.disabled {
              display: none;
              color: #a5a287;
              background: rgba(221, 221, 221, 0.76);
            }
            &.normal {
              display: inline-block;
              color: #000;
              background: rgba(221, 221, 221, 0.76);
            }
          }
        }
        li:last-child {
          .count-label {
            font-size: 1.2em;
          }
          .count-btn {
            span {
              display: inline-block;
              font-size: 1.1em;
              width: 40px;
              height: 30px;
              line-height: 30px;
              text-align: center;
              background: rgba(221, 221, 221, 0.76);
            }
            span:nth-child(2) {
              padding: 0 8px;
            }
          }
        }
      }
      .sure-btn {
        width: 100%;
        background: @mainColor;
        color: #ffffff;
        font-size: 1.3em;
        text-align: center;
        padding: 12px 0;
      }
    }

  }
</style>
