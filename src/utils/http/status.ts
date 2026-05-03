/**
 * 状态码定义
 *
 * BusinessCode: PrintEase 后端业务状态码 (response.data.code)
 * HttpStatus: HTTP 协议层状态码 (用于 Axios 错误处理)
 */

/** PrintEase 后端业务状态码 */
export enum BusinessCode {
  SUCCESS = 0,
  ERROR = 1,
  SYSTEM_ERROR = 500
}

/** HTTP 协议层状态码 */
export enum HttpStatus {
  SUCCESS = 200,
  ERROR = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  REQUEST_TIMEOUT = 408,
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
  HTTP_VERSION_NOT_SUPPORTED = 505
}

/** @deprecated 使用 BusinessCode 替代业务码校验，使用 HttpStatus 替代 HTTP 层状态码 */
export const ApiStatus = {
  success: BusinessCode.SUCCESS,
  error: HttpStatus.ERROR,
  unauthorized: HttpStatus.UNAUTHORIZED,
  forbidden: HttpStatus.FORBIDDEN,
  notFound: HttpStatus.NOT_FOUND,
  methodNotAllowed: HttpStatus.METHOD_NOT_ALLOWED,
  requestTimeout: HttpStatus.REQUEST_TIMEOUT,
  internalServerError: HttpStatus.INTERNAL_SERVER_ERROR,
  notImplemented: HttpStatus.NOT_IMPLEMENTED,
  badGateway: HttpStatus.BAD_GATEWAY,
  serviceUnavailable: HttpStatus.SERVICE_UNAVAILABLE,
  gatewayTimeout: HttpStatus.GATEWAY_TIMEOUT,
  httpVersionNotSupported: HttpStatus.HTTP_VERSION_NOT_SUPPORTED
}
