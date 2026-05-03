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
  import { fetchIncomeOverview, fetchMerchantIncomeList, exportIncomeData } from '@/api/printease'

  defineOptions({ name: 'PeIncome' })

  const loading = ref(false)
  const exporting = ref(false)
  const overview = ref<Api.PrintEase.IncomeOverview | null>(null)
  const merchantIncomes = ref<Api.PrintEase.MerchantIncomeItem[]>([])
  const dateRange = ref<[string, string] | null>(null)

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
      const [ov, merchants] = await Promise.all([
        fetchIncomeOverview(),
        fetchMerchantIncomeList({ page: 1, limit: 20 })
      ])
      overview.value = ov
      merchantIncomes.value = merchants.list || []
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
