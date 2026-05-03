/**
 * usePrintEaseData - PrintEase 通用数据获取 composable
 *
 * 提供加载状态、错误处理、自动请求等通用数据获取模式
 *
 * @module hooks/core/usePrintEaseData
 */

import { ref, type Ref } from 'vue'

interface UsePrintEaseDataOptions {
  immediate?: boolean
}

export function usePrintEaseData<T>(
  fetcher: () => Promise<T>,
  options: UsePrintEaseDataOptions = {}
) {
  const { immediate = true } = options
  const data = ref<T | null>(null) as Ref<T | null>
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function execute(): Promise<T> {
    loading.value = true
    error.value = null
    try {
      const result = await fetcher()
      data.value = result
      return result
    } catch (err: any) {
      error.value = err?.message || '请求失败'
      throw err
    } finally {
      loading.value = false
    }
  }

  function reset() {
    data.value = null
    error.value = null
    loading.value = false
  }

  if (immediate) {
    execute()
  }

  return { data, loading, error, execute, reset }
}
