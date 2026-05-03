import { AppRouteRecord } from '@/types/router'
import { dashboardRoutes } from './dashboard'
import { systemRoutes } from './system'
import { resultRoutes } from './result'
import { exceptionRoutes } from './exception'
import { printeaseRoutes } from './printease'

export const routeModules: AppRouteRecord[] = [
  dashboardRoutes,
  systemRoutes,
  resultRoutes,
  exceptionRoutes,
  ...printeaseRoutes
]
