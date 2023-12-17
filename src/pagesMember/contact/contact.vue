<template>
  <view class="viewport">
    <view class="list">
      <view class="list-content">
        <view class="list-item">
          <text class="label">联系电话</text>
          <text>15594672333</text>
        </view>
        <view class="list-item">
          <text class="label">微信号</text>
          <text>nwafuQing</text>
        </view>
        <view class="list-item">
          <text class="label">QQ号</text>
          <text>349058505</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup></script>

<style lang="scss" scoped>
  page {
    background-color: #f4f4f4;
  }

  .viewport {
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: #f4f4f4;
  }

  .list {
    &-content {
      margin: 20rpx 20rpx 10rpx;
      padding: 0 20rpx;
      border-radius: 10rpx;
      background-color: #fff;
    }

    &-item {
      display: flex;
      height: 96rpx;
      line-height: 96rpx;
      padding: 20rpx 10rpx;
      font-size: 32rpx;
      border-bottom: 1rpx solid #ddd;

      &:last-child {
        border: none;
      }

      .label {
        width: 250rpx;
      }
    }
  }
</style>
