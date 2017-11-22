<template>
  <div class="classify-cp">
    <div class="header">
      <search class="search"></search>
    </div>
    <div class="category-wrapper">
      <category :category="classifyData.categoryAll"></category>
    </div>
    <div class="filter-wrapper">
      <ul class="filter-ul" v-if="classifyData.filter">
        <li v-for="(item, index) in classifyData.filter" @click="getList(index, item.sort)">
          <span :class="{active: index==currentIndex}">{{item.title}}</span>
        </li>
      </ul>
      <div class="product-list">
        <div class="list-wrapper" v-if="productList" v-for="item in productList.list">
          <product :product="item" class="product-item"></product>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import search from '../search/search.vue'
  import category from '../category/category.vue'
  import product from '../product/product.vue'
  import {mapActions} from 'vuex'
  export default {
    name: 'classifyComponent',
    props: {
      classifyData: {
        type: Object,
        default: {}
      }
    },
    data () {
      return {
        productList: [],
        currentIndex: 0,
        itemInfo: {}
      }
    },
    methods: {
      ...mapActions(['RemoveEventListenerFn']),
      getList (index, sort) {
        let self = this
        this.currentIndex = index
        // 获取数据
        this.$axios.get('./api/category/' + sort)
          .then((res) => {
            res = res.data
            if (res.error === 0) {
              self.productList = res.data
            }
          })
          .catch((error) => {
            alert(error)
          })
      },
      removeEventLinstener () {
        this.RemoveEventListenerFn({
          obj: window, callback: () => {}
        })
      }
    },
    components: {
      search,
      category,
      product
    },
    created () {
      this.getList(0, 'pop')
      this.$nextTick(() => {
        this.removeEventLinstener()
      })
    }
  }
</script>

<style scoped lang="less">
  .classify-cp {
    background: rgba(210, 210, 210, 0.54);
    .header {
      height: 70px;
      background: #ffffff;
    }
    .filter-wrapper {
      margin-top: 5px;
      margin-bottom: 80px;
      background: #ffffff;
      .filter-ul {
        display: table;
        width: 100%;
        padding: 15px 0;
        li {
          display: table-cell;
          text-align: center;
          font-size: 16px;
          span {
            display: inline-block;
            padding: 10px 0;
            color: #777777;
            &.active {
              border-bottom: 3px solid #444;
            }
          }
        }
      }
      .product-list {
        text-align: center;
        .list-wrapper {
          margin: 0 3px 25px 10px;
          display: inline-block;
          .product-item {
            display: inline-block;
          }
        }
      }
    }
  }
</style>
