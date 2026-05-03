/**
 * PrintEase 商户状态管理模块
 *
 * 提供商户列表、详情、CRUD、API Key 管理等状态管理
 *
 * @module store/modules/printease-merchant
 */

import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  fetchMerchantList,
  fetchMerchantDetail,
  createMerchant,
  updateMerchant,
  deleteMerchant,
  regenerateMerchantApiKey
} from '@/api/printease'

export const usePrintEaseMerchantStore = defineStore('printeaseMerchantStore', () => {
  const list = ref<Api.PrintEase.MerchantListItem[]>([])
  const detail = ref<Api.PrintEase.MerchantListItem | null>(null)
  const total = ref(0)
  const loading = ref(false)
  const currentPage = ref(1)
  const pageSize = ref(10)

  async function loadList(page?: number, limit?: number, filters?: Record<string, any>) {
    loading.value = true
    currentPage.value = page ?? currentPage.value
    pageSize.value = limit ?? pageSize.value
    try {
      const res = await fetchMerchantList({
        page: currentPage.value,
        limit: pageSize.value,
        ...filters
      })
      list.value = res.list
      total.value = res.total
    } finally {
      loading.value = false
    }
  }

  async function loadDetail(id: number) {
    loading.value = true
    try {
      detail.value = await fetchMerchantDetail(id)
    } finally {
      loading.value = false
    }
  }

  async function add(data: Api.PrintEase.MerchantCreateParams) {
    loading.value = true
    try {
      const res = await createMerchant(data)
      await loadList()
      return res
    } finally {
      loading.value = false
    }
  }

  async function edit(id: number, data: Api.PrintEase.MerchantUpdateParams) {
    loading.value = true
    try {
      const res = await updateMerchant(id, data)
      await loadList()
      return res
    } finally {
      loading.value = false
    }
  }

  async function remove(id: number) {
    await deleteMerchant(id)
    await loadList()
  }

  async function regenerateKey(id: number) {
    const res = await regenerateMerchantApiKey(id)
    await loadList()
    return res
  }

  function resetState() {
    list.value = []
    detail.value = null
    total.value = 0
    currentPage.value = 1
  }

  return {
    list,
    detail,
    total,
    loading,
    currentPage,
    pageSize,
    loadList,
    loadDetail,
    add,
    edit,
    remove,
    regenerateKey,
    resetState
  }
})
