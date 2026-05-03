/**
 * 系统管理 API 模块（Art Design Pro 框架内置）
 *
 * 框架内置用户、角色、菜单管理接口。
 * PrintEase 业务接口请使用 src/api/printease.ts
 *
 * @module api/system-manage
 */

import request from '@/utils/http'

// ==================== 用户管理（框架内置） ====================

export function fetchUserList(params: Api.SystemManage.UserSearchParams) {
  return request.get<Api.SystemManage.UserList>({
    url: '/api/user/list',
    params
  })
}

export function fetchUserDetail(id: number) {
  return request.get<Api.SystemManage.UserListItem>({
    url: `/api/user/${id}`
  })
}

export function createUser(data: Record<string, any>) {
  return request.post<void>({
    url: '/api/user/create',
    params: data
  })
}

export function updateUser(id: number, data: Record<string, any>) {
  return request.put<void>({
    url: `/api/user/update/${id}`,
    params: data
  })
}

export function deleteUser(id: number) {
  return request.del<void>({
    url: `/api/user/delete/${id}`
  })
}

// ==================== 角色管理（框架内置） ====================

export function fetchRoleList(params: Api.SystemManage.RoleSearchParams) {
  return request.get<Api.SystemManage.RoleList>({
    url: '/api/role/list',
    params
  })
}

export function createRole(data: Record<string, any>) {
  return request.post<void>({
    url: '/api/role/create',
    params: data
  })
}

export function updateRole(id: number, data: Record<string, any>) {
  return request.put<void>({
    url: `/api/role/update/${id}`,
    params: data
  })
}

export function deleteRole(id: number) {
  return request.del<void>({
    url: `/api/role/delete/${id}`
  })
}

// ==================== 菜单管理（框架内置） ====================

export function fetchMenuTree() {
  return request.get<any>({
    url: '/api/v3/system/menus/simple'
  })
}

export function fetchMenuList(params?: Record<string, any>) {
  return request.get<any>({
    url: '/api/v3/system/menus',
    params
  })
}

export function createMenu(data: Record<string, any>) {
  return request.post<void>({
    url: '/api/v3/system/menus',
    params: data
  })
}

export function updateMenu(id: number, data: Record<string, any>) {
  return request.put<void>({
    url: `/api/v3/system/menus/${id}`,
    params: data
  })
}

export function deleteMenu(id: number) {
  return request.del<void>({
    url: `/api/v3/system/menus/${id}`
  })
}

export const fetchGetUserList = fetchUserList
export const fetchGetRoleList = fetchRoleList
export const fetchGetMenuList = fetchMenuList
