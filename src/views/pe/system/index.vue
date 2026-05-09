<!-- 印易打印系统设置 -->
<template>
  <div class="pe-system art-full-height">
    <ElTabs v-model="activeTab" type="border-card">
      <ElTabPane label="价格配置" name="price">
        <ElCard shadow="never">
          <ElForm :model="priceForm" label-width="180px" size="default">
            <ElFormItem label="黑白单面（元/页）">
              <ElInputNumber
                v-model="priceForm.blackWhiteSingleSidedPrice"
                :min="0"
                :precision="2"
                :step="0.01"
              />
            </ElFormItem>
            <ElFormItem label="黑白双面（元/页）">
              <ElInputNumber
                v-model="priceForm.blackWhiteDoubleSidedPrice"
                :min="0"
                :precision="2"
                :step="0.01"
              />
            </ElFormItem>
            <ElFormItem label="彩色单面（元/页）">
              <ElInputNumber
                v-model="priceForm.colorSingleSidedPrice"
                :min="0"
                :precision="2"
                :step="0.01"
              />
            </ElFormItem>
            <ElFormItem label="彩色双面（元/页）">
              <ElInputNumber
                v-model="priceForm.colorDoubleSidedPrice"
                :min="0"
                :precision="2"
                :step="0.01"
              />
            </ElFormItem>
            <ElFormItem label="最低起送价（元）">
              <ElInputNumber v-model="priceForm.minPrice" :min="0" :precision="2" :step="0.5" />
            </ElFormItem>
            <ElFormItem>
              <ElButton type="primary" :loading="saving" @click="savePrice">保存价格配置</ElButton>
            </ElFormItem>
          </ElForm>
        </ElCard>
      </ElTabPane>

      <ElTabPane label="功能开关" name="features">
        <ElCard shadow="never">
          <ElForm label-width="180px" size="default">
            <ElFormItem label="管理员登录入口" v-for="item in featureItems" :key="item.key">
              <ElSwitch v-model="item.value" @change="(v: any) => toggleFeature(item.key, !!v)" />
            </ElFormItem>
          </ElForm>
        </ElCard>
      </ElTabPane>

      <ElTabPane label="公告管理" name="notice">
        <ElCard shadow="never">
          <ElForm :model="noticeForm" label-width="100px" size="default">
            <ElFormItem label="公告标题">
              <ElInput v-model="noticeForm.title" placeholder="请输入公告标题" />
            </ElFormItem>
            <ElFormItem label="公告内容">
              <ElInput
                v-model="noticeForm.content"
                type="textarea"
                :rows="4"
                placeholder="请输入公告内容"
              />
            </ElFormItem>
            <ElFormItem label="联系微信">
              <ElInput v-model="noticeForm.wechatNumber" placeholder="微信号" />
            </ElFormItem>
            <ElFormItem label="公告图片">
              <ElInput v-model="noticeForm.imageUrl" placeholder="图片 URL" />
            </ElFormItem>
            <ElFormItem label="是否启用">
              <ElSwitch v-model="noticeForm.isActive" />
            </ElFormItem>
            <ElFormItem>
              <ElButton type="primary" :loading="saving" @click="saveNotice">保存公告</ElButton>
            </ElFormItem>
          </ElForm>

          <ElDivider content-position="left">每日弹窗公告</ElDivider>
          <ElAlert
            title="每日弹窗公告会在小程序端以轻量弹层展示，并支持用户今日关闭；普通公告仍用于首页公告卡片。"
            type="info"
            :closable="false"
            class="daily-popup-tip"
          />
          <ElForm :model="dailyPopupNoticeForm" label-width="100px" size="default">
            <ElFormItem label="弹窗标题">
              <ElInput v-model="dailyPopupNoticeForm.title" placeholder="请输入每日弹窗标题" />
            </ElFormItem>
            <ElFormItem label="弹窗内容">
              <ElInput
                v-model="dailyPopupNoticeForm.content"
                type="textarea"
                :rows="4"
                placeholder="请输入每日弹窗内容"
              />
            </ElFormItem>
            <ElFormItem label="联系微信">
              <ElInput v-model="dailyPopupNoticeForm.wechatNumber" placeholder="微信号" />
            </ElFormItem>
            <ElFormItem label="弹窗图片">
              <ElInput v-model="dailyPopupNoticeForm.imageUrl" placeholder="图片 URL" />
            </ElFormItem>
            <ElFormItem label="是否启用">
              <ElSwitch v-model="dailyPopupNoticeForm.enabled" />
            </ElFormItem>
            <ElFormItem>
              <ElButton type="primary" :loading="saving" @click="saveDailyPopupNotice">
                保存每日弹窗公告
              </ElButton>
            </ElFormItem>
          </ElForm>
        </ElCard>
      </ElTabPane>
    </ElTabs>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, computed, onMounted } from 'vue'
  import { ElMessage } from 'element-plus'
  import { usePrintEaseSystemStore } from '@/store/modules/printease-system'

  defineOptions({ name: 'PeSystem' })
  const systemStore = usePrintEaseSystemStore()
  const activeTab = ref('price')
  const saving = ref(false)

  const priceForm = reactive({ ...systemStore.priceConfig })
  const noticeForm = reactive({ ...systemStore.notice })
  const dailyPopupNoticeForm = reactive({ ...systemStore.dailyPopupNotice })

  const featureItems = computed(() => [
    { key: 'adminEntryEnabled', value: systemStore.featureConfigs.adminEntryEnabled },
    { key: 'merchantEntryEnabled', value: systemStore.featureConfigs.merchantEntryEnabled },
    { key: 'paymentEnabled', value: systemStore.featureConfigs.paymentEnabled },
    { key: 'alipayEnabled', value: systemStore.featureConfigs.alipayEnabled }
  ])

  async function savePrice() {
    saving.value = true
    try {
      await systemStore.savePriceConfig(priceForm)
      ElMessage.success('价格配置已保存')
    } finally {
      saving.value = false
    }
  }

  async function toggleFeature(key: string, enabled: boolean) {
    try {
      await systemStore.toggleFeature(key, enabled)
      ElMessage.success(`${key} 已${enabled ? '开启' : '关闭'}`)
    } catch {
      /* 错误已处理 */
    }
  }

  async function saveNotice() {
    saving.value = true
    try {
      await systemStore.saveNotice(noticeForm)
      ElMessage.success('公告已保存')
    } finally {
      saving.value = false
    }
  }

  async function saveDailyPopupNotice() {
    saving.value = true
    try {
      await systemStore.saveDailyPopupNotice(dailyPopupNoticeForm)
      Object.assign(dailyPopupNoticeForm, systemStore.dailyPopupNotice)
      ElMessage.success('每日弹窗公告已保存')
    } finally {
      saving.value = false
    }
  }

  onMounted(async () => {
    await Promise.all([
      systemStore.loadPriceConfig(),
      systemStore.loadNotice(),
      systemStore.loadDailyPopupNotice(),
      systemStore.loadFeatureConfigs()
    ])
    Object.assign(priceForm, systemStore.priceConfig)
    Object.assign(noticeForm, systemStore.notice)
    Object.assign(dailyPopupNoticeForm, systemStore.dailyPopupNotice)
  })
</script>

<style scoped lang="scss">
  .daily-popup-tip {
    margin-bottom: 18px;
  }
</style>
