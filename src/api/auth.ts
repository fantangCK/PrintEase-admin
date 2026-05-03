import request from '@/utils/http'

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
  return request.get<Api.Auth.AdminInfo>({
    url: '/api/auth/admin/profile',
    showErrorMessage: false
  })
}
