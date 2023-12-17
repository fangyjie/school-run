<template>
  <view class="viewport" :style="{ height: windowHeight + 'px' }">
    <view class="content">
      <view class="main">
        <view class="title">寄快递</view>
        <view class="size">
          <view class="gsize">快递大小</view>
          <radio-group
            name="size"
            class="select_size"
            @change="content = $event.detail.value"
          >
            <radio value="小件">小件</radio>
            <radio value="中件">中件</radio>
            <radio value="大件">大件</radio>
          </radio-group>
        </view>
        <view class="address">
          <view class="item">
            <view class="adr">
              <text>取货地址</text>
              <navigator
                hover-class="none"
                url="/pagesMember/address/address?from=order"
              >
                <text v-if="addressStore.selectedAddress">
                  {{ addressStore.selectedAddress?.address }}
                </text>
                <text v-if="!addressStore.selectedAddress">请选择取货地址</text>
              </navigator>
            </view>
            <view class="adr">
              <text>联系方式</text>
              <input placeholder="请输入联系方式" v-model="code" />
            </view>
            <view class="adr">
              <text>快递商家</text>
              <input placeholder="请输入快递商家" v-model="end" />
            </view>
            <view class="adr">
              <text>预计金额</text>
              <input placeholder="请输入预计金额 ¥" v-model="money" />
            </view>
            <view class="adr">
              <text>备注信息</text>
              <input placeholder="请输入备注信息" v-model="mark" />
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
  const mark = ref('')
  const end = ref('')
  const origin = computed(() => {
    return addressStore.selectedAddress?.address
  })
  const money = ref('')

  const code = ref('')

  const order = ref({
    id: orderStore.orderList.length + 1,
    avatar: memberStore.profile.avatar,
    orderType: '快递代寄',
    createTime: formatDate(new Date()),
    orderState: 0,
    info: {
      content: content,
      mark: mark
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

    .size {
      margin-bottom: 5%;
      font-size: 105%;

      .select_size {
        margin: 5% 0;
        scale: 90%;
        display: flex;
        justify-content: space-around;
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
