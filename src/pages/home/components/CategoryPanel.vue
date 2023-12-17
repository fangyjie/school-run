<template>
  <view class="category">
    <navigator
      class="category-item"
      hover-class="none"
      v-for="item in navs"
      :key="item.type"
      :url="`/pages/event/${item.type}/${item.type}`"
    >
      <image class="icon" :src="item.thumb"></image>
      <text class="text">{{ item.text }}</text>
    </navigator>
  </view>
</template>

<script setup>
  const navs = [
    {
      type: 'pickup',
      text: '快递代取',
      thumb: '/static/icon/daiqu.png'
    },
    {
      type: 'send',
      text: '快递代寄',
      thumb: '/static/icon/daiji.png'
    },
    {
      type: 'run',
      text: '校园跑腿',
      thumb: '/static/icon/run.png'
    },
    {
      type: 'other',
      text: '其他帮助',
      thumb: '/static/icon/other.png'
    }
  ]
</script>

<style lang="scss" scoped>
  .category {
    margin: 20rpx 0 0;
    padding: 10rpx 0;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    min-height: 164rpx;

    .category-item {
      width: 150rpx;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      box-sizing: border-box;

      .icon {
        width: 100rpx;
        height: 100rpx;
      }
      .text {
        font-size: 26rpx;
        font-weight: bold;
      }
    }
  }
</style>
