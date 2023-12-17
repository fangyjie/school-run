<template>
  <view class="footer">
    <text>
      金额
      <text class="num">¥ {{ num }}</text>
    </text>
    <text class="button" @tap="onPubOrder"> 立即发布 </text>
  </view>
</template>

<script setup>
  import { computed } from 'vue'
  import { useOrderStore } from '@/stores/modules/order'
  import { useSecretStore } from '@/stores/modules/secret'

  const props = defineProps()

  const num = computed(() => {
    if (props.order.money != '') return Number(props.order.money)
    else return 0
  })

  // 发布订单
  const onPubOrder = () => {
    uni.showModal({
      content: '确定要发布该订单？',
      confirmColor: '#00b16c',
      success: async (res) => {
        if (res.confirm) {
          const orderStore = useOrderStore()
          orderStore.addOrder(props.order)
          const secretStore = useSecretStore()
          secretStore.add(props.detail)
          uni.showToast({ icon: 'success', title: '发布成功' })
          setTimeout(() => {
            // 页面跳转
            uni.switchTab({ url: '/pages/order/order' })
          }, 500)
        }
      }
    })
  }
</script>

<style lang="scss" scoped>
  .footer {
    width: 100%;
    min-height: 150rpx;
    background-color: #fff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    bottom: 0;
    font-weight: bold;
    padding: 20rpx 0;

    .button {
      margin-left: 100rpx;
      width: 180rpx;
      height: 80rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 20rpx;
      border: 1rpx solid #ccc;
      color: #fffffd;
      background-color: #00b16c;
    }

    .num {
      color: #00b16c;
    }
  }
</style>
