<template>
  <view class="viewport">
    <view class="logo">
      <image src="/static/image/mini.png"></image>
    </view>
    <view class="login">
      <!-- 账号密码登录 -->
      <input
        v-model="account"
        class="input"
        type="text"
        placeholder="请输入用户名/手机号码"
      />
      <input
        v-model="password"
        class="input"
        type="text"
        password
        placeholder="请输入密码"
      />
      <button @tap="onLogin" class="button phone">登录</button>
      <!-- 小程序端授权登录 -->
      <!-- <button
        class="button phone"
        open-type="getPhoneNumber"
        @getphonenumber="onGetphonenumber"
      >
        <image src="/static/icon/phone.png" class="icon" />
        手机号快捷登录
      </button> -->
      <view class="extra">
        <view class="caption">
          <text>其他登录方式</text>
        </view>
        <view class="options">
          <!-- 通用模拟登录 -->
          <button @tap="onGetphonenumberSimple">
            <image src="/static/icon/phone2.png" class="icon" />
            <text class="text">模拟快捷登录</text>
          </button>
          <button @tap="toRegister">
            <image src="/static/icon/register.png" class="icon" />
            <text class="text">新用户注册</text>
          </button>
        </view>
      </view>
      <view class="tips">
        登录/注册即视为你同意《服务条款》和《西农轻送隐私协议》
      </view>
    </view>
  </view>
</template>

<script setup>
  import { ref } from 'vue'
  import { onLoad } from '@dcloudio/uni-app'
  import {
    postLoginAPI,
    postLoginWxMinAPI,
    postLoginWxMinSimpleAPI
  } from '../../services/login'
  import { useMemberStore } from '../../stores'

  const toRegister = () => {
    uni.navigateTo({ url: '/pages/register/register' })
  }

  const account = ref('')
  const password = ref('')
  // 账号密码登录
  const onLogin = async () => {
    const res = await postLoginAPI({
      account: account.value,
      password: password.value
    })
    loginSuccess(res.result)
  }

  // 获取 code 登录凭证
  let code = ''
  onLoad(async () => {
    const res = await wx.login()
    code = res.code
  })
  // 获取用户手机号码
  const onGetphonenumber = async (ev) => {
    // 获取参数
    const encryptedData = ev.detail?.encryptedData
    const iv = ev.detail?.iv
    // 登录请求
    const res = await postLoginWxMinAPI({ code, encryptedData, iv })
    loginSuccess(res.result)
  }

  // 模拟手机号码快捷登录
  const onGetphonenumberSimple = async (ev) => {
    const res = await postLoginWxMinSimpleAPI('15594672333')
    loginSuccess(res.result)
  }

  const loginSuccess = (profile) => {
    // 保存用户信息
    const memberStore = useMemberStore()
    memberStore.setProfile(profile)
    // 成功提示
    uni.showToast({ icon: 'success', title: '登录成功' })
    setTimeout(() => {
      // 页面跳转
      uni.switchTab({ url: '/pages/mine/mine' })
    }, 500)
  }
</script>

<style lang="scss">
  page {
    height: 100%;
  }

  .viewport {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    padding: 20rpx 40rpx;
  }

  .logo {
    flex: 1;
    text-align: center;
    image {
      width: 220rpx;
      height: 220rpx;
      margin-top: 15vh;
    }
  }

  .login {
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

      .icon {
        width: 45rpx;
        height: 50rpx;
        margin-right: 6rpx;
      }
    }

    .phone {
      background-color: #28bb9c;
    }

    .wechat {
      background-color: #06c05f;
    }

    .extra {
      flex: 1;
      padding: 70rpx 70rpx 0;
      .caption {
        width: 440rpx;
        line-height: 1;
        border-top: 1rpx solid #ddd;
        font-size: 26rpx;
        color: #999;
        position: relative;
        text {
          transform: translate(-40%);
          background-color: #fff;
          position: absolute;
          top: -12rpx;
          left: 50%;
        }
      }

      .options {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 70rpx;
        button {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0;
          background-color: transparent;
        }
        button::after {
          border: none;
        }
      }

      .icon {
        width: 50rpx;
        height: 50rpx;
        padding: 20rpx;
        margin-bottom: 6rpx;
        border: 1rpx solid #444;
        border-radius: 50%;
      }

      .text {
        font-size: 24rpx;
        color: #444;
      }
    }
  }

  .tips {
    position: absolute;
    bottom: 80rpx;
    left: 20rpx;
    right: 20rpx;
    font-size: 22rpx;
    color: #999;
    text-align: center;
  }
</style>
