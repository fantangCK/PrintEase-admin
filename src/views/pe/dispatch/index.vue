<!-- 印易打印云印调度管理 -->
<template>
  <div class="pe-dispatch art-full-height">
    <ElAlert
      title="云印调度需商户 API Key 认证，请在下方输入目标商户的 API Key"
      type="info"
      show-icon
      class="mb-4"
    />

    <ElCard class="mb-4">
      <div class="flex gap-4 items-end">
        <div class="flex-1">
          <p class="text-sm text-gray-500 mb-1">商户 API Key</p>
          <ElInput
            v-model="apiKey"
            placeholder="请输入商户 API Key"
            clearable
            @change="setApiKey"
          />
        </div>
        <ElButton type="primary" :disabled="!apiKey" @click="loadTasks">查询任务</ElButton>
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
  import { ref } from 'vue'
  import { ElMessage } from 'element-plus'
  import { dispatchApi } from '@/api/printease'
  import { PrintTaskStatus } from '@/enums/printease'

  defineOptions({ name: 'PeDispatch' })

  const apiKey = ref('')
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

  function setApiKey() {
    dispatchApi.setApiKey(apiKey.value)
  }

  async function loadTasks() {
    if (!apiKey.value) {
      ElMessage.warning('请先输入商户 API Key')
      return
    }
    setApiKey()
    taskLoading.value = true
    try {
      const res = await dispatchApi.fetchTasks({ page: taskPage.value, limit: 10 })
      taskList.value = res.data?.list || res.data?.records || []
      taskTotal.value = res.data?.total || 0
    } catch (err: any) {
      ElMessage.error(err?.response?.data?.message || '调度服务异常')
    } finally {
      taskLoading.value = false
    }
  }
</script>
