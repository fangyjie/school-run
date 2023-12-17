<template>
  <view class="carousel">
    <swiper :circular="true" :autoplay="true" :interval="5000">
      <swiper-item>
        <image
          mode="aspectFill"
          class="image"
          src="/static/image/swiper1.png"
        ></image>
      </swiper-item>
      <swiper-item>
        <image
          mode="aspectFill"
          class="image"
          src="/static/image/swiper2.jpg"
        ></image>
      </swiper-item>
    </swiper>
  </view>
</template>

<script setup></script>

<style lang="scss" scoped>
  /* 轮播图 */
  .carousel {
    height: 300rpx;
    position: relative;
    overflow: hidden;
    transform: translateY(0);
    background-color: #efefef;

    .image {
      width: 100%;
      height: 100%;
    }
  }
</style>
