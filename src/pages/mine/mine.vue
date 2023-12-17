<template>
  <scroll-view class="viewport" scroll-y enable-back-to-top>
    <!-- 个人资料 -->
    <view class="profile" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
      <!-- 情况1：已登录 -->
      <view class="overview" v-if="memberStore.profile">
        <navigator url="/pagesMember/profile/profile" hover-class="none">
          <image
            class="avatar"
            mode="aspectFill"
            :src="memberStore.profile.avatar"
          ></image>
        </navigator>
        <view class="meta">
          <view class="nickname">
            {{ memberStore.profile.nickname || memberStore.profile.account }}
          </view>
          <navigator
            class="extra"
            url="/pagesMember/profile/profile"
            hover-class="none"
          >
            <text class="update">更新头像昵称</text>
          </navigator>
        </view>
      </view>
      <!-- 情况2：未登录 -->
      <view class="overview" v-else>
        <navigator url="/pages/login/login" hover-class="none">
          <image
            class="avatar gray"
            mode="aspectFill"
            src="/static/image/none.png"
          ></image>
        </navigator>
        <view class="meta">
          <navigator
            url="/pages/login/login"
            hover-class="none"
            class="nickname"
          >
            未登录
          </navigator>
          <view class="extra">
            <text class="tips">点击登录账号</text>
          </view>
        </view>
      </view>
      <navigator
        class="settings"
        url="/pagesMember/settings/settings"
        hover-class="none"
      >
        设置
      </navigator>
    </view>
    <view class="funcList">
      <navigator
        v-for="item in funcTypes"
        :key="item.type"
        :url="`/pagesFunc/${item.type}/${item.type}`"
        class="funcItem"
        hover-class="none"
      >
        <image class="icon" :src="item.icon"></image>
        {{ item.text }}
      </navigator>
      <!-- 客服 -->
      <button class="contact" open-type="contact">
        <image class="icon" src="/static/icon/service.png"></image>
        <text>官方客服</text>
      </button>
    </view>
  </scroll-view>
</template>

<script setup>
  import { useMemberStore } from '@/stores'

  // 获取屏幕边界到安全区域距离
  const { safeAreaInsets } = uni.getSystemInfoSync()
  // 功能选项
  const funcTypes = [
    {
      type: 'new',
      text: '邀请新人',
      icon: '/static/icon/new.png'
    },
    {
      type: 'credit',
      text: '信用分',
      icon: '/static/icon/credit.png'
    },
    {
      type: 'identify',
      text: '身份认证',
      icon: '/static/icon/identify.png'
    }
  ]

  // 获取会员信息
  const memberStore = useMemberStore()
</script>

<style lang="scss">
  page {
    height: 100%;
    overflow: hidden;
    background-color: #f7f7f8;
  }

  .viewport {
    height: 100%;
    background-repeat: no-repeat;
    background-image: url('/static/image/center_bg.png');
    background-size: 100% auto;
  }

  /* 用户信息 */
  .profile {
    margin-top: 20rpx;
    position: relative;

    .overview {
      display: flex;
      height: 120rpx;
      padding: 0 36rpx;
      color: #fff;
    }

    .avatar {
      width: 120rpx;
      height: 120rpx;
      border-radius: 50%;
      background-color: #eee;
    }

    .gray {
      filter: grayscale(100%);
    }

    .meta {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      line-height: 30rpx;
      padding: 16rpx 0;
      margin-left: 25rpx;
    }

    .nickname {
      max-width: 350rpx;
      margin-left: 5rpx;
      margin-bottom: 16rpx;
      font-size: 30rpx;

      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .extra {
      display: flex;
      font-size: 20rpx;
    }

    .tips {
      font-size: 22rpx;
    }

    .update {
      padding: 3rpx 10rpx 1rpx;
      color: rgba(255, 255, 255, 0.8);
      border: 1rpx solid rgba(255, 255, 255, 0.8);
      margin-right: 10rpx;
      border-radius: 30rpx;
    }

    .settings {
      position: absolute;
      bottom: 0;
      right: 40rpx;
      font-size: 30rpx;
      color: #fff;
    }
  }

  // 其他列表
  .funcList {
    display: flex;
    justify-content: space-around;
    position: relative;
    z-index: 99;
    padding: 30rpx;
    margin: 50rpx 20rpx 0;
    background-color: #fff;
    border-radius: 10rpx;
    box-shadow: 0 4rpx 6rpx rgba(240, 240, 240, 0.6);

    .funcItem,
    .contact {
      width: 150rpx;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      box-sizing: border-box;
      font-size: 28rpx;

      .icon {
        width: 72rpx;
        height: 72rpx;
      }
    }

    .contact {
      padding: 0;
      margin: 0;
      background-color: #ffffff;
      line-height: inherit;
    }

    .contact::after {
      border: none;
    }
  }
</style>
