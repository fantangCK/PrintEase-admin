/**
 * API 接口类型定义模块
 *
 * 提供所有后端接口的类型定义
 *
 * ## 主要功能
 *
 * - PrintEase 业务类型（订单、商户、用户、文件、系统、调度、收入）
 * - 通用类型（分页参数、响应结构等）
 * - 认证类型（登录、用户信息等）
 * - 全局命名空间声明
 *
 * ## 使用场景
 *
 * - API 请求参数类型约束
 * - API 响应数据类型定义
 * - 接口文档类型同步
 *
 * ## 注意事项
 *
 * - 在 .vue 文件使用需要在 eslint.config.mjs 中配置 globals: { Api: 'readonly' }
 * - 使用全局命名空间，无需导入即可使用
 *
 * ## 使用方式
 *
 * ```typescript
 * const params: Api.Auth.LoginParams = { userName: 'admin', password: '123456' }
 * const response: Api.PrintEase.OrderItem = await fetchOrderList(params)
 * ```
 *
 * @module types/api/api
 */

declare namespace Api {
  /** 通用类型 */
  namespace Common {
    /** 分页参数 */
    interface PaginationParams {
      current: number
      size: number
      total: number
    }

    /** 通用搜索参数 */
    type CommonSearchParams = Pick<PaginationParams, 'current' | 'size'>

    /** 分页响应基础结构 */
    interface PaginatedResponse<T = any> {
      records: T[]
      current: number
      size: number
      total: number
    }

    /** PrintEase 分页参数（后端使用 page/limit） */
    interface PageParams {
      page: number
      limit: number
    }

    /** PrintEase 分页响应 */
    interface PageResponse<T = any> {
      list: T[]
      total: number
      page: number
      limit: number
      totalPages: number
    }

    /** 启用状态 */
    type EnableStatus = '1' | '2'
  }

  /** 认证类型 */
  namespace Auth {
    interface LoginParams {
      userName: string
      password: string
    }

    interface LoginResponse {
      token: string
      refreshToken: string
    }

    interface UserInfo {
      buttons: string[]
      roles: string[]
      userId: number
      userName: string
      email: string
      avatar?: string
    }

    /** PrintEase 管理员信息（登录响应中返回） */
    interface AdminInfo {
      id: number
      username: string
      realName: string
      role: number
    }
  }

  /** 系统管理类型（框架内置，保留兼容） */
  namespace SystemManage {
    type UserList = Api.Common.PaginatedResponse<UserListItem>

    interface UserListItem {
      id: number
      avatar: string
      status: string
      userName: string
      userGender: string
      nickName: string
      userPhone: string
      userEmail: string
      userRoles: string[]
      createBy: string
      createTime: string
      updateBy: string
      updateTime: string
    }

    type UserSearchParams = Partial<
      Pick<UserListItem, 'id' | 'userName' | 'userGender' | 'userPhone' | 'userEmail' | 'status'> &
        Api.Common.CommonSearchParams
    >

    type RoleList = Api.Common.PaginatedResponse<RoleListItem>

    interface RoleListItem {
      roleId: number
      roleName: string
      roleCode: string
      description: string
      enabled: boolean
      createTime: string
    }

    type RoleSearchParams = Partial<
      Pick<RoleListItem, 'roleId' | 'roleName' | 'roleCode' | 'description' | 'enabled'> &
        Api.Common.CommonSearchParams & {
          startTime: string | null
          endTime: string | null
        }
    >
  }

  /** ==================== PrintEase 业务类型 ==================== */

  namespace PrintEase {
    // ---- 仪表盘 ----
    interface DashboardStats {
      todayOrders: number
      todayRevenue: number
      activeNodes: number
      printingTasks: number
      orderGrowth: number
      revenueGrowth: number
      nodeGrowth: number
      taskGrowth: number
    }

    interface HotMerchant {
      merchantId: number
      merchantName: string
      orderCount: number
      revenue: number
    }

    interface IncomeTrendItem {
      date: string
      revenue: number
      orderCount: number
    }

    // ---- 订单 ----
    interface OrderSearchParams extends Partial<Api.Common.PageParams> {
      status?: number
      userId?: number
      merchantId?: number
    }

    interface OrderListItem {
      id: number
      totalPages: number
      copies: number
      paperSize: string
      colorType: number
      doubleSided: number
      printQuality: string
      totalAmount: number
      status: number
      remark: string
      mpayTradeNo: string
      mpayPayUrl: string
      mpayRealPrice: number
      createdAt: string
      deliveryBuildingName: string
      deliveryBuildingId: number
      merchantId: number
      fileCount: number
      fileName: string
    }

    interface OrderListResponse extends Api.Common.PageResponse<OrderListItem> {
      stats: {
        all: number
        pending: number
        assigned: number
        printed: number
        completed: number
      }
    }

    interface OrderFileItem {
      id: number
      fileId: number
      fileName?: string
      pages: number
      copies: number
      paperSize: string | null
      colorType: number | null
      doubleSided: number | null
      printQuality: string | null
      pageRange: string | null
      filePath: string
      convertedPdfPath: string
      file?: {
        id: number
        fileName: string
        filePath: string
        convertedPdfPath: string
      }
    }

    interface OrderDetail extends OrderListItem {
      user: {
        phone: string | null
        nickname: string | null
        avatar: string | null
      }
      merchant: {
        name: string
        phone: string
        address: string
      } | null
      deliveryBuildingId: number | null
      deliveryBuildingName: string | null
      deliveryTimeSlotId: number | null
      deliveryTimeSlotName: string | null
      deliveryImageUrl: string | null
      files: OrderFileItem[]
    }

    interface OrderStatusUpdateParams {
      status: number
    }

    interface OrderBatchParams {
      orderIds: string[]
      data: Record<string, any>
    }

    interface OrderStatsParams {
      startDate?: string
      endDate?: string
    }

    // ---- 商户 ----
    interface MerchantListItem {
      id: number
      name: string
      phone: string
      address: string | null
      buildingIds: string | null
      apiKey: string
      status: number
      openid?: string | null
      createdAt: string
    }

    type MerchantListResponse = Api.Common.PageResponse<MerchantListItem>

    interface MerchantCreateParams {
      name: string
      phone: string
      password: string
      address?: string
      buildingIds?: string
    }

    interface MerchantUpdateParams {
      name?: string
      phone?: string
      password?: string
      address?: string
      buildingIds?: string
      status?: number
    }

    interface MerchantSearchParams extends Partial<Api.Common.PageParams> {
      name?: string
      phone?: string
      status?: number
    }

    // ---- 用户 ----
    interface PEUserListItem {
      id: number
      openid: string
      nickname: string | null
      avatar: string | null
      phone: string | null
      isActive: boolean
      createdAt: string
    }

    type PEUserListResponse = Api.Common.PageResponse<PEUserListItem>

    interface PEUserSearchParams extends Partial<Api.Common.PageParams> {
      phone?: string
      nickname?: string
    }

    // ---- 文件 ----
    interface FileListItem {
      id: number
      fileName: string
      fileSize: number
      fileType: string
      filePath: string
      convertedPdfPath: string | null
      conversionStatus: string
      totalPages: number | null
      createdAt: string
    }

    type FileListResponse = Api.Common.PageResponse<FileListItem>

    interface FileUploadResponse {
      id: number
      fileName: string
      fileSize: number
      fileType: string
      filePath: string
      convertedPdfPath: string
    }

    // ---- 价格配置 ----
    interface PriceConfig {
      blackWhiteSingleSidedPrice: number
      blackWhiteDoubleSidedPrice: number
      colorSingleSidedPrice: number
      colorDoubleSidedPrice: number
      minPrice: number
    }

    // ---- 公告 ----
    interface Notice {
      title: string
      content: string
      wechatNumber: string
      imageUrl: string
      isActive: boolean
    }

    interface DailyPopupNotice {
      title: string
      content: string
      imageUrl: string
      wechatNumber: string
      enabled: boolean
      frequency: 'daily'
      version: string
      updatedAt?: string | null
    }

    // ---- 功能开关 ----
    interface FeatureConfigs {
      adminEntryEnabled: boolean
      merchantEntryEnabled: boolean
      paymentEnabled: boolean
      alipayEnabled: boolean
    }

    // ---- 管理员 ----
    interface AdminListItem {
      id: number
      username: string
      realName: string
      role: number
      createdAt: string
      updatedAt: string
    }

    type AdminSearchParams = Partial<Api.Common.PageParams>

    interface AdminCreateParams {
      username: string
      password: string
      realName?: string
      role?: number
    }

    // ---- 配送配置 ----
    interface DeliveryBuilding {
      id: number
      name: string
    }

    interface TimeSlot {
      id: number
      name: string
      startTime: string
      endTime: string
    }

    interface PrintOption {
      paperSizes: string[]
      colorTypes: { value: number; label: string }[]
      doubleSidedOptions: { value: number; label: string }[]
      printQualities: { value: string; label: string }[]
    }

    // ---- 调度 ----
    interface DispatchNode {
      id: number
      nodeName: string
      nodeKey: string
      status: number
      osType: string | null
      arch: string | null
      ipAddress: string | null
      lastHeartbeat: string | null
      createdAt: string
    }

    interface PrintTaskItem {
      id: string
      orderId: string
      nodeId: number | null
      merchantId: number | null
      fileId: number
      status: number
      errorMsg: string | null
      startedAt: string | null
      completedAt: string | null
      createdAt: string
    }

    interface TaskSearchParams extends Partial<Api.Common.PageParams> {
      status?: number
      orderId?: string
    }

    // ---- 收入 ----
    interface IncomeOverview {
      totalRevenue: number
      todayRevenue: number
      weekRevenue: number
      monthRevenue: number
      orderCount: number
      merchantCount: number
      userCount: number
      growthRate: number
    }

    interface MerchantIncomeItem {
      merchantId: number
      merchantName: string
      totalOrders: number
      totalRevenue: number
      platformFee: number
      merchantIncome: number
      settlementStatus: string
      rank: number
    }

    interface IncomeHistoryItem {
      id: number
      transactionNo: string
      type: string
      amount: number
      balanceBefore: number
      balanceAfter: number
      relatedId: number
      relatedNo: string
      description: string
      createTime: string
    }

    interface IncomeSearchParams extends Partial<Api.Common.PageParams> {
      startDate?: string
      endDate?: string
      type?: string
    }
  }
}
