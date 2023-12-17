import { http } from '@/utils/http'

/**
 * 获取订单列表
 * @param data orderState 订单状态
 */
export const getMemberOrderAPI = (data) => {
  return http({
    method: 'GET',
    url: `/member/order`,
    data
  })
}
