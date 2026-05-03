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
  fetchOrderDetail,
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
  const stats = ref<Api.PrintEase.OrderListResponse['stats'] | null>(null)

  async function loadList(page?: number, limit?: number, status?: number) {
    loading.value = true
    currentPage.value = page ?? currentPage.value
    pageSize.value = limit ?? pageSize.value
    statusFilter.value = status
    try {
      const res = await fetchOrderList({
        page: currentPage.value,
        limit: pageSize.value,
        status
      })
      list.value = res.list
      total.value = res.total
      stats.value = res.stats
    } finally {
      loading.value = false
    }
  }

  async function loadDetail(id: number) {
    loading.value = true
    try {
      detail.value = await fetchOrderDetail(id)
    } finally {
      loading.value = false
    }
  }

  async function setStatus(id: number, status: OrderStatus) {
    await updateOrderStatus(id, status)
    await loadList()
  }

  async function batchSetStatus(orderIds: string[], status: OrderStatus) {
    await batchUpdateOrders({ orderIds, data: { status } })
    await loadList()
  }

  async function remove(id: number) {
    await deleteOrder(id)
    await loadList()
  }

  async function loadStats(startDate?: string, endDate?: string) {
    const res = await fetchOrderStats({ startDate, endDate })
    stats.value = res
    return res
  }

  function resetState() {
    list.value = []
    detail.value = null
    total.value = 0
    currentPage.value = 1
    statusFilter.value = undefined
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
