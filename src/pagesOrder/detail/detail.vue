<template>
  <scroll-view class="order" scroll-y enable-flex>
    <view class="initiator">
      <view class="title">发起人</view>
      <view class="card">
        <!-- <view class="tip">请尽快确认订单是否完成</view> -->
        <!-- 订单信息 -->
        <view class="status">
          <image class="avatar" :src="order.avatar" mode="aspectFill" />
          <view class="td">
            <text class="type">{{ order.orderType }}</text>
            <text class="date">{{ order.createTime }}</text>
          </view>
          <!-- 订单状态文字 -->
          <text
            :style="{
              color: orderStateList[order.orderState].color
            }"
            class="state"
          >
            {{ orderStateList[order.orderState].text }}
          </text>
        </view>
        <!-- 订单内容 -->
        <view class="content">
          <view>{{ order.info.content }}</view>
          <view>{{ order.info.mark }}</view>
        </view>
        <navigator
          :url="`/pagesOrder/pickupInfo/pickupInfo?id=${order.id}`"
          hover-class="none"
        >
          <text class="button detail">订单详情</text>
        </navigator>
        <!-- 订单地址 -->
        <view class="address">
          <view class="origin">
            <text>起</text>
            {{ order.origin }}
          </view>
          <view class="mid"></view>
          <view class="end">
            <text>终</text>
            {{ order.end }}
          </view>
        </view>
        <view class="footer">
          <!-- 订单金额 -->
          <text class="button money"> 金额 ¥ {{ order.money }}</text>
          <!-- <navigator
            class="leaveWord"
            url="pagesOrder/leaveWord/leaveWord"
            hover-class="none"
          >
            留言
          </navigator> -->
        </view>
      </view>
    </view>

    <view class="receiver">
      <view class="title">接单人</view>
      <view class="card">
        <!-- 接单人信息 -->
        <view class="status" v-if="order.runner.avatar != ''">
          <image class="avatar" :src="order.runner.avatar" mode="aspectFill" />
          <view class="nickname"> {{ order.runner.nickname }} </view>
        </view>
        <view class="list">
          <view class="item">
            <text>订单号</text>
            <text>{{ order.id }}</text>
          </view>
          <button class="item" open-type="contact">
            <text>联系管理员</text>
            <text>客服</text>
          </button>
          <view class="item" v-if="order.runner.pickTime != ''">
            <text>接单时间</text>
            <text>{{ order.runner.pickTime }}</text>
          </view>
          <view class="item" v-if="order.runner.finishTime != ''">
            <text>完成时间</text>
            <text>{{ order.runner.finishTime }}</text>
          </view>
        </view>
      </view>
    </view>

    <view class="operate">
      <navigator class="button" hover-class="none" open-type="navigateBack">
        前往订单池
      </navigator>
      <text
        v-if="order.orderState === 0"
        class="button help"
        @tap="onOrderHelp(order.id)"
      >
        接单
      </text>
      <!-- 待帮助/已帮助 状态: 展示取消 -->
      <text
        v-if="order.orderState <= 1"
        class="button cancel"
        @tap="onOrderCancel(order.id)"
      >
        取消
      </text>
      <text
        v-if="order.orderState === 1"
        class="button delete"
        @tap="onOrderConf(order.id)"
      >
        确认完成
      </text>
      <!-- 已完成/已取消 状态: 展示删除订单 -->
      <text
        v-if="order.orderState > 1"
        class="button delete"
        @tap="onOrderDelete(order.id)"
      >
        删除订单
      </text>
    </view>
  </scroll-view>
</template>

<script setup>
  import { orderStateList } from '@/services/constants'
  import { getMemberOrderAPI } from '@/services/order'
  import { onMounted, ref } from 'vue'
  import { useOrderStore } from '@/stores/modules/order'
  import { useMemberStore } from '@/stores/modules/member'

  const query = defineProps(['id'])

  const orderStore = useOrderStore()

  // 获取订单详情
  const order = ref(
    ...orderStore.orderList.filter((item) => item.id === Number(query.id))
  )

  // 接单
  const onOrderHelp = (id) => {
    uni.showModal({
      title: '是否接单?',
      content: '接单后请及时完成订单任务哦~',
      confirmColor: '#27BA9B',
      success: async (res) => {
        if (res.confirm) {
          const memberStore = useMemberStore()
          const runner = {
            avatar: memberStore.profile.avatar,
            nickname: memberStore.profile.nickname,
            pickTime: formatDate(new Date())
          }
          orderStore.changeOrderState(id, 1)
          orderStore.changeOrder(id, runner)
          uni.showToast({ icon: 'success', title: '接单成功' })
          setTimeout(() => {
            // 页面跳转
            uni.navigateBack()
          }, 500)
        }
      }
    })
  }

  // 取消订单
  const onOrderCancel = (id) => {
    uni.showModal({
      content: '确定要取消该订单？',
      confirmColor: '#666',
      success: async (res) => {
        if (res.confirm) {
          orderStore.changeOrderState(id, 3)
          uni.showToast({ icon: 'success', title: '取消成功' })
          setTimeout(() => {
            // 页面跳转
            uni.navigateBack()
          }, 500)
        }
      }
    })
  }

  // 删除订单
  const onOrderDelete = (id) => {
    uni.showModal({
      content: '确定要删除该订单？',
      confirmColor: '#ff0000',
      success: async (res) => {
        if (res.confirm) {
          orderStore.deleteOrder(id)
          uni.showToast({ icon: 'success', title: '删除成功' })
          setTimeout(() => {
            // 页面跳转
            uni.navigateBack()
          }, 500)
        }
      }
    })
  }

  const onOrderConf = (id) => {
    uni.showModal({
      content: '确定该订单已完成？',
      confirmColor: '#ff9240',
      success: async (res) => {
        if (res.confirm) {
          orderStore.changeOrderState(id, 2)
          orderStore.changeOrder(id, { finishTime: formatDate(new Date()) })
          uni.showToast({ icon: 'success', title: '确定成功' })
          setTimeout(() => {
            // 页面跳转
            uni.navigateBack()
          }, 500)
        }
      }
    })
  }
</script>

<style lang="scss" scoped>
  page {
    background-color: #f4f4f4;
  }

  // 订单列表
  .order {
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #f4f4f4;
    padding-bottom: 45%;

    .title {
      margin: 30rpx 20rpx 0;
    }

    .card {
      min-height: 100rpx;
      padding: 20rpx;
      margin: 20rpx 20rpx 0;
      border-radius: 10rpx;
      background-color: #fff;
      box-shadow: 1rpx 1rpx 1rpx 1rpx #c7edcc;

      &:last-child {
        padding-bottom: 40rpx;
      }

      .tip {
        text-align: center;
        font-size: 28rpx;
        margin-bottom: 10rpx;
      }
    }

    .status {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 15rpx;

      .avatar {
        width: 70rpx;
        height: 70rpx;
        border-radius: 50%;
        background-color: #eee;
      }

      .td {
        display: flex;
        flex-direction: column;
        flex: 1;
        margin-left: 20rpx;

        .type {
          font-weight: bold;
        }
        .date {
          font-size: 24rpx;
          color: #666;
        }
      }

      .state {
        font-size: 28rpx;
      }
    }

    .content {
      font-size: 30rpx;
      margin: 30rpx 20rpx 40rpx;
    }

    .address {
      font-size: 28rpx;

      text {
        color: #fff;
        border-radius: 50%;
        padding: 6rpx 12rpx;
      }

      .origin {
        color: #31b573;

        text {
          background-color: #31b573;
        }
      }

      .end {
        color: #6495ed;

        text {
          background-color: #6495ed;
        }
      }

      .mid {
        min-height: 35rpx;
        margin-left: 22rpx;
        border-left: 2px solid #b0b0b0;
      }
    }

    .footer {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-top: 40rpx;
    }

    .button {
      margin-right: 15rpx;
      width: 160rpx;
      height: 60rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10rpx;
      border: 1rpx solid #444;
      font-size: 26rpx;
      background-color: rgb(255, 255, 255, 0.9);
    }

    .money {
      width: 130rpx;
      height: 50rpx;
      font-size: 24rpx;
      color: #27ba9b;
      border-color: #27ba9b;
      border-radius: 60rpx;
    }

    .detail {
      margin-bottom: 20rpx;
      width: 120rpx;
      height: 50rpx;
      color: #fff;
      background-color: rgb(55, 193, 134, 0.9);
      border-color: #27ba9b;
    }

    .help {
      color: #fff;
      background-color: rgb(55, 193, 134, 0.9);
    }

    .cancel {
      color: #666;
    }

    .delete {
      color: red;
    }
  }

  .receiver {
    padding-bottom: 10rpx;
    .card {
      font-size: 28rpx;

      &:last-child {
        padding-bottom: 5rpx;
      }

      button {
        font-size: 28rpx;
        padding: 0;
        margin: 0;
        background-color: #ffffff;
        line-height: inherit;
      }

      button::after {
        border: none;
      }
    }
    .status {
      .avatar {
        width: 60rpx;
        height: 60rpx;
      }

      .nickname {
        font-weight: bold;
        flex: 1;
        margin-left: 20rpx;
      }
    }

    .list {
      .item {
        border-top: 1px solid #ccc;
        padding: 15rpx 0;
        display: flex;
        justify-content: space-between;
      }

      button {
        border-radius: 0;
      }
    }
  }

  .operate {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: fixed;
    bottom: 100rpx;
    right: 10rpx;
  }
</style>
