<template>
  <view class="viewport">
    <view class="credit">
      <view class="title">
        <text>现有信用分</text>
      </view>
      <view class="card">
        <text class="user">用户: 方*</text>
        <text class="ratio"><text class="score">12</text>/12分</text>
        <text class="time">
          评估时间: {{ formatDate(new Date(), 'YYYY-MM-DD') }}
        </text>
      </view>
    </view>
    <view class="rule">
      <view class="title">
        <text>信用分规则</text>
      </view>
      <view class="tables">
        <view class="table">
          <!-- 表头 -->
          <view class="row header">
            <text class="cell">扣分项目</text>
          </view>
          <view class="row summarize">
            <text class="cell">项目</text>
            <text class="cell">详情</text>
            <text class="cell">扣分</text>
          </view>
          <!-- 数据行 -->
          <view class="row">
            <text class="cell">不守时</text>
            <text class="cell">未按要求</text>
            <text class="cell">-2</text>
          </view>
          <view class="row">
            <text class="cell">不守时</text>
            <text class="cell">未按要求</text>
            <text class="cell">-2</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
  import { formatDate } from '@/utils/index'
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
  }

  .credit {
    .card {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      height: 280rpx;
      margin: 20rpx 95rpx;
      padding: 10rpx 25rpx;
      border-radius: 20rpx;
      background: url('/static/image/credit_bg.png') no-repeat right bottom,
        linear-gradient(to right, #c7edcc, #00b16db6, #c7edcc);
      .user {
        font-size: 30rpx;
      }
      .ratio {
        .score {
          font-size: 64rpx;
        }
      }
      .time {
        font-size: 28rpx;
      }
    }
  }

  .tables {
    display: flex;
    flex-direction: column;
    align-items: center;

    .table {
      display: flex;
      flex-direction: column;
      width: 300px;
      background-color: #fff;

      .header {
        font-weight: bold;
        .cell:first-child {
          border-radius: 20rpx 20rpx 0 0;
        }
      }

      .summarize {
        font-weight: bold;
      }

      .row {
        display: flex;
        flex-direction: row;

        .cell {
          flex: 1;
          text-align: center;
          padding: 5px;
          border-top: 1px solid #000;
          border-left: 1px solid #000;
        }

        .cell:last-child {
          border-right: 1px solid #000;
        }
      }

      .row:last-child {
        .cell {
          border-bottom: 1px solid #000;
        }
        .cell:first-child {
          border-bottom-left-radius: 20rpx;
        }

        .cell:last-child {
          border-bottom-right-radius: 20rpx;
        }
      }
    }
  }
</style>
