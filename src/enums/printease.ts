/**
 * PrintEase 业务枚举定义
 *
 * 从后端 src/common/enums/index.ts 同步，前端需建立对应的常量定义
 *
 * @module enums/printease
 */

/** 订单状态 */
export enum OrderStatus {
  PENDING_PAYMENT = 0,
  PENDING_PRINT = 1,
  PRINTING = 2,
  PRINTED = 3,
  COMPLETED = 4,
  CANCELLED = 5,
  FAILED = 6
}

export const OrderStatusLabel: Record<number, string> = {
  [OrderStatus.PENDING_PAYMENT]: '待支付',
  [OrderStatus.PENDING_PRINT]: '待打印',
  [OrderStatus.PRINTING]: '打印中',
  [OrderStatus.PRINTED]: '已打印',
  [OrderStatus.COMPLETED]: '已完成',
  [OrderStatus.CANCELLED]: '已取消',
  [OrderStatus.FAILED]: '失败'
}

export const OrderStatusColor: Record<
  number,
  'primary' | 'success' | 'warning' | 'info' | 'danger'
> = {
  [OrderStatus.PENDING_PAYMENT]: 'warning',
  [OrderStatus.PENDING_PRINT]: 'info',
  [OrderStatus.PRINTING]: 'primary',
  [OrderStatus.PRINTED]: 'success',
  [OrderStatus.COMPLETED]: 'success',
  [OrderStatus.CANCELLED]: 'danger',
  [OrderStatus.FAILED]: 'danger'
}

/** 打印任务状态 */
export enum PrintTaskStatus {
  PENDING_ASSIGN = 0,
  ASSIGNED = 1,
  ACCEPTED = 2,
  PRINTING = 3,
  COMPLETED = 4,
  FAILED = 5,
  CANCELLED = 6
}

/** 节点状态 */
export enum NodeStatus {
  OFFLINE = 0,
  ONLINE = 1
}

/** 颜色类型 */
export enum ColorType {
  BLACK_WHITE = 0,
  COLOR = 1
}

/** 双面打印 */
export enum DoubleSided {
  SINGLE = 0,
  LONG_EDGE = 1,
  SHORT_EDGE = 2
}

/** 打印质量 */
export enum PrintQuality {
  DRAFT = 'draft',
  NORMAL = 'normal',
  HIGH = 'high'
}

/** 管理员角色 */
export enum AdminRole {
  SUPER_ADMIN = 0,
  ADMIN = 1
}

/** 文件转换状态 */
export enum ConversionStatus {
  PENDING = 'pending',
  CONVERTING = 'converting',
  COMPLETED = 'completed',
  FAILED = 'failed'
}

/** 商户状态 */
export enum MerchantStatus {
  DISABLED = 0,
  ACTIVE = 1
}

/** 通用启用/禁用状态 */
export enum EnableStatus {
  DISABLED = 0,
  ENABLED = 1
}
