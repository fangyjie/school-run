<template>
  <view class="register">
    <input v-model="account" class="input" type="text" placeholder="用户名" />
    <input
      v-model="password"
      class="input"
      type="text"
      password
      placeholder="密码"
    />
    <input v-model="account" class="input" type="text" placeholder="手机号" />
    <input
      v-model="password"
      class="input"
      type="text"
      placeholder="手机验证码"
    />
    <button @tap="onRegister" class="button phone">注册</button>
  </view>
</template>

<script setup></script>

<style lang="scss" scoped>
  .register {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 60vh;
    padding: 40rpx 20rpx 20rpx;

    .input {
      width: 100%;
      height: 80rpx;
      font-size: 28rpx;
      border-radius: 72rpx;
      border: 1px solid #ddd;
      padding-left: 30rpx;
      margin-bottom: 20rpx;
    }

    .button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50%;
      height: 80rpx;
      font-size: 28rpx;
      border-radius: 20rpx;
      color: #fff;
    }
  }
</style>
