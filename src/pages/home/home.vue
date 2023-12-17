<template>
  <view class="home">
    <!-- 顶部占位 -->
    <view :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
      <RunNavbar />
    </view>
    <view class="swiper">
      <RunSwiper />
    </view>
    <view class="categoryPanel">
      <CategoryPanel />
    </view>
    <!-- <view>
      <view class="page-body">
        <view class="page-section page-section-gap">
          <map
            style="width: 100%; height: 300px"
            :latitude="latitude"
            :longitude="longitude"
            :markers="covers"
          >
          </map>
        </view>
      </view>
    </view> -->
  </view>
</template>

<script setup>
  import RunNavbar from './components/RunNavbar'
  import RunSwiper from './components/RunSwiper'
  import CategoryPanel from './components/CategoryPanel'

  // 获取屏幕边界到安全区域距离
  const { safeAreaInsets } = uni.getSystemInfoSync()
  // const id = 0 // 使用 marker点击事件 需要填写id
  // const title = 'map'
  // const latitude = 39.909
  // const longitude = 116.39742
  // const covers = [
  //   {
  //     latitude: 39.909,
  //     longitude: 116.39742
  //   },
  //   {
  //     latitude: 39.9,
  //     longitude: 116.39
  //   }
  // ]
</script>

<style lang="scss">
  page {
    height: 100%;
    overflow: hidden;
    background-color: #f7f7f8;
  }

  .categoryPanel {
    background-color: #fff;
    margin: 40rpx;
    border-radius: 20rpx;
    border: 1px solid #c7edcc;
    box-shadow: 0 4rpx 6rpx #c7edcc;
  }
</style>
