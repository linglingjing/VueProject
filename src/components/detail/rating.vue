<template>
  <div class="rate-wrapper" v-if="rate">
    <div class="header">
     <p> 商品评价 <span class="rate-count">{{rate.cRate}}</span></p>
      <p>更多 <span class="icon icon-more"></span></p>
    </div>
    <div class="rate-content" v-if="rate.list">
      <div class="rate-item" v-for="item in rate.list">
        <div class="avatar">
          <img :src="item.user.avatar" width="60">
        </div>
        <div class="rate">
          <div class="name">
            <span class="user">{{item.user.uname}}</span>
            <span class="created">{{item.created}}</span>
          </div>
          <p class="content">{{item.content}}</p>
          <div class="style">{{item.style}}</div>
          <div class="images" v-if="item.images">
            <img v-for="img in item.images" :src="img">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      rate: Object
    }
  }
</script>
<style lang="less" scoped>
  @import "../../common/less/mixin.less";
  @import "../../common/less/common.less";
  .rate-wrapper{
    margin-top: 5px;
    background: #ffffff;
    padding: 0 10px;
    .header{
      display: table;
      width: 100%;
      p{
        display: table-cell;
        padding: 15px 0;
        font-size: 1.3em;
        color: #333;
      }
      p:last-child{
        text-align: right;
      }
    }
    .rate-content{
      .rate-item{
        display: flex;
        width: 100%;
        padding: 15px 0;
        border-bottom: 1px solid @mainBorderColor;
        border-top: 1px solid @mainBorderColor;
        .avatar{
          flex: 0 0 60px;
          margin-right: 10px;
          img{
            border-radius: 50%;
            .border-1px(#d4d4d4)
          }
        }
        .rate{
          flex: 1 1 auto;
          .name{
            display: table;
            width: 95%;
            font-size: 1.2em;
            margin-bottom: 5px;
            span{
              display: table-cell;
            }
            .user{
              color: #424242;
            }
            .created{
              color: #999999;
              text-align: right;
            }
          }
          .content {
            font-size: 1.2em;
            color: #727272;
            margin-bottom: 5px;
            width: 99%;
            word-wrap: break-word;
            word-break: normal;
            text-overflow: ellipsis;
          }
          .style{
            color: #999999;
          }
          .images{
            img{
              width: 77px;
              margin: 10px 5px 10px 0;
            }
          }
        }
      }
    }
  }
</style>
