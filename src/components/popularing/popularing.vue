<template>
  <div class="popularing-cp">
    <div class="top-wrapper">
      <div class="title-wrapper">
        <i class="icon icon-hot"></i>
        <span class="title">正在流行</span>
      </div>
      <div class="look-more pull-right">
        <span class="more">查看更多</span>
        <i class="glyphicon glyphicon-chevron-right"></i>
      </div>
    </div>
    <div class="center-wrapper" ref="popularWrapper">
      <div class="ul-wrappers" ref="ulWrappers">
        <ul class="popularing-ul" v-for="list in popularing">
          <li class="popularing-item" v-for="item in list">
            <img :src="item.image" alt="">
            <span>{{item.title}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="bottom-wrapper">
      <span v-for="item in popularing" class="circle"></span>
    </div>
  </div>
</template>
<script>
  import IScroll from 'iscroll/build/iscroll-probe'
  export default{
    props: {
      popularing: {
        type: Array
      }
    },
    methods: {
      initCenterWapper () {
        var ulWrappers = this.$refs.ulWrappers
        var rows = this.popularing.length
        var liItemWidth = ulWrappers.firstElementChild.firstElementChild.clientWidth
        for (var i = 0; i < ulWrappers.childNodes.length; i++) {
          ulWrappers.childNodes[i].style.width = liItemWidth * 4 + 10 + 'px'
        }
        var ulWidth = ulWrappers.firstElementChild.clientWidth
        ulWrappers.style.width = rows * ulWidth + 'px'
      },
      initScrollTemplate () {
        this.initCenterWapper()
        if (this.$refs.popularWrapper) {
          this.imageScroll = new IScroll(this.$refs.popularWrapper, {
            scrollX: true,
            scrollY: false,
            hScrollbar: false,
            vScrollbar: false,
            vScroll: false
          })
        }
      }
    },
    watch: {
      popularing (val) {
        if (val) {
          this.$nextTick(() => {
            this.initScrollTemplate()
          })
        }
      }
    },
    created () {
      if (this.popularing) {
        this.$nextTick(() => {
          this.initScrollTemplate()
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .popularing-cp {
    background: #ffffff;
    margin-top: 5px;
    .top-wrapper {
      padding: 15px;
      div{
        display: inline-block;
        font-size: 15px;
        .title-wrapper{
          i{font-size: 17px}
        }
      }
      .look-more{
        .more{color: #93999f;}
        i{ color: #93999f;}
      }
    }
    .center-wrapper {
      width: 100%;
      overflow: hidden;
      .ul-wrappers {
        .popularing-ul {
          display: inline-block;
          .popularing-item {
            display: inline-block;
            text-align: center;
            margin: 10px 0;
            img {
              width: 80%;
            }
            span {
              display: block;
              margin: 10px 0;
            }
          }
        }
      }
    }
    .bottom-wrapper {
      text-align: center;
      padding-bottom: 15px;
      .circle{
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background: #404040;
        margin: 5px 6px;
      }
    }
  }
</style>
