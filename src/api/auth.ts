import request from '@/utils/http'
import { useUserStore } from '@/store/modules/user'

/**
 * 管理员登录
 * @param params { username, password }
 * @returns { token, admin }
 */
export function fetchLogin(params: { username: string; password: string }) {
  return request.post<{
    token: string
    admin: {
      id: number
      username: string
      realName: string
      role: number
    }
  }>({
    url: '/api/auth/admin',
    params
  })
}

/**
 * 获取当前管理员信息
 * PrintEase 后端返回管理员基本信息
 */
export function fetchGetUserInfo(): Promise<Api.Auth.AdminInfo> {
  const userStore = useUserStore()
  const userInfo = userStore.getUserInfo

  if (!userInfo.userId || !userInfo.userName) {
    return Promise.reject(new Error('未找到缓存的管理员信息，请重新登录'))
  }

  return Promise.resolve({
    id: userInfo.userId,
    username: userInfo.userName,
    realName: userInfo.userName,
    role: userInfo.roles?.includes('R_SUPER') ? 0 : 1
  })
}
