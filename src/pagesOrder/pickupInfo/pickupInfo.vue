<template>
  <view class="pickupInfo">
    {{ info.detail }}
  </view>
</template>

<script setup>
  import { useSecretStore } from '@/stores/modules/secret'
  import { ref } from 'vue'

  const secretStore = useSecretStore()

  const query = defineProps(['id'])

  const info = ref(
    ...secretStore.secretInfo.filter((item) => item.id === Number(query.id))
  )
</script>

<style scoped>
  .pickupInfo {
    text-align: center;
    margin: 20rpx;
  }
</style>
