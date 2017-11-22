<template>
  <div class="mine-cp">
    <div class="header">
      <div class="top-wrapper">
        <span class="icon icon-config"></span>
        <span class="icon icon-message"></span>
      </div>
      <div class="user-wrapper" v-if="mineData.login">
        <div class="logo">
          <img :src="mineData.login.avatar" alt="">
        </div>
        <div class="info">
          <div class="name-wrapper">
            <h3 class="username">{{mineData.login.name}}</h3>
            <span class="vip" v-if="mineData.login.vip_level == 1">普卡会员</span>
          </div>
          <p class="point">累计积分：{{mineData.login.vip_point}}</p>
        </div>
      </div>
      <div class="sign-wrapper">
        <div class="sing-up">
          <span class="icon icon-qiandao"></span>
          <span>签到</span>
        </div>
      </div>
    </div>
    <div class="order-info">
      <ul class="order-ul">
        <li v-for="(item, index) in orderInfo">
          <span :class="'icon'+(index+1)" class="icon"></span>
          <span class="title">{{item}}</span>
        </li>
      </ul>
    </div>
    <div class="wallet-wrapper">
      <ul v-if="mineData.list">
        <li v-for="item in mineData.list"
            :style="{background: 'url('+item.image+')',backgroundSize:'contain', backgroundPosition:'center'}">
        </li>
      </ul>
    </div>
    <div class="download" v-if="mineData.download">
      <div>
        <img :src="mineData.download.app_icon" class="app-logo" width="50px">
      </div>
      <div class="info">
        <span class="title">{{mineData.download.app_title}}</span>
        <p class="summary">{{mineData.download.app_summary}}</p>
      </div>
      <div class="download-btn pull-right">
        <a :href="mineData.download.download_url">下载</a>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  export default {
    props: {
      mineData: {
        type: Object
      }
    },
    data () {
      return {
        orderInfo: ['待付款', '待收货', '待评价', '退换货', '全部订单']
      }
    },
    methods: {
      ...mapActions(['RemoveEventListenerFn']),
      removeEventLinstener () {
        this.RemoveEventListenerFn({
          obj: window, callback: () => {}
        })
      }
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
  @import "../../common/css/icon.css";
  .mine-cp {
    background: rgba(210, 210, 210, 0.54);
    .header {
      position: relative;
      background: #ffffff;
      .top-wrapper {
        padding: 15px;
        position: relative;
        span {
          font-size: 30px;
        }
        span:last-child {
          position: absolute;
          right: 15px;
        }
        .icon:before {
          color: #666;
        }
      }
      .user-wrapper {
        padding: 15px 0;
        .logo {
          display: inline-block;
          vertical-align: middle;
          margin: 0 10px;
          img {
            max-width: 100px;
            max-height: 100px;
            border-radius: 50%;
          }
        }
        .info {
          display: inline-block;
          vertical-align: middle;
          margin-right: 10px;
          .name-wrapper {
            .username {
              max-width: 150px;
              display: inline-block;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              vertical-align: bottom;
            }
            .vip {
              display: inline-block;
              padding: 4px 10px;
              border-radius: 20px;
              font-size: 12px;
              color: #cd8bd8;
              vertical-align: bottom;
              background-image: linear-gradient(to top right, #fdcbf1 0%, #fdcbf1 1%, #e6dee9 100%);
              position: relative;
              top: -13px;
            }
          }
          .point {
            color: #666;
            margin-top: 10px;
            font-size: 15px;
          }
        }
      }
      .sign-wrapper {
        display: inline-block;
        position: absolute;
        right: -10px;
        top: 130px;
        .sing-up {
          background: @mainColor;
          padding: 5px 15px;
          border-radius: 20px 0 0 20px;
          color: #ffffff;
          vertical-align: middle;
          span {
            vertical-align: middle;
            color: #ffffff;
            padding-right: 5px;
          }
          span.icon {
            font-size: 20px;
          }
          span {
            font-size: 15px;
          }
        }
      }
    }
    .order-info {
      margin-top: 5px;
      background: #ffffff;
      .order-ul {
        display: table;
        width: 100%;
        padding: 20px 0;
        margin: 0;
        li {
          display: table-cell;
          text-align: center;
          span {
            display: block;
            color: #333;
            font-size: 16px;
          }
          @iconSize: 40px;
          @iconLeft: 20px;
          span.icon {
            width: @iconSize;
            height: @iconSize;
            position: relative;
            left: 50%;
            margin-left: -@iconLeft;
            margin-bottom: 5px;
          }
        }
      }
    }
    .wallet-wrapper{
      background: #ffffff;
      padding: 15px 0;
      margin-top: 5px;
      ul{
        width: 100%;
        text-align: center;
        margin: 0;
        li{
          display: inline-block;
          width: 90px;
          height: 90px;
          margin: 5px;
        }
      }
    }
    .download{
      background: #ffffff;
      margin-top: 5px;
      padding: 15px 10px;
      div{
        display: inline-block;
        vertical-align: bottom;
      }
      .info{
        .title{
          font-size: 16px;
        }
        .summary{
          font-size: 15px;
          color: #555;
          margin: 0;
        }
      }
      .download-btn{
        margin-top: 15px;
        a{
          display: inline-block;
          color:@mainColor ;
          padding: 2px 15px;
          border-radius: 20px;
          border: 1px solid @mainColor;
        }
      }
    }
  }
</style>
