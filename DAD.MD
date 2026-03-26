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

访问地址: http://localhost:5173

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
VITE_API_PROXY_URL = https://m1.apifoxmock.com/m1/6400575-6097373-default

# 是否删除 console
VITE_DROP_CONSOLE = false
```

### 生产环境 (.env.production)

```env
# 应用部署基础路径（如部署在子目录 /admin，则设置为 /admin/）
VITE_BASE_URL = /

# API 地址前缀
VITE_API_URL = https://m1.apifoxmock.com/m1/6400575-6097373-default

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

## API 接口

### 基础配置

- **认证方式**: JWT Token
- **请求超时**: 15 秒
- **错误重试**: 0 次（可配置）

### HTTP 请求封装

项目基于 Axios 封装了统一的 HTTP 请求工具，主要功能：

- 请求拦截器：自动添加 Token 到请求头
- 响应拦截器：统一处理响应数据和错误
- 401 未授权自动登出（带防抖机制）
- 统一的成功/错误消息提示
- 支持 POST/PUT 参数自动转换

### 主要接口

> **注意**：以下接口为印易自助打印管理业务规划接口，**后端接口待确认**

| 模块 | 接口 | 说明 | 状态 |
|------|------|------|------|
| 认证 | POST /api/auth/admin | 管理员登录 | 后端接口待确认 |
| 认证 | GET /api/user/info | 获取用户信息 | 后端接口待确认 |
| 订单 | GET /api/admin/orders | 获取订单列表（管理员） | 后端接口待确认 |
| 订单 | GET /api/orders/:id | 获取订单详情 | 后端接口待确认 |
| 订单 | PUT /api/orders/:id/status | 更新订单状态 | 后端接口待确认 |
| 云印调度 | GET /api/dispatch/nodes | 获取节点列表 | 后端接口待确认 |
| 云印调度 | GET /api/dispatch/tasks | 获取任务列表 | 后端接口待确认 |
| 用户 | GET /api/users | 获取用户列表 | 后端接口待确认 |
| 商户 | GET /api/user/merchants | 获取商户列表 | 后端接口待确认 |
| 商户 | POST /api/user/merchants | 创建商户 | 后端接口待确认 |
| 系统 | GET /api/system/price-config | 获取价格配置 | 后端接口待确认 |
| 系统 | PUT /api/admin/price-config | 更新价格配置 | 后端接口待确认 |
| 收入 | GET /api/income | 获取总收入统计 | 后端接口待确认 |
| 收入 | GET /api/income/trend | 获取收入趋势数据 | 后端接口待确认 |
| 收入 | GET /api/income/merchant | 获取商户收入列表 | 后端接口待确认 |
| 收入 | GET /api/income/merchant/:id | 获取单个商户收入详情 | 后端接口待确认 |
| 收入 | GET /api/income/history | 获取收入历史记录 | 后端接口待确认 |
| 收入 | GET /api/income/export | 导出收入数据 | 后端接口待确认 |

### 现有接口

框架当前已实现的接口：

| 模块 | 接口 | 说明 |
|------|------|------|
| 认证 | POST /api/auth/login | 用户登录 |
| 认证 | GET /api/user/info | 获取用户信息 |

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
- [PrintEase-backend](../PrintEase-backend) - 印易后台
- [PrintEase-dispatch](../PrintEase-dispatch) - 云印调度
- [mpay](../mpay) - 印易支付系统

## License

MIT
