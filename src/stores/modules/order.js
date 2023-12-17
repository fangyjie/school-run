import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useOrderStore = defineStore('order', () => {
  const orderList = ref([
    {
      id: 1,
      avatar: '/static/image/cat.jpg',
      orderType: '快递代取',
      createTime: '2023-11-16 20:42:09',
      orderState: 1,
      info: {
        content: '取书',
        mark: '小心'
      },
      origin: '菜鸟驿站',
      end: '303',
      money: 3,
      runner: {
        avatar: '/static/image/cat.jpg',
        nickname: '泡泡',
        pickTime: '2023-11-17 8:37:05',
        finishTime: ''
      }
    },
    {
      id: 2,
      avatar: '/static/image/cat.jpg',
      orderType: '校园跑腿',
      createTime: '2023-11-16',
      orderState: 2,
      info: {
        content: '取书',
        mark: ''
      },
      origin: '8教',
      end: '303',
      money: 3.2,
      runner: {
        avatar: '/static/image/cat.jpg',
        nickname: '泡泡',
        pickTime: '2023-11-17 8:37:05',
        finishTime: '2023-11-17 14:25:06'
      }
    },
    {
      id: 3,
      avatar: '/static/image/cat.jpg',
      orderType: '校园跑腿',
      createTime: '2023-11-16',
      orderState: 0,
      info: {
        content: '取书',
        mark: ''
      },
      origin: '8教',
      end: '303',
      money: 3.28,
      runner: {
        avatar: '',
        nickname: '',
        pickTime: '',
        finishTime: ''
      }
    },
    {
      id: 4,
      avatar: '/static/image/cat.jpg',
      orderType: '校园跑腿',
      createTime: '2023-11-16',
      orderState: 0,
      info: {
        content: '取书',
        mark: ''
      },
      origin: '8教',
      end: '303',
      money: 3.2,
      runner: {
        avatar: '',
        nickname: '',
        pickTime: '',
        finishTime: ''
      }
    }
  ])

  const addOrder = (val) => {
    orderList.value.push(val)
  }

  const deleteOrder = (id) => {
    orderList.value = orderList.value.filter((item) => item.id != id)
  }

  const changeOrderState = (id, state) => {
    for (const order of orderList.value) {
      if (order.id === id) order.orderState = state
    }
  }

  const changeOrder = (id, val) => {
    for (const order of orderList.value) {
      if (order.id === id) order.runner = { ...order.runner, ...val }
    }
  }

  return {
    orderList,
    addOrder,
    deleteOrder,
    changeOrderState,
    changeOrder
  }
})
