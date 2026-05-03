/**
 * PrintEase 印易自助打印管理路由模块
 *
 * 管理后台核心业务路由：仪表盘、订单、商户、用户、系统、收入、调度
 */
import { RoutesAlias } from '../routesAlias'

export const printeaseRoutes = [
  {
    path: '/printease',
    redirect: '/printease/dashboard',
    component: RoutesAlias.Layout,
    meta: {
      icon: 'pe:home',
      title: '工作台',
      order: 1
    },
    children: [
      {
        path: 'dashboard',
        component: '/pe/dashboard',
        meta: {
          icon: 'pe:dashboard',
          title: '仪表盘',
          order: 10
        }
      },
      {
        path: 'order',
        component: '/pe/order',
        meta: {
          icon: 'pe:order',
          title: '订单管理',
          order: 20
        },
        children: [
          {
            path: '',
            component: '/pe/order/list',
            meta: {
              icon: 'pe:order-list',
              title: '订单列表',
              order: 21
            }
          },
          {
            path: 'detail/:id',
            component: '/pe/order/detail',
            meta: {
              icon: 'pe:order-detail',
              title: '订单详情',
              hidden: true,
              order: 22
            }
          }
        ]
      },
      {
        path: 'merchant',
        component: '/pe/merchant',
        meta: {
          icon: 'pe:merchant',
          title: '商户管理',
          order: 30
        }
      },
      {
        path: 'dispatch',
        component: '/pe/dispatch',
        meta: {
          icon: 'pe:dispatch',
          title: '云印调度',
          order: 40
        }
      },
      {
        path: 'user',
        component: '/pe/user',
        meta: {
          icon: 'pe:user',
          title: '用户管理',
          order: 50
        }
      },
      {
        path: 'system',
        component: '/pe/system',
        meta: {
          icon: 'pe:system',
          title: '系统设置',
          order: 60
        }
      },
      {
        path: 'income',
        component: '/pe/income',
        meta: {
          icon: 'pe:income',
          title: '收入管理',
          order: 70
        }
      }
    ]
  }
]
