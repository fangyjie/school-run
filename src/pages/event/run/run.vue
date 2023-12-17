<template>
  <view class="viewport" :style="{ height: windowHeight + 'px' }">
    <view class="content">
      <view class="main">
        <view class="title">校园跑腿</view>
        <view class="message">
          <text>帮助内容</text>
          <textarea
            class="gcode"
            placeholder="请输入帮助信息"
            placeholder-style="font-size:30rpx"
            auto-height
            v-model="content"
          />
        </view>
        <view class="address">
          <view class="item">
            <view class="adr">
              <text>取货地点</text>
              <input placeholder="请输入取货地点" v-model="origin" />
            </view>
            <view class="adr">
              <text>收货地址</text>
              <navigator
                hover-class="none"
                url="/pagesMember/address/address?from=order"
              >
                <text v-if="addressStore.selectedAddress">
                  {{ addressStore.selectedAddress?.address }}
                </text>
                <text v-if="!addressStore.selectedAddress">请选择收货地址</text>
              </navigator>
            </view>
            <view class="adr">
              <text>联系方式</text>
              <input placeholder="请输入联系方式" v-model="code" />
            </view>
            <view class="adr">
              <text>预计金额</text>
              <input placeholder="请输入预计金额 ¥" v-model="money" />
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
  <publish :order="order" :detail="detail" />
</template>

<script setup>
  import { ref, computed } from 'vue'
  import publish from '../components/publish.vue'
  import { useAddressStore } from '@/stores/modules/address'
  import { useOrderStore } from '@/stores/modules/order'
  import { useMemberStore } from '@/stores'
  import { formatDate } from '@/utils/index'

  const { windowHeight } = uni.getSystemInfoSync()

  const addressStore = useAddressStore()
  const orderStore = useOrderStore()
  const memberStore = useMemberStore()

  const content = ref('')
  const origin = ref('')
  const end = computed(() => {
    return addressStore.selectedAddress?.address
  })
  const money = ref('')

  const code = ref('')

  const order = ref({
    id: orderStore.orderList.length + 1,
    avatar: memberStore.profile.avatar,
    orderType: '校园跑腿',
    createTime: formatDate(new Date()),
    orderState: 0,
    info: {
      content: content,
      mark: ''
    },
    origin: origin,
    end: end,
    money: money,
    runner: {
      avatar: '',
      nickname: '',
      pickTime: '',
      finishTime: ''
    }
  })

  const detail = ref({
    id: order.value.id,
    detail: code
  })
</script>

<style lang="scss" scoped>
  page {
    height: 100%;
  }

  .viewport {
    padding: 20rpx 40rpx;
    height: 100%;
    background-color: #f4f4f4;
  }

  .content {
    padding: 30rpx;
    border-radius: 20rpx;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .title {
    text-align: center;
    font-size: 120%;
    margin-bottom: 5%;
  }

  .main {
    width: 100%;

    .message {
      margin-bottom: 5%;
      font-size: 105%;

      .gcode {
        width: 90%;
        min-height: 150rpx;
        border: 2px solid rgb(152, 200, 158);
        border-radius: 20rpx;
        margin: 5% auto;
        padding: 20rpx;
      }
    }
  }

  .address {
    margin: 10% 0;

    .item .adr {
      margin: 2% 0;
      border-bottom: 1px solid #ccc;
    }

    .item text {
      display: block;
      margin-bottom: 15rpx;
    }
  }
</style>
