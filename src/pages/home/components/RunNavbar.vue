<template>
  <view class="navbar">
    <!-- logo文字 -->
    <view class="logo">
      <!-- <image class="logo-image" src="/static/image/logo.png"></image> -->
      <text class="logo-text">西农轻送</text>
    </view>
  </view>
</template>

<script setup>
  //
</script>

<style lang="scss" scoped>
  /* 自定义导航条 */
  .navbar {
    background-image: url('/static/image/navigator_bg.png');
    background-size: cover;
    position: relative;
    display: flex;
    flex-direction: column;
    padding-top: 15px;
    .logo {
      display: flex;
      align-items: center;
      height: 64rpx;
      padding-left: 30rpx;
      padding-top: 20rpx;
      .logo-image {
        width: 166rpx;
        height: 39rpx;
      }
      .logo-text {
        flex: 1;
        line-height: 28rpx;
        color: #fff;
        margin: 2rpx 0 0 20rpx;
        padding-left: 20rpx;
        border-left: 1rpx solid #fff;
        font-size: 26rpx;
      }
    }
  }
</style>
