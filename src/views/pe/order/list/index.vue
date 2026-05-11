<!-- 印易打印订单管理 -->
<template>
  <div class="pe-order-list art-full-height">
    <ElCard class="mb-4">
      <ElForm :inline="true" :model="filters" size="default">
        <ElFormItem label="订单号">
          <ElInput
            v-model="filters.orderId"
            placeholder="输入订单号"
            clearable
            style="width: 220px"
            @keyup.enter="handleSearch"
            @clear="handleSearch"
          />
        </ElFormItem>
        <ElFormItem label="用户ID">
          <ElInput
            v-model="filters.userId"
            placeholder="输入用户ID"
            clearable
            style="width: 140px"
            @keyup.enter="handleSearch"
            @clear="handleSearch"
          />
        </ElFormItem>
        <ElFormItem label="商户ID">
          <ElInput
            v-model="filters.merchantId"
            placeholder="输入商户ID"
            clearable
            style="width: 140px"
            @keyup.enter="handleSearch"
            @clear="handleSearch"
          />
        </ElFormItem>
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

      <div class="order-table-wrapper">
        <ElTable
          :data="orderStore.list"
          v-loading="orderStore.loading"
          stripe
          border
          height="100%"
          table-layout="fixed"
          @selection-change="onSelectChange"
        >
          <ElTableColumn type="selection" width="45" fixed="left" />
          <ElTableColumn prop="id" label="订单号" width="180" show-overflow-tooltip fixed="left" />
          <ElTableColumn label="文件名" min-width="260" show-overflow-tooltip>
            <template #default="{ row }">
              <span class="text-blue-500 cursor-pointer" @click="goDetail(row.id)">{{
                getFileName(row)
              }}</span>
            </template>
          </ElTableColumn>
          <ElTableColumn label="用户" width="150" show-overflow-tooltip>
            <template #default="{ row }">{{ getUserInfo(row) }}</template>
          </ElTableColumn>
          <ElTableColumn label="状态" width="100" align="center">
            <template #default="{ row }">
              <ElTag :type="getStatusColor(row.status)" size="small">{{
                getStatusLabel(row.status)
              }}</ElTag>
            </template>
          </ElTableColumn>
          <ElTableColumn label="页数" width="80" align="center">
            <template #default="{ row }">{{ getPages(row) }}</template>
          </ElTableColumn>
          <ElTableColumn label="份数" width="80" align="center">
            <template #default="{ row }">{{ getCopies(row) }}</template>
          </ElTableColumn>
          <ElTableColumn label="金额" width="110" align="right">
            <template #default="{ row }">{{ formatMoney(row) }}</template>
          </ElTableColumn>
          <ElTableColumn label="配送楼栋" min-width="150" show-overflow-tooltip>
            <template #default="{ row }">{{ getDeliveryName(row) }}</template>
          </ElTableColumn>
          <ElTableColumn prop="createdAt" label="创建时间" width="170" align="center">
            <template #default="{ row }">{{ formatTime(row.createdAt) }}</template>
          </ElTableColumn>
          <ElTableColumn label="操作" width="170" fixed="right" align="center">
            <template #default="{ row }">
              <ElDropdown
                trigger="click"
                @command="(command: OrderStatus) => handleSetStatus(row, command)"
              >
                <ElButton link type="primary" size="small">改变状态</ElButton>
                <template #dropdown>
                  <ElDropdownMenu>
                    <ElDropdownItem
                      v-for="option in getStatusOptions(row.status)"
                      :key="option.value"
                      :command="option.value"
                    >
                      {{ option.label }}
                    </ElDropdownItem>
                  </ElDropdownMenu>
                </template>
              </ElDropdown>
              <ElButton link type="primary" size="small" @click="goDetail(row.id)">详情</ElButton>
            </template>
          </ElTableColumn>
        </ElTable>
      </div>

      <div class="flex justify-end mt-4">
        <ElPagination
          v-model:current-page="orderStore.currentPage"
          v-model:page-size="orderStore.pageSize"
          :total="orderStore.total"
          :page-sizes="[10, 20, 50]"
          layout="total, sizes, prev, pager, next, jumper"
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
    orderId: '',
    userId: '',
    merchantId: '',
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

  function getFileName(row: Api.PrintEase.OrderListItem) {
    return (
      row.fileName ||
      row.orderFiles?.[0]?.file?.originalName ||
      row.orderFiles?.[0]?.file?.filename ||
      row.orderFiles?.[0]?.file?.name ||
      '—'
    )
  }

  function getPages(row: Api.PrintEase.OrderListItem) {
    return (
      row.totalPages ||
      row.orderFiles?.reduce((sum, item) => sum + Number(item.pageCount || 0), 0) ||
      0
    )
  }

  function getCopies(row: Api.PrintEase.OrderListItem) {
    return (
      row.copies || row.orderFiles?.reduce((sum, item) => sum + Number(item.copies || 0), 0) || 0
    )
  }

  function getMoneyValue(row: Api.PrintEase.OrderListItem) {
    return Number(
      row.totalAmount ??
        row.amount ??
        row.mpayRealPrice ??
        row.payment?.amount ??
        row.payment?.mpayRealPrice ??
        0
    )
  }

  function formatMoney(row: Api.PrintEase.OrderListItem) {
    return `¥${getMoneyValue(row).toFixed(2)}`
  }

  function getDeliveryName(row: Api.PrintEase.OrderListItem) {
    return row.deliveryBuildingName || row.delivery?.buildingName || row.delivery?.address || '—'
  }

  function getUserInfo(row: Api.PrintEase.OrderListItem) {
    const user = row.user
    return user?.nickname || user?.phone || (row.userId ? `用户${row.userId}` : '—')
  }

  function getSearchParams(): Api.PrintEase.OrderSearchParams {
    return {
      orderId: filters.orderId || undefined,
      userId: filters.userId ? Number(filters.userId) : undefined,
      merchantId: filters.merchantId ? Number(filters.merchantId) : undefined,
      status: filters.status
    }
  }

  function getStatusOptions(status: number) {
    return Object.entries(OrderStatusLabel)
      .map(([value, label]) => ({ value: Number(value) as OrderStatus, label }))
      .filter((option) => option.value !== status)
  }

  function formatTime(date: string) {
    if (!date) return ''
    return new Date(date).toLocaleString('zh-CN')
  }

  function goDetail(id: string) {
    router.push(`/printease/order/detail/${id}`)
  }

  async function handleSearch() {
    await orderStore.loadList(1, orderStore.pageSize, getSearchParams())
  }

  async function handleReset() {
    filters.orderId = ''
    filters.userId = ''
    filters.merchantId = ''
    filters.status = undefined
    await orderStore.loadList(1, orderStore.pageSize, getSearchParams())
  }

  async function handleSizeChange() {
    await orderStore.loadList(1, orderStore.pageSize, getSearchParams())
  }

  async function handlePageChange() {
    await orderStore.loadList(orderStore.currentPage, orderStore.pageSize, getSearchParams())
  }

  async function handleSetStatus(row: Api.PrintEase.OrderListItem, status: OrderStatus) {
    try {
      await ElMessageBox.confirm(
        `确定要将订单 ${row.id} 状态改为「${getStatusLabel(status)}」吗？`,
        '确认改变状态',
        { type: 'warning' }
      )
      await orderStore.setStatus(row.id, status)
    } catch {
      /* 错误已由拦截器处理 */
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
    await orderStore.loadList(orderStore.currentPage, orderStore.pageSize, getSearchParams())
  }

  onMounted(() => {
    orderStore.loadList(1, orderStore.pageSize, getSearchParams())
  })
</script>

<style scoped lang="scss">
  .pe-order-list {
    display: flex;
    flex-direction: column;
    min-height: 0;
  }

  .art-table-card {
    flex: 1;
    min-height: 0;

    :deep(.el-card__body) {
      display: flex;
      flex-direction: column;
      height: 100%;
      min-height: 0;
    }
  }

  .order-table-wrapper {
    flex: 1;
    min-height: 420px;
    overflow: hidden;
  }
</style>
