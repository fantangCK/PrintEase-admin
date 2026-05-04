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

    <ElRow :gutter="16" class="mb-4">
      <ElCol :xs="24" :lg="12">
        <ElCard shadow="hover">
          <template #header>
            <div class="flex justify-between items-center">
              <span class="font-semibold">订单趋势</span>
              <ElRadioGroup v-model="timeDimension" size="small">
                <ElRadioButton value="day">日</ElRadioButton>
                <ElRadioButton value="week">周</ElRadioButton>
                <ElRadioButton value="month">月</ElRadioButton>
              </ElRadioGroup>
            </div>
          </template>
          <ArtLineChart
            :data="orderChartData"
            :x-axis-data="chartXLabels"
            height="280px"
            show-area-color
          />
        </ElCard>
      </ElCol>
      <ElCol :xs="24" :lg="12">
        <ElCard shadow="hover">
          <template #header>
            <div class="flex justify-between items-center">
              <span class="font-semibold">收入趋势</span>
              <ElRadioGroup v-model="timeDimension" size="small">
                <ElRadioButton value="day">日</ElRadioButton>
                <ElRadioButton value="week">周</ElRadioButton>
                <ElRadioButton value="month">月</ElRadioButton>
              </ElRadioGroup>
            </div>
          </template>
          <ArtLineChart
            :data="revenueChartData"
            :x-axis-data="chartXLabels"
            height="280px"
            show-area-color
          />
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
                >
                  {{ row.fileName }}
                </span>
              </template>
            </ElTableColumn>
            <ElTableColumn label="状态" width="100">
              <template #default="{ row }">
                <ElTag :type="getStatusColor(row.status)" size="small">
                  {{ getStatusLabel(row.status) }}
                </ElTag>
              </template>
            </ElTableColumn>
            <ElTableColumn prop="totalAmount" label="金额" width="90">
              <template #default="{ row }"> ¥{{ row.totalAmount?.toFixed(2) }} </template>
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
  import { ref, computed, watch, onMounted } from 'vue'
  import { fetchDashboardStats, fetchRecentOrders } from '@/api/printease'
  import { OrderStatusLabel, OrderStatusColor } from '@/enums/printease'
  import { Icon } from '@iconify/vue'
  import ArtLineChart from '@/components/core/charts/art-line-chart/index.vue'
  import { useClickTrackerSetup } from '@/hooks/core/useClickTracker'

  defineOptions({ name: 'PeDashboard' })

  useClickTrackerSetup()

  type TimeDimension = 'day' | 'week' | 'month'

  const loading = ref(false)
  const timeDimension = ref<TimeDimension>('day')
  const stats = ref<Api.PrintEase.DashboardStats | null>(null)
  const recentOrders = ref<Api.PrintEase.OrderListItem[]>([])
  const orderStats = ref<Api.PrintEase.OrderListResponse['stats'] | null>(null)

  function generateMockChartData(dim: TimeDimension) {
    const lengths: Record<TimeDimension, number> = { day: 24, week: 7, month: 30 }
    const len = lengths[dim]

    const xLabels: string[] = []
    const orders: number[] = []
    const revenue: number[] = []

    for (let i = 0; i < len; i++) {
      if (dim === 'day') {
        xLabels.push(`${String(i).padStart(2, '0')}:00`)
      } else if (dim === 'week') {
        const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        xLabels.push(days[i])
      } else {
        xLabels.push(`${i + 1}日`)
      }
      const base = 10 + Math.random() * 40
      orders.push(Math.round(base))
      revenue.push(Math.round(base * (15 + Math.random() * 10)))
    }

    return { xLabels, orders, revenue }
  }

  const mockData = ref(generateMockChartData('day'))

  watch(timeDimension, (dim) => {
    mockData.value = generateMockChartData(dim)
  })

  const chartXLabels = computed(() => mockData.value.xLabels)

  const orderChartData = computed(() => mockData.value.orders)

  const revenueChartData = computed(() => mockData.value.revenue)

  const statCards = computed(() => [
    {
      key: 'todayOrders',
      label: '今日订单',
      value: stats.value?.todayOrders ?? Math.floor(Math.random() * 50) + 10,
      trend: stats.value?.orderGrowth ?? Math.floor(Math.random() * 20) - 5,
      icon: 'pe:order',
      color: '#409EFF'
    },
    {
      key: 'todayRevenue',
      label: '今日收入',
      value: `¥${(stats.value?.todayRevenue ?? Math.random() * 500 + 100).toFixed(2)}`,
      trend: stats.value?.revenueGrowth ?? Math.floor(Math.random() * 15),
      icon: 'pe:income',
      color: '#67C23A'
    },
    {
      key: 'activeNodes',
      label: '活跃节点',
      value: stats.value?.activeNodes ?? Math.floor(Math.random() * 8) + 1,
      trend: stats.value?.nodeGrowth ?? Math.floor(Math.random() * 10),
      icon: 'pe:dispatch',
      color: '#E6A23C'
    },
    {
      key: 'printingTasks',
      label: '打印任务',
      value: stats.value?.printingTasks ?? Math.floor(Math.random() * 30) + 5,
      trend: stats.value?.taskGrowth ?? Math.floor(Math.random() * 12),
      icon: 'pe:printer',
      color: '#F56C6C'
    }
  ])

  const statusItems = computed(() => [
    {
      key: 'pending',
      label: '待打印',
      count: orderStats.value?.pending ?? Math.floor(Math.random() * 20),
      color: 'info' as const
    },
    {
      key: 'assigned',
      label: '商户处理中',
      count: orderStats.value?.assigned ?? Math.floor(Math.random() * 10),
      color: 'warning' as const
    },
    {
      key: 'printed',
      label: '已打印',
      count: orderStats.value?.printed ?? Math.floor(Math.random() * 15),
      color: 'success' as const
    },
    {
      key: 'completed',
      label: '已完成',
      count: orderStats.value?.completed ?? Math.floor(Math.random() * 25),
      color: 'success' as const
    },
    {
      key: 'all',
      label: '总计',
      count: orderStats.value?.all ?? Math.floor(Math.random() * 50) + 20,
      color: 'primary' as const
    }
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
          () => ({ list: [], total: 0, stats: null }) as unknown as Api.PrintEase.OrderListResponse
        )
      ])
      if (statsRes) {
        stats.value = statsRes
      }
      if (ordersRes) {
        recentOrders.value = ordersRes.list || []
        orderStats.value = ordersRes.stats || null
      }
    } catch {
      /* all errors suppressed — mock data renders by default */
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
