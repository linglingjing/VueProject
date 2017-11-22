<template>
  <div class="category-cp">
    <div class="category-wrapper" v-if="newCategory">
      <div class="category-rows" v-for="row in newCategory">
        <div class="category-item" v-for="item in row">
           <div class="img-wrapper">
             <img :src="item.image" class="img">
           </div>
          <span class="title">{{item.title}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      category: {
        type: Array
      }
    },
    computed: {
      newCategory: function () {
        var category = {}
        var arr = []
        for (var i = 0; i < this.category.length; i++) {
          if (i % 4 === 0) {
            arr = []
            this.$set(category, i / 4, arr)
          }
          arr.push(this.category[i])
        }
        return category
      }
    },
    watch: {
      category (val) {
        if (val) {
          console.log(val, 123)
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .category-cp {
    background: #ffffff;
    .category-wrapper {
      .category-rows {
        display: table;
        border-collapse:collapse;
        border-spacing: 0 10px;
        .category-item {
          display: table-cell;
          text-align: center;
          vertical-align: middle;
          border-top:1px solid rgba(7, 17, 27, 0.1);
          &:not(:last-child) {
            border-right:1px solid rgba(7, 17, 27, 0.1);
          }
          .img-wrapper{
            height: 110px;
            padding: 10px 0;
            overflow: hidden;
            .img {
              width: 80%;
              vertical-align: middle;
              position: relative;
              top: -20%;
            }
          }
          .title {
            display: block;
            padding: 20px 0;
            font-size: 16px;
            color: #777;
          }
        }
      }

    }
  }
</style>
