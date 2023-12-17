<template>
  <view class="viewport">
    <view>
      <view class="title">
        <text>个人信息</text>
      </view>
      <!-- 表单 -->
      <view class="form">
        <!-- 表单内容 -->
        <view class="form-content">
          <view class="form-item">
            <text class="label">姓名</text>
            <input class="input" type="text" placeholder="请输入姓名" />
          </view>
          <view class="form-item">
            <text class="label">学号</text>
            <input class="input" type="text" placeholder="请输入学号" />
          </view>
        </view>
      </view>
    </view>
    <view>
      <view class="title">
        <text>证件照片 <text class="remark">(一卡通/学生证)</text></text>
      </view>
      <view class="idPhoto">
        <image class="image" :src="photo" mode="aspectFill" />
        <text class="text" @tap="onIdPhotoUP">点击上传证件</text>
      </view>
    </view>
    <!-- 提交按钮 -->
    <button @tap="onSubmit">提交认证</button>
  </view>
</template>

<script setup>
  import { ref } from 'vue'

  const photo = ref('/static/image/navigator_bg.png')

  const onIdPhotoUP = () => {
    // #ifdef MP-WEIXIN
    // uni.chooseMedia 仅支持微信小程序端
    uni.chooseMedia({
      // 文件个数
      count: 1,
      // 文件类型
      mediaType: ['image'],
      success: (res) => {
        // 本地路径
        const { tempFilePath } = res.tempFiles[0]
        // 注意!!!!!!(测试使用,正式需要删除)
        photo.value = tempFilePath
        // 上传
        // uploadFile(tempFilePath)
      }
    })
    // #endif
  }

  // 文件上传-兼容小程序端、H5端、App端
  const uploadFile = (file) => {
    // 文件上传
    uni.uploadFile({
      url: '/member/profile/avatar',
      name: 'file',
      filePath: file,
      success: (res) => {
        if (res.statusCode === 200) {
          const idPhoto = JSON.parse(res.data).result.avatar
          photo.value = idPhoto
          uni.showToast({ icon: 'success', title: '更新成功' })
        } else {
          uni.showToast({ icon: 'error', title: '出现错误' })
        }
      }
    })
  }

  // 点击提交认证信息
  const onSubmit = () => {
    uni.showToast({ icon: 'success', title: '提交成功' })
    setTimeout(() => {
      uni.navigateBack()
    }, 400)
  }
</script>

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

  .title {
    margin: 30rpx 0rpx 20rpx 20rpx;
    .remark {
      font-size: 28rpx;
      color: #333;
    }
  }

  // 表单
  .form {
    &-content {
      margin: 20rpx 20rpx 0;
      padding: 0 20rpx;
      border-radius: 10rpx;
      background-color: #fff;
    }

    &-item {
      display: flex;
      height: 96rpx;
      line-height: 46rpx;
      padding: 25rpx 10rpx;
      background-color: #fff;
      font-size: 28rpx;
      border-bottom: 1rpx solid #ddd;

      &:last-child {
        border: none;
      }

      .label {
        width: 180rpx;
        color: #333;
      }

      .input {
        flex: 1;
        display: block;
        height: 46rpx;
      }

      .placeholder {
        color: #808080;
      }
    }
  }

  .idPhoto {
    width: 90%;
    height: 500rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    margin: 20rpx 20rpx 0;
    padding: 0 20rpx;
    border-radius: 10rpx;

    .image {
      width: 90%;
      height: 80%;
    }

    .text {
      display: block;
      padding-top: 20rpx;
      line-height: 1;
      font-size: 26rpx;
    }
  }

  button {
    height: 80rpx;
    text-align: center;
    line-height: 80rpx;
    margin: 30rpx 20rpx;
    color: #fff;
    border-radius: 80rpx;
    font-size: 30rpx;
    background-color: #27ba9b;
  }
</style>
