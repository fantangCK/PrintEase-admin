<!-- 印易打印商户管理 -->
<template>
  <div class="pe-merchant art-full-height">
    <ElCard class="mb-4">
      <div class="flex justify-between items-center">
        <ElButton type="primary" @click="openCreate"><Icon icon="ep:plus" /> 新增商户</ElButton>
        <ElButton @click="handleRefresh"><Icon icon="ep:refresh" /> 刷新</ElButton>
      </div>
    </ElCard>

    <ElCard class="art-table-card">
      <ElTable :data="merchantStore.list" v-loading="merchantStore.loading" stripe>
        <ElTableColumn prop="id" label="ID" width="60" />
        <ElTableColumn prop="name" label="商户名称" min-width="120" />
        <ElTableColumn prop="phone" label="电话" width="120" />
        <ElTableColumn prop="address" label="地址" min-width="150" />
        <ElTableColumn label="状态" width="80">
          <template #default="{ row }">
            <ElTag :type="row.status === 1 ? 'success' : 'danger'" size="small">{{
              row.status === 1 ? '正常' : '禁用'
            }}</ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="apiKey" label="API Key" min-width="180">
          <template #default="{ row }">
            <div class="flex items-center gap-1">
              <span class="text-xs text-gray-500">{{ row.apiKey?.substring(0, 16) }}...</span>
              <ElButton link size="small" @click="copyApiKey(row.apiKey)"
                ><Icon icon="ep:copy-document"
              /></ElButton>
            </div>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="createdAt" label="创建时间" width="160">
          <template #default="{ row }">{{ formatTime(row.createdAt) }}</template>
        </ElTableColumn>
        <ElTableColumn label="操作" width="220" fixed="right">
          <template #default="{ row }">
            <ElButton link type="primary" size="small" @click="openEdit(row)">编辑</ElButton>
            <ElButton link type="warning" size="small" @click="handleRegenKey(row)"
              >重置Key</ElButton
            >
            <ElButton link type="danger" size="small" @click="handleDelete(row)">删除</ElButton>
          </template>
        </ElTableColumn>
      </ElTable>

      <div class="flex justify-end mt-4">
        <ElPagination
          v-model:current-page="merchantStore.currentPage"
          v-model:page-size="merchantStore.pageSize"
          :total="merchantStore.total"
          :page-sizes="[10, 20, 50]"
          layout="total, sizes, prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
        />
      </div>
    </ElCard>

    <ElDialog v-model="dialogVisible" :title="dialogTitle" width="500px" @close="resetForm">
      <ElForm :model="form" label-width="80px" size="default">
        <ElFormItem label="商户名称" required>
          <ElInput v-model="form.name" placeholder="请输入商户名称" />
        </ElFormItem>
        <ElFormItem label="联系电话" required>
          <ElInput v-model="form.phone" placeholder="请输入联系电话" />
        </ElFormItem>
        <ElFormItem label="密码" :required="!editId">
          <ElInput
            v-model="form.password"
            placeholder="请输入密码（留空则不修改）"
            type="password"
            show-password
          />
        </ElFormItem>
        <ElFormItem label="地址">
          <ElInput v-model="form.address" placeholder="请输入地址" />
        </ElFormItem>
        <ElFormItem label="配送楼栋">
          <ElInput v-model="form.buildingIds" placeholder="楼栋ID，逗号分隔" />
        </ElFormItem>
      </ElForm>
      <template #footer>
        <ElButton @click="dialogVisible = false">取消</ElButton>
        <ElButton type="primary" @click="handleSubmit" :loading="merchantStore.loading"
          >确定</ElButton
        >
      </template>
    </ElDialog>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, computed, onMounted } from 'vue'
  import { ElMessageBox, ElMessage } from 'element-plus'
  import { Icon } from '@iconify/vue'
  import { usePrintEaseMerchantStore } from '@/store/modules/printease-merchant'

  defineOptions({ name: 'PeMerchant' })
  const merchantStore = usePrintEaseMerchantStore()

  const dialogVisible = ref(false)
  const editId = ref<number | null>(null)

  const form = reactive({
    name: '',
    phone: '',
    password: '',
    address: '',
    buildingIds: ''
  })

  const dialogTitle = computed(() => (editId.value ? '编辑商户' : '新增商户'))

  function formatTime(date: string) {
    return date ? new Date(date).toLocaleString('zh-CN') : ''
  }

  function copyApiKey(key: string) {
    navigator.clipboard.writeText(key).then(() => ElMessage.success('API Key 已复制'))
  }

  function resetForm() {
    form.name = ''
    form.phone = ''
    form.password = ''
    form.address = ''
    form.buildingIds = ''
    editId.value = null
  }

  function openCreate() {
    resetForm()
    dialogVisible.value = true
  }

  function openEdit(row: Api.PrintEase.MerchantListItem) {
    editId.value = row.id
    form.name = row.name
    form.phone = row.phone
    form.password = ''
    form.address = row.address || ''
    form.buildingIds = row.buildingIds || ''
    dialogVisible.value = true
  }

  async function handleSubmit() {
    if (!form.name || !form.phone) {
      ElMessage.warning('请填写商户名称和联系电话')
      return
    }
    const data: any = {
      name: form.name,
      phone: form.phone
    }
    if (form.password) data.password = form.password
    if (form.address) data.address = form.address
    if (form.buildingIds) data.buildingIds = form.buildingIds

    try {
      if (editId.value) {
        await merchantStore.edit(editId.value, data)
      } else {
        if (!form.password) {
          ElMessage.warning('请填写密码')
          return
        }
        await merchantStore.add(data as Api.PrintEase.MerchantCreateParams)
      }
      ElMessage.success(editId.value ? '修改成功' : '创建成功')
      dialogVisible.value = false
      resetForm()
    } catch {
      /* 错误已处理 */
    }
  }

  async function handleDelete(row: Api.PrintEase.MerchantListItem) {
    try {
      await ElMessageBox.confirm(`确定删除商户 "${row.name}" 吗？`, '确认', { type: 'warning' })
      await merchantStore.remove(row.id)
      ElMessage.success('已删除')
    } catch {
      /* 取消 */
    }
  }

  async function handleRegenKey(row: Api.PrintEase.MerchantListItem) {
    try {
      await ElMessageBox.confirm('重置 API Key 将使旧 Key 立即失效，确定继续？', '确认', {
        type: 'warning'
      })
      await merchantStore.regenerateKey(row.id)
      ElMessage.success('API Key 已重置')
    } catch {
      /* 取消 */
    }
  }

  async function handleRefresh() {
    await merchantStore.loadList()
  }

  async function handleSizeChange() {
    await merchantStore.loadList(1, merchantStore.pageSize)
  }

  async function handlePageChange() {
    await merchantStore.loadList(merchantStore.currentPage, merchantStore.pageSize)
  }

  onMounted(() => merchantStore.loadList())
</script>
