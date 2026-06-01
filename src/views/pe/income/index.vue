<!-- 印易打印收入管理 -->
<template>
  <div class="pe-income art-full-height">
    <ElRow :gutter="16" class="mb-4">
      <ElCol :xs="24" :sm="12" :lg="6" v-for="card in incomeCards" :key="card.label">
        <ElCard shadow="hover">
          <div class="text-center">
            <p class="text-gray-500 text-sm">{{ card.label }}</p>
            <p class="text-2xl font-bold mt-2" :class="card.color">{{ card.value }}</p>
          </div>
        </ElCard>
      </ElCol>
    </ElRow>

    <ElRow :gutter="16" class="mb-4">
      <ElCol :xs="24" :lg="12">
        <ElCard shadow="hover">
          <template #header><span class="font-semibold">订单趋势</span></template>
          <ArtLineChart
            :data="orderTrendData"
            :x-axis-data="trendLabels"
            :loading="loading"
            height="280px"
            show-area-color
          />
        </ElCard>
      </ElCol>
      <ElCol :xs="24" :lg="12">
        <ElCard shadow="hover">
          <template #header><span class="font-semibold">收入趋势</span></template>
          <ArtLineChart
            :data="revenueTrendData"
            :x-axis-data="trendLabels"
            :loading="loading"
            height="280px"
            show-area-color
            :colors="['#67C23A']"
          />
        </ElCard>
      </ElCol>
    </ElRow>

    <ElRow :gutter="16">
      <ElCol :xs="24" :lg="16">
        <ElCard class="mb-4">
          <template #header><span class="font-semibold">商户收入排名</span></template>
          <ElTable :data="merchantIncomes" v-loading="loading" stripe size="small">
            <ElTableColumn type="index" label="排名" width="60" />
            <ElTableColumn prop="merchantName" label="商户名称" min-width="150" />
            <ElTableColumn prop="totalOrders" label="订单数" width="100" />
            <ElTableColumn label="总收入" width="120">
              <template #default="{ row }">¥{{ row.totalRevenue?.toFixed(2) }}</template>
            </ElTableColumn>
            <ElTableColumn label="商户收入" width="120">
              <template #default="{ row }">¥{{ row.merchantIncome?.toFixed(2) }}</template>
            </ElTableColumn>
          </ElTable>
        </ElCard>
      </ElCol>

      <ElCol :xs="24" :lg="8">
        <ElCard>
          <template #header><span class="font-semibold">收入操作</span></template>
          <ElDatePicker
            v-model="dateRange"
            type="daterange"
            value-format="YYYY-MM-DDTHH:mm:ss.SSS[Z]"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 100%"
            @change="handleDateChange"
          />
          <div class="mt-4 flex gap-2">
            <ElButton type="primary" @click="handleExport" :loading="exporting"
              >导出收入报表</ElButton
            >
            <ElButton @click="handleRefresh"><Icon icon="ep:refresh" /> 刷新</ElButton>
          </div>
        </ElCard>
      </ElCol>
    </ElRow>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  import { ElMessage } from 'element-plus'
  import { Icon } from '@iconify/vue'
  import {
    fetchIncomeOverview,
    fetchMerchantIncomeList,
    exportIncomeData,
    fetchIncomeStats
  } from '@/api/printease'
  import ArtLineChart from '@/components/core/charts/art-line-chart/index.vue'

  defineOptions({ name: 'PeIncome' })

  const loading = ref(false)
  const exporting = ref(false)
  const overview = ref<Api.PrintEase.IncomeOverview | null>(null)
  const merchantIncomes = ref<Api.PrintEase.MerchantIncomeItem[]>([])
  const dateRange = ref<[string, string] | null>(null)
  const trendLabels = ref<string[]>([])
  const orderTrendData = ref<number[]>([])
  const revenueTrendData = ref<number[]>([])

  function formatDateKey(date: Date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  function normalizeDateKey(value: string) {
    if (!value) return ''
    return value.includes('T') ? value.slice(0, 10) : value
  }

  function formatLabel(date: Date) {
    return `${date.getMonth() + 1}/${date.getDate()}`
  }

  function getQueryParams() {
    return {
      startDate: dateRange.value?.[0],
      endDate: dateRange.value?.[1]
    }
  }

  function buildTrendData(stats: Awaited<ReturnType<typeof fetchIncomeStats>>) {
    const source = new Map(
      (stats.dailyStats || []).map((item) => [
        normalizeDateKey(item.date),
        {
          count: Number(item.count || 0),
          amount: Number(item.amount || 0)
        }
      ])
    )

    const end = dateRange.value?.[1] ? new Date(dateRange.value[1]) : new Date()
    const start = dateRange.value?.[0]
      ? new Date(dateRange.value[0])
      : new Date(end.getFullYear(), end.getMonth(), end.getDate() - 29)

    start.setHours(0, 0, 0, 0)
    end.setHours(0, 0, 0, 0)

    const labels: string[] = []
    const orderSeries: number[] = []
    const revenueSeries: number[] = []

    for (let current = new Date(start); current <= end; current.setDate(current.getDate() + 1)) {
      const currentDate = new Date(current)
      const key = formatDateKey(currentDate)
      const item = source.get(key)
      labels.push(formatLabel(currentDate))
      orderSeries.push(item?.count || 0)
      revenueSeries.push(item?.amount || 0)
    }

    trendLabels.value = labels
    orderTrendData.value = orderSeries
    revenueTrendData.value = revenueSeries
  }

  const incomeCards = computed(() => [
    {
      label: '总收入',
      value: `¥${(overview.value?.totalRevenue ?? 0).toFixed(2)}`,
      color: 'text-blue-600'
    },
    {
      label: '今日收入',
      value: `¥${(overview.value?.todayRevenue ?? 0).toFixed(2)}`,
      color: 'text-green-600'
    },
    {
      label: '本月收入',
      value: `¥${(overview.value?.monthRevenue ?? 0).toFixed(2)}`,
      color: 'text-purple-600'
    },
    { label: '总订单数', value: `${overview.value?.orderCount ?? 0}`, color: 'text-orange-600' }
  ])

  async function loadData() {
    loading.value = true
    try {
      const params = getQueryParams()
      const [ov, merchants, trendStats] = await Promise.all([
        fetchIncomeOverview(),
        fetchMerchantIncomeList({ page: 1, limit: 20, ...params }),
        fetchIncomeStats(params)
      ])
      overview.value = ov
      merchantIncomes.value = merchants.list || []
      buildTrendData(trendStats)
    } finally {
      loading.value = false
    }
  }

  function handleDateChange() {
    loadData()
  }

  async function handleExport() {
    exporting.value = true
    try {
      const blob = await exportIncomeData({
        startDate: dateRange.value?.[0],
        endDate: dateRange.value?.[1]
      })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `income_${new Date().toISOString().split('T')[0]}.xlsx`
      a.click()
      URL.revokeObjectURL(url)
      ElMessage.success('导出成功')
    } finally {
      exporting.value = false
    }
  }

  async function handleRefresh() {
    await loadData()
  }

  onMounted(() => loadData())
</script>
