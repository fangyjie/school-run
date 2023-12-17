<template>
  <scroll-view
    class="orders"
    scroll-y
    enable-back-to-top
    refresher-enabled
    :refresher-triggered="isTriggered"
    @refresherrefresh="onRefresherrefresh"
    @scrolltolower="getMemberOrderData"
  >
    <view class="card" v-for="order in orderList" :key="order.id">
      <navigator
        :url="`/pagesOrder/detail/detail?id=${order.id}`"
        hover-class="none"
      >
        <!-- 订单信息 -->
        <view class="status">
          <image class="avatar" :src="order.avatar" mode="aspectFill" />
          <view class="td">
            <text class="type">{{ order.orderType }}</text>
            <text class="date">
              {{ formatDate(new Date(order.createTime), 'YYYY-MM-DD') }}
            </text>
          </view>
          <!-- 订单状态文字 -->
          <text :style="{ color: orderStateList[order.orderState].color }">
            {{ orderStateList[order.orderState].text }}
          </text>
        </view>
        <!-- 订单内容 -->
        <view class="content">
          <text>{{ order.info.content }}---{{ order.info.mark }}</text>
        </view>
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
      </navigator>
      <view class="footer">
        <!-- 订单金额 -->
        <text class="button money"> 金额 ¥ {{ order.money }}</text>
        <!-- 待帮助 状态: 展示接单 -->
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
          class="button"
          @tap="onOrderDelete(order.id)"
        >
          删除订单
        </text>
      </view>
    </view>
    <!-- 底部提示文字 -->
    <view
      class="loading-text"
      :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }"
    >
      {{ isFinish ? '没有更多数据~' : '正在加载...' }}
    </view>
  </scroll-view>
</template>

<script setup>
  import { formatDate } from '@/utils/index'
  import { orderStateList } from '@/services/constants'
  import { getMemberOrderAPI } from '@/services/order'
  import { onMounted, ref } from 'vue'
  import { useOrderStore } from '@/stores/modules/order'
  import { useMemberStore } from '@/stores'

  // 获取屏幕边界到安全区域距离
  const { safeAreaInsets } = uni.getSystemInfoSync()

  // 定义 porps
  const props = defineProps()

  // 请求参数
  const queryParams = {
    page: 1,
    pageSize: 3,
    orderState: props.orderState
  }

  const orderStore = useOrderStore()
  // 获取订单列表
  const orderList = ref([])

  const filtOrderList = (list) => {
    if (props.orderState === 1) return list
    else if (props.orderState === 2) return list
    else if (props.orderState === 3) return list
    else return list.filter((item) => item.orderState === 0)
  }

  // 是否加载中标记，用于防止滚动触底触发多次请求
  const isLoading = ref(false)
  const getMemberOrderData = async () => {
    // 如果数据出于加载中，退出函数
    if (isLoading.value) return
    // 退出分页判断
    if (isFinish.value === true) {
      return uni.showToast({ icon: 'none', title: '没有更多数据~' })
    }
    // 发送请求前，标记为加载中
    isLoading.value = true
    // 发送请求
    // const res = await getMemberOrderAPI(queryParams)
    const res = orderStore.orderList.filter(
      (item) =>
        item.id <= queryParams.page * 3 && item.id > (queryParams.page - 1) * 3
    )

    // 发送请求后，重置标记S
    isLoading.value = false
    // 数组追加
    // orderList.value.push(...res.result.items)
    orderList.value.push(...filtOrderList(res))
    // 分页条件
    if ((queryParams.page - 1) * 3 < orderStore.orderList.length) {
      // 页码累加
      queryParams.page++
    } else {
      // 分页已结束
      isFinish.value = true
    }
  }

  onMounted(() => {
    getMemberOrderData()
  })

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
            uni.navigateTo({ url: `/pagesOrder/detail/detail?id=${id}` })
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
            uni.navigateTo({ url: `/pagesOrder/detail/detail?id=${id}` })
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
            uni.navigateTo({ url: `/pagesOrder/detail/detail?id=${id}` })
          }, 500)
        }
      }
    })
  }

  // 是否分页结束
  const isFinish = ref(false)
  // 是否触发下拉刷新
  const isTriggered = ref(false)
  // 自定义下拉刷新被触发
  const onRefresherrefresh = async () => {
    // 开始动画
    isTriggered.value = true
    // 重置数据
    queryParams.page = 1
    orderList.value = []
    isFinish.value = false
    // 加载数据
    await getMemberOrderData()
    // 关闭动画
    isTriggered.value = false
  }
</script>

<style lang="scss" scoped>
  // 订单列表
  .orders {
    height: 100%;
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
    }

    .status {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 28rpx;
      margin-bottom: 15rpx;

      .avatar {
        width: 50rpx;
        height: 50rpx;
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
    }

    .content {
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
      justify-content: flex-end;
      align-items: center;
      padding-top: 20rpx;

      .button {
        width: 150rpx;
        height: 50rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 20rpx;
        border-radius: 15rpx;
        border: 1rpx solid #ccc;
        font-size: 26rpx;
        color: #444;
      }

      .money {
        border-radius: 60rpx;
        width: 125rpx;
        height: 45rpx;
        font-size: 24rpx;
        color: #27ba9b;
        border-color: #27ba9b;
      }

      .help {
        width: 120rpx;
        color: #fff;
        background-color: rgb(55, 193, 134, 0.9);
      }

      .cancel {
        width: 120rpx;
        color: #666;
      }

      .delete {
        color: #ff9240;
      }
    }

    .loading-text {
      text-align: center;
      font-size: 28rpx;
      color: #666;
      padding: 20rpx 0;
    }
  }
</style>
