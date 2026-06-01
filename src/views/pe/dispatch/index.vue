<!-- 印易打印云印调度管理 -->
<template>
  <div class="pe-dispatch art-full-height">
    <ElAlert
      title="调度数据仅允许管理员通过登录态访问，请先选择目标商户"
      type="info"
      show-icon
      class="mb-4"
    />

    <ElCard class="mb-4">
      <div class="flex gap-4 items-end">
        <div class="flex-1">
          <p class="text-sm text-gray-500 mb-1">目标商户</p>
          <ElSelect
            v-model="merchantId"
            placeholder="请选择商户"
            clearable
            filterable
            class="w-full"
          >
            <ElOption
              v-for="item in merchantOptions"
              :key="item.id"
              :label="`${item.name}（ID: ${item.id}）`"
              :value="item.id"
            />
          </ElSelect>
        </div>
        <ElButton type="primary" :disabled="!merchantId" @click="loadTasks">查询任务</ElButton>
      </div>
    </ElCard>

    <ElCard class="art-table-card">
      <ElTable :data="taskList" v-loading="taskLoading" stripe>
        <ElTableColumn prop="id" label="任务ID" width="180" />
        <ElTableColumn prop="orderId" label="订单ID" width="180" />
        <ElTableColumn label="状态" width="100">
          <template #default="{ row }">
            <ElTag :type="getTaskStatusColor(row.status)" size="small">{{
              getTaskStatusLabel(row.status)
            }}</ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="fileId" label="文件ID" width="80" />
        <ElTableColumn prop="nodeId" label="节点" width="80" />
        <ElTableColumn prop="errorMsg" label="错误信息" min-width="150" />
        <ElTableColumn prop="createdAt" label="创建时间" width="160">
          <template #default="{ row }">{{ formatTime(row.createdAt) }}</template>
        </ElTableColumn>
      </ElTable>

      <div class="flex justify-end mt-4">
        <ElPagination
          v-model:current-page="taskPage"
          :page-size="10"
          :total="taskTotal"
          layout="total, prev, pager, next"
          @current-change="loadTasks"
        />
      </div>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { ElMessage } from 'element-plus'
  import { dispatchApi, fetchMerchantList } from '@/api/printease'
  import { PrintTaskStatus } from '@/enums/printease'

  defineOptions({ name: 'PeDispatch' })

  const merchantId = ref<number | undefined>()
  const merchantOptions = ref<Api.PrintEase.MerchantListItem[]>([])
  const taskList = ref<any[]>([])
  const taskLoading = ref(false)
  const taskPage = ref(1)
  const taskTotal = ref(0)

  const TaskStatusLabels: Record<number, string> = {
    [PrintTaskStatus.PENDING_ASSIGN]: '待分配',
    [PrintTaskStatus.ASSIGNED]: '已分配',
    [PrintTaskStatus.ACCEPTED]: '已接受',
    [PrintTaskStatus.PRINTING]: '打印中',
    [PrintTaskStatus.COMPLETED]: '已完成',
    [PrintTaskStatus.FAILED]: '失败',
    [PrintTaskStatus.CANCELLED]: '已取消'
  }

  const TaskStatusColors: Record<number, 'primary' | 'success' | 'warning' | 'info' | 'danger'> = {
    [PrintTaskStatus.PENDING_ASSIGN]: 'info',
    [PrintTaskStatus.ASSIGNED]: 'warning',
    [PrintTaskStatus.ACCEPTED]: 'primary',
    [PrintTaskStatus.PRINTING]: 'primary',
    [PrintTaskStatus.COMPLETED]: 'success',
    [PrintTaskStatus.FAILED]: 'danger',
    [PrintTaskStatus.CANCELLED]: 'danger'
  }

  function getTaskStatusLabel(status: number) {
    return TaskStatusLabels[status] || '未知'
  }

  function getTaskStatusColor(status: number) {
    return TaskStatusColors[status] || 'info'
  }

  function formatTime(date: string) {
    return date ? new Date(date).toLocaleString('zh-CN') : ''
  }

  async function loadMerchantOptions() {
    try {
      const res = await fetchMerchantList({ page: 1, limit: 1000 })
      merchantOptions.value = res.list || []
    } catch (err: any) {
      ElMessage.error(err?.response?.data?.message || '商户列表加载失败')
    }
  }

  async function loadTasks() {
    if (!merchantId.value) {
      ElMessage.warning('请先选择商户')
      return
    }
    taskLoading.value = true
    try {
      const res = await dispatchApi.fetchTasks({
        merchantId: merchantId.value,
        page: taskPage.value,
        limit: 10
      })
      taskList.value = res.list || []
      taskTotal.value = res.total || 0
    } catch (err: any) {
      ElMessage.error(err?.response?.data?.message || '调度服务异常')
    } finally {
      taskLoading.value = false
    }
  }

  onMounted(() => {
    loadMerchantOptions()
  })
</script>
