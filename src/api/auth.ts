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

export function fetchGetUserInfo() {
  return request.get<Api.Auth.AdminInfo>({
    url: '/api/admin/me'
  })
}
