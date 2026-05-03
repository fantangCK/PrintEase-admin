/**
 * PrintEase 业务 API 模块
 *
 * 对接 PrintEase 后端全部接口，按业务模块组织
 *
 * @module api/printease
 */

import request from '@/utils/http'
import axios from 'axios'

// ==================== 仪表盘 ====================

export function fetchDashboardStats() {
  return request.get<Api.PrintEase.DashboardStats>({
    url: '/api/orders/admin/orders/stats',
    showErrorMessage: false
  })
}

export function fetchRecentOrders(params?: Api.PrintEase.OrderSearchParams) {
  return request.get<Api.PrintEase.OrderListResponse>({
    url: '/api/orders/admin/list',
    params: { ...params, limit: 5 },
    showErrorMessage: false
  })
}

export function fetchIncomeTrend() {
  return request.get<Api.PrintEase.IncomeTrendItem[]>({
    url: '/api/orders/admin/orders/stats'
  })
}

// ==================== 订单管理 ====================

export function fetchOrderList(params: Api.PrintEase.OrderSearchParams) {
  return request.get<Api.PrintEase.OrderListResponse>({
    url: '/api/orders/admin/list',
    params
  })
}

export function fetchOrderDetail(id: number) {
  return request.get<Api.PrintEase.OrderDetail>({
    url: `/api/orders/${id}`
  })
}

export function fetchAdminOrderDetail(id: number) {
  return request.get<Api.PrintEase.OrderDetail>({
    url: `/api/orders/admin/orders/${id}`
  })
}

export function updateOrderStatus(id: number, status: number) {
  return request.put<void>({
    url: `/api/orders/admin/orders/${id}/status`,
    params: { status }
  })
}

export function setOrderStatus(id: number, status: number) {
  return request.put<void>({
    url: `/api/orders/${id}/set-status`,
    params: { status }
  })
}

export function batchUpdateOrders(params: Api.PrintEase.OrderBatchParams) {
  return request.post<void>({
    url: '/api/orders/admin/orders/batch',
    params
  })
}

export function deleteOrder(id: number) {
  return request.del<void>({
    url: `/api/orders/${id}`
  })
}

export function fetchOrderStats(params?: Api.PrintEase.OrderStatsParams) {
  return request.get<any>({
    url: '/api/orders/admin/orders/stats',
    params
  })
}

export function exportOrders(params?: Record<string, any>) {
  return request.get<Blob>({
    url: '/api/orders/admin/orders/export',
    params,
    responseType: 'blob'
  })
}

export function cancelOrder(id: number) {
  return request.put<void>({
    url: `/api/orders/${id}/cancel`
  })
}

export function forceCompleteOrder(id: number) {
  return request.put<void>({
    url: `/api/orders/${id}/force-complete`
  })
}

export function reassignOrder(id: number) {
  return request.put<void>({
    url: `/api/orders/${id}/reassign`
  })
}

export function startPrintingOrder(id: number) {
  return request.put<void>({
    url: `/api/orders/${id}/start-printing`
  })
}

export function refreshOrderStatus(id: number) {
  return request.put<void>({
    url: `/api/orders/${id}/refresh`
  })
}

// ==================== 商户管理 ====================

export function fetchMerchantList(params?: Api.PrintEase.MerchantSearchParams) {
  return request.get<Api.PrintEase.MerchantListResponse>({
    url: '/api/admin/merchants',
    params
  })
}

export function fetchMerchantDetail(id: number) {
  return request.get<Api.PrintEase.MerchantListItem>({
    url: `/api/admin/merchants/${id}`
  })
}

export function createMerchant(data: Api.PrintEase.MerchantCreateParams) {
  return request.post<Api.PrintEase.MerchantListItem>({
    url: '/api/admin/merchants',
    params: data
  })
}

export function updateMerchant(id: number, data: Api.PrintEase.MerchantUpdateParams) {
  return request.put<Api.PrintEase.MerchantListItem>({
    url: `/api/admin/merchants/${id}`,
    params: data
  })
}

export function deleteMerchant(id: number) {
  return request.del<void>({
    url: `/api/admin/merchants/${id}`
  })
}

export function regenerateMerchantApiKey(id: number) {
  return request.post<{ id: number; apiKey: string }>({
    url: `/api/admin/merchants/${id}/regenerate-api-key`
  })
}

// ==================== 用户管理 ====================

export function fetchUserList(params?: Api.PrintEase.PEUserSearchParams) {
  return request.get<Api.PrintEase.PEUserListResponse>({
    url: '/api/user/admin/users',
    params
  })
}

export function fetchUserDetail(id: number) {
  return request.get<Api.PrintEase.PEUserListItem>({
    url: `/api/user/admin/users/${id}`
  })
}

export function updateUser(id: number, data: Record<string, any>) {
  return request.put<void>({
    url: `/api/user/admin/users/${id}`,
    params: data
  })
}

export function updateUserStatus(id: number, isActive: boolean) {
  return request.put<void>({
    url: `/api/user/admin/users/${id}/status`,
    params: { isActive }
  })
}

// ==================== 文件管理 ====================

export function fetchFileList(params?: Api.Common.PageParams) {
  return request.get<Api.PrintEase.FileListResponse>({
    url: '/api/files/admin/files',
    params
  })
}

export function fetchFileDetail(id: number) {
  return request.get<Api.PrintEase.FileListItem>({
    url: `/api/files/admin/files/${id}`
  })
}

export function deleteFile(id: number) {
  return request.del<void>({
    url: `/api/files/${id}`
  })
}

export function batchDeleteFiles(fileIds: number[]) {
  return request.del<void>({
    url: '/api/files/admin/files/batch',
    params: { fileIds }
  })
}

export function fetchFileStats() {
  return request.get<any>({
    url: '/api/files/admin/files/stats'
  })
}

// ==================== 系统配置 ====================

export function fetchPriceConfig() {
  return request.get<Api.PrintEase.PriceConfig>({
    url: '/api/system/price'
  })
}

export function updatePriceConfig(data: Partial<Api.PrintEase.PriceConfig>) {
  return request.put<void>({
    url: '/api/system/price',
    params: data,
    showSuccessMessage: true
  })
}

export function fetchNotice() {
  return request.get<Api.PrintEase.Notice>({
    url: '/api/system/notice'
  })
}

export function updateNotice(data: Partial<Api.PrintEase.Notice>) {
  return request.put<void>({
    url: '/api/system/notice',
    params: data,
    showSuccessMessage: true
  })
}

export function uploadNoticeImage(file: File) {
  const formData = new FormData()
  formData.append('image', file)
  return request.post<{ code: number; data: string }>({
    url: '/api/system/upload-notice-image',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

export function fetchSystemConfig() {
  return request.get<Record<string, any>>({
    url: '/api/system/config'
  })
}

export function reloadConfig() {
  return request.post<void>({
    url: '/api/system/reload-config'
  })
}

// ==================== 功能开关 ====================

export function fetchFeatureConfigs() {
  return request.get<Api.PrintEase.FeatureConfigs>({
    url: '/api/system/feature-configs'
  })
}

export function updateFeatureToggle(key: string, enabled: boolean) {
  const urlMap: Record<string, string> = {
    alipayEnabled: '/api/system/alipay-enabled',
    paymentEnabled: '/api/system/payment-enabled',
    merchantEntryEnabled: '/api/system/merchant-entry-enabled',
    adminEntryEnabled: '/api/system/admin-entry-enabled'
  }
  return request.put<void>({
    url: urlMap[key] || `/api/system/${key}`,
    params: { enabled }
  })
}

// ==================== 管理员管理 ====================

export function fetchAdminList(params?: Api.PrintEase.AdminSearchParams) {
  return request.get<Api.Common.PageResponse<Api.PrintEase.AdminListItem>>({
    url: '/api/admin/admins',
    params
  })
}

export function fetchAdminDetail(id: number) {
  return request.get<Api.PrintEase.AdminListItem>({
    url: `/api/admin/admins/${id}`
  })
}

export function createAdmin(data: Api.PrintEase.AdminCreateParams) {
  return request.post<Api.PrintEase.AdminListItem>({
    url: '/api/admin/admins',
    params: data
  })
}

export function updateAdmin(id: number, data: Partial<Api.PrintEase.AdminCreateParams>) {
  return request.put<void>({
    url: `/api/admin/admins/${id}`,
    params: data
  })
}

export function deleteAdmin(id: number) {
  return request.del<void>({
    url: `/api/admin/admins/${id}`
  })
}

export function resetAdminPassword(id: number, password: string) {
  return request.put<void>({
    url: `/api/admin/admins/${id}/reset-password`,
    params: { password }
  })
}

// ==================== 配送配置 ====================

export function fetchDeliveryBuildings() {
  return request.get<Api.PrintEase.DeliveryBuilding[]>({
    url: '/api/config/delivery-buildings'
  })
}

export function fetchTimeSlots() {
  return request.get<Api.PrintEase.TimeSlot[]>({
    url: '/api/config/time-slots'
  })
}

export function fetchPrintOptions() {
  return request.get<Api.PrintEase.PrintOption>({
    url: '/api/config/print-options'
  })
}

export function fetchAllConfig() {
  return request.get<any>({
    url: '/api/config/all'
  })
}

// ==================== 调度管理（使用商户 API Key 认证） ====================

function dispatchRequest() {
  const apiKey = localStorage.getItem('dispatchApiKey') || ''
  return {
    get: <T>(url: string, params?: any) =>
      axios.get<T>(`/api/merchant/tasks${url}`, {
        headers: { 'x-api-key': apiKey },
        params
      }),
    post: <T>(url: string, data?: any) =>
      axios.post<T>(`/api/merchant/tasks${url}`, data, {
        headers: { 'x-api-key': apiKey }
      }),
    put: <T>(url: string, data?: any) =>
      axios.put<T>(`/api/merchant/tasks${url}`, data, {
        headers: { 'x-api-key': apiKey }
      }),
    delete: <T>(url: string) =>
      axios.delete<T>(`/api/merchant/tasks${url}`, {
        headers: { 'x-api-key': apiKey }
      })
  }
}

export const dispatchApi = {
  setApiKey(key: string) {
    localStorage.setItem('dispatchApiKey', key)
  },

  getApiKey() {
    return localStorage.getItem('dispatchApiKey') || ''
  },

  fetchProfile() {
    return dispatchRequest().get<any>('/profile')
  },

  updateProfile(data: Record<string, any>) {
    return dispatchRequest().put<any>('/profile', data)
  },

  fetchStats() {
    return dispatchRequest().get<any>('/stats')
  },

  fetchUnassignedOrders(params?: Api.Common.PageParams & { buildingId?: number }) {
    return dispatchRequest().get<any>('/unassigned', params)
  },

  grabOrder(id: number) {
    return dispatchRequest().post<any>(`/${id}/grab`)
  },

  cancelGrab(id: number) {
    return dispatchRequest().post<any>(`/${id}/cancel`)
  },

  fetchTasks(params?: Api.PrintEase.TaskSearchParams) {
    return dispatchRequest().get<any>('/', params)
  },

  fetchTaskDetail(id: string) {
    return dispatchRequest().get<any>(`/${id}`)
  },

  startTask(id: string) {
    return dispatchRequest().put<any>(`/${id}/start`)
  },

  completeTask(id: string) {
    return dispatchRequest().put<any>(`/${id}/complete`)
  },

  forceCompleteTask(id: string) {
    return dispatchRequest().post<any>(`/${id}/force-complete`)
  },

  reassignTask(id: string) {
    return dispatchRequest().post<any>(`/${id}/reassign`)
  },

  failTask(id: string, errorMsg: string) {
    return dispatchRequest().put<any>(`/${id}/fail`, { errorMsg })
  },

  batchStartTasks(orderId: string) {
    return dispatchRequest().put<any>(`/orders/${orderId}/start-all`)
  },

  batchForceComplete(orderId: string) {
    return dispatchRequest().post<any>(`/orders/${orderId}/force-complete-all`)
  },

  completeOrderTasks(orderId: string) {
    return dispatchRequest().post<any>(`/${orderId}/complete`)
  },

  uploadOrderImage(orderId: number, imageUrl: string) {
    return dispatchRequest().post<any>(`/${orderId}/upload-image`, { imageUrl })
  },

  uploadDeliveryImage(orderId: number, file: File) {
    const formData = new FormData()
    formData.append('file', file)
    return axios.post(`/api/merchant/tasks/${orderId}/upload-delivery-image`, formData, {
      headers: {
        'x-api-key': dispatchApi.getApiKey(),
        'Content-Type': 'multipart/form-data'
      }
    })
  },

  bindWechat(code: string) {
    return dispatchRequest().post<any>('/bind-wechat', { code })
  },

  unbindWechat() {
    return dispatchRequest().delete<any>('/bind-wechat')
  }
}

// ==================== 收入管理 ====================

export function fetchIncomeOverview() {
  return request.get<Api.PrintEase.IncomeOverview>({
    url: '/api/orders/admin/orders/stats'
  })
}

export function fetchMerchantIncomeList(params?: Api.PrintEase.IncomeSearchParams) {
  return request.get<Api.Common.PageResponse<Api.PrintEase.MerchantIncomeItem>>({
    url: '/api/admin/merchants',
    params
  })
}

export function fetchIncomeHistoryList(params?: Api.PrintEase.IncomeSearchParams) {
  return request.get<Api.Common.PageResponse<Api.PrintEase.IncomeHistoryItem>>({
    url: '/api/orders/admin/list',
    params
  })
}

export function fetchIncomeStats(params?: { startDate?: string; endDate?: string }) {
  return request.get<any>({
    url: '/api/orders/admin/orders/stats',
    params
  })
}

export function exportIncomeData(params?: Api.PrintEase.IncomeSearchParams) {
  return request.get<Blob>({
    url: '/api/orders/admin/orders/export',
    params,
    responseType: 'blob'
  })
}
