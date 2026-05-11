import request from '@/utils/http'
import axios from 'axios'
import * as XLSX from 'xlsx'

interface BackendResponse<T = any> {
  code: number
  message: string
  data: T
}

type OrderStatsResponse = {
  totalOrders: number
  statusStats: Record<string, number>
  totalRevenue: number
  dailyStats: Array<{ date: string; count: number; amount: number }>
}

const ADMIN_ORDER_LIST_URL = '/api/orders/admin/list'
const { VITE_API_URL } = import.meta.env

function createPageResponse<T>(list: T[], page = 1, limit = 10): Api.Common.PageResponse<T> {
  const start = (page - 1) * limit
  const safeLimit = limit || list.length || 10
  const pageList = list.slice(start, start + safeLimit)

  return {
    list: pageList,
    total: list.length,
    page,
    limit: safeLimit,
    totalPages: Math.ceil(list.length / safeLimit) || 1
  }
}

function filterByKeyword<T extends Record<string, any>>(list: T[], filters?: Record<string, any>) {
  if (!filters) return list

  return list.filter((item) => {
    if (filters.name && !String(item.name || '').includes(String(filters.name))) return false
    if (filters.phone && !String(item.phone || '').includes(String(filters.phone))) return false
    if (
      filters.status !== undefined &&
      filters.status !== '' &&
      item.status !== Number(filters.status)
    ) {
      return false
    }
    return true
  })
}

function getDayRange(offset = 0) {
  const start = new Date()
  start.setDate(start.getDate() + offset)
  start.setHours(0, 0, 0, 0)

  const end = new Date(start)
  end.setHours(23, 59, 59, 999)

  return {
    startDate: start.toISOString(),
    endDate: end.toISOString()
  }
}

function calcGrowth(current: number, previous: number) {
  if (!previous) return current > 0 ? 100 : 0
  return Math.round(((current - previous) / previous) * 100)
}

async function fetchOrderStatsByRange(params?: Api.PrintEase.OrderStatsParams) {
  const res = await request.get<OrderStatsResponse>({
    url: '/api/orders/admin/orders/stats',
    params,
    showErrorMessage: false
  })
  return {
    totalOrders: Number(res.totalOrders || 0),
    statusStats: res.statusStats || {},
    totalRevenue: Number(res.totalRevenue || 0),
    dailyStats: (res.dailyStats || []).map((item) => ({
      date: item.date,
      count: Number(item.count || 0),
      amount: Number(item.amount || 0)
    }))
  }
}

function getOrderAmount(item: Partial<Api.PrintEase.OrderListItem>) {
  return Number(
    item.totalAmount ??
      item.amount ??
      item.mpayRealPrice ??
      item.payment?.amount ??
      item.payment?.mpayRealPrice ??
      0
  )
}

function normalizeOrderItem(item: Api.PrintEase.OrderListItem): Api.PrintEase.OrderListItem {
  return {
    ...item,
    totalAmount: getOrderAmount(item),
    fileName:
      item.fileName ||
      item.orderFiles?.[0]?.file?.originalName ||
      item.orderFiles?.[0]?.file?.filename ||
      item.orderFiles?.[0]?.file?.name ||
      '',
    totalPages:
      item.totalPages ||
      item.orderFiles?.reduce((sum, file) => sum + Number(file.pageCount || 0), 0) ||
      0,
    copies:
      item.copies || item.orderFiles?.reduce((sum, file) => sum + Number(file.copies || 0), 0) || 0,
    deliveryBuildingName:
      item.deliveryBuildingName || item.delivery?.buildingName || item.delivery?.address || ''
  }
}

function normalizeOrderPage(res: Api.PrintEase.OrderListResponse): Api.PrintEase.OrderListResponse {
  return {
    ...res,
    list: (res.list || []).map(normalizeOrderItem),
    stats: res.stats || buildOrderPageStats(res.list || [])
  }
}

function buildOrderPageStats(list: Api.PrintEase.OrderListItem[]) {
  return list.reduce(
    (stats, item) => {
      const status = Number(item.status)
      stats.all += 1
      if (status === 1 && !item.merchantId) stats.pending += 1
      if (status === 1 && item.merchantId) stats.assigned += 1
      if (status === 3) stats.printed += 1
      if (status === 4) stats.completed += 1
      return stats
    },
    { all: 0, pending: 0, assigned: 0, printed: 0, completed: 0 }
  )
}

function normalizeIncomeOverview(stats: OrderStatsResponse): Api.PrintEase.IncomeOverview {
  const totalRevenue = Number(stats.totalRevenue || 0)
  const todayRevenue = Number(
    stats.dailyStats?.find((item) => item.date === new Date().toISOString().slice(0, 10))?.amount ||
      0
  )

  return {
    totalRevenue,
    todayRevenue,
    weekRevenue: totalRevenue,
    monthRevenue: totalRevenue,
    orderCount: Number(stats.totalOrders || 0),
    merchantCount: 0,
    userCount: 0,
    growthRate: 0
  }
}

function exportJsonToBlob(rows: Record<string, any>[], sheetName: string) {
  const worksheet = XLSX.utils.json_to_sheet(rows)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName)
  const arrayBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
  return new Blob([arrayBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  })
}

async function getRawConfig<T>(url: string) {
  const res = await axios.get<T>(url, { baseURL: VITE_API_URL })
  return res.data
}

async function requestExportRows(params?: Record<string, any>) {
  const res = await request.get<Record<string, any>[]>({
    url: '/api/orders/admin/orders/export',
    params
  })
  return Array.isArray(res) ? res : []
}

export async function fetchDashboardStats() {
  const [todayStats, yesterdayStats, totalStats, merchants] = await Promise.all([
    fetchOrderStatsByRange(getDayRange()),
    fetchOrderStatsByRange(getDayRange(-1)),
    fetchOrderStatsByRange(),
    request
      .get<Api.PrintEase.MerchantListItem[]>({
        url: '/api/admin/merchants',
        showErrorMessage: false
      })
      .catch(() => [])
  ])

  const activeNodes = merchants.filter((merchant) => Number(merchant.status) === 1).length
  const printingTasks = Number(totalStats.statusStats?.['2'] || 0)

  return {
    todayOrders: Number(todayStats.totalOrders || 0),
    todayRevenue: Number(todayStats.totalRevenue || 0),
    activeNodes,
    printingTasks,
    orderGrowth: calcGrowth(
      Number(todayStats.totalOrders || 0),
      Number(yesterdayStats.totalOrders || 0)
    ),
    revenueGrowth: calcGrowth(
      Number(todayStats.totalRevenue || 0),
      Number(yesterdayStats.totalRevenue || 0)
    ),
    nodeGrowth: 0,
    taskGrowth: 0
  }
}

export function fetchRecentOrders(params?: Api.PrintEase.OrderSearchParams) {
  return fetchOrderList({ ...params, page: params?.page || 1, limit: 5 })
}

export async function fetchIncomeTrend() {
  const stats = await fetchOrderStatsByRange()
  return (stats.dailyStats || []).map((item) => ({
    date: item.date,
    revenue: Number(item.amount || 0),
    orderCount: Number(item.count || 0)
  }))
}

export async function fetchOrderList(params: Api.PrintEase.OrderSearchParams) {
  const queryParams = { ...params }
  if (!queryParams.orderId && queryParams.keyword) queryParams.orderId = queryParams.keyword

  const res = await request.get<Api.PrintEase.OrderListResponse>({
    url: ADMIN_ORDER_LIST_URL,
    params: queryParams
  })

  return normalizeOrderPage(res)
}

export function fetchOrderDetail(id: string) {
  return request.get<Api.PrintEase.OrderDetail>({
    url: `/api/orders/${id}`
  })
}

export function fetchAdminOrderDetail(id: string) {
  return fetchOrderDetail(id)
}

export function updateOrderStatus(id: string, status: number) {
  return request.put<Api.PrintEase.OrderDetail>({
    url: `/api/orders/${id}/set-status`,
    data: { status }
  })
}

export function setOrderStatus(id: string, status: number) {
  return request.put<void>({
    url: `/api/orders/${id}/set-status`,
    data: { status }
  })
}

export function batchUpdateOrders(params: Api.PrintEase.OrderBatchParams) {
  return request.post<Api.PrintEase.OrderDetail[]>({
    url: '/api/orders/admin/orders/batch',
    params
  })
}

export function deleteOrder(id: string) {
  return request.del<void>({
    url: `/api/orders/${id}`
  })
}

export function fetchOrderStats(params?: Api.PrintEase.OrderStatsParams) {
  return fetchOrderStatsByRange(params)
}

export async function exportOrders(params?: Record<string, any>) {
  const rows = await requestExportRows(params)
  return exportJsonToBlob(rows, '订单数据')
}

export function cancelOrder(id: string) {
  return request.put<void>({
    url: `/api/orders/${id}/cancel`
  })
}

export function forceCompleteOrder(id: string) {
  return request.put<void>({
    url: `/api/orders/${id}/force-complete`
  })
}

export function reassignOrder(id: string) {
  return request.put<void>({
    url: `/api/orders/${id}/reassign`
  })
}

export function startPrintingOrder(id: string) {
  return request.put<void>({
    url: `/api/orders/${id}/start-printing`
  })
}

export function refreshOrderStatus(id: string) {
  return request.put<void>({
    url: `/api/orders/${id}/refresh`
  })
}

export async function fetchMerchantList(params?: Api.PrintEase.MerchantSearchParams) {
  const merchants = await request.get<Api.PrintEase.MerchantListItem[]>({
    url: '/api/admin/merchants'
  })
  const filtered = filterByKeyword(merchants, params)
  return createPageResponse(filtered, params?.page || 1, params?.limit || 10)
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
  return request.put<Api.PrintEase.PEUserListItem>({
    url: `/api/user/admin/users/${id}`,
    data
  })
}

export function updateUserStatus(id: number, isActive: boolean) {
  return request.put<Api.PrintEase.PEUserListItem>({
    url: `/api/user/admin/users/${id}/status`,
    data: { isActive }
  })
}

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
  return batchDeleteFiles([id])
}

export function batchDeleteFiles(fileIds: number[]) {
  return request.request<void>({
    url: '/api/files/admin/files/batch',
    method: 'DELETE',
    data: { fileIds }
  })
}

export function fetchFileStats() {
  return request.get<any>({
    url: '/api/files/admin/files/stats'
  })
}

export function fetchPriceConfig() {
  return request.get<Api.PrintEase.PriceConfig>({
    url: '/api/system/price'
  })
}

export function updatePriceConfig(data: Partial<Api.PrintEase.PriceConfig>) {
  return request.put<Api.PrintEase.PriceConfig>({
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
  return request.put<Api.PrintEase.Notice>({
    url: '/api/system/notice',
    params: data,
    showSuccessMessage: true
  })
}

export function fetchDailyPopupNotice() {
  return request.get<Api.PrintEase.DailyPopupNotice>({
    url: '/api/system/daily-popup-notice'
  })
}

export function updateDailyPopupNotice(data: Partial<Api.PrintEase.DailyPopupNotice>) {
  return request.put<Api.PrintEase.DailyPopupNotice>({
    url: '/api/system/daily-popup-notice',
    params: data,
    showSuccessMessage: true
  })
}

export function uploadNoticeImage(file: File) {
  const formData = new FormData()
  formData.append('image', file)
  return request.post<string>({
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
  return request.put<{ enabled: boolean }>({
    url: urlMap[key] || `/api/system/${key}`,
    params: { enabled }
  })
}

export async function fetchAdminList(params?: Api.PrintEase.AdminSearchParams) {
  const admins = await request.get<Api.PrintEase.AdminListItem[]>({
    url: '/api/admin/admins'
  })
  return createPageResponse(admins, params?.page || 1, params?.limit || 10)
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
  return request.put<Api.PrintEase.AdminListItem>({
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

export function fetchDeliveryBuildings() {
  return getRawConfig<Api.PrintEase.DeliveryBuilding[]>('/api/config/delivery-buildings')
}

export function fetchTimeSlots() {
  return getRawConfig<Api.PrintEase.TimeSlot[]>('/api/config/time-slots')
}

export function fetchPrintOptions() {
  return getRawConfig<Api.PrintEase.PrintOption>('/api/config/print-options')
}

export function fetchAllConfig() {
  return getRawConfig<any>('/api/config/all')
}

function unwrapDispatchResponse<T>(response: BackendResponse<T>) {
  if (response.code !== 0) throw new Error(response.message || '请求失败')
  return response.data
}

function dispatchHeaders() {
  return { 'x-api-key': localStorage.getItem('dispatchApiKey') || '' }
}

function dispatchRequest() {
  const client = axios.create({ baseURL: VITE_API_URL })
  return {
    async get<T>(url: string, params?: any) {
      const res = await client.get<BackendResponse<T>>(`/api/merchant/tasks${url}`, {
        headers: dispatchHeaders(),
        params
      })
      return unwrapDispatchResponse(res.data)
    },
    async post<T>(url: string, data?: any) {
      const res = await client.post<BackendResponse<T>>(`/api/merchant/tasks${url}`, data, {
        headers: dispatchHeaders()
      })
      return unwrapDispatchResponse(res.data)
    },
    async put<T>(url: string, data?: any) {
      const res = await client.put<BackendResponse<T>>(`/api/merchant/tasks${url}`, data, {
        headers: dispatchHeaders()
      })
      return unwrapDispatchResponse(res.data)
    },
    async delete<T>(url: string) {
      const res = await client.delete<BackendResponse<T>>(`/api/merchant/tasks${url}`, {
        headers: dispatchHeaders()
      })
      return unwrapDispatchResponse(res.data)
    }
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
    return dispatchRequest().get<Api.Common.PageResponse<Api.PrintEase.PrintTaskItem>>('/', params)
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

  async uploadDeliveryImage(orderId: number, file: File) {
    const formData = new FormData()
    formData.append('file', file)
    const res = await axios.post<BackendResponse<{ imageUrl: string }>>(
      `/api/merchant/tasks/${orderId}/upload-delivery-image`,
      formData,
      {
        baseURL: VITE_API_URL,
        headers: {
          'x-api-key': dispatchApi.getApiKey(),
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    return unwrapDispatchResponse(res.data)
  },

  bindWechat(code: string) {
    return dispatchRequest().post<any>('/bind-wechat', { code })
  },

  unbindWechat() {
    return dispatchRequest().delete<any>('/bind-wechat')
  }
}

export async function fetchIncomeOverview() {
  const now = new Date()
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
  monthStart.setHours(0, 0, 0, 0)

  const [totalStats, monthStats] = await Promise.all([
    fetchOrderStatsByRange(),
    fetchOrderStatsByRange({
      startDate: monthStart.toISOString(),
      endDate: now.toISOString()
    })
  ])

  return {
    ...normalizeIncomeOverview(totalStats),
    monthRevenue: Number(monthStats.totalRevenue || 0)
  }
}

export async function fetchMerchantIncomeList(params?: Api.PrintEase.IncomeSearchParams) {
  const [merchants, orders] = await Promise.all([
    fetchMerchantList({ page: 1, limit: 1000 }),
    fetchOrderList({ page: 1, limit: 1000, ...params })
  ])
  const rankMap = new Map<number, Api.PrintEase.MerchantIncomeItem>()

  merchants.list.forEach((merchant) => {
    rankMap.set(merchant.id, {
      merchantId: merchant.id,
      merchantName: merchant.name,
      totalOrders: 0,
      totalRevenue: 0,
      platformFee: 0,
      merchantIncome: 0,
      settlementStatus: '未结算',
      rank: 0
    })
  })

  orders.list.forEach((order) => {
    if (!order.merchantId) return
    const item = rankMap.get(order.merchantId)
    if (!item) return
    item.totalOrders += 1
    item.totalRevenue += Number(order.totalAmount || 0)
  })

  const list = Array.from(rankMap.values())
    .map((item) => ({
      ...item,
      platformFee: Number((item.totalRevenue * 0.1).toFixed(2)),
      merchantIncome: Number((item.totalRevenue * 0.9).toFixed(2))
    }))
    .sort((a, b) => b.totalRevenue - a.totalRevenue)
    .map((item, index) => ({ ...item, rank: index + 1 }))

  return createPageResponse(list, params?.page || 1, params?.limit || 10)
}

export async function fetchIncomeHistoryList(params?: Api.PrintEase.IncomeSearchParams) {
  const orders = await fetchOrderList({
    page: params?.page || 1,
    limit: params?.limit || 10,
    ...params
  })
  return {
    ...orders,
    list: orders.list.map((order) => ({
      id: order.id,
      transactionNo: order.mpayTradeNo || String(order.id),
      type: '订单收入',
      amount: Number(order.totalAmount || 0),
      balanceBefore: 0,
      balanceAfter: 0,
      relatedId: order.id,
      relatedNo: String(order.id),
      description: order.fileName || '打印订单',
      createTime: order.createdAt
    }))
  }
}

export function fetchIncomeStats(params?: { startDate?: string; endDate?: string }) {
  return fetchOrderStatsByRange(params)
}

export async function exportIncomeData(params?: Api.PrintEase.IncomeSearchParams) {
  const rows = await requestExportRows(params)
  return exportJsonToBlob(rows, '收入数据')
}
