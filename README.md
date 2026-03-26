<img  src="https://www.qiniu.lingchen.kim/github-cover-light6.webp" />

印易自助打印管理后台，为系统管理员提供完整的运营管理功能。

## 项目状态

**待开发** - 此模块目前仅包含 README 文档，实际代码尚未实现。

管理后台的部分功能已在 [PrintEase-uniapp](../PrintEase-uniapp) 小程序中通过管理员页面实现。

## 技术栈（计划）

- **前端框架**: Vue 3 (Composition API)
- **UI 组件库**: Element Plus
- **开发语言**: TypeScript
- **构建工具**: Vite
- **路由**: Vue Router
- **状态管理**: Pinia
- **HTTP 客户端**: Axios
- **图表库**: ECharts

## 功能特性（计划）

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

## 项目结构（计划）

```
PrintEase-admin/
├── src/
│   ├── views/              # 页面组件
│   │   ├── dashboard/      # 仪表盘
│   │   │   └── index.vue
│   │   ├── order/          # 订单管理
│   │   │   ├── list.vue
│   │   │   └── detail.vue
│   │   ├── dispatch/       # 云印调度管理
│   │   │   ├── nodes.vue
│   │   │   └── tasks.vue
│   │   ├── user/           # 用户管理
│   │   │   └── list.vue
│   │   ├── merchant/       # 商户管理
│   │   │   ├── list.vue
│   │   │   └── create.vue
│   │   └── system/         # 系统设置
│   │       ├── price.vue
│   │       └── admin.vue
│   ├── components/         # 公共组件
│   │   ├── layout/         # 布局组件
│   │   │   ├── Sidebar.vue
│   │   │   └── Header.vue
│   │   └── common/         # 通用组件
│   ├── api/                # API 接口
│   │   ├── index.ts
│   │   ├── order.ts
│   │   ├── dispatch.ts
│   │   ├── user.ts
│   │   ├── merchant.ts
│   │   └── system.ts
│   ├── router/             # 路由配置
│   │   └── index.ts
│   ├── store/              # 状态管理
│   │   ├── index.ts
│   │   └── modules/
│   ├── utils/              # 工具函数
│   │   ├── request.ts
│   │   └── auth.ts
│   ├── types/              # TypeScript 类型定义
│   ├── App.vue
│   └── main.ts
├── public/                 # 静态资源
├── package.json
├── vite.config.ts
├── tsconfig.json
├── .env
├── .env.example
├── Dockerfile
├── Dockerfile.dev
└── README.md
```

## 快速开始（计划）

Development Framework: Vue3, TypeScript, Vite, Element-Plus, Tailwind CSS

Code Standards: Eslint, Prettier, Stylelint, Husky, Lint-staged, cz-git

## Preview

<kbd><img src="https://www.qiniu.lingchen.kim/github-c1.webp" alt="Light Theme"/></kbd>

<kbd><img src="https://www.qiniu.lingchen.kim/github-c2.webp" alt="Light Theme"/></kbd>

<kbd><img src="https://www.qiniu.lingchen.kim/github-c4.webp" alt="Dark Theme"/></kbd>

<kbd><img src="https://www.qiniu.lingchen.kim/github-c5.webp" alt="Dark Theme"/></kbd>

## Quick Access

[Live Demo](https://www.artd.pro) | [Official Documentation](https://www.artd.pro/docs) | [Changelog](./CHANGELOG.en.md)

## Installation & Setup

```bash
# Install dependencies
pnpm install

# If pnpm install fails, try using the command below
pnpm install --ignore-scripts

# Start local development environment
pnpm dev

# Build for production
pnpm build
```

## Clean Version

The project includes a cleanup script to quickly remove demo data and provide developers with a ready-to-develop base project

```bash
pnpm clean:dev
```

## Technical Support

QQ Group: <a href="https://qm.qq.com/cgi-bin/qm/qr?k=Gg6yzZLFaNgmRhK0T5Qcjf7-XcAFWWXm&jump_from=webapi&authKey=YpRKVJQyFKYbGTiKw0GJ/YQXnNF+GdXNZC5beQQqnGZTvuLlXoMO7nw5fNXvmVhA">1038930070</a> (Click the link to join the group chat)

## Browser Compatibility

### Docker 部署（计划）

## Contributing

We sincerely welcome and appreciate the support of every contributor! Whether you have new ideas, feature suggestions, or code optimizations, you can participate in the following ways:

## 环境变量配置（计划）

Create GitHub Issues: Provide bug feedback or new feature suggestions to help us improve together.

Every contribution you make takes this project one step further! Come join our open source community!

## API 接口（计划）

The project maintains active updates, supports the latest frontend tech stack, is compatible with mainstream frameworks, and ensures long-term stability and extensibility. Community-driven feedback mechanisms allow your needs to be quickly integrated into project iterations.

- 后端 API 地址: `http://localhost:3000/api`
- 认证方式: JWT Token

If you feel this project has reduced your development costs and solved problems in your work/life, you can support us through the following ways:

| 模块     | 接口                       | 说明         |
| -------- | -------------------------- | ------------ |
| 认证     | POST /api/auth/admin       | 管理员登录   |
| 订单     | GET /api/orders            | 获取订单列表 |
| 订单     | GET /api/orders/:id        | 获取订单详情 |
| 订单     | PUT /api/orders/:id/status | 更新订单状态 |
| 云印调度 | GET /api/dispatch/nodes    | 获取节点列表 |
| 云印调度 | GET /api/dispatch/tasks    | 获取任务列表 |
| 用户     | GET /api/users             | 获取用户列表 |
| 商户     | GET /api/merchants         | 获取商户列表 |
| 商户     | POST /api/merchants        | 创建商户     |
| 系统     | GET /api/system/price      | 获取价格配置 |
| 系统     | PUT /api/system/price      | 更新价格配置 |

## 开发规范（计划）

### 代码规范

- 使用 TypeScript 严格模式
- 遵循 Vue 3 Composition API 最佳实践
- 使用 ESLint 进行代码检查
- 使用 Prettier 格式化代码

### Git 提交规范

```
feat: 新功能
fix: 修复bug
docs: 文档更新
style: 代码格式调整
refactor: 重构
test: 测试相关
chore: 构建/工具相关
```

## 浏览器支持（计划）

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
