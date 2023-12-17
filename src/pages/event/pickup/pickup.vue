<template>
  <view class="viewport" :style="{ minHeight: windowHeight + 'px' }">
    <view class="content">
      <view class="main">
        <view class="title">取快递</view>
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
          <text class="gmessage">取件信息</text>
          <textarea
            class="gcode"
            placeholder="请输入取件码或上传截图 (仅接单员可见)"
            placeholder-style="font-size:30rpx"
            auto-height
            v-model="code"
          />
          <image
            class="add"
            mode="aspectFill"
            v-for="item in photos"
            :key="item.id"
            :src="item.src"
          >
          </image>
          <image
            class="add"
            src="/static/icon/add.png"
            mode="aspectFill"
            @tap="onImgUp"
          >
          </image>
        </view>
        <view class="address">
          <view class="item">
            <view class="ammount">预计金额</view>
            <input
              placeholder="请输入预计金额 ¥"
              class="input_ammount"
              v-model="money"
            />
          </view>
          <view class="item rec">
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
          <picker
            class="item rec"
            :range="kd"
            @change="origin = $event.detail.value"
          >
            <text>快递商家</text>
            <view v-if="origin === -1">请选择快递点</view>
            <view v-if="origin !== -1">{{ kd[origin] }}</view>
          </picker>
          <view class="item">
            <view class="remark">备注信息</view>
            <input placeholder="所有人可见" v-model="mark" />
          </view>
        </view>
      </view>
      <view class="more">
        <view class="opt">
          <text>更多要求</text>
          <switch class="switch" @change="hasMore = !hasMore" />
        </view>
        <view class="list" v-if="hasMore">
          <view class="item">
            <text>期望送达</text>
            <picker
              class="picker"
              :range="[
                '不限制',
                '尽快送达',
                '今天中午',
                '今天晚上',
                '其他时间请备注'
              ]"
              @change="onTimeChange"
            >
              不限制
            </picker>
          </view>
          <view class="item">
            <text>性别限制</text>
            <picker
              class="picker"
              :range="['不限制', '女生', '男生']"
              @change="onSexChange"
            >
              不限制
            </picker>
          </view>
          <view class="item">
            <text>快递数量</text>
            <picker
              class="picker"
              :range="[1, 2, 3, 4, 5, 6, 7, 8, 9]"
              @change="onNumChange"
            >
              1
            </picker>
          </view>
        </view>
      </view>
      <view class="tip">
        <text>!!!特重件需注明并适当加价</text>
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

  const kd = ref(['菜鸟驿站', '菜鸟驿站旁边帐篷', '顺丰', '京东'])

  const addressStore = useAddressStore()
  const orderStore = useOrderStore()
  const memberStore = useMemberStore()

  const { windowHeight } = uni.getSystemInfoSync()
  const hasMore = ref(false)
  const photos = ref([])

  const content = ref('')
  const mark = ref('')
  const origin = ref(-1)
  const orgAddr = computed(() => {
    if (origin != -1) return kd.value[origin.value]
    else return ''
  })
  const end = computed(() => {
    return addressStore.selectedAddress?.address
  })
  const money = ref('')

  const code = ref('')

  const order = ref({
    id: orderStore.orderList.length + 1,
    avatar: memberStore.profile.avatar,
    orderType: '快递代取',
    createTime: formatDate(new Date()),
    orderState: 0,
    info: {
      content: content,
      mark: mark
    },
    origin: orgAddr,
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

  const onImgUp = () => {
    uni.chooseMedia({
      // 文件个数
      count: 1,
      // 文件类型
      mediaType: ['image'],
      success: (res) => {
        // 本地路径
        const { tempFilePath } = res.tempFiles[0]
        // 上传
        uploadFile(tempFilePath)
      }
    })
  }

  const uploadFile = (file) => {
    // 文件上传
    uni.uploadFile({
      url: '/order/',
      name: 'file',
      filePath: file,
      success: (res) => {
        if (res.statusCode === 200) {
          // 更新

          uni.showToast({ icon: 'success', title: '更新成功' })
        } else {
          uni.showToast({ icon: 'error', title: '出现错误' })
        }
      }
    })
  }
</script>

<style lang="scss" scoped>
  page {
    height: 100%;
  }
  .viewport {
    padding: 20rpx 40rpx 200rpx;
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

        .gcode {
          width: 90%;
          min-height: 150rpx;
          border: 2px solid rgb(152, 200, 158);
          border-radius: 20rpx;
          margin: 5% auto;
          padding: 20rpx;
        }
        .add {
          margin-left: 20rpx;
          width: 32px;
          height: 32px;
        }
      }

      .address {
        .item {
          border-top: 1px solid #ccc;
          padding: 2% 0;
        }

        .rec {
          text {
            display: block;
            margin-bottom: 15rpx;
          }
        }
      }
    }

    .more {
      width: 100%;
      margin: 2% 0;
      .opt {
        .switch {
          scale: 65%;
        }
      }

      .list {
        font-size: 95%;
        .item {
          border-bottom: 1px solid #ccc;
          padding: 5% 0;
          display: flex;
          justify-content: space-between;
        }
      }
    }

    .tip {
      color: red;
    }
  }
</style>
