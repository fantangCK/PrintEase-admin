<!-- 印易打印订单详情 -->
<template>
  <div class="pe-order-detail art-full-height">
    <ElPageHeader @back="$router.back()">
      <template #content>
        <span class="text-lg font-semibold">订单详情 - {{ orderStore.detail?.id }}</span>
      </template>
    </ElPageHeader>

    <div v-loading="loading">
      <ElRow :gutter="16" v-if="orderStore.detail">
        <ElCol :xs="24" :lg="16">
          <ElCard shadow="never" class="mb-4">
            <template #header><span class="font-semibold">基本订单信息</span></template>
            <ElDescriptions :column="2" border size="small">
              <ElDescriptionsItem label="订单号">{{ orderStore.detail.id }}</ElDescriptionsItem>
              <ElDescriptionsItem label="状态">
                <ElTag :type="getStatusColor(orderStore.detail.status)">{{
                  getStatusLabel(orderStore.detail.status)
                }}</ElTag>
              </ElDescriptionsItem>
              <ElDescriptionsItem label="总页数">{{
                orderStore.detail.totalPages
              }}</ElDescriptionsItem>
              <ElDescriptionsItem label="份数">{{ orderStore.detail.copies }}</ElDescriptionsItem>
              <ElDescriptionsItem label="纸张规格">{{
                orderStore.detail.paperSize
              }}</ElDescriptionsItem>
              <ElDescriptionsItem label="颜色类型">{{
                orderStore.detail.colorType === 0 ? '黑白' : '彩色'
              }}</ElDescriptionsItem>
              <ElDescriptionsItem label="双面打印">{{
                orderStore.detail.doubleSided === 0 ? '单面' : '双面'
              }}</ElDescriptionsItem>
              <ElDescriptionsItem label="打印质量">{{
                qualityLabel(orderStore.detail.printQuality)
              }}</ElDescriptionsItem>
              <ElDescriptionsItem label="总金额">{{
                formatMoney(orderStore.detail)
              }}</ElDescriptionsItem>
              <ElDescriptionsItem label="创建时间">{{
                formatTime(orderStore.detail.createdAt)
              }}</ElDescriptionsItem>
              <ElDescriptionsItem label="备注" :span="2">{{
                orderStore.detail.remark || '无'
              }}</ElDescriptionsItem>
            </ElDescriptions>
          </ElCard>

          <div class="flex gap-2 mt-4" v-if="orderStore.detail">
            <ElButton
              type="success"
              v-if="canComplete(orderStore.detail.status)"
              @click="setStatus(OrderStatus.COMPLETED)"
              >标记完成</ElButton
            >
            <ElButton
              type="warning"
              v-if="canCancel(orderStore.detail.status)"
              @click="setStatus(OrderStatus.CANCELLED)"
              >取消订单</ElButton
            >
            <ElButton type="danger" @click="handleDelete">删除订单</ElButton>
          </div>
        </ElCol>

        <ElCol :xs="24" :lg="8">
          <ElCard shadow="never" class="mb-4">
            <template #header><span class="font-semibold">下单用户</span></template>
            <div v-if="orderStore.detail.user">
              <p><strong>昵称：</strong>{{ orderStore.detail.user.nickname || '—' }}</p>
              <p class="mt-2"><strong>手机：</strong>{{ orderStore.detail.user.phone || '—' }}</p>
            </div>
            <ElEmpty v-else description="未绑定用户" />
          </ElCard>

          <ElCard shadow="never" class="mb-4" v-if="orderStore.detail.merchant">
            <template #header><span class="font-semibold">商户信息</span></template>
            <p><strong>名称：</strong>{{ orderStore.detail.merchant.name }}</p>
            <p class="mt-2"><strong>电话：</strong>{{ orderStore.detail.merchant.phone }}</p>
            <p class="mt-2"
              ><strong>地址：</strong>{{ orderStore.detail.merchant.address || '—' }}</p
            >
          </ElCard>

          <ElCard shadow="never" v-if="orderStore.detail.deliveryBuildingName">
            <template #header><span class="font-semibold">配送信息</span></template>
            <p><strong>配送楼栋：</strong>{{ orderStore.detail.deliveryBuildingName }}</p>
            <p class="mt-2"
              ><strong>配送时段：</strong>{{ orderStore.detail.deliveryTimeSlotName || '—' }}</p
            >
            <div v-if="orderStore.detail.deliveryImageUrl" class="mt-2">
              <ElImage
                :src="orderStore.detail.deliveryImageUrl"
                fit="cover"
                style="width: 100%; max-height: 200px"
              />
            </div>
          </ElCard>
        </ElCol>
      </ElRow>

      <ElCard shadow="never" class="mt-4" v-if="orderStore.detail?.files?.length">
        <template #header><span class="font-semibold">文件列表</span></template>
        <ElTable :data="orderStore.detail.files" stripe size="small">
          <ElTableColumn label="文件名" min-width="200">
            <template #default="{ row }">{{
              row.file?.fileName || row.fileName || `文件 #${row.fileId}`
            }}</template>
          </ElTableColumn>
          <ElTableColumn prop="pages" label="页数" width="80" />
          <ElTableColumn prop="copies" label="份数" width="70" />
          <ElTableColumn label="纸张" width="70">
            <template #default="{ row }">{{ row.paperSize || '-' }}</template>
          </ElTableColumn>
          <ElTableColumn label="操作" width="160">
            <template #default="{ row }">
              <ElButton
                link
                type="primary"
                size="small"
                v-if="row.filePath"
                @click="downloadFile(row.filePath)"
                >下载原文件</ElButton
              >
              <ElButton
                link
                type="success"
                size="small"
                v-if="row.convertedPdfPath"
                @click="downloadFile(row.convertedPdfPath)"
                >下载 PDF</ElButton
              >
            </template>
          </ElTableColumn>
        </ElTable>
      </ElCard>

      <ElEmpty v-if="!orderStore.detail && !loading" description="订单不存在" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { ElMessageBox } from 'element-plus'
  import { usePrintEaseOrderStore } from '@/store/modules/printease-order'
  import { OrderStatus, OrderStatusLabel, OrderStatusColor } from '@/enums/printease'

  defineOptions({ name: 'PeOrderDetail' })
  const route = useRoute()
  const router = useRouter()
  const orderStore = usePrintEaseOrderStore()

  const loading = ref(false)

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

  function qualityLabel(q: string) {
    const map: Record<string, string> = { draft: '草稿', normal: '标准', high: '高清' }
    return map[q] || q
  }

  function formatTime(date: string) {
    if (!date) return ''
    return new Date(date).toLocaleString('zh-CN')
  }

  function formatMoney(row: Api.PrintEase.OrderDetail) {
    const amount = Number(
      row.totalAmount ??
        row.amount ??
        row.mpayRealPrice ??
        row.payment?.amount ??
        row.payment?.mpayRealPrice ??
        0
    )
    return `¥${amount.toFixed(2)}`
  }

  function downloadFile(url: string) {
    window.open(url, '_blank')
  }

  async function setStatus(status: OrderStatus) {
    try {
      await orderStore.setStatus(orderStore.detail!.id, status)
      await loadDetail()
    } catch {
      /* 错误已处理 */
    }
  }

  async function handleDelete() {
    try {
      await ElMessageBox.confirm('确定要删除此订单吗？', '确认删除', { type: 'warning' })
      await orderStore.remove(orderStore.detail!.id)
      router.push('/printease/order')
    } catch {
      /* 取消 */
    }
  }

  async function loadDetail() {
    loading.value = true
    try {
      const id = String(route.params.id || '')
      await orderStore.loadDetail(id)
    } finally {
      loading.value = false
    }
  }

  onMounted(() => loadDetail())
</script>
