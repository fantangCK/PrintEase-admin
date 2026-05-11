<!-- 印易打印用户管理 -->
<template>
  <div class="pe-user art-full-height">
    <ElCard class="mb-4">
      <div class="flex justify-between items-center">
        <div class="flex gap-2">
          <ElInput
            v-model="searchText"
            placeholder="搜索手机号 / 昵称"
            clearable
            style="width: 240px"
            @keyup.enter="handleSearch"
            @clear="handleSearch"
          />
          <ElButton type="primary" @click="handleSearch">查询</ElButton>
        </div>
        <ElButton @click="handleRefresh"><Icon icon="ep:refresh" /> 刷新</ElButton>
      </div>
    </ElCard>

    <ElCard class="art-table-card">
      <ElTable :data="userList" v-loading="loading" stripe>
        <ElTableColumn prop="id" label="ID" width="60" />
        <ElTableColumn label="头像" width="70">
          <template #default="{ row }">
            <ElAvatar :size="32" :src="row.avatar" />
          </template>
        </ElTableColumn>
        <ElTableColumn prop="nickname" label="昵称" min-width="120" />
        <ElTableColumn prop="phone" label="手机号" width="130" />
        <ElTableColumn prop="openid" label="OpenID" min-width="200">
          <template #default="{ row }">{{ row.openid?.substring(0, 12) }}...</template>
        </ElTableColumn>
        <ElTableColumn label="状态" width="80">
          <template #default="{ row }">
            <ElTag :type="row.isActive ? 'success' : 'danger'" size="small">{{
              row.isActive ? '正常' : '禁用'
            }}</ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="createdAt" label="注册时间" width="160">
          <template #default="{ row }">{{ formatTime(row.createdAt) }}</template>
        </ElTableColumn>
        <ElTableColumn label="操作" width="120" fixed="right">
          <template #default="{ row }">
            <ElButton
              link
              :type="row.isActive ? 'danger' : 'success'"
              size="small"
              @click="toggleStatus(row)"
            >
              {{ row.isActive ? '禁用' : '启用' }}
            </ElButton>
          </template>
        </ElTableColumn>
      </ElTable>

      <div class="flex justify-end mt-4">
        <ElPagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :total="total"
          :page-sizes="[10, 20, 50]"
          layout="total, sizes, prev, pager, next"
          @size-change="loadData"
          @current-change="loadData"
        />
      </div>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { ElMessageBox, ElMessage } from 'element-plus'
  import { Icon } from '@iconify/vue'
  import { fetchUserList, updateUserStatus } from '@/api/printease'

  defineOptions({ name: 'PeUser' })

  const userList = ref<Api.PrintEase.PEUserListItem[]>([])
  const loading = ref(false)
  const currentPage = ref(1)
  const pageSize = ref(10)
  const total = ref(0)
  const searchText = ref('')

  function formatTime(date: string) {
    return date ? new Date(date).toLocaleString('zh-CN') : ''
  }

  async function loadData() {
    loading.value = true
    try {
      const params: Api.PrintEase.PEUserSearchParams = {
        page: currentPage.value,
        limit: pageSize.value
      }
      const keyword = searchText.value.trim()
      if (keyword) {
        if (/^\d+$/.test(keyword)) {
          params.phone = keyword
        } else {
          params.nickname = keyword
        }
      }
      const res = await fetchUserList(params)
      userList.value = res.list
      total.value = res.total
    } finally {
      loading.value = false
    }
  }

  async function handleSearch() {
    currentPage.value = 1
    await loadData()
  }

  async function handleRefresh() {
    await loadData()
  }

  async function toggleStatus(row: Api.PrintEase.PEUserListItem) {
    try {
      await ElMessageBox.confirm(
        `确定要${row.isActive ? '禁用' : '启用'}用户 ${row.nickname || row.phone} 吗？`,
        '确认操作',
        { type: 'warning' }
      )
      await updateUserStatus(row.id, !row.isActive)
      ElMessage.success('操作成功')
      await loadData()
    } catch {
      /* 取消 */
    }
  }

  onMounted(() => loadData())
</script>
