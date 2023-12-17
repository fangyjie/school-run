import { http } from '@/utils/http'

/**
 * 账号密码登录
 * @param data 请求参数
 */
export const postLoginAPI = (data) => {
  return http({
    method: 'POST',
    url: '/login',
    data
  })
}

/**
 * 小程序登录
 * @param data 请求参数
 */
export const postLoginWxMinAPI = (data) => {
  return http({
    method: 'POST',
    url: '/login/wxMin',
    data
  })
}

/**
 * 小程序登录_内测版
 * @param phoneNumber 模拟手机号码
 */
export const postLoginWxMinSimpleAPI = (phoneNumber) => {
  return http({
    method: 'POST',
    url: '/login/wxMin/simple',
    data: {
      phoneNumber
    }
  })
}
