# PrintEase Admin 印易自助 - 管理后台

印易自助打印管理后台，为系统管理员提供完整的运营管理功能，基于 Art Design Pro 企业级前端框架进行定制化开发。

## 项目状态

**开发中** - 基于 Art Design Pro 框架进行业务定制，添加印易自助打印管理相关功能模块。

## 技术栈

### 核心框架

- **前端框架**: Vue 3.5+ (Composition API)
- **UI 组件库**: Element Plus 2.11+
- **开发语言**: TypeScript 5.6+
- **构建工具**: Vite 7.1+
- **路由管理**: Vue Router 4.5+
- **状态管理**: Pinia 3.0+ (支持持久化)
- **HTTP 客户端**: Axios 1.12+
- **样式框架**: TailwindCSS 4.1+

### 功能插件

- **图表库**: ECharts 6.0+
- **国际化**: Vue I18n 9.14+
- **富文本编辑器**: WangEditor 5.1+
- **视频播放器**: xgplayer 3.0+
- **Excel 导出**: xlsx 0.18+
- **二维码生成**: qrcode.vue 3.6+
- **拖拽排序**: vue-draggable-plus 0.6+
- **图片裁剪**: vue-img-cutter 3.0+
- **工具库**: VueUse 13.9+

### 开发工具

- **代码规范**: ESLint 9.9+、Prettier 3.5+、Stylelint 16.20+
- **Git 提交**: Husky 9.1+、commitlint 19.4+、cz-git 1.11+
- **包管理器**: pnpm 8.8+
- **Node 版本**: >= 20.19.0

## 功能特性

### 1. 仪表盘 (Dashboard)

- 今日订单数统计
- 打印任务统计
- 收入统计
- 实时数据展示
- 数据趋势图表

### 2. 订单管理

- 订单列表查看（支持分页、筛选、搜索）
- 订单详情查询
- 订单状态管理
- 订单数据导出
- 订单退款处理

### 3. 云印调度管理

- 节点列表管理
- 节点状态监控
- 打印任务队列查看
- 任务分配管理
- 节点上下线记录

### 4. 用户管理

- 用户列表查看
- 用户详情查询
- 用户状态管理
- 用户数据统计

### 5. 商户管理

- 商户列表查看
- 创建/编辑商户
- 商户状态管理
- 商户收益统计
- 商户权限配置

### 6. 系统设置

- 打印价格配置
- 打印参数配置
- 管理员账号管理
- 系统参数配置
- 公告管理

### 7. 收入管理

- 总收入统计
- 收入趋势图表
- 商户收入明细
- 收入数据导出
- 收入历史记录
- 商户收入排名

### 8. 框架内置功能

- 多种主题切换（亮色/暗色/跟随系统）
- 多种菜单布局（垂直/水平/混合/双列）
- 标签页工作台
- 全局搜索
- 屏幕锁定
- 国际化（中文/英文）
- 动态路由权限
- 丰富的业务组件库

## 项目结构

```
PrintEase-admin/
├── .husky/                          # Git hooks 配置
├── .vscode/                         # VSCode 配置
├── public/                          # 静态资源
│   └── favicon.ico
├── scripts/                         # 构建脚本
│   └── clean-dev.ts
├── src/
│   ├── api/                         # API 接口模块
│   │   ├── auth.ts                  # 认证相关接口
│   │   └── system-manage.ts         # 系统管理接口
│   ├── assets/                      # 静态资源
│   │   ├── images/                  # 图片资源
│   │   │   ├── 3d/                  # 3D 图标
│   │   │   ├── avatar/              # 头像
│   │   │   ├── ceremony/            # 节日素材
│   │   │   ├── common/              # 通用图片
│   │   │   ├── cover/               # 封面图
│   │   │   ├── draw/                # 绘画素材
│   │   │   ├── lock/                # 锁屏背景
│   │   │   ├── login/               # 登录页素材
│   │   │   ├── safeguard/           # 安全相关
│   │   │   ├── settings/            # 设置相关
│   │   │   ├── svg/                 # SVG 图标
│   │   │   └── user/                # 用户相关
│   │   ├── styles/                  # 样式文件
│   │   │   ├── core/                # 核心样式
│   │   │   │   ├── app.scss         # 应用主样式
│   │   │   │   ├── dark.scss        # 暗色主题
│   │   │   │   ├── el-dark.scss     # Element Plus 暗色主题
│   │   │   │   ├── el-light.scss    # Element Plus 亮色主题
│   │   │   │   ├── el-ui.scss       # Element Plus 自定义样式
│   │   │   │   ├── md.scss          # Markdown 样式
│   │   │   │   ├── mixin.scss       # 样式混入
│   │   │   │   ├── reset.scss       # 样式重置
│   │   │   │   ├── router-transition.scss # 路由过渡动画
│   │   │   │   ├── tailwind.css     # TailwindCSS 样式
│   │   │   │   ├── theme-animation.scss   # 主题切换动画
│   │   │   │   └── theme-change.scss      # 主题变更样式
│   │   │   └── custom/              # 自定义样式
│   │   └── svg/                     # SVG 资源
│   ├── components/                  # 组件库
│   │   ├── business/                # 业务组件
│   │   │   └── comment-widget/      # 评论组件
│   │   └── core/                    # 核心组件
│   │       ├── banners/             # 横幅组件
│   │       ├── base/                # 基础组件
│   │       ├── cards/               # 卡片组件
│   │       ├── charts/              # 图表组件
│   │       ├── forms/               # 表单组件
│   │       ├── layouts/             # 布局组件
│   │       │   ├── art-breadcrumb/       # 面包屑
│   │       │   ├── art-header-bar/       # 顶部导航栏
│   │       │   ├── art-menus/            # 菜单组件
│   │       │   ├── art-page-content/     # 页面内容容器
│   │       │   ├── art-settings-panel/   # 设置面板
│   │       │   └── art-work-tab/         # 工作台标签页
│   │       ├── media/               # 媒体组件
│   │       ├── others/              # 其他组件
│   │       ├── tables/              # 表格组件
│   │       ├── text-effect/         # 文本特效组件
│   │       ├── theme/               # 主题组件
│   │       ├── views/               # 视图组件
│   │       └── widget/              # 小部件组件
│   ├── config/                      # 配置文件
│   │   ├── assets/                  # 资源配置
│   │   ├── modules/                 # 模块配置
│   │   ├── index.ts                 # 配置入口
│   │   └── setting.ts               # 设置配置
│   ├── directives/                  # 自定义指令
│   │   ├── business/                # 业务指令
│   │   └── core/                    # 核心指令
│   ├── enums/                       # 枚举定义
│   │   ├── appEnum.ts               # 应用枚举
│   │   └── formEnum.ts              # 表单枚举
│   ├── hooks/                       # 组合式函数
│   │   ├── core/                    # 核心 hooks
│   │   │   ├── useAppMode.ts        # 应用模式
│   │   │   ├── useAuth.ts           # 认证
│   │   │   ├── useChart.ts          # 图表
│   │   │   ├── useCommon.ts         # 通用
│   │   │   ├── useLayoutHeight.ts   # 布局高度
│   │   │   ├── useTable.ts          # 表格
│   │   │   └── useTheme.ts          # 主题
│   │   └── index.ts
│   ├── locales/                     # 国际化
│   │   ├── langs/                   # 语言文件
│   │   │   ├── en.json              # 英文
│   │   │   └── zh.json              # 中文
│   │   └── index.ts
│   ├── mock/                        # Mock 数据
│   │   ├── json/                    # JSON 数据
│   │   ├── temp/                    # 临时数据
│   │   └── upgrade/                 # 升级数据
│   ├── plugins/                     # 插件
│   │   ├── echarts.ts               # ECharts 插件
│   │   └── index.ts
│   ├── router/                      # 路由配置
│   │   ├── core/                    # 核心路由模块
│   │   │   ├── ComponentLoader.ts   # 组件加载器
│   │   │   ├── MenuProcessor.ts     # 菜单处理器
│   │   │   ├── RoutePermissionValidator.ts # 路由权限验证
│   │   │   └── RouteRegistry.ts     # 路由注册器
│   │   ├── guards/                  # 路由守卫
│   │   │   ├── beforeEach.ts        # 前置守卫
│   │   │   └── afterEach.ts         # 后置守卫
│   │   ├── modules/                 # 路由模块
│   │   │   ├── article.ts           # 文章模块路由
│   │   │   ├── dashboard.ts         # 仪表盘路由
│   │   │   ├── examples.ts          # 示例路由
│   │   │   ├── exception.ts         # 异常路由
│   │   │   ├── help.ts              # 帮助路由
│   │   │   ├── index.ts             # 路由模块入口
│   │   │   ├── result.ts            # 结果路由
│   │   │   ├── safeguard.ts         # 安全路由
│   │   │   ├── system.ts            # 系统管理路由
│   │   │   ├── template.ts          # 模板路由
│   │   │   └── widgets.ts           # 小部件路由
│   │   ├── routes/                  # 路由定义
│   │   │   ├── asyncRoutes.ts       # 异步路由
│   │   │   └── staticRoutes.ts      # 静态路由
│   │   ├── index.ts                 # 路由入口
│   │   └── routesAlias.ts           # 路由别名
│   ├── store/                       # 状态管理
│   │   ├── modules/                 # 状态模块
│   │   │   ├── menu.ts              # 菜单状态
│   │   │   ├── setting.ts           # 设置状态
│   │   │   ├── table.ts             # 表格状态
│   │   │   ├── user.ts              # 用户状态
│   │   │   └── worktab.ts           # 工作台状态
│   │   └── index.ts
│   ├── types/                       # TypeScript 类型定义
│   │   ├── api/                     # API 类型
│   │   ├── common/                  # 通用类型
│   │   ├── component/               # 组件类型
│   │   ├── config/                  # 配置类型
│   │   ├── directive/               # 指令类型
│   │   ├── router/                  # 路由类型
│   │   ├── store/                   # 状态类型
│   │   └── index.ts
│   ├── utils/                       # 工具函数
│   │   ├── constants/               # 常量
│   │   ├── form/                    # 表单工具
│   │   ├── http/                    # HTTP 请求
│   │   │   ├── index.ts             # HTTP 入口
│   │   │   ├── error.ts             # 错误处理
│   │   │   └── status.ts            # 状态码
│   │   ├── navigation/              # 导航工具
│   │   ├── socket/                  # Socket 工具
│   │   ├── storage/                 # 存储工具
│   │   ├── sys/                     # 系统工具
│   │   ├── table/                   # 表格工具
│   │   ├── ui/                      # UI 工具
│   │   ├── index.ts
│   │   └── router.ts
│   ├── views/                       # 页面视图
│   │   ├── article/                 # 文章模块
│   │   ├── auth/                    # 认证模块
│   │   │   ├── forget-password/     # 忘记密码
│   │   │   ├── login/               # 登录
│   │   │   └── register/            # 注册
│   │   ├── change/                  # 变更记录
│   │   ├── dashboard/               # 仪表盘
│   │   │   ├── analysis/            # 分析页
│   │   │   ├── console/             # 工作台
│   │   │   └── ecommerce/           # 电商页
│   │   ├── examples/                # 示例页
│   │   ├── exception/               # 异常页
│   │   ├── index/                   # 首页
│   │   ├── outside/                 # 外部页面
│   │   ├── result/                  # 结果页
│   │   ├── safeguard/               # 安全页
│   │   ├── system/                  # 系统管理
│   │   │   ├── menu/                # 菜单管理
│   │   │   ├── nested/              # 嵌套菜单
│   │   │   ├── role/                # 角色管理
│   │   │   ├── user/                # 用户管理
│   │   │   └── user-center/         # 用户中心
│   │   ├── template/                # 模板页
│   │   └── widgets/                 # 小部件页
│   ├── App.vue                      # 根组件
│   ├── env.d.ts                     # 环境类型声明
│   └── main.ts                      # 应用入口
├── .env                             # 环境变量（通用）
├── .env.development                 # 开发环境变量
├── .env.production                  # 生产环境变量
├── .eslintrc.mjs                    # ESLint 配置
├── .gitignore                       # Git 忽略配置
├── .prettierrc                      # Prettier 配置
├── .stylelintrc.cjs                 # Stylelint 配置
├── CHANGELOG.md                     # 更新日志
├── CHANGELOG.zh-CN.md               # 更新日志（中文）
├── DAD.md                           # 本文档
├── LICENSE                          # 许可证
├── README.md                        # 项目说明
├── README.zh-CN.md                  # 项目说明（中文）
├── commitlint.config.cjs            # commitlint 配置
├── index.html                       # HTML 入口
├── package.json                     # 项目配置
├── pnpm-lock.yaml                   # pnpm 锁定文件
├── tsconfig.json                    # TypeScript 配置
└── vite.config.ts                   # Vite 配置
```

## 快速开始

### 环境要求

- **Node.js**: >= 20.19.0
- **pnpm**: >= 8.8.0

### 安装依赖

```bash
cd PrintEase-admin
pnpm install
```

### 开发环境运行

```bash
pnpm dev
```

访问地址: <http://localhost:5173>

### 生产环境构建

```bash
pnpm build
```

### 预览构建结果

```bash
pnpm serve
```

### 代码检查

```bash
# ESLint 检查
pnpm lint

# ESLint 自动修复
pnpm fix

# Prettier 格式化
pnpm lint:prettier

# Stylelint 检查
pnpm lint:stylelint
```

### Git 提交

```bash
pnpm commit
```

## 环境变量配置

### 开发环境 (.env.development)

```env
# 应用部署基础路径（如部署在子目录 /admin，则设置为 /admin/）
VITE_BASE_URL = /

# API 请求基础路径（开发环境设置为 / 使用代理，生产环境设置为完整后端地址）
VITE_API_URL = /

# 代理目标地址（开发环境通过 Vite 代理转发请求到此地址，解决跨域问题）
VITE_API_PROXY_URL = https://api.fantangck.top:3000

# 是否删除 console
VITE_DROP_CONSOLE = false
```

### 生产环境 (.env.production)

```env
# 应用部署基础路径（如部署在子目录 /admin，则设置为 /admin/）
VITE_BASE_URL = /

# API 地址前缀（生产环境使用真实后端地址）
VITE_API_URL = https://api.fantangck.top:3000

# 是否删除 console
VITE_DROP_CONSOLE = true
```

## 构建配置

### Vite 配置 (vite.config.ts)

主要配置项：

1. **路径别名**：配置了 `@`、`@views`、`@imgs` 等别名，方便模块导入
2. **代理配置**：开发环境通过代理转发 `/api` 请求，解决跨域问题
3. **自动导入**：使用 unplugin-auto-import 和 unplugin-vue-components 自动导入 Vue API 和 Element Plus 组件
4. **压缩优化**：生产环境使用 gzip 压缩，移除 console 和 debugger
5. **依赖预构建**：优化开发体验，提升首次加载速度

### TypeScript 配置 (tsconfig.json)

- 启用严格模式 (`strict: true`)
- 配置路径别名映射
- 包含类型声明文件

***

## 枚举定义

> 以下枚举定义来自后端 `src/common/enums/index.ts`，前端应建立对应的 TypeScript 枚举/常量。

### 订单状态 (OrderStatus)

| 数值  | 枚举标识              | 含义             | 前端 UI 标签色 |
| --- | ----------------- | -------------- | --------- |
| `0` | `PENDING_PAYMENT` | 待支付            | `warning` |
| `1` | `PENDING_PRINT`   | 待打印（已支付，未分配商户） | `info`    |
| `2` | `PRINTING`        | 打印中（商户正在打印）    | `primary` |
| `3` | `PRINTED`         | 已打印完成（等待派送）    | `success` |
| `4` | `COMPLETED`       | 已完成（已派送/已取件）   | `success` |
| `5` | `CANCELLED`       | 已取消            | `danger`  |
| `6` | `FAILED`          | 失败（支付异常/打印异常）  | `danger`  |

> 注意：状态 `1` 按是否分配商户可分为：
>
> - `status === 1 && !merchantId` → 待分配（显示"待接单"）
> - `status === 1 && merchantId` → 已分配（显示"商户处理中"）

### 打印任务状态 (PrintTaskStatus)

| 数值  | 枚举标识             | 含义     |
| --- | ---------------- | ------ |
| `0` | `PENDING_ASSIGN` | 等待分配节点 |
| `1` | `ASSIGNED`       | 已分配节点  |
| `2` | `ACCEPTED`       | 节点已接受  |
| `3` | `PRINTING`       | 打印执行中  |
| `4` | `COMPLETED`      | 打印完成   |
| `5` | `FAILED`         | 打印失败   |
| `6` | `CANCELLED`      | 已取消    |

### 节点状态 (NodeStatus)

| 数值  | 枚举标识      | 含义 |
| --- | --------- | -- |
| `0` | `OFFLINE` | 离线 |
| `1` | `ONLINE`  | 在线 |

### 颜色类型 (ColorType)

| 数值  | 枚举标识          | 含义   |
| --- | ------------- | ---- |
| `0` | `BLACK_WHITE` | 黑白打印 |
| `1` | `COLOR`       | 彩色打印 |

### 双面打印 (DoubleSided)

| 数值  | 枚举标识         | 含义     |
| --- | ------------ | ------ |
| `0` | `SINGLE`     | 单面打印   |
| `1` | `LONG_EDGE`  | 双面长边翻页 |
| `2` | `SHORT_EDGE` | 双面短边翻页 |

### 打印质量 (PrintQuality)

| 值        | 枚举标识     | 含义   |
| -------- | -------- | ---- |
| `draft`  | `DRAFT`  | 草稿模式 |
| `normal` | `NORMAL` | 标准模式 |
| `high`   | `HIGH`   | 高清模式 |

### 管理员角色 (AdminRole)

| 数值  | 枚举标识          | 含义    | 可访问范围       |
| --- | ------------- | ----- | ----------- |
| `0` | `SUPER_ADMIN` | 超级管理员 | 全部功能，含系统配置  |
| `1` | `ADMIN`       | 普通管理员 | 业务管理，不含系统配置 |

### 文件转换状态 (ConversionStatus)

| 值            | 枚举标识         | 含义   |
| ------------ | ------------ | ---- |
| `pending`    | `PENDING`    | 等待转换 |
| `converting` | `CONVERTING` | 转换中  |
| `completed`  | `COMPLETED`  | 转换完成 |
| `failed`     | `FAILED`     | 转换失败 |

***

## API 接口

> 后端 API 已完成开发并通过功能测试。以下文档基于实际后端代码（NestJS 11）生成，涵盖全部 9 个控制器模块的接口端点。

### 后端服务架构

| 服务                 | 路径                    | 框架        | 职责                         |
| ------------------ | --------------------- | --------- | -------------------------- |
| PrintEase-backend  | `PrintEase-backend/`  | NestJS 11 | 核心业务：认证、用户、订单、文件、系统配置、微信消息 |
| PrintEase-dispatch | `PrintEase-dispatch/` | Python    | 云印调度：商户接单、打印任务、节点管理        |
| mpay               | `mpay/`               | PHP       | 支付系统：支付创建、回调、订单状态同步        |

***

### 1. 基础配置

| 配置项        | 值                | 说明                                            |
| ---------- | ---------------- | --------------------------------------------- |
| 全局路径前缀     | `/api`           | NestJS `setGlobalPrefix('api')`               |
| 认证方式       | JWT Bearer Token | `Authorization: Bearer <token>`               |
| 请求超时       | 15 秒             | Axios 配置                                      |
| CORS       | `origin: '*'`    | 允许所有来源跨域                                      |
| Swagger 文档 | `/api/docs`      | 仅本地 localhost 可访问                             |
| 文件上传限制     | 200MB            | `multer` + `express.json({ limit: '200mb' })` |

***

### 2. 统一响应格式

所有接口返回统一的 JSON 结构：

```json
{
  "code": 0,
  "message": "success",
  "data": { ... }
}
```

**响应包装机制**：后端使用 `TransformInterceptor`（`src/common/interceptors/transform.interceptor.ts`）自动将 Controller 返回的数据包装为上述格式。如果 Controller 已返回包含 `code`/`message`/`data` 字段的对象，则跳过重复包装。

**字段说明：**

| 字段        | 类型             | 说明                               |
| --------- | -------------- | -------------------------------- |
| `code`    | `number`       | `0` = 成功；`1` = 业务错误；`500` = 系统错误 |
| `message` | `string`       | 人类可读的响应消息                        |
| `data`    | `any` / `null` | 响应数据体，错误时为 `null`                |

**HTTP 状态码与业务 code 对应关系：**

| HTTP | code | 触发场景                    | 前端处理策略         |
| ---- | ---- | ----------------------- | -------------- |
| 200  | `0`  | 正常响应（含空数据）              | 正常展示           |
| 201  | `0`  | 资源创建成功                  | 提示创建成功         |
| 400  | -    | 参数校验失败 (ValidationPipe) | 展示字段级错误信息      |
| 401  | -    | Token 无效/过期/缺失 + 角色不匹配  | 自动跳转登录页        |
| 403  | -    | 权限不足 / 功能开关关闭           | 提示"当前功能已关闭"    |
| 404  | `1`  | 资源不存在                   | 跳转 404 页或提示    |
| 500  | -    | 服务器内部错误 / 微信配置未完善       | 提示"系统异常，请稍后重试" |

***

### 3. 错误处理规范

#### 3.1 后端错误处理层次

```
NestJS 异常过滤器 (全局)
  ├── HttpException (400/401/403/404/500)
  │     ├── ValidationPipe → 400 (参数校验失败)
  │     ├── UnauthorizedException → 401 (认证/鉴权失败)
  │     ├── ForbiddenException → 403 (权限不足/功能关闭)
  │     ├── NotFoundException → 404 (资源不存在)
  │     └── InternalServerErrorException → 500
  ├── TransformInterceptor (成功响应自动包装)
  └── LoggingInterceptor (全局日志记录)
```

#### 3.2 前端 Axios 错误拦截流程

```
响应拦截器 (src/utils/http/index.ts)
  │
  ├── HTTP 200 + code === 0 → 展开 data 字段 → 返回给调用方
  ├── HTTP 200 + code !== 0 → ElMessage.error 弹窗 → reject
  ├── HTTP 400 → 解析 ValidationPipe 错误 → ElMessage.error 各字段
  ├── HTTP 401 → 防抖登出（300ms 去重）→ 清除 Token → 跳转登录
  ├── HTTP 403 → ElMessage.warning（功能未开启/无权限）
  ├── HTTP 404 → ElMessage.error（资源不存在）
  └── HTTP 500 → ElMessage.error（系统异常，稍后重试）
```

#### 3.3 常见业务错误码

| 场景        | HTTP | message  | 前端展示位置               |
| --------- | ---- | -------- | -------------------- |
| 登录密码错误    | 401  | 密码错误     | ElMessage.error 顶部弹窗 |
| 商户被禁用     | 401  | 商户已被禁用   | ElMessage.error      |
| 功能开关关闭    | 403  | 管理员功能未开启 | ElMessage.warning    |
| 订单不存在     | 404  | —        | ElMessage.error      |
| 文件未转换 PDF | 404  | —        | "PDF 暂未生成" 提示        |
| 微信配置缺失    | 500  | —        | "微信服务暂不可用" 提示        |

#### 3.4 前端错误处理开发建议

```typescript
// 推荐使用 try-catch 包裹每次 API 调用
try {
  const result = await request.get('/api/orders/admin/list', { params })
  // result 已自动展开 data 字段
  orderList.value = result.list
} catch (error: any) {
  // Axios 拦截器已自动弹窗展示错误消息
  // 此处仅处理降级逻辑，如：清空列表、显示空状态
  orderList.value = []
}

// 需要静默失败时（如轮询刷新），传递自定义配置
try {
  await request.put('/api/orders/refresh', {}, {
    showErrorMessage: false // 静默失败，不弹窗
  })
} catch {
  // 轮询场景可忽略错误
}
```

***

### 4. HTTP 请求封装

项目基于 Axios 封装了统一的 HTTP 请求工具（`src/utils/http/`），核心机制：

```
请求拦截器 → 自动注入 Authorization Header → 发送请求
响应拦截器 → 校验 code === 0 → 展开 data 字段 → 返回数据
           → code !== 0 → ElMessage.error 弹窗
           → HTTP 401 → 防抖登出（300ms 去重）
```

**使用示例**：

```typescript
import request from '@/utils/http'

// GET 请求
const orders = await request.get<Api.PrintEase.OrderListResponse>({
  url: '/api/orders/admin/list',
  params: { page: 1, limit: 10 }
})

// POST 请求
const loginRes = await request.post<{ token: string; admin: any }>({
  url: '/api/auth/admin',
  params: { username: 'admin', password: '123456' }
})
// loginRes 已自动展开 data 字段: { token, admin }

// 带自定义配置的请求
await request.put<void>({
  url: '/api/system/price',
  params: data,
  showSuccessMessage: true
})
```

***

### 5. 认证与授权

#### 5.1 JWT Token 结构

```typescript
interface JwtPayload {
  sub: number      // 用户ID (adminId | userId | merchantId)
  type: 'admin' | 'user' | 'merchant'
  role?: 0 | 1     // AdminRole: 0=SUPER_ADMIN, 1=ADMIN，仅 type=admin 时携带
  openid?: string  // 微信登录场景携带
}
```

```typescript
// 前端 Request 扩展类型
interface RequestWithUser {
  user: {
    userId?: number
    adminId?: number
    merchantId?: number
    openid?: string
    type: 'admin' | 'user' | 'merchant'
    role?: 0 | 1
  }
}
```

#### 5.2 三种用户类型与权限矩阵

| 用户类型 | `type`     | 登录接口                      | 守卫                    | 可访问资源                                                                       |
| ---- | ---------- | ------------------------- | --------------------- | --------------------------------------------------------------------------- |
| 管理员  | `admin`    | `POST /api/auth/admin`    | `JwtAuthGuard` + 类型校验 | 全部：`/api/admin/*`、`/api/orders/admin/*`、`/api/user/admin/*`、`/api/system/*` |
| 商户   | `merchant` | `POST /api/auth/merchant` | `JwtAuthGuard` + 类型校验 | 自己的商户信息、分配给自己的订单、商户调度接口                                                     |
| 用户   | `user`     | `POST /api/auth/wechat`   | `JwtAuthGuard` + 类型校验 | 自己的用户信息、自己的订单、自己的文件                                                         |

#### 5.3 鉴权机制

**四种认证方式：**

| 方式             | 请求头                             | 适用场景                   | 对应守卫                                         |
| -------------- | ------------------------------- | ---------------------- | -------------------------------------------- |
| **JWT Bearer** | `Authorization: Bearer <token>` | 所有需登录接口                | `JwtAuthGuard`（`@nestjs/passport`）           |
| **角色守卫**       | 同上（解析 token 后校验 type）           | 区分 admin/merchant/user | `AdminGuard` / `MerchantGuard` / `UserGuard` |
| **API Key**    | `x-api-key: <apiKey>`           | 商户调度 Python 端          | `getMerchantByApiKey()` 服务层校验                |
| **无需认证**       | —                               | 文件下载、支付回调              | `@UseGuards()` 空守卫或手动跳过                      |

**三种角色守卫行为：**

| 守卫              | 文件                         | 校验逻辑                             | 异常消息      |
| --------------- | -------------------------- | -------------------------------- | --------- |
| `AdminGuard`    | `guards/admin.guard.ts`    | `user.type !== 'admin'` → 401    | "需要管理员权限" |
| `MerchantGuard` | `guards/merchant.guard.ts` | `user.type !== 'merchant'` → 401 | "需要商户权限"  |
| `UserGuard`     | `guards/user.guard.ts`     | `user.type !== 'user'` → 401     | "需要用户权限"  |

#### 5.4 功能开关

| 开关键                    | 配置存储         | 控制范围            |
| ---------------------- | ------------ | --------------- |
| `adminEntryEnabled`    | SystemConfig | 管理员登录/微信登录的准入控制 |
| `merchantEntryEnabled` | SystemConfig | 商户登录/微信登录的准入控制  |
| `paymentEnabled`       | SystemConfig | 支付功能整体可用性       |
| `alipayEnabled`        | SystemConfig | 支付宝支付可用性        |

***

### 6. 认证流程

#### 6.1 管理员登录流程

```
客户端                   服务端
  │                        │
  │── username+password ──→│
  │                        │── 检查 adminEntryEnabled 开关
  │                        │── 查询 admins 表
  │                        │── bcrypt.compare(password, hash)
  │                        │── jwtService.sign({ sub, type: 'admin', role: AdminRole })
  │←── { token, admin } ───│
```

#### 6.2 微信小程序登录流程

```
客户端 wx.login() → code
     ↓
POST /api/auth/wechat { code }
     ↓
服务端 → 微信 jscode2session API → openid + session_key
     ↓
根据 openid 查找 User，不存在则自动创建（nickname: "微信用户" + openid 后缀）
     ↓
签发 JWT Token (type: 'user')
     ↓
返回 { token, user: { id, openid, nickname, avatar, phone, canUpdatePhone } }
```

#### 6.3 商户微信一键登录流程

```
客户端 wx.login() → code
     ↓
POST /api/auth/merchant/wechat { code }
     ↓
服务端 → 微信 API → openid
     ↓
查询 merchants 表，匹配 openid（需商户已绑定微信）
     ↓
检查 merchantEntryEnabled 开关 + merchant.status 状态
     ↓
签发 JWT Token (type: 'merchant')
     ↓
返回 { token, merchant: { id, name, phone, address, apiKey } }
```

***

### 7. 接口版本控制策略

| 版本     | 路径前缀      | 状态   | 说明                 |
| ------ | --------- | ---- | ------------------ |
| v1（当前） | `/api`    | 生产可用 | 当前全部接口，全局前缀 `/api` |
| v2（规划） | `/api/v2` | 待规划  | 破坏性变更时启用新版本路径      |

**兼容性原则：**

- 新增字段向后兼容，不破坏现有接口契约
- 废弃端点保留至少 3 个小版本周期（约 3 个月），响应头添加 `Deprecation: true`
- 破坏性变更（字段重命名、类型变更、路径调整）仅在新版本路径 `/api/v2` 中引入
- 版本切换期间旧版路径保持可用，通过 `Sunset` 响应头告知下线时间

***

## 接口详细文档

### 模块一：认证 (Auth)

> **Controller**: `auth.controller.ts`\
> **Swagger Tag**: `认证`\
> **Base Path**: `/api/auth`\
> **认证要求**: 无需认证
> **DTO 校验**: class-validator (`@IsString() @IsNotEmpty()`)

***

#### 1.1 管理员登录

```
POST /api/auth/admin
```

**描述**：管理员使用用户名和密码登录，需通过 `adminEntryEnabled` 功能开关校验。

**请求体 (JSON)**：

| 参数         | 类型       | 必填 | 校验                          | 示例         |
| ---------- | -------- | -- | --------------------------- | ---------- |
| `username` | `string` | 是  | `@IsString() @IsNotEmpty()` | `"admin"`  |
| `password` | `string` | 是  | `@IsString() @IsNotEmpty()` | `"123456"` |

**请求示例**：

```bash
curl -X POST https://api.fantangck.top:3000/api/auth/admin \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"123456"}'
```

**成功响应 (200)**：

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "admin": {
      "id": 1,
      "username": "admin",
      "realName": "系统管理员",
      "role": 0
    }
  }
}
```

> `role`: `0` = 超级管理员，`1` = 普通管理员

**错误响应**：

| HTTP | code | message  | 触发条件                          |
| ---- | ---- | -------- | ----------------------------- |
| 403  | —    | 管理员功能未开启 | `adminEntryEnabled === false` |
| 401  | —    | 管理员不存在   | `username` 无匹配记录              |
| 401  | —    | 密码错误     | bcrypt 比对失败                   |

***

#### 1.2 微信小程序登录

```
POST /api/auth/wechat
```

**请求体 (JSON)**：

| 参数     | 类型       | 必填 | 说明                          |
| ------ | -------- | -- | --------------------------- |
| `code` | `string` | 是  | `wx.login()` 返回的临时凭证（5分钟有效） |

**成功响应 (200)**：

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "token": "eyJhbGciOi...",
    "user": {
      "id": 1,
      "openid": "oABC123...",
      "nickname": "微信用户xxxxxx",
      "avatar": null,
      "phone": null,
      "canUpdatePhone": true
    }
  }
}
```

**错误响应**：

| HTTP | 触发条件                   | 前端处理         |
| ---- | ---------------------- | ------------ |
| 500  | 微信 AppID/AppSecret 未配置 | 提示"微信服务暂不可用" |
| 400  | `code` 无效或已过期          | 引导用户重新授权登录   |

***

#### 1.3 商户登录

```
POST /api/auth/merchant
```

**请求体 (JSON)**：

| 参数         | 类型       | 必填 | 说明    |
| ---------- | -------- | -- | ----- |
| `phone`    | `string` | 是  | 商户手机号 |
| `password` | `string` | 是  | 商户密码  |

**额外校验**：

- `merchantEntryEnabled === false` → 403 "商户登录功能未开启"
- `merchant.status !== 1` → 401 "商户已被禁用"

**成功响应 (200)**：

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "token": "eyJhbGciOi...",
    "merchant": {
      "id": 1,
      "name": "云印打印店",
      "phone": "13800138000",
      "address": "XX大学XX楼",
      "apiKey": "a1b2c3d4..."
    }
  }
}
```

***

#### 1.4 商户微信一键登录

```
POST /api/auth/merchant/wechat
```

| 参数     | 类型       | 必填 | 说明                         |
| ------ | -------- | -- | -------------------------- |
| `code` | `string` | 是  | 微信临时 code（商户需已绑定微信 openid） |

***

#### 1.5 管理员微信一键登录

```
POST /api/auth/admin/wechat
```

| 参数     | 类型       | 必填 | 说明                          |
| ------ | -------- | -- | --------------------------- |
| `code` | `string` | 是  | 微信临时 code（管理员需已绑定微信 openid） |

***

### 模块二：管理员管理 (Admin)

> **Controller**: `admin.controller.ts`\
> **Swagger Tag**: `管理员`\
> **Base Path**: `/api/admin`\
> **守卫链**: `JwtAuthGuard` → 类型校验 `req.user.type === 'admin'`

***

#### 2.1 商户 CRUD

##### 获取商户列表

```
GET /api/admin/merchants
```

**返回字段**：`id, name, phone, address, buildingIds, apiKey, status, createdAt`

***

##### 获取商户详情

```
GET /api/admin/merchants/:id
```

***

##### 创建商户

```
POST /api/admin/merchants
```

| 参数            | 类型       | 必填 | 校验                          | 说明                  |
| ------------- | -------- | -- | --------------------------- | ------------------- |
| `name`        | `string` | 是  | `@IsString() @IsNotEmpty()` | 商户名称                |
| `phone`       | `string` | 是  | `@IsString() @IsNotEmpty()` | 联系电话                |
| `password`    | `string` | 是  | `@IsString()`               | 登录密码（将 bcrypt 加密存储） |
| `address`     | `string` | 否  | —                           | 地址                  |
| `buildingIds` | `string` | 否  | —                           | 配送楼栋 ID 列表          |

**响应 (201)**：`{ id, name, phone, address, buildingIds, apiKey, status, createdAt }`

> `apiKey` 由 `@BeforeInsert()` 自动生成（`crypto.randomBytes(32).toString('hex')`）

***

##### 更新商户

```
PUT /api/admin/merchants/:id
```

支持部分更新（任意字段组合）。

***

##### 删除商户

```
DELETE /api/admin/merchants/:id
```

***

##### 重新生成商户 API Key

```
POST /api/admin/merchants/:id/regenerate-api-key
```

**返回**：`{ id, apiKey }`（旧 Key 立即失效）

***

#### 2.2 管理员 CRUD

##### 获取管理员列表

```
GET /api/admin/admins
```

**返回字段**：`id, username, realName, role(0/1), createdAt, updatedAt`

***

##### 获取管理员详情

```
GET /api/admin/admins/:id
```

***

##### 创建管理员

```
POST /api/admin/admins
```

| 参数         | 类型       | 必填 | 说明                           |
| ---------- | -------- | -- | ---------------------------- |
| `username` | `string` | 是  | 用户名                          |
| `password` | `string` | 是  | 密码（将 bcrypt 加密存储）            |
| `realName` | `string` | 否  | 真实姓名                         |
| `role`     | `number` | 否  | `0`=超级管理员, `1`=普通管理员（默认 `1`） |

***

##### 更新管理员

```
PUT /api/admin/admins/:id
```

支持部分更新 `username` / `password` / `realName` / `role`。

***

##### 删除管理员

```
DELETE /api/admin/admins/:id
```

***

##### 重置管理员密码

```
PUT /api/admin/admins/:id/reset-password
```

| Body 参数    | 类型       | 必填 | 说明  |
| ---------- | -------- | -- | --- |
| `password` | `string` | 是  | 新密码 |

***

### 模块三：订单 (Order)

> **Controller**: `order.controller.ts`\
> **Swagger Tag**: `订单`\
> **Base Path**: `/api/orders`\
> **守卫**: `JwtAuthGuard`（全员）+ Controller 内角色手动校验

***

#### 3.1 管理员订单接口

##### 获取订单列表（含状态统计）

```
GET /api/orders/admin/list
```

| 查询参数     | 类型       | 默认   | 说明                    |
| -------- | -------- | ---- | --------------------- |
| `page`   | `number` | `1`  | 页码                    |
| `limit`  | `number` | `10` | 每页条数                  |
| `status` | `number` | -    | 按 OrderStatus 筛选（0-6） |

**响应结构**：

```typescript
{
  list: OrderListItem[],
  total: number,
  page: number,
  limit: number,
  totalPages: number,
  stats: {
    all: number,        // 全部订单
    pending: number,    // status=1 且未分配商户 (merchantId=null)
    assigned: number,   // status=1 且已分配商户 (merchantId != null)
    printed: number,    // status=3
    completed: number   // status=4
  }
}
```

**OrderListItem 字段**：

| 字段                     | 类型       | 来源                                      |
| ---------------------- | -------- | --------------------------------------- |
| `id`                   | `number` | `order.id`                              |
| `totalPages`           | `number` | `order.totalPages`                      |
| `copies`               | `number` | `order.copies`                          |
| `paperSize`            | `string` | `order.paperSize`                       |
| `colorType`            | `number` | `order.colorType`（0=黑白, 1=彩色）           |
| `doubleSided`          | `number` | `order.doubleSided`（0=单面, 1=长边, 2=短边）   |
| `printQuality`         | `string` | `order.printQuality`（draft/normal/high） |
| `totalAmount`          | `number` | `order.totalAmount`                     |
| `status`               | `number` | `order.status`（0-6）                     |
| `remark`               | `string` | `order.remark`                          |
| `mpayTradeNo`          | `string` | `order.payment?.mpayTradeNo`            |
| `mpayPayUrl`           | `string` | `order.payment?.mpayPayUrl`             |
| `mpayRealPrice`        | `number` | `order.payment?.mpayRealPrice`          |
| `createdAt`            | `string` | `order.createdAt`                       |
| `deliveryBuildingName` | `string` | `order.delivery?.deliveryBuildingName`  |
| `deliveryBuildingId`   | `number` | `order.delivery?.deliveryBuildingId`    |
| `merchantId`           | `number` | `order.merchantId`                      |
| `fileCount`            | `number` | `order.orderFiles.length`               |
| `fileName`             | `string` | `order.orderFiles[0]?.file?.fileName`   |

***

##### 管理员高级筛选

```
GET /api/orders/admin/orders
```

支持任意 `filters` 查询参数（page/limit/status/userId/merchantId/日期范围等），由 `findAllForAdmin()` 动态解析。

***

##### 获取订单详情

```
GET /api/orders/:id
GET /api/orders/admin/orders/:id
```

**额外返回字段**（相比列表项新增）：

| 字段                         | 说明                                       |
| -------------------------- | ---------------------------------------- |
| `user`                     | `{ phone, nickname, avatar }`            |
| `merchant`                 | `{ name, phone, address }`               |
| `deliveryBuildingId`       | 配送楼栋 ID（`order.delivery`）                |
| `deliveryBuildingName`     | 配送楼栋名称                                   |
| `deliveryTimeSlotId`       | 配送时段 ID                                  |
| `deliveryTimeSlotName`     | 配送时段名称                                   |
| `deliveryImageUrl`         | 派送完成图片 URL                               |
| `files[].filePath`         | 原文件下载链接 → `/api/files/:id/download`      |
| `files[].convertedPdfPath` | PDF 下载链接 → `/api/files/:id/download-pdf` |
| `files[].pages`            | 文件页数                                     |
| `files[].copies`           | 该文件打印份数                                  |
| `files[].paperSize`        | 该文件的纸张规格                                 |
| `files[].colorType`        | 该文件的颜色类型                                 |
| `files[].doubleSided`      | 该文件的双面设置                                 |
| `files[].printQuality`     | 该文件的打印质量                                 |
| `files[].pageRange`        | 该文件的页码范围                                 |

***

##### 设置订单状态

```
PUT /api/orders/:id/set-status
```

| Body 参数  | 类型       | 必填 | 说明                  |
| -------- | -------- | -- | ------------------- |
| `status` | `number` | 是  | 目标 OrderStatus（0-6） |

```
PUT /api/orders/admin/orders/:id/status
```

同上。

***

##### 管理员更新订单

```
PUT /api/orders/admin/orders/:id
```

支持更新任意订单字段。

***

##### 删除订单

```
DELETE /api/orders/:id
```

仅管理员可调用。

***

##### 批量操作

```
POST /api/orders/admin/orders/batch
```

| Body 参数    | 类型         | 说明                             |
| ---------- | ---------- | ------------------------------ |
| `orderIds` | `string[]` | 目标订单 ID 列表                     |
| `data`     | `object`   | 批量更新的数据字段（如 `{status:4}` 批量完成） |

***

##### 订单统计

```
GET /api/orders/admin/orders/stats
```

| 查询参数        | 类型       | 必填 | 说明               |
| ----------- | -------- | -- | ---------------- |
| `startDate` | `string` | 否  | 起始日期（YYYY-MM-DD） |
| `endDate`   | `string` | 否  | 截止日期（YYYY-MM-DD） |

***

##### 导出订单

```
GET /api/orders/admin/orders/export
```

支持 `filters` 附加筛选参数。

***

#### 3.2 用户端订单接口

##### 创建订单

```
POST /api/orders
Authorization: Bearer <token>
```

| 参数                   | 类型         | 必填 | 说明                              |
| -------------------- | ---------- | -- | ------------------------------- |
| `fileIds`            | `number[]` | 是  | 文件 ID 列表                        |
| `copies`             | `number`   | 是  | 打印份数                            |
| `paperSize`          | `string`   | 是  | 纸张规格（A4/A3）                     |
| `colorType`          | `number`   | 是  | 颜色（0=黑白, 1=彩色）                  |
| `doubleSided`        | `number`   | 是  | 双面（0=单面, 1=长边, 2=短边）            |
| `printQuality`       | `string`   | 否  | 质量（draft/normal/high，默认 normal） |
| `remark`             | `string`   | 否  | 备注                              |
| `deliveryBuildingId` | `number`   | 否  | 配送楼栋 ID                         |
| `deliveryTimeSlotId` | `number`   | 否  | 配送时段 ID                         |

**成功响应 (200)**：返回订单信息 + 每个 `OrderFile` 的文件下载路径。

***

##### 获取订单列表

```
GET /api/orders
```

权限隔离：

- 普通用户 → 仅返回 `userId` 匹配的订单
- 商户 → 仅返回 `merchantId` 匹配的订单
- 管理员 → 返回全部

查询参数：`page`, `limit`, `status`

***

##### 订单操作

| 接口                                   | 说明     | 权限        |
| ------------------------------------ | ------ | --------- |
| `PUT /api/orders/:id/cancel`         | 取消订单   | 用户（自己的订单） |
| `PUT /api/orders/:id/force-complete` | 强制完成订单 | 用户（自己的订单） |
| `PUT /api/orders/:id/reassign`       | 重新下发   | 用户（自己的订单） |
| `PUT /api/orders/:id/start-printing` | 开始打印   | 用户（自己的订单） |

***

##### 创建支付

```
POST /api/orders/:id/pay
```

| 参数        | 类型       | 必填 | 说明                  |
| --------- | -------- | -- | ------------------- |
| `payType` | `string` | 否  | 支付方式（wechat/alipay） |
| `version` | `string` | 否  | 版本标识                |

***

##### 刷新订单状态

```
PUT /api/orders/:id/refresh
```

从 mpay 查询支付结果并同步订单状态。

- 管理员/商户可刷新任意订单
- 普通用户仅刷新自己的

***

##### 支付回调（无需认证）

```
ALL /api/orders/pay/callback
```

支持 GET/POST，处理 mpay 支付回调通知。返回纯文本 `"success"` 或 `"fail"`。

***

### 模块四：用户 (User)

> **Controller**: `user.controller.ts`\
> **Swagger Tag**: `用户`\
> **Base Path**: `/api/user`

***

#### 4.1 用户端

##### 获取当前用户信息

```
GET /api/user/me
Authorization: Bearer <token>
```

| 响应字段               | 类型        | 说明                |
| ------------------ | --------- | ----------------- |
| `canUpdatePhone`   | `boolean` | 手机号修改间隔是否已过（限制频率） |
| `phoneUpdateCount` | `number`  | 历史修改次数            |

***

##### 更新当前用户

```
PUT /api/user/me
```

| 参数         | 类型       | 说明   |
| ---------- | -------- | ---- |
| `nickname` | `string` | 新昵称  |
| `avatar`   | `string` | 头像路径 |

***

##### 上传头像

```
POST /api/user/avatar
Content-Type: multipart/form-data
```

| 字段     | 说明      |
| ------ | ------- |
| `file` | 图片二进制文件 |

服务端自动删除旧头像文件。

***

##### 获取微信手机号

```
POST /api/user/phone
```

| 参数     | 类型       | 说明                            |
| ------ | -------- | ----------------------------- |
| `code` | `string` | `wx.getPhoneNumber()` 返回的动态令牌 |

***

#### 4.2 管理员用户管理

##### 用户列表

```
GET /api/user/admin/users
```

| 查询参数    | 类型       | 默认                               |
| ------- | -------- | -------------------------------- |
| `page`  | `number` | `1`                              |
| `limit` | `number` | `10`                             |
| 其他筛选    | —        | `filters` 动态参数（如 phone/nickname） |

***

##### 用户详情

```
GET /api/user/admin/users/:id
```

***

##### 更新用户信息

```
PUT /api/user/admin/users/:id
```

***

##### 更新用户状态

```
PUT /api/user/admin/users/:id/status
```

| Body 参数    | 类型        | 说明                    |
| ---------- | --------- | --------------------- |
| `isActive` | `boolean` | `true`=启用, `false`=禁用 |

***

### 模块五：文件 (File)

> **Controller**: `file.controller.ts`\
> **Swagger Tag**: `文件`\
> **Base Path**: `/api/files`

***

#### 5.1 文件操作

##### 上传文件

```
POST /api/files/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

| 字段     | 限制      | 说明    |
| ------ | ------- | ----- |
| `file` | ≤ 200MB | 文件二进制 |

**服务端处理**：

- 计算 `fileHash`（SHA-256）
- 设置 `conversionStatus = "pending"`
- 自动触发 PDF 转换（Word/Excel/PPT/图片 → PDF）

**响应 (200)**：

```json
{
  "code": 0,
  "data": {
    "id": 123,
    "fileName": "报告.docx",
    "fileSize": 2048000,
    "fileType": "application/vnd.openxmlformats-...",
    "filePath": "/api/files/123/download",
    "convertedPdfPath": "/api/files/123/download-pdf"
  }
}
```

***

##### 文件列表

```
GET /api/files
```

查询参数: `page`, `limit`

***

##### 文件详情

```
GET /api/files/:id
```

***

##### 下载原文件

```
GET /api/files/:id/download
```

- **无需认证**
- 支持软删除文件的下载（`withDeleted: true`）
- 返回 `Content-Disposition: attachment; filename="原文件名"`

***

##### 下载转换 PDF

```
GET /api/files/:id/download-pdf
```

- **无需认证**
- 文件未转换（`convertedPdfPath === null`）时返回 404

***

##### 删除文件

```
DELETE /api/files/:id
```

软删除（设置 `deletedAt` 时间戳）。

***

#### 5.2 管理员文件管理

| 接口                                    | 说明                                |
| ------------------------------------- | --------------------------------- |
| `GET /api/files/admin/files`          | 管理员文件列表（page/limit/filters）       |
| `GET /api/files/admin/files/:id`      | 文件详情                              |
| `GET /api/files/admin/files/stats`    | 文件统计（总数/总大小/按类型统计）                |
| `DELETE /api/files/admin/files/batch` | 批量删除（Body: `{fileIds: number[]}`） |

***

#### 5.3 大文件分块上传

用于超大文件（>50MB）的分块传输：

```
POST /api/files/upload/init
```

| 参数            | 类型       | 说明    |
| ------------- | -------- | ----- |
| `object_name` | `string` | 目标文件名 |

返回 `{ upload_id }` 会话 ID。

***

```
POST /api/files/upload/part
```

| 参数            | 类型       | 说明             |
| ------------- | -------- | -------------- |
| `upload_id`   | `string` | 上传会话 ID        |
| `object_name` | `string` | 文件名            |
| `content`     | `string` | Base64 编码的分块内容 |
| `part_number` | `number` | 分块序号（从 1 开始）   |

***

```
POST /api/files/upload/complete
```

| 参数             | 类型                     | 说明      |
| -------------- | ---------------------- | ------- |
| `upload_id`    | `string`               | 上传会话 ID |
| `object_name`  | `string`               | 文件名     |
| `upload_parts` | `{PartNumber, ETag}[]` | 所有分块列表  |

***

### 模块六：系统配置 (System)

> **Controller**: `system.controller.ts`\
> **Swagger Tag**: `系统`\
> **Base Path**: 无模块前缀，直接挂在根路径（`/api/system/*`）

***

#### 6.1 配置管理

| 接口                               | 说明                                        |
| -------------------------------- | ----------------------------------------- |
| `GET /api/system/config`         | 获取全部系统配置（SystemConfig key-value）          |
| `POST /api/system/reload-config` | 重新加载配置缓存（`ConfigService.refreshConfig()`） |

***

#### 6.2 公告管理

##### 获取公告

```
GET /api/system/notice
```

无需认证。

***

##### 更新公告

```
PUT /api/system/notice
```

| 参数             | 类型        | 说明   |
| -------------- | --------- | ---- |
| `title`        | `string`  | 公告标题 |
| `content`      | `string`  | 公告内容 |
| `wechatNumber` | `string`  | 联系微信 |
| `imageUrl`     | `string`  | 公告图片 |
| `isActive`     | `boolean` | 是否启用 |

***

##### 上传公告图片

```
POST /api/system/upload-notice-image
Content-Type: multipart/form-data
```

| 字段      | 说明      |
| ------- | ------- |
| `image` | 图片二进制文件 |

返回：`{ code: 0, data: "uploads/notice/xxxx.jpg" }`

***

#### 6.3 价格配置

##### 获取价格

```
GET /api/system/price
```

返回 PriceConfig 实体（默认值如下）：

```json
{
  "blackWhiteSingleSidedPrice": 0.15,
  "blackWhiteDoubleSidedPrice": 0.27,
  "colorSingleSidedPrice": 0.45,
  "colorDoubleSidedPrice": 0.90,
  "minPrice": 1.00
}
```

***

##### 更新价格

```
PUT /api/system/price
```

| 参数                           | 类型       | 说明        | 默认值  |
| ---------------------------- | -------- | --------- | ---- |
| `blackWhiteSingleSidedPrice` | `number` | 黑白单面（元/页） | 0.15 |
| `blackWhiteDoubleSidedPrice` | `number` | 黑白双面（元/页） | 0.27 |
| `colorSingleSidedPrice`      | `number` | 彩色单面（元/页） | 0.45 |
| `colorDoubleSidedPrice`      | `number` | 彩色双面（元/页） | 0.90 |
| `minPrice`                   | `number` | 最低起送价（元）  | 1.00 |

***

#### 6.4 功能开关

所有开关接口遵循统一模式：`GET` 获取当前状态，`PUT` 更新（Body: `{ "enabled": true/false }`）。

| 接口                                   | 配置键                    | 说明      |
| ------------------------------------ | ---------------------- | ------- |
| `/api/system/alipay-enabled`         | `alipayEnabled`        | 支付宝支付   |
| `/api/system/payment-enabled`        | `paymentEnabled`       | 支付功能总开关 |
| `/api/system/merchant-entry-enabled` | `merchantEntryEnabled` | 商户登录入口  |
| `/api/system/admin-entry-enabled`    | `adminEntryEnabled`    | 管理员登录入口 |

##### 审核状态

```
GET /api/system/review-status?version=xxx
```

##### 全部功能开关

```
GET /api/system/feature-configs?version=xxx
```

一次性返回 `{ adminEntryEnabled, merchantEntryEnabled, paymentEnabled, alipayEnabled }`。

***

##### FAQ 页面

```
GET /api/faq
```

直接返回 `public/faq/index.html` 静态页面。

***

### 模块七：配送配置 (Config)

> **Controller**: `config.controller.ts`\
> **Base Path**: `/api/config`\
> **认证要求**: 无需认证（公开配置）

| 接口                                   | 说明             |
| ------------------------------------ | -------------- |
| `GET /api/config/delivery-buildings` | 可配送楼栋列表        |
| `GET /api/config/time-slots`         | 可配送时间段         |
| `GET /api/config/print-options`      | 打印参数选项         |
| `GET /api/config/pricing`            | 定价规则           |
| `GET /api/config/all`                | 全部配置聚合（合并以上所有） |

***

### 模块八：商户调度 (Dispatch)

> **Controller**: `dispatch.controller.ts`\
> **Swagger Tag**: `商户打印任务`\
> **Base Path**: `/api/merchant/tasks`\
> **认证**: `x-api-key` 请求头（通过 `getMerchantByApiKey()` 校验，解析为 `req.merchant`）

***

#### 8.1 商户信息

| 接口             | 说明                              |
| -------------- | ------------------------------- |
| `GET /profile` | 获取商户信息（隐藏 `password` 字段）        |
| `PUT /profile` | 更新商户信息（`address`/`buildingIds`） |
| `GET /stats`   | 商户统计数据（订单数/收入/任务完成率）            |

***

#### 8.2 接单管理

##### 待接单列表

```
GET /unassigned
```

| 查询参数         | 默认   | 说明    |
| ------------ | ---- | ----- |
| `page`       | `1`  | 页码    |
| `limit`      | `50` | 每页条数  |
| `buildingId` | —    | 按楼栋筛选 |

返回 `status === 1 && merchantId === null` 的订单。

***

##### 接单

```
POST /:id/grab
```

将订单 `merchantId` 设为当前商户。

***

##### 取消接单

```
POST /:id/cancel
```

释放订单，`merchantId` 置 `null`。

***

#### 8.3 任务管理

| 接口             | 说明          |
| -------------- | ----------- |
| `GET /`        | 商户任务列表（分页）  |
| `GET /grouped` | 按订单 ID 分组展示 |
| `GET /pending` | 待处理任务       |
| `GET /:id`     | 任务详情        |

***

#### 8.4 任务操作

| 接口                         | 说明                     |
| -------------------------- | ---------------------- |
| `PUT /:id/start`           | 开始打印                   |
| `PUT /:id/complete`        | 完成打印                   |
| `POST /:id/force-complete` | 强制完成（含订单状态同步）          |
| `POST /:id/reassign`       | 重新下发                   |
| `PUT /:id/fail`            | 标记失败（Body: `errorMsg`） |

***

#### 8.5 批量操作

| 接口                                         | 说明          |
| ------------------------------------------ | ----------- |
| `PUT /orders/:orderId/start-all`           | 按订单批量开始全部任务 |
| `POST /orders/:orderId/force-complete-all` | 按订单批量强制完成   |
| `POST /:orderId/complete`                  | 完成订单下的全部任务  |

**打印完成信号**：`POST /print-completed`（Body: `orderId`/`taskId`）

***

#### 8.6 图片上传

| 接口                                     | Content-Type | 说明                           |
| -------------------------------------- | ------------ | ---------------------------- |
| `POST /:orderId/upload-image`          | JSON         | Body: `imageUrl`（图片 URL 字符串） |
| `POST /:orderId/upload-delivery-image` | multipart    | 字段: `file`（派送完成拍照）           |

***

#### 8.7 微信绑定

| 接口                    | 说明                                                |
| --------------------- | ------------------------------------------------- |
| `POST /bind-wechat`   | 绑定微信（Body: `code`）→ 通过 `jscode2session` 获取 openid |
| `DELETE /bind-wechat` | 解除绑定（`openid` 置 `null`）                           |

***

### 模块九：微信消息 (WechatMessage)

> **Controller**: `wechat-message.controller.ts`\
> **Base Path**: `/api/wechat-message`\
> **认证要求**: 无需认证（微信服务器回调）

处理微信公众号/服务号的消息推送回调。

***

#### 9.1 服务器验证 (GET)

```
GET /api/wechat-message
```

**描述**：微信服务器在配置消息推送 URL 时发送的验证请求。

| 查询参数        | 类型       | 说明     |
| ----------- | -------- | ------ |
| `signature` | `string` | 微信加密签名 |
| `timestamp` | `string` | 时间戳    |
| `nonce`     | `string` | 随机数    |
| `echostr`   | `string` | 随机字符串  |

**响应**：验证通过返回 `echostr`，失败返回 `"Invalid signature"`。

***

#### 9.2 消息接收 (POST)

```
POST /api/wechat-message
Content-Type: application/json | application/xml
```

**描述**：接收微信服务器推送的用户消息（文本/图片/事件等）。

**查询参数**：

| 参数              | 类型       | 说明          |
| --------------- | -------- | ----------- |
| `signature`     | `string` | 微信加密签名      |
| `timestamp`     | `string` | 时间戳         |
| `nonce`         | `string` | 随机数         |
| `encrypt_type`  | `string` | 加密类型（`aes`） |
| `msg_signature` | `string` | 消息体签名（安全模式） |

**处理流程**：

1. 安全模式 → 验证 `msg_signature` + AES 解密消息体
2. 解析消息内容（XML/JSON）
3. 通过 `WechatMessageService.handleMessage()` 分发业务处理
4. 响应 `"success"` 或 `"fail"`

***

## 数据模型定义

### 核心实体 ER 关系

```
Admin ─────────── 独立实体（管理后台登录）
Merchant ──────── 归属于 Admin 管理
User ──────────── 微信小程序用户
  │
  ├── File (1:N, 用户上传的文件)
  │     └── OrderFile (N:1 File, N:1 Order)
  │
  └── Order (1:N)
        ├── OrderFile (1:N, 订单关联的文件列表)
        ├── OrderPayment (1:1, 支付信息)
        └── OrderDelivery (1:1, 配送信息)

DispatchNode ──── 打印节点
  └── PrintTask (N:1, 打印任务关联节点)
        ├── N:1 Order (任务关联的订单)
        ├── N:1 Merchant (执行任务的商户)
        └── N:1 File (要打印的文件)
```

***

### 用户 (User)

| 字段                 | 类型               | 约束             | 说明        |
| ------------------ | ---------------- | -------------- | --------- |
| `id`               | `number`         | PK, AUTO       | <br />    |
| `openid`           | `string`         | UNIQUE, 长度 100 | 微信 openid |
| `nickname`         | `string \| null` | 长度 50          | 用户昵称      |
| `avatar`           | `string \| null` | 长度 255         | 头像路径      |
| `phone`            | `string \| null` | 长度 20          | 手机号       |
| `phoneUpdateCount` | `number`         | 默认 0           | 手机号修改次数   |
| `phoneUpdatedAt`   | `Date \| null`   | —              | 最近修改时间    |
| `isActive`         | `boolean`        | 默认 true        | 账号启用状态    |
| `createdAt`        | `Date`           | —              | <br />    |
| `updatedAt`        | `Date`           | —              | <br />    |

***

### 商户 (Merchant)

| 字段            | 类型               | 约束             | 说明                                  |
| ------------- | ---------------- | -------------- | ----------------------------------- |
| `id`          | `number`         | PK, AUTO       | <br />                              |
| `name`        | `string`         | 长度 100         | 商户名称                                |
| `phone`       | `string`         | UNIQUE, 长度 20  | 联系电话                                |
| `password`    | `string \| null` | 长度 255, bcrypt | 登录密码                                |
| `address`     | `string \| null` | 长度 255         | 地址                                  |
| `buildingIds` | `string \| null` | 长度 255         | 配送楼栋 ID 列表（逗号分隔）                    |
| `apiKey`      | `string`         | UNIQUE, 长度 100 | API 密钥（@BeforeInsert 自动生成 64 位 hex） |
| `status`      | `number`         | 默认 1           | 状态（1=正常，其他=禁用）                      |
| `openid`      | `string \| null` | UNIQUE, 长度 100 | 微信 openid（微信绑定）                     |
| `createdAt`   | `Date`           | —              | <br />                              |
| `updatedAt`   | `Date`           | —              | <br />                              |

***

### 管理员 (Admin)

| 字段            | 类型               | 约束             | 说明                          |
| ------------- | ---------------- | -------------- | --------------------------- |
| `id`          | `number`         | PK, AUTO       | <br />                      |
| `username`    | `string`         | UNIQUE, 长度 50  | 用户名                         |
| `password`    | `string`         | 长度 255, bcrypt | 密码                          |
| `realName`    | `string \| null` | 长度 50          | 真实姓名                        |
| `role`        | `number`         | 默认 1           | `0`=SUPER\_ADMIN, `1`=ADMIN |
| `lastLoginAt` | `Date \| null`   | —              | 最后登录时间                      |
| `lastLoginIp` | `string \| null` | 长度 50          | 最后登录 IP                     |
| `openid`      | `string \| null` | UNIQUE, 长度 100 | 微信 openid                   |
| `createdAt`   | `Date`           | —              | <br />                      |
| `updatedAt`   | `Date`           | —              | <br />                      |

***

### 订单 (Order)

| 字段             | 类型               | 约束                           | 说明           |
| -------------- | ---------------- | ---------------------------- | ------------ |
| `id`           | `string`         | PK, 长度 32                    | 雪花 ID / UUID |
| `userId`       | `number`         | FK → User                    | 下单用户         |
| `totalPages`   | `number`         | —                            | 总页数          |
| `copies`       | `number`         | 默认 1                         | 份数           |
| `paperSize`    | `string`         | 默认 "A4", 长度 10               | 纸张规格         |
| `colorType`    | `number`         | 默认 0                         | ColorType    |
| `doubleSided`  | `number`         | 默认 0                         | DoubleSided  |
| `pageRange`    | `string \| null` | 长度 50                        | 页码范围         |
| `printQuality` | `string`         | 默认 "normal", 长度 20           | PrintQuality |
| `totalAmount`  | `number`         | 默认 0, decimal(10,2)          | 总金额          |
| `status`       | `number`         | 默认 0 (PENDING\_PAYMENT), 含索引 | OrderStatus  |
| `printTime`    | `Date \| null`   | —                            | 打印完成时间       |
| `remark`       | `string \| null` | 长度 500                       | 备注           |
| `merchantId`   | `number \| null` | FK → Merchant                | 分配的商户        |
| `createdAt`    | `Date`           | —                            | <br />       |
| `updatedAt`    | `Date`           | —                            | <br />       |
| `deletedAt`    | `Date \| null`   | —                            | 软删除时间        |

**关联子表：**

***

### 订单文件 (OrderFile)

| 字段             | 类型               | 说明              |
| -------------- | ---------------- | --------------- |
| `id`           | `number`         | PK, AUTO        |
| `orderId`      | `string`         | FK → Order      |
| `fileId`       | `number`         | FK → File       |
| `pages`        | `number`         | 该文件页数（默认 1）     |
| `copies`       | `number`         | 该文件份数（默认 1）     |
| `paperSize`    | `string \| null` | 文件级纸张规格（可覆盖订单级） |
| `colorType`    | `number \| null` | 文件级颜色           |
| `doubleSided`  | `number \| null` | 文件级双面           |
| `printQuality` | `string \| null` | 文件级质量           |
| `pageRange`    | `string \| null` | 页码范围            |
| `createdAt`    | `Date`           | <br />          |

***

### 订单支付 (OrderPayment)

| 字段              | 类型               | 说明                        |
| --------------- | ---------------- | ------------------------- |
| `id`            | `number`         | PK, AUTO                  |
| `orderId`       | `string`         | FK → Order (1:1, CASCADE) |
| `mpayTradeNo`   | `string \| null` | mpay 交易流水号                |
| `mpayPayUrl`    | `string \| null` | mpay 支付链接                 |
| `mpayRealPrice` | `number \| null` | 实际支付金额 (decimal(10,2))    |
| `mpayCreatedAt` | `Date \| null`   | mpay 创建时间                 |
| `createdAt`     | `Date`           | <br />                    |
| `updatedAt`     | `Date`           | <br />                    |

***

### 订单配送 (OrderDelivery)

| 字段                     | 类型               | 说明                        |
| ---------------------- | ---------------- | ------------------------- |
| `id`                   | `number`         | PK, AUTO                  |
| `orderId`              | `string`         | FK → Order (1:1, CASCADE) |
| `deliveryBuildingId`   | `number \| null` | 配送楼栋 ID                   |
| `deliveryBuildingName` | `string \| null` | 配送楼栋名称                    |
| `deliveryTimeSlotId`   | `number \| null` | 配送时段 ID                   |
| `deliveryTimeSlotName` | `string \| null` | 配送时段名称                    |
| `deliveryImageUrl`     | `string \| null` | 派送完成图片                    |
| `deliveryDescription`  | `string \| null` | 派送备注                      |
| `deliveredAt`          | `Date \| null`   | 派送完成时间                    |
| `createdAt`            | `Date`           | <br />                    |
| `updatedAt`            | `Date`           | <br />                    |

***

### 文件 (File)

| 字段                   | 类型               | 约束           | 说明               |
| -------------------- | ---------------- | ------------ | ---------------- |
| `id`                 | `number`         | PK, AUTO     | <br />           |
| `userId`             | `number`         | FK → User    | 上传用户             |
| `fileName`           | `string`         | 长度 255       | 原始文件名            |
| `filePath`           | `string`         | 长度 255       | 存储路径             |
| `fileSize`           | `number`         | BIGINT       | 文件大小（字节）         |
| `fileType`           | `string`         | 长度 255       | MIME 类型          |
| `fileExt`            | `string`         | 长度 20        | 扩展名              |
| `fileHash`           | `string \| null` | 长度 64, INDEX | SHA-256 哈希       |
| `previewPath`        | `string \| null` | 长度 255       | 预览图路径            |
| `totalPages`         | `number \| null` | —            | 总页数              |
| `conversionStatus`   | `string`         | 默认 "pending" | ConversionStatus |
| `convertedPdfPath`   | `string \| null` | 长度 255       | 转换后 PDF 路径       |
| `blackWhiteCoverage` | `number \| null` | decimal(5,2) | 黑白覆盖率 (%)        |
| `colorCoverage`      | `number \| null` | decimal(5,2) | 彩色覆盖率 (%)        |
| `conversionError`    | `string \| null` | TEXT         | 转换失败原因           |
| `convertedAt`        | `Date \| null`   | —            | 转换完成时间           |
| `createdAt`          | `Date`           | —            | <br />           |
| `deletedAt`          | `Date \| null`   | —            | 软删除时间            |

***

### 打印任务 (PrintTask)

| 字段            | 类型               | 说明                                        |
| ------------- | ---------------- | ----------------------------------------- |
| `id`          | `string`         | PK, 长度 32                                 |
| `orderId`     | `string`         | FK → Order                                |
| `nodeId`      | `number \| null` | FK → DispatchNode（分配的打印节点）                |
| `merchantId`  | `number \| null` | FK → Merchant（执行商户）                       |
| `fileId`      | `number`         | FK → File（要打印的文件）                         |
| `printParams` | `json`           | 打印参数（份数/纸张/色彩/双面/质量）                      |
| `status`      | `number`         | PrintTaskStatus（默认 0=PENDING\_ASSIGN），含索引 |
| `errorMsg`    | `string \| null` | 失败原因                                      |
| `startedAt`   | `Date \| null`   | 开始打印时间                                    |
| `completedAt` | `Date \| null`   | 完成打印时间                                    |
| `createdAt`   | `Date`           | <br />                                    |
| `updatedAt`   | `Date`           | <br />                                    |

***

### 调度节点 (DispatchNode)

| 字段              | 类型               | 约束             | 说明         |
| --------------- | ---------------- | -------------- | ---------- |
| `id`            | `number`         | PK, AUTO       | <br />     |
| `nodeName`      | `string`         | 长度 100         | 节点名称       |
| `nodeKey`       | `string`         | UNIQUE, 长度 100 | 节点唯一标识     |
| `status`        | `number`         | 默认 0 (OFFLINE) | NodeStatus |
| `osType`        | `string \| null` | 长度 20          | 操作系统类型     |
| `arch`          | `string \| null` | 长度 20          | CPU 架构     |
| `printers`      | `json \| null`   | —              | 打印机列表      |
| `ipAddress`     | `string \| null` | 长度 50          | IP 地址      |
| `lastHeartbeat` | `Date \| null`   | —              | 最后心跳时间     |
| `createdAt`     | `Date`           | —              | <br />     |
| `updatedAt`     | `Date`           | —              | <br />     |

***

### 价格配置 (PriceConfig)

| 字段                           | 类型        | 默认值      | 说明                  |
| ---------------------------- | --------- | -------- | ------------------- |
| `id`                         | `number`  | PK, AUTO | <br />              |
| `blackWhiteSingleSidedPrice` | `number`  | 0.15     | 黑白单面（decimal(10,2)） |
| `blackWhiteDoubleSidedPrice` | `number`  | 0.27     | 黑白双面                |
| `colorSingleSidedPrice`      | `number`  | 0.45     | 彩色单面                |
| `colorDoubleSidedPrice`      | `number`  | 0.90     | 彩色双面                |
| `minPrice`                   | `number`  | 1.00     | 最低起送价               |
| `isActive`                   | `boolean` | true     | 是否启用                |
| `createdAt`                  | `Date`    | —        | <br />              |
| `updatedAt`                  | `Date`    | —        | <br />              |

***

### 系统配置 (SystemConfig)

| 字段            | 类型               | 说明                  |
| ------------- | ---------------- | ------------------- |
| `id`          | `number`         | PK, AUTO            |
| `key`         | `string`         | 配置键（UNIQUE, 长度 100） |
| `value`       | `string \| null` | 配置值（TEXT）           |
| `description` | `string \| null` | 配置说明（长度 255）        |
| `createdAt`   | `Date`           | <br />              |
| `updatedAt`   | `Date`           | <br />              |

***

## 开发环境配置指南

### 前端配置

**.env.development**：

```env
VITE_BASE_URL = /
VITE_API_URL = /
VITE_API_PROXY_URL = https://api.fantangck.top:3000
```

Vite 代理自动将 `/api` 请求转发到后端 `VITE_API_PROXY_URL`，解决本地开发跨域问题。

### 后端配置

**环境变量（.env）**：

| 变量            | 说明       | 示例                               |
| ------------- | -------- | -------------------------------- |
| `PORT`        | 服务端口     | `3000`                           |
| `APP_URL`     | 应用完整 URL | `https://api.fantangck.top:3000` |
| `DB_HOST`     | 数据库主机    | `localhost`                      |
| `DB_PORT`     | 数据库端口    | `3306`                           |
| `DB_USERNAME` | 数据库用户名   | `root`                           |
| `DB_PASSWORD` | 数据库密码    | `******`                         |
| `DB_DATABASE` | 数据库名     | `printease`                      |
| `UPLOAD_DIR`  | 文件上传目录   | `./uploads`                      |

### 服务启动

```bash
# 后端 (NestJS)
cd PrintEase-backend
npm run start:dev   # 开发模式，端口 3000

# 前端 (Vite + Vue 3)
cd PrintEase-admin
pnpm dev            # 开发模式，端口 5173

# Swagger API 文档
# 浏览器打开: http://localhost:3000/api/docs
```

### API 请求链路

```
浏览器 (localhost:5173)
  └─ axios → /api/* (相对路径)
       └─ Vite Proxy → https://api.fantangck.top:3000/api/*
            └─ NestJS GlobalPrefix 'api'
                 └─ Controller 路由分发
```

***

## 前端调用示例

> 注意：项目使用 config-object 调用风格 `{ url, params }`，
> 响应数据已自动展开（HTTP 200 + code=0 → 返回 `data` 字段）

```typescript
import request from '@/utils/http'

// --- 管理员登录 ---
const { token, admin } = await request.post<{ token: string; admin: any }>({
  url: '/api/auth/admin',
  params: { username: 'admin', password: '123456' }
})
// admin: { id, username, realName, role }

// --- 获取订单列表（含状态统计） ---
const { list, stats } = await request.get<Api.PrintEase.OrderListResponse>({
  url: '/api/orders/admin/list',
  params: { page: 1, limit: 10, status: 1 }
})
// stats: { all, pending, assigned, printed, completed }

// --- 获取订单详情 ---
const order = await request.get<Api.PrintEase.OrderDetail>({
  url: `/api/orders/${orderId}`
})
// order.user / order.merchant / order.files / order.delivery

// --- 更新订单状态 ---
await request.put<void>({
  url: `/api/orders/admin/orders/${orderId}/status`,
  params: { status: 4 }
})

// --- 批量完成订单 ---
await request.post<void>({
  url: '/api/orders/admin/orders/batch',
  params: { orderIds: ['id1', 'id2'], data: { status: 4 } }
})

// --- 获取/更新价格配置 ---
const price = await request.get<Api.PrintEase.PriceConfig>({
  url: '/api/system/price'
})
await request.put<void>({
  url: '/api/system/price',
  params: { blackWhiteSingleSidedPrice: 0.20 },
  showSuccessMessage: true
})

// --- 切换功能开关 ---
await request.put<void>({
  url: '/api/system/payment-enabled',
  params: { enabled: true }
})

// --- 获取功能开关全部状态 ---
const configs = await request.get<Api.PrintEase.FeatureConfigs>({
  url: '/api/system/feature-configs'
})
// { adminEntryEnabled, merchantEntryEnabled, paymentEnabled, alipayEnabled }

// --- 文件上传 ---
const formData = new FormData()
formData.append('file', file)
const uploadRes = await request.post<Api.PrintEase.FileUploadResponse>({
  url: '/api/files/upload',
  data: formData,
  headers: { 'Content-Type': 'multipart/form-data' }
})

// --- 创建订单（用户端，需 Token） ---
const newOrder = await request.post<any>({
  url: '/api/orders',
  params: {
    fileIds: [123, 124], copies: 2, paperSize: 'A4',
    colorType: 0, doubleSided: 0, printQuality: 'normal',
    deliveryBuildingId: 1, deliveryTimeSlotId: 2, remark: '请装订'
  }
})

// --- 商户 API Key 认证示例（Python dispatch） ---
import axios from 'axios'
const dispatchRes = await axios.get('/api/merchant/tasks/unassigned', {
  headers: { 'x-api-key': merchantApiKey }
})

// --- 使用封装好的 dispatchApi（推荐） ---
import { dispatchApi } from '@/api/printease'
dispatchApi.setApiKey(merchantApiKey)
const tasks = await dispatchApi.fetchTasks({ page: 1, limit: 20 })
```

***

## 开发规范

### 代码规范

- 使用 TypeScript 严格模式
- 遵循 Vue 3 Composition API 最佳实践
- 使用 ESLint 进行代码检查
- 使用 Prettier 格式化代码
- 使用 Stylelint 检查样式规范

### Git 提交规范

使用 commitlint 和 cz-git 进行规范化提交：

```
feat: 新功能
fix: 修复bug
docs: 文档更新
style: 代码格式调整
refactor: 重构
test: 测试相关
chore: 构建/工具相关
```

提交命令：

```bash
pnpm commit
```

### 目录规范

- **api/**: API 接口模块，按业务模块划分
- **components/**: 组件库，业务组件和核心组件分离
- **views/**: 页面视图，按业务模块组织
- **store/**: 状态管理，使用 Pinia
- **utils/**: 工具函数，按功能分类
- **types/**: TypeScript 类型定义

### 组件开发规范

1. 组件命名使用 PascalCase
2. 组件文件统一使用 `index.vue` 作为入口
3. 业务组件放在 `components/business/` 目录
4. 通用组件放在 `components/core/` 目录

### API 开发规范

1. API 函数命名使用 `fetch` 前缀
2. 参数和返回值使用 TypeScript 类型定义
3. 在 `types/api/` 目录定义 API 类型
4. 支持 `showSuccessMessage` 和 `showErrorMessage` 配置项

## 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Edge (最新版)
- Safari (最新版)

## 相关项目

- [PrintEase-uniapp](../PrintEase-uniapp) - 印易小程序（包含管理员页面）
- [PrintEase-backend](../PrintEase-backend) - 印易后台（NestJS 11）
- [PrintEase-dispatch](../PrintEase-dispatch) - 云印调度（Python Pillonia）
- [mpay](../mpay) - 印易支付系统（PHP）

## License

MIT
