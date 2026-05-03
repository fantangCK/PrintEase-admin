/**
 * usePrintEasePagination - PrintEase 分页搜索 composable
 *
 * 提供分页、搜索、筛选、重置等通用列表管理功能
 *
 * @module hooks/core/usePrintEasePagination
 */

import { ref, reactive, computed, type Ref } from 'vue'

interface PaginationState {
  page: number
  limit: number
  total: number
  totalPages: number
}

interface UsePrintEasePaginationOptions<T> {
  defaultPageSize?: number
  defaultFilters?: Partial<T>
}

export function usePrintEasePagination<T extends Record<string, any>>(
  fetcher: (params: T & { page: number; limit: number }) => Promise<{
    list: any[]
    total: number
    page: number
    limit: number
    totalPages: number
  }>,
  options: UsePrintEasePaginationOptions<T> = {}
) {
  const { defaultPageSize = 10, defaultFilters = {} } = options

  const list = ref<any[]>([]) as Ref<any[]>
  const loading = ref(false)
  const error = ref<string | null>(null)

  const pagination = reactive<PaginationState>({
    page: 1,
    limit: defaultPageSize,
    total: 0,
    totalPages: 0
  })

  const filters = reactive<Partial<T>>({ ...defaultFilters }) as Partial<T>

  const hasData = computed(() => list.value.length > 0)
  const isEmpty = computed(() => !loading.value && list.value.length === 0)
  const isLastPage = computed(() => pagination.page >= pagination.totalPages)

  function buildParams(): T & { page: number; limit: number } {
    const activeFilters: Record<string, any> = {}
    for (const [key, value] of Object.entries(filters)) {
      if (value !== undefined && value !== null && value !== '') {
        activeFilters[key] = value
      }
    }
    return {
      ...activeFilters,
      page: pagination.page,
      limit: pagination.limit
    } as T & { page: number; limit: number }
  }

  async function fetch() {
    loading.value = true
    error.value = null
    try {
      const params = buildParams()
      const res = await fetcher(params)
      list.value = res.list
      pagination.total = res.total
      pagination.totalPages = res.totalPages
      pagination.page = res.page
      pagination.limit = res.limit
    } catch (err: any) {
      error.value = err?.message || '请求失败'
      list.value = []
    } finally {
      loading.value = false
    }
  }

  function search(newFilters?: Partial<T>) {
    if (newFilters) {
      Object.assign(filters, newFilters)
    }
    pagination.page = 1
    return fetch()
  }

  function changePage(page: number) {
    pagination.page = page
    return fetch()
  }

  function changeLimit(limit: number) {
    pagination.limit = limit
    pagination.page = 1
    return fetch()
  }

  function refresh() {
    return fetch()
  }

  function reset() {
    pagination.page = 1
    pagination.limit = defaultPageSize
    Object.keys(filters).forEach((key) => {
      delete (filters as any)[key]
    })
    Object.assign(filters, defaultFilters)
    return fetch()
  }

  return {
    list,
    loading,
    error,
    pagination,
    filters,
    hasData,
    isEmpty,
    isLastPage,
    fetch,
    search,
    changePage,
    changeLimit,
    refresh,
    reset
  }
}
