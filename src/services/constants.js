import { http } from '@/utils/http'

/**
 * 获取订单详情
 * @param id 订单id
 */
export const getMemberOrderByIdAPI = (id) => {
  return http({
    method: 'GET',
    url: `/member/order/${id}`
  })
}

/** 订单状态列表 */
export const orderStateList = [
  { id: 0, text: '待帮助', color: '#31b573' },
  { id: 1, text: '已帮助', color: '#6495ed' },
  { id: 2, text: '已完成', color: '#ff9240' },
  { id: 3, text: '已取消', color: '#666' }
]
