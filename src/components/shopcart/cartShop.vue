<template>
  <div class="shop">
    <div class="shop-name">
      <span class="check-box" :class="{active: isSelected}" @click.stop="selectShopAll()"></span><label>美丽优选</label>
    </div>
    <ul class="list">
      <li v-for="item in shopProducts">
        <cartProduct :cartProduct="item" :isSelectAll ="isSelectAll"></cartProduct>
      </li>
    </ul>
  </div>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import cartProduct from './cartProduct.vue'
  export default {
    props: {
      shopProducts: Array,
      isSelectAll: Boolean
    },
    data () {
      return {
        isSelected: false,
        shopTotalPrice: 0
      }
    },
    computed: {
      ...mapGetters(['selectGood'])
    },
    methods: {
      ...mapActions(['setSelectGood']),
      selectShopAll () {
        this.isSelected = !this.isSelected
      }
    },
    components: {
      cartProduct
    },
    watch: {
      isSelectAll (val) {
        if (val === true) {
          this.$nextTick(() => {
            console.log(12334354)
            this.isSelected = true
          })
        } else {
          this.isSelected = false
        }
      }
    },
    mounted () {
      this.$nextTick(() => {
        if (this.isSelectAll === true) {
          this.isSelected = true
        } else {
          this.isSelected = false
        }
      })
    }
  }
</script>
<style lang="less" scoped>
  @import "../../common/less/common.less";
  @import "../../common/less/mixin.less";

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
      }
    }
  }
</style>
