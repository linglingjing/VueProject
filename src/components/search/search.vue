<template>
  <div class="search-cp">
    <div class="search-item item-left">
      <div class="search-group">
        <span class="icon icon-search1"></span>
        <input type="text" class="search-input" placeholder="搜索" @click="getHotSearch()">
      </div>
    </div>
    <div class="search-item item-right">
      <span class="icon icon-message"></span>
    </div>
    <transition name="slide">
      <div class="hot-key-page" v-show="hotKeyPageShow">
        <div class="head">
          <div class="search-group">
            <span class="icon icon-search1"></span>
            <input type="text" placeholder="搜宝贝" v-model="message" @blur="addInputTags()">
          </div>
          <span class="search-btn">搜索</span>
        </div>
        <div class="hot-search">
          <p class="title"><span class="icon icon-fire"></span>热门搜索</p>
          <div class="tags">
            <span v-for="item in hotKey.list"
                  :style="{color: item.color}"
                  @click.stop="addTags($event)">{{item.word}}</span>
          </div>
        </div>
        <div class="history-search" v-if="historySearch.length > 0">
          <ul class="title">
            <li>
              <span class="icon icon-time"></span>
              最近搜索
            </li>
            <li @click="showModal()">清除搜索历史</li>
          </ul>
          <div class="his-tags">
            <span v-for="item in historySearch">{{item}}</span>
          </div>
        </div>
      </div>
    </transition>
    <transition name="slide">
      <div class="modal-wrapper" v-show="isSure">
        <div class="modal">
          <p>确定清除搜索历史吗？</p>
          <div class="buttons">
            <button class="cancel-btn" @click="hideModal()">取消</button>
            <button class="sure-btn" @click="deleteHistoryTags()">确定</button>
          </div>
        </div>
        <div class="layer" @click.stop="hideModal()"></div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        hotKey: {},
        hotKeyPageShow: false,
        historySearch: [],
        message: '',
        isSure: false
      }
    },
    methods: {
      getHotSearch () {
        this.hotKeyPageShow = true
        let self = this
        // 获取数据
        this.$axios.get('./api/hotkey')
          .then((res) => {
            res = res.data
            if (res.error === 0) {
              self.hotKey = res.data
            }
          })
          .catch((error) => {
            alert(error)
          })
      },
      addTags (event) {
        this.historySearch.push(event.target.innerText)
        console.log(this.historySearch)
      },
      addInputTags () {
        if (this.message !== '') {
          this.historySearch.push(this.message)
          console.log(this.historySearch)
        }
      },
      deleteHistoryTags () {
        var length = this.historySearch.length
        this.historySearch.splice(0, length)
        this.isSure = false
      },
      showModal () {
        this.isSure = true
      },
      hideModal () {
        this.isSure = false
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../common/less/common.less";
  @fontSize: 1.5em;
  @fontColor: #93999f;
  @inputfontSize: 16px;
  .search-cp {
    display: flex;
    width: 100%;
    padding: 15px 0;
    .item-left {
      flex: 1 1 auto;
      background: rgba(238, 238, 238, 0.8);
      border-radius: 4px;
      padding: 3px 10px;
      margin-left: 20px;
      .search-group {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 3px;
        span {
          display: inline-block;
          font-size: @fontSize;
          vertical-align: middle;
          color: #93999f;
          padding-right: 5px;
        }
        .icon-search1:before {
          color: @fontColor;
        }
        input {
          width: 89%;
          vertical-align: middle;
          border: none;
          outline: none;
          background: transparent;
          position: relative;
          top: 2px;
          .placeholder(@fontColor, @inputfontSize)
        }
      }
    }
    .item-right {
      flex: 0 0 60px;
      text-align: center;
      span {
        font-size: @fontSize + 0.3em;
        line-height: @fontSize;
      }
    }
    .hot-key-page {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 999;
      background: #ffffff;
      font-size: 16px;
      &.slide-enter, &.slide-leave-to {
        opacity: 0;
      }
      .head {
        display: flex;
        width: 100%;
        padding: 15px 10px;
        .search-group {
          flex: 1 1 auto;
          background: rgba(232, 232, 232, .5);
          padding: 8px 10px;
          border-radius: 4px;
          margin-right: 10px;
          .icon {
            display: inline-block;
            font-size: @fontSize;
            vertical-align: middle;
            color: #93999f;
            padding-right: 5px;
          }
          .icon:before {
            color: @fontColor;
          }
          input {
            width: 86%;
            vertical-align: middle;
            border: none;
            outline: none;
            background: transparent;
            position: relative;
            top: 3px;
            .placeholder(@fontColor, @inputfontSize)
          }
        }
        .search-btn {
          flex: 0 0 2em;
          font-size: @fontSize - 0.2em;
          margin-top: 5px;
          color: @mainColor;
          text-align: center;
        }
      }
      .hot-search {
        padding: 15px 10px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        .title {
          color: #666;
          font-size: 18px;
          padding: 5px 0;
          span.icon:before {
            color: #777;
            margin-right: 5px
          }
        }
        .tags {
          padding: 0 10px;
          span {
            display: inline-block;
            padding: 5px 10px;
            border-radius: 15px;
            margin: 5px 8px;
            background: rgba(227, 227, 227, 0.37);
          }
        }
      }
      .history-search{
        padding: 15px 10px 25px 10px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        .title{
          margin: 0;
          display: table;
          width: 100%;
          padding: 12px 0;
          li{
            display:table-cell;
            &:first-child {
              text-align: left
            }
            span.icon:before {
              color: #777;
              margin-right: 5px
            }
            &:last-child{
              text-align: right;
            }
          }
        }
        .his-tags{
          padding: 0 10px;
          span {
            display: inline-block;
            padding: 5px 10px;
            border-radius: 15px;
            margin: 5px 8px;
            background: rgba(227, 227, 227, 0.37);
          }
        }
      }
    }
    .modal-wrapper{
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1003;
      &.slide-enter, &.slide-leave-to {
        opacity: 0;
      }
      .layer{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.3);
      }
      .modal{
        display: block;
        background: #ffffff;
        width: 320px;
        height: 120px;
        text-align: center;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 20px 15px 15px 15px;
        border-radius: 4px;
        -webkit-box-shadow:  2px 2px 8px rgba(0,0,0,.5);
        -moz-box-shadow:  2px 2px 8px rgba(0,0,0,.5);
        box-shadow:  2px 2px 8px rgba(0,0,0,.5);
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -160px;
        margin-top: -60px;
        z-index: 2000;
        p{
          color: #777;
        }
        .buttons{
          button{
            border-radius: 4px;
            padding: 8px 25px;
            margin: 10px;
          }
          .cancel-btn{
            border:1px solid #777;
            color: #777777;
            background: transparent;
          }
          .sure-btn{
            border:none;
            color: #ffffff;
            background: @mainColor;
          }
        }
      }
    }
  }
</style>
