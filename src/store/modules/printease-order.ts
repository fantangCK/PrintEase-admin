/**
 * PrintEase 订单状态管理模块
 *
 * 提供订单列表、详情、筛选、分页、统计等状态管理
 *
 * @module store/modules/printease-order
 */

import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  fetchOrderList,
  fetchAdminOrderDetail,
  updateOrderStatus,
  batchUpdateOrders,
  deleteOrder,
  fetchOrderStats
} from '@/api/printease'
import type { OrderStatus } from '@/enums/printease'

export const usePrintEaseOrderStore = defineStore('printeaseOrderStore', () => {
  const list = ref<Api.PrintEase.OrderListItem[]>([])
  const detail = ref<Api.PrintEase.OrderDetail | null>(null)
  const total = ref(0)
  const loading = ref(false)
  const currentPage = ref(1)
  const pageSize = ref(10)
  const statusFilter = ref<number | undefined>(undefined)
  const searchFilters = ref<Api.PrintEase.OrderSearchParams>({})
  const stats = ref<Api.PrintEase.OrderListResponse['stats'] | null>(null)

  async function loadList(
    page?: number,
    limit?: number,
    filters?: Api.PrintEase.OrderSearchParams | number
  ) {
    loading.value = true
    currentPage.value = page ?? currentPage.value
    pageSize.value = limit ?? pageSize.value
    if (typeof filters === 'number' || filters === undefined) {
      statusFilter.value = filters
      searchFilters.value = filters === undefined ? {} : { status: filters }
    } else {
      statusFilter.value = filters.status
      searchFilters.value = { ...filters }
    }
    try {
      const res = await fetchOrderList({
        ...searchFilters.value,
        page: currentPage.value,
        limit: pageSize.value
      })
      list.value = res.list
      total.value = res.total
      stats.value = res.stats
    } finally {
      loading.value = false
    }
  }

  async function loadDetail(id: string) {
    loading.value = true
    try {
      detail.value = await fetchAdminOrderDetail(id)
    } finally {
      loading.value = false
    }
  }

  async function setStatus(id: string, status: OrderStatus) {
    await updateOrderStatus(id, status)
    await loadList(currentPage.value, pageSize.value, searchFilters.value)
  }

  async function batchSetStatus(orderIds: string[], status: OrderStatus) {
    await batchUpdateOrders({ orderIds, data: { status } })
    await loadList(currentPage.value, pageSize.value, searchFilters.value)
  }

  async function remove(id: string) {
    await deleteOrder(id)
    await loadList(currentPage.value, pageSize.value, searchFilters.value)
  }

  async function loadStats(startDate?: string, endDate?: string) {
    const res = await fetchOrderStats({ startDate, endDate })
    stats.value = {
      all: Number(res.totalOrders || 0),
      pending: Number(res.statusStats?.['1'] || res.statusStats?.['2'] || 0),
      assigned: Number(res.statusStats?.['3'] || 0),
      printed: Number(res.statusStats?.['4'] || 0),
      completed: Number(res.statusStats?.['5'] || 0)
    }
    return res
  }

  function resetState() {
    list.value = []
    detail.value = null
    total.value = 0
    currentPage.value = 1
    statusFilter.value = undefined
    searchFilters.value = {}
    stats.value = null
  }

  return {
    list,
    detail,
    total,
    loading,
    currentPage,
    pageSize,
    statusFilter,
    searchFilters,
    stats,
    loadList,
    loadDetail,
    setStatus,
    batchSetStatus,
    remove,
    loadStats,
    resetState
  }
})
