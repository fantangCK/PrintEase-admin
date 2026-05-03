<!-- 印易打印订单管理 -->
<template>
  <div class="pe-order-list art-full-height">
    <ElCard class="mb-4">
      <ElForm :inline="true" :model="filters" size="default">
        <ElFormItem label="订单状态">
          <ElSelect
            v-model="filters.status"
            placeholder="全部"
            clearable
            style="width: 140px"
            @change="handleSearch"
          >
            <ElOption
              v-for="(label, key) in OrderStatusLabel"
              :key="Number(key)"
              :label="label"
              :value="Number(key)"
            />
          </ElSelect>
        </ElFormItem>
        <ElFormItem>
          <ElButton type="primary" @click="handleSearch">查询</ElButton>
          <ElButton @click="handleReset">重置</ElButton>
        </ElFormItem>
      </ElForm>
    </ElCard>

    <ElCard class="art-table-card">
      <div class="flex justify-between items-center mb-4">
        <div class="flex gap-2" v-if="selectedRows.length">
          <ElButton type="success" size="small" @click="handleBatchComplete">批量完成</ElButton>
          <ElButton type="danger" size="small" @click="handleBatchCancel">批量取消</ElButton>
        </div>
        <ElButton size="small" @click="refreshData"><Icon icon="ep:refresh" /> 刷新</ElButton>
      </div>

      <ElTable
        :data="orderStore.list"
        v-loading="orderStore.loading"
        stripe
        @selection-change="onSelectChange"
      >
        <ElTableColumn type="selection" width="45" />
        <ElTableColumn prop="id" label="订单号" width="180" />
        <ElTableColumn label="文件名" min-width="150">
          <template #default="{ row }">
            <span class="text-blue-500 cursor-pointer" @click="goDetail(row.id)">{{
              row.fileName || '—'
            }}</span>
          </template>
        </ElTableColumn>
        <ElTableColumn label="状态" width="100">
          <template #default="{ row }">
            <ElTag :type="getStatusColor(row.status)" size="small">{{
              getStatusLabel(row.status)
            }}</ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="totalPages" label="页数" width="70" align="center" />
        <ElTableColumn prop="copies" label="份数" width="60" align="center" />
        <ElTableColumn label="金额" width="90" align="right">
          <template #default="{ row }">¥{{ row.totalAmount?.toFixed(2) }}</template>
        </ElTableColumn>
        <ElTableColumn prop="deliveryBuildingName" label="配送楼栋" width="120" align="center" />
        <ElTableColumn prop="createdAt" label="创建时间" width="160">
          <template #default="{ row }">{{ formatTime(row.createdAt) }}</template>
        </ElTableColumn>
        <ElTableColumn label="操作" width="140" fixed="right">
          <template #default="{ row }">
            <ElButton link type="primary" size="small" @click="goDetail(row.id)">详情</ElButton>
            <ElDropdown trigger="click">
              <ElButton link type="primary" size="small">更多</ElButton>
              <template #dropdown>
                <ElDropdownMenu>
                  <ElDropdownItem
                    v-if="canComplete(row.status)"
                    @click="handleSetStatus(row, OrderStatus.COMPLETED)"
                    >完成</ElDropdownItem
                  >
                  <ElDropdownItem
                    v-if="canCancel(row.status)"
                    @click="handleSetStatus(row, OrderStatus.CANCELLED)"
                    >取消</ElDropdownItem
                  >
                  <ElDropdownItem @click="handleDelete(row)" style="color: #f56c6c"
                    >删除</ElDropdownItem
                  >
                </ElDropdownMenu>
              </template>
            </ElDropdown>
          </template>
        </ElTableColumn>
      </ElTable>

      <div class="flex justify-end mt-4">
        <ElPagination
          v-model:current-page="orderStore.currentPage"
          v-model:page-size="orderStore.pageSize"
          :total="orderStore.total"
          :page-sizes="[10, 20, 50]"
          layout="total, sizes, prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
        />
      </div>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { ElMessageBox } from 'element-plus'
  import { usePrintEaseOrderStore } from '@/store/modules/printease-order'
  import { OrderStatus, OrderStatusLabel, OrderStatusColor } from '@/enums/printease'
  import { Icon } from '@iconify/vue'

  defineOptions({ name: 'PeOrderList' })
  const router = useRouter()
  const orderStore = usePrintEaseOrderStore()

  const filters = reactive({
    status: undefined as number | undefined
  })
  const selectedRows = ref<Api.PrintEase.OrderListItem[]>([])

  function onSelectChange(rows: Api.PrintEase.OrderListItem[]) {
    selectedRows.value = rows
  }

  function getStatusColor(status: number) {
    return OrderStatusColor[status] || 'info'
  }

  function getStatusLabel(status: number) {
    return OrderStatusLabel[status] || '未知'
  }

  function canComplete(status: number) {
    return [OrderStatus.PENDING_PRINT, OrderStatus.PRINTING, OrderStatus.PRINTED].includes(status)
  }

  function canCancel(status: number) {
    return [OrderStatus.PENDING_PAYMENT, OrderStatus.PENDING_PRINT].includes(status)
  }

  function formatTime(date: string) {
    if (!date) return ''
    return new Date(date).toLocaleString('zh-CN')
  }

  function goDetail(id: number) {
    router.push(`/printease/order/detail/${id}`)
  }

  async function handleSearch() {
    await orderStore.loadList(1, orderStore.pageSize, filters.status)
  }

  async function handleReset() {
    filters.status = undefined
    await orderStore.loadList(1, orderStore.pageSize)
  }

  async function handleSizeChange() {
    await orderStore.loadList(1, orderStore.pageSize, filters.status)
  }

  async function handlePageChange() {
    await orderStore.loadList(orderStore.currentPage, orderStore.pageSize, filters.status)
  }

  async function handleSetStatus(row: Api.PrintEase.OrderListItem, status: OrderStatus) {
    try {
      await orderStore.setStatus(row.id, status)
    } catch {
      /* 错误已由拦截器处理 */
    }
  }

  async function handleDelete(row: Api.PrintEase.OrderListItem) {
    try {
      await ElMessageBox.confirm(`确定要删除订单 ${row.id} 吗？`, '确认删除', { type: 'warning' })
      await orderStore.remove(row.id)
    } catch {
      /* 取消操作 */
    }
  }

  async function handleBatchComplete() {
    const ids = selectedRows.value.filter((r) => canComplete(r.status)).map((r) => String(r.id))
    if (!ids.length) return
    try {
      await ElMessageBox.confirm(`确定要批量完成 ${ids.length} 个订单吗？`, '确认操作', {
        type: 'warning'
      })
      await orderStore.batchSetStatus(ids, OrderStatus.COMPLETED)
    } catch {
      /* 取消 */
    }
  }

  async function handleBatchCancel() {
    const ids = selectedRows.value.filter((r) => canCancel(r.status)).map((r) => String(r.id))
    if (!ids.length) return
    try {
      await ElMessageBox.confirm(`确定要批量取消 ${ids.length} 个订单吗？`, '确认操作', {
        type: 'warning'
      })
      await orderStore.batchSetStatus(ids, OrderStatus.CANCELLED)
    } catch {
      /* 取消 */
    }
  }

  async function refreshData() {
    await orderStore.loadList(orderStore.currentPage, orderStore.pageSize, filters.status)
  }

  onMounted(() => {
    orderStore.loadList()
  })
</script>
