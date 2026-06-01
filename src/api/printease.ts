import request from '@/utils/http'
import * as XLSX from 'xlsx'

type OrderStatsResponse = {
  totalOrders?: number
  totalRevenue?: number
  statusStats?: Record<string, number>
  dailyStats?: Array<{
    date: string
    count?: number
    amount?: number
  }>
}

type MerchantIncomeListResponse = Api.Common.PageResponse<Api.PrintEase.MerchantIncomeItem>

type OrderExportItem = {
  orderId?: string
  userId?: number
  userName?: string
  merchantId?: number | null
  merchantName?: string | null
  totalAmount?: number | string | null
  totalPages?: number
  status?: number
  remark?: string | null
  deliveryAddress?: string | null
  deliveryTime?: string | null
  createdAt?: string | null
  updatedAt?: string | null
  paymentStatus?: string | null
}

function buildMerchantPageResponse(
  list: Api.PrintEase.MerchantListItem[],
  params?: Api.PrintEase.MerchantSearchParams
): Api.PrintEase.MerchantListResponse {
  const page = Number(params?.page || 1)
  const limit = Number(params?.limit || list.length || 10)
  const name = params?.name?.trim()
  const phone = params?.phone?.trim()
  const status = params?.status

  const filtered = list.filter((item) => {
    const matchesName = !name || item.name?.includes(name)
    const matchesPhone = !phone || item.phone?.includes(phone)
    const matchesStatus = status === undefined || Number(item.status) === Number(status)
    return matchesName && matchesPhone && matchesStatus
  })

  const total = filtered.length
  const safeLimit = limit > 0 ? limit : total || 10
  const start = Math.max(page - 1, 0) * safeLimit
  const pagedList = filtered.slice(start, start + safeLimit)

  return {
    list: pagedList,
    total,
    page,
    limit: safeLimit,
    totalPages: Math.ceil(total / safeLimit) || 1
  }
}

function buildMerchantIncomePageResponse(
  list: Api.PrintEase.MerchantIncomeItem[],
  params?: Record<string, any>
): MerchantIncomeListResponse {
  const page = Number(params?.page || 1)
  const limit = Number(params?.limit || list.length || 10)
  const safeLimit = limit > 0 ? limit : list.length || 10
  const start = Math.max(page - 1, 0) * safeLimit
  const pagedList = list.slice(start, start + safeLimit)

  return {
    list: pagedList,
    total: list.length,
    page,
    limit: safeLimit,
    totalPages: Math.ceil(list.length / safeLimit) || 1
  }
}

function toNumber(value: unknown) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : 0
}

function formatDateTimeForApi(date: Date) {
  return date.toISOString()
}

function getStartOfDay(date = new Date()) {
  const value = new Date(date)
  value.setHours(0, 0, 0, 0)
  return value
}

function getEndOfDay(date = new Date()) {
  const value = new Date(date)
  value.setHours(23, 59, 59, 999)
  return value
}

function getStartOfYesterday(date = new Date()) {
  const value = getStartOfDay(date)
  value.setDate(value.getDate() - 1)
  return value
}

function getEndOfYesterday(date = new Date()) {
  const value = getEndOfDay(date)
  value.setDate(value.getDate() - 1)
  return value
}

function getStartOfMonth(date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function getStartOfRecentDays(days: number, date = new Date()) {
  const value = getStartOfDay(date)
  value.setDate(value.getDate() - (days - 1))
  return value
}

function calculateGrowth(current: number, previous: number) {
  if (previous <= 0) {
    return current > 0 ? 100 : 0
  }
  return Number((((current - previous) / previous) * 100).toFixed(2))
}

function mapOrdersToMerchantIncomes(rows: OrderExportItem[]) {
  const source = new Map<number, Api.PrintEase.MerchantIncomeItem>()

  rows.forEach((row) => {
    const merchantId = Number(row.merchantId || 0)
    if (!merchantId) {
      return
    }

    const totalAmount = toNumber(row.totalAmount)
    const current =
      source.get(merchantId) ||
      ({
        merchantId,
        merchantName: row.merchantName || `商户${merchantId}`,
        totalOrders: 0,
        totalRevenue: 0,
        platformFee: 0,
        merchantIncome: 0,
        settlementStatus: '',
        rank: 0
      } satisfies Api.PrintEase.MerchantIncomeItem)

    current.totalOrders += 1
    current.totalRevenue += totalAmount
    current.merchantIncome += totalAmount
    source.set(merchantId, current)
  })

  return Array.from(source.values())
    .sort((a, b) => b.totalRevenue - a.totalRevenue)
    .map((item, index) => ({
      ...item,
      rank: index + 1
    }))
}

function normalizePriceConfig(data: Partial<Api.PrintEase.PriceConfig>) {
  return {
    blackWhiteSingleSidedPrice: toNumber(data.blackWhiteSingleSidedPrice),
    blackWhiteDoubleSidedPrice: toNumber(data.blackWhiteDoubleSidedPrice),
    colorSingleSidedPrice: toNumber(data.colorSingleSidedPrice),
    colorDoubleSidedPrice: toNumber(data.colorDoubleSidedPrice),
    minPrice: toNumber(data.minPrice)
  }
}

async function fetchOrderExportList(params?: Record<string, any>) {
  return request.get<OrderExportItem[]>({
    url: '/api/orders/admin/orders/export',
    params
  })
}

export function fetchConfigAll() {
  return request.get<any>({
    url: '/api/config/all'
  })
}

export async function fetchDashboardStats() {
  const now = new Date()
  const todayStart = getStartOfDay(now)
  const todayEnd = getEndOfDay(now)
  const yesterdayStart = getStartOfYesterday(now)
  const yesterdayEnd = getEndOfYesterday(now)

  const [todayStats, yesterdayStats] = await Promise.all([
    fetchOrderStats({
      startDate: formatDateTimeForApi(todayStart),
      endDate: formatDateTimeForApi(todayEnd)
    }),
    fetchOrderStats({
      startDate: formatDateTimeForApi(yesterdayStart),
      endDate: formatDateTimeForApi(yesterdayEnd)
    })
  ])

  const todayOrders = toNumber(todayStats.totalOrders)
  const todayRevenue = toNumber(todayStats.totalRevenue)
  const yesterdayOrders = toNumber(yesterdayStats.totalOrders)
  const yesterdayRevenue = toNumber(yesterdayStats.totalRevenue)
  const printingTasks =
    toNumber(todayStats.statusStats?.['3']) +
    toNumber(todayStats.statusStats?.['4']) +
    toNumber(todayStats.statusStats?.['5'])
  const yesterdayPrintingTasks =
    toNumber(yesterdayStats.statusStats?.['3']) +
    toNumber(yesterdayStats.statusStats?.['4']) +
    toNumber(yesterdayStats.statusStats?.['5'])

  return {
    todayOrders,
    todayRevenue,
    activeNodes: 0,
    printingTasks,
    orderGrowth: calculateGrowth(todayOrders, yesterdayOrders),
    revenueGrowth: calculateGrowth(todayRevenue, yesterdayRevenue),
    nodeGrowth: 0,
    taskGrowth: calculateGrowth(printingTasks, yesterdayPrintingTasks)
  } satisfies Api.PrintEase.DashboardStats
}

export function fetchRecentOrders(params: Record<string, any>) {
  return request.get<Api.PrintEase.OrderListResponse>({
    url: '/api/orders/admin/list',
    params
  })
}

export function fetchOrderList(params: Api.PrintEase.OrderSearchParams) {
  return request.get<Api.PrintEase.OrderListResponse>({
    url: '/api/orders/admin/list',
    params
  })
}

export function fetchOrderStats(params?: Api.PrintEase.OrderStatsParams) {
  return request.get<OrderStatsResponse>({
    url: '/api/orders/admin/orders/stats',
    params
  })
}

export function fetchOrderDetail(id: string | number) {
  return request.get<Api.PrintEase.OrderDetail>({
    url: `/api/orders/${id}`
  })
}

export function fetchAdminOrderDetail(id: string | number) {
  return fetchOrderDetail(id)
}

export function updateOrderStatus(id: string | number, data: Record<string, any> | number) {
  const payload = typeof data === 'number' ? { status: data } : data

  return request.put<any>({
    url: `/api/orders/${id}/set-status`,
    data: payload,
    showSuccessMessage: true
  })
}

export function batchUpdateOrders(params: {
  orderIds: string[]
  data?: { status?: number }
  status?: number
}) {
  return request.post<any>({
    url: '/api/orders/admin/orders/batch',
    data: {
      orderIds: params.orderIds,
      status: params.status ?? params.data?.status
    },
    showSuccessMessage: true
  })
}

export function deleteOrder(id: string | number) {
  return request.del<any>({
    url: `/api/orders/${id}`,
    showSuccessMessage: true
  })
}

export function fetchMerchantList(params: Api.PrintEase.MerchantSearchParams = {}) {
  return request
    .get<Api.PrintEase.MerchantListItem[] | Api.PrintEase.MerchantListResponse>({
      url: '/api/admin/merchants',
      params
    })
    .then((res) => {
      if (Array.isArray(res)) {
        return buildMerchantPageResponse(res, params)
      }
      return res
    })
}

export function fetchMerchantDetail(id: string | number) {
  return request.get<Api.PrintEase.MerchantListItem>({
    url: `/api/admin/merchants/${id}`
  })
}

export function createMerchant(data: Api.PrintEase.MerchantCreateParams) {
  return request.post<Api.PrintEase.MerchantListItem>({
    url: '/api/admin/merchants',
    data,
    showSuccessMessage: true
  })
}

export function updateMerchant(id: string | number, data: Api.PrintEase.MerchantUpdateParams) {
  return request.put<Api.PrintEase.MerchantListItem>({
    url: `/api/admin/merchants/${id}`,
    data,
    showSuccessMessage: true
  })
}

export function deleteMerchant(id: string | number) {
  return request.del<any>({
    url: `/api/admin/merchants/${id}`,
    showSuccessMessage: true
  })
}

export function regenerateMerchantApiKey(id: string | number) {
  return request.post<{ id: number; apiKey: string }>({
    url: `/api/admin/merchants/${id}/regenerate-api-key`,
    showSuccessMessage: true
  })
}

export function fetchUserList(params: Api.PrintEase.PEUserSearchParams) {
  return request.get<Api.PrintEase.PEUserListResponse>({
    url: '/api/user/admin/users',
    params
  })
}

export function updateUserStatus(id: string | number, isActive: boolean) {
  return request.put<Api.PrintEase.PEUserListItem>({
    url: `/api/user/admin/users/${id}/status`,
    data: { isActive },
    showSuccessMessage: true
  })
}

export async function fetchIncomeOverview() {
  const now = new Date()
  const todayStart = getStartOfDay(now)
  const weekStart = getStartOfRecentDays(7, now)
  const monthStart = getStartOfMonth(now)

  const [totalStats, todayStats, weekStats, monthStats, merchantRes, userRes] = await Promise.all([
    fetchOrderStats(),
    fetchOrderStats({
      startDate: formatDateTimeForApi(todayStart),
      endDate: formatDateTimeForApi(now)
    }),
    fetchOrderStats({
      startDate: formatDateTimeForApi(weekStart),
      endDate: formatDateTimeForApi(now)
    }),
    fetchOrderStats({
      startDate: formatDateTimeForApi(monthStart),
      endDate: formatDateTimeForApi(now)
    }),
    fetchMerchantList({ page: 1, limit: 1 }),
    fetchUserList({ page: 1, limit: 1 })
  ])

  const monthRevenue = toNumber(monthStats.totalRevenue)
  const weekRevenue = toNumber(weekStats.totalRevenue)

  return {
    totalRevenue: toNumber(totalStats.totalRevenue),
    todayRevenue: toNumber(todayStats.totalRevenue),
    weekRevenue,
    monthRevenue,
    orderCount: toNumber(totalStats.totalOrders),
    merchantCount: toNumber(merchantRes.total),
    userCount: toNumber(userRes.total),
    growthRate:
      weekRevenue > 0 ? Number((((monthRevenue - weekRevenue) / weekRevenue) * 100).toFixed(2)) : 0
  } satisfies Api.PrintEase.IncomeOverview
}

export async function fetchMerchantIncomeList(params: Record<string, any>) {
  const rows = await fetchOrderExportList(params)
  const list = mapOrdersToMerchantIncomes(rows)
  return buildMerchantIncomePageResponse(list, params)
}

export function fetchIncomeStats(params?: Record<string, any>) {
  return fetchOrderStats(params)
}

export async function exportIncomeData(params?: Record<string, any>) {
  const merchants = await fetchMerchantIncomeList({ page: 1, limit: 10000, ...params })
  const workbook = XLSX.utils.book_new()
  const worksheet = XLSX.utils.json_to_sheet(
    merchants.list.map((item) => ({
      排名: item.rank,
      商户ID: item.merchantId,
      商户名称: item.merchantName,
      订单数: item.totalOrders,
      总收入: Number(item.totalRevenue.toFixed(2)),
      商户收入: Number(item.merchantIncome.toFixed(2))
    }))
  )

  XLSX.utils.book_append_sheet(workbook, worksheet, '收入报表')

  const excelBuffer = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array',
    compression: true
  })

  return new Blob([excelBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  })
}

export function fetchSystemConfig() {
  return request.get<Record<string, any>>({
    url: '/api/system/config'
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
    data: normalizePriceConfig(data),
    headers: {
      'Content-Type': 'application/json'
    },
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
    data,
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
    data,
    showSuccessMessage: true
  })
}

export function uploadNoticeImage(data: FormData) {
  return request.post<string>({
    url: '/api/system/upload-notice-image',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    showSuccessMessage: true
  })
}

export function fetchFeatureConfigs(version?: string) {
  return request.get<Api.PrintEase.FeatureConfigs>({
    url: '/api/system/feature-configs',
    params: version ? { version } : undefined
  })
}

const featureTogglePathMap: Record<string, string> = {
  adminEntryEnabled: 'admin-entry-enabled',
  merchantEntryEnabled: 'merchant-entry-enabled',
  paymentEnabled: 'payment-enabled',
  alipayEnabled: 'alipay-enabled'
}

export function updateFeatureToggle(key: string, enabled: boolean) {
  const path = featureTogglePathMap[key] || key

  return request.put<any>({
    url: `/api/system/${path}`,
    data: { enabled },
    showSuccessMessage: true
  })
}

export function updateFeatureFlag(path: string, data: { enabled: boolean }) {
  return request.put<any>({
    url: `/api/system/${path}`,
    data,
    showSuccessMessage: true
  })
}

function createDispatchApi() {
  return {
    fetchTasks(params?: Record<string, any>) {
      return request.get<Api.Common.PageResponse<any>>({
        url: '/api/merchant/tasks/admin/list',
        params,
        showErrorMessage: false
      })
    }
  }
}

export const dispatchApi = createDispatchApi()
