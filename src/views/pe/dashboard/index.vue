<!-- 印易打印管理仪表盘 -->
<template>
  <div class="pe-dashboard art-full-height">
    <ElRow :gutter="16" class="mb-4">
      <ElCol :xs="24" :sm="12" :lg="6" v-for="card in statCards" :key="card.key">
        <ElCard shadow="hover" class="stat-card">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm">{{ card.label }}</p>
              <p class="text-2xl font-bold mt-1">{{ card.value }}</p>
              <p class="text-xs mt-1" :class="card.trend >= 0 ? 'text-green-500' : 'text-red-500'">
                {{ card.trend >= 0 ? '↑' : '↓' }} {{ Math.abs(card.trend) }}%
              </p>
            </div>
            <div class="stat-icon" :style="{ background: card.color }">
              <Icon :icon="card.icon" :width="28" color="#fff" />
            </div>
          </div>
        </ElCard>
      </ElCol>
    </ElRow>

    <ElRow :gutter="16">
      <ElCol :xs="24" :lg="16">
        <ElCard shadow="hover" class="mb-4">
          <template #header>
            <div class="flex justify-between items-center">
              <span class="font-semibold">近期订单</span>
              <ElButton size="small" @click="$router.push('/printease/order')">查看全部</ElButton>
            </div>
          </template>
          <ElTable :data="recentOrders" v-loading="loading" stripe size="small">
            <ElTableColumn prop="id" label="订单号" width="180" />
            <ElTableColumn label="文件名" min-width="150">
              <template #default="{ row }">
                <span
                  class="text-blue-500 cursor-pointer"
                  @click="$router.push(`/printease/order/detail/${row.id}`)"
                  >{{ row.fileName }}</span
                >
              </template>
            </ElTableColumn>
            <ElTableColumn label="状态" width="100">
              <template #default="{ row }">
                <ElTag :type="getStatusColor(row.status)" size="small">{{
                  getStatusLabel(row.status)
                }}</ElTag>
              </template>
            </ElTableColumn>
            <ElTableColumn prop="totalAmount" label="金额" width="90">
              <template #default="{ row }">¥{{ row.totalAmount?.toFixed(2) }}</template>
            </ElTableColumn>
            <ElTableColumn prop="createdAt" label="时间" width="160">
              <template #default="{ row }">{{ formatTime(row.createdAt) }}</template>
            </ElTableColumn>
          </ElTable>
        </ElCard>
      </ElCol>

      <ElCol :xs="24" :lg="8">
        <ElCard shadow="hover" class="mb-4">
          <template #header><span class="font-semibold">订单状态概览</span></template>
          <div v-if="orderStats" class="stats-list">
            <div
              class="flex justify-between py-2 border-b"
              v-for="item in statusItems"
              :key="item.key"
            >
              <span>{{ item.label }}</span>
              <ElTag :type="item.color" size="small">{{ item.count }}</ElTag>
            </div>
          </div>
          <ElEmpty v-else description="暂无数据" />
        </ElCard>

        <ElCard shadow="hover">
          <template #header><span class="font-semibold">系统快捷入口</span></template>
          <ElRow :gutter="12">
            <ElCol :span="8" v-for="link in quickLinks" :key="link.path">
              <div class="quick-link" @click="$router.push(link.path)">
                <Icon :icon="link.icon" :width="24" color="#409EFF" />
                <p class="text-xs mt-1">{{ link.label }}</p>
              </div>
            </ElCol>
          </ElRow>
        </ElCard>
      </ElCol>
    </ElRow>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  import { fetchDashboardStats, fetchRecentOrders } from '@/api/printease'
  import { OrderStatusLabel, OrderStatusColor } from '@/enums/printease'
  import { Icon } from '@iconify/vue'

  defineOptions({ name: 'PeDashboard' })

  const loading = ref(false)
  const stats = ref<Api.PrintEase.DashboardStats | null>(null)
  const recentOrders = ref<Api.PrintEase.OrderListItem[]>([])
  const orderStats = ref<Api.PrintEase.OrderListResponse['stats'] | null>(null)

  const statCards = computed(() => [
    {
      key: 'todayOrders',
      label: '今日订单',
      value: stats.value?.todayOrders ?? 0,
      trend: stats.value?.orderGrowth ?? 0,
      icon: 'pe:order',
      color: '#409EFF'
    },
    {
      key: 'todayRevenue',
      label: '今日收入',
      value: `¥${(stats.value?.todayRevenue ?? 0).toFixed(2)}`,
      trend: stats.value?.revenueGrowth ?? 0,
      icon: 'pe:income',
      color: '#67C23A'
    },
    {
      key: 'activeNodes',
      label: '活跃节点',
      value: stats.value?.activeNodes ?? 0,
      trend: stats.value?.nodeGrowth ?? 0,
      icon: 'pe:dispatch',
      color: '#E6A23C'
    },
    {
      key: 'printingTasks',
      label: '打印任务',
      value: stats.value?.printingTasks ?? 0,
      trend: stats.value?.taskGrowth ?? 0,
      icon: 'pe:printer',
      color: '#F56C6C'
    }
  ])

  const statusItems = computed(() => [
    {
      key: 'pending',
      label: '待打印',
      count: orderStats.value?.pending ?? 0,
      color: 'info' as const
    },
    {
      key: 'assigned',
      label: '商户处理中',
      count: orderStats.value?.assigned ?? 0,
      color: 'warning' as const
    },
    {
      key: 'printed',
      label: '已打印',
      count: orderStats.value?.printed ?? 0,
      color: 'success' as const
    },
    {
      key: 'completed',
      label: '已完成',
      count: orderStats.value?.completed ?? 0,
      color: 'success' as const
    },
    { key: 'all', label: '总计', count: orderStats.value?.all ?? 0, color: 'primary' as const }
  ])

  const quickLinks = [
    { path: '/printease/order', icon: 'pe:order', label: '订单管理' },
    { path: '/printease/merchant', icon: 'pe:merchant', label: '商户管理' },
    { path: '/printease/user', icon: 'pe:user', label: '用户管理' },
    { path: '/printease/system', icon: 'pe:system', label: '系统设置' },
    { path: '/printease/dispatch', icon: 'pe:dispatch', label: '云印调度' },
    { path: '/printease/income', icon: 'pe:income', label: '收入管理' }
  ]

  function getStatusColor(status: number) {
    return OrderStatusColor[status] || 'info'
  }

  function getStatusLabel(status: number) {
    return OrderStatusLabel[status] || '未知'
  }

  function formatTime(date: string) {
    if (!date) return ''
    return new Date(date).toLocaleString('zh-CN')
  }

  async function loadData() {
    loading.value = true
    try {
      const [statsRes, ordersRes] = await Promise.all([
        fetchDashboardStats().catch(() => null),
        fetchRecentOrders({ page: 1, limit: 5 }).catch(
          () => ({ list: [], total: 0, stats: null }) as any
        )
      ])
      stats.value = statsRes
      recentOrders.value = ordersRes.list || []
      orderStats.value = ordersRes.stats
    } finally {
      loading.value = false
    }
  }

  onMounted(() => loadData())
</script>

<style scoped>
  .stat-card {
    cursor: pointer;
    transition: transform 0.2s;
  }

  .stat-card:hover {
    transform: translateY(-2px);
  }

  .stat-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: 12px;
  }

  .quick-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px 4px;
    cursor: pointer;
    border-radius: 8px;
    transition: background 0.2s;
  }

  .quick-link:hover {
    background: #f0f2f5;
  }

  .stats-list {
    font-size: 14px;
  }
</style>
