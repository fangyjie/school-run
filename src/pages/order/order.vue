<template>
  <view class="viewport">
    <!-- tabs -->
    <view class="tabs">
      <text
        class="item"
        :class="{ active: activeIndex === index }"
        v-for="(item, index) in orderTabs"
        :key="item.id"
        @tap="activeIndex = index"
      >
        {{ item.title }}
      </text>
      <!-- 游标 -->
      <view class="cursor" :style="{ left: activeIndex * 25 + '%' }"></view>
    </view>
    <!-- 滑动容器 -->
    <swiper
      class="swiper"
      :current="activeIndex"
      @change="activeIndex = $event.detail.current"
    >
      <!-- 滑动项 -->
      <swiper-item v-for="item in orderTabs" :key="item.id">
        <!-- 订单列表 -->
        <OrderList :orderState="item.id" />
      </swiper-item>
    </swiper>
  </view>
</template>

<script setup>
  import { ref } from 'vue'
  import OrderList from './components/OrderList.vue'

  const activeIndex = ref(0)
  const orderTabs = ref([
    { id: 1, title: '全部订单', isRender: false },
    { id: 2, title: '我的订单', isRender: false },
    { id: 3, title: '我帮助的', isRender: false },
    { id: 4, title: '正在悬赏', isRender: false }
  ])
</script>

<style lang="scss">
  page {
    height: 100%;
    overflow: hidden;
  }

  .viewport {
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #fff;
  }

  // tabs
  .tabs {
    display: flex;
    justify-content: space-around;
    line-height: 60rpx;
    margin: 0 10rpx;
    background-color: #fff;
    box-shadow: 0 4rpx 6rpx rgba(240, 240, 240, 0.6);
    position: relative;
    z-index: 9;

    .item {
      flex: 1;
      text-align: center;
      padding: 20rpx;
      font-size: 28rpx;
      color: #262626;
    }

    .active {
      color: #00b16c;
    }

    .cursor {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 25%;
      height: 6rpx;
      background-color: #00b16c;
      /* 过渡效果 */
      transition: all 0.4s;
    }
  }

  // swiper
  .swiper {
    height: 100%;
    background-color: #f7f7f8;
  }
</style>
