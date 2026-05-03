/**
 * PrintEase 系统配置状态管理模块
 *
 * 提供价格配置、功能开关、公告、系统参数等状态管理
 *
 * @module store/modules/printease-system
 */

import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  fetchPriceConfig,
  updatePriceConfig,
  fetchNotice,
  updateNotice,
  fetchFeatureConfigs,
  updateFeatureToggle,
  fetchSystemConfig
} from '@/api/printease'

export const usePrintEaseSystemStore = defineStore('printeaseSystemStore', () => {
  const priceConfig = ref<Api.PrintEase.PriceConfig>({
    blackWhiteSingleSidedPrice: 0.15,
    blackWhiteDoubleSidedPrice: 0.27,
    colorSingleSidedPrice: 0.45,
    colorDoubleSidedPrice: 0.9,
    minPrice: 1.0
  })

  const notice = ref<Api.PrintEase.Notice>({
    title: '',
    content: '',
    wechatNumber: '',
    imageUrl: '',
    isActive: false
  })

  const featureConfigs = ref<Api.PrintEase.FeatureConfigs>({
    adminEntryEnabled: false,
    merchantEntryEnabled: false,
    paymentEnabled: false,
    alipayEnabled: false
  })

  const systemConfig = ref<Record<string, any>>({})
  const loading = ref(false)

  async function loadPriceConfig() {
    loading.value = true
    try {
      priceConfig.value = await fetchPriceConfig()
    } finally {
      loading.value = false
    }
  }

  async function savePriceConfig(data: Partial<Api.PrintEase.PriceConfig>) {
    loading.value = true
    try {
      await updatePriceConfig(data)
      await loadPriceConfig()
    } finally {
      loading.value = false
    }
  }

  async function loadNotice() {
    try {
      notice.value = await fetchNotice()
    } catch {
      // 公告可能为空，静默处理
    }
  }

  async function saveNotice(data: Partial<Api.PrintEase.Notice>) {
    loading.value = true
    try {
      await updateNotice(data)
      await loadNotice()
    } finally {
      loading.value = false
    }
  }

  async function loadFeatureConfigs() {
    try {
      featureConfigs.value = await fetchFeatureConfigs()
    } catch {
      // 开关配置可能暂未启用，保留默认值
    }
  }

  async function toggleFeature(key: string, enabled: boolean) {
    await updateFeatureToggle(key, enabled)
    await loadFeatureConfigs()
  }

  async function loadSystemConfig() {
    try {
      systemConfig.value = await fetchSystemConfig()
    } catch {
      // 配置获取失败时保留现有值
    }
  }

  function resetState() {
    priceConfig.value = {
      blackWhiteSingleSidedPrice: 0.15,
      blackWhiteDoubleSidedPrice: 0.27,
      colorSingleSidedPrice: 0.45,
      colorDoubleSidedPrice: 0.9,
      minPrice: 1.0
    }
    notice.value = { title: '', content: '', wechatNumber: '', imageUrl: '', isActive: false }
    featureConfigs.value = {
      adminEntryEnabled: false,
      merchantEntryEnabled: false,
      paymentEnabled: false,
      alipayEnabled: false
    }
    systemConfig.value = {}
  }

  return {
    priceConfig,
    notice,
    featureConfigs,
    systemConfig,
    loading,
    loadPriceConfig,
    savePriceConfig,
    loadNotice,
    saveNotice,
    loadFeatureConfigs,
    toggleFeature,
    loadSystemConfig,
    resetState
  }
})
