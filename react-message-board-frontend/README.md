# React 留言板系统

一个基于 React + TypeScript + Vite 构建的现代化留言板系统前端应用。

## 📋 项目简介

这是一个功能完整的留言板系统前端项目，用户可以浏览留言、发布新留言、点赞留言，管理员可以登录后台进行留言管理和回复。界面简洁美观，交互流畅。

## ✨ 功能特性

### 用户功能

- 📝 **发布留言**：支持填写昵称、标题、内容和邮箱（选填）
- 🔍 **搜索留言**：支持关键词搜索，可匹配内容、标题、昵称
- 📊 **排序功能**：支持按最新时间或最受欢迎排序
- 👍 **点赞功能**：为喜欢的留言点赞
- 📄 **分页浏览**：支持分页查看留言列表

### 管理员功能

- 🔐 **管理员登录**：使用账号密码登录管理员后台
- 💬 **回复留言**：管理员可以对留言进行回复（支持追加多条回复）
- 🗑️ **删除留言**：管理员可以删除不当留言
- 📧 **邮件通知**：当管理员回复留言时，如果用户提供了邮箱，会自动发送邮件通知

## 🛠️ 技术栈

- **框架**：React 19 + TypeScript
- **构建工具**：Vite 7
- **路由**：React Router 7
- **UI 组件库**：Flowbite React
- **样式**：Tailwind CSS 4
- **HTTP 客户端**：Axios
- **代码规范**：ESLint + Prettier

## 📦 安装与运行

### 环境要求

- Node.js >= 18.0.0
- npm 或 yarn 或 pnpm

### 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 开发运行

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

启动后，应用会在浏览器中自动打开（默认地址：`http://localhost:5173`）

### 构建生产版本

```bash
npm run build
# 或
yarn build
# 或
pnpm build
```

### 预览生产构建

```bash
npm run preview
# 或
yarn preview
# 或
pnpm preview
```

### 代码检查

```bash
npm run lint
# 或
yarn lint
# 或
pnpm lint
```

### 代码格式化

```bash
npm run format
# 或
yarn format
# 或
pnpm format
```

## ⚙️ 配置说明

### API 配置

项目默认连接的后端 API 地址为 `http://localhost:3000`，如需修改，请编辑 [src/utils/request.ts](./src/utils/request.ts)
文件：

```typescript
const request: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000", // 修改为你的后端地址
  timeout: 10000,
  // ...
})
```

### 管理员账号

默认管理员账号：

- 用户名：`admin`
- 密码：`123456`

> 注意：管理员账号由后端配置，如需修改请联系后端开发者。

## 📁 项目结构

```
react-message-board-frontend/
├── public/                 # 静态资源
├── src/
│   ├── api/               # API 接口定义
│   │   ├── admin.ts       # 管理员相关接口
│   │   └── messages.ts    # 留言相关接口
│   ├── pages/             # 页面组件
│   │   ├── Messages.tsx   # 留言广场页面
│   │   ├── NewMessage.tsx # 发布留言页面
│   │   └── Admin.tsx      # 管理员后台页面
│   ├── router/            # 路由配置
│   ├── svg/               # SVG 图标组件
│   ├── types/             # TypeScript 类型定义
│   ├── utils/             # 工具函数
│   │   ├── request.ts     # Axios 请求封装
│   │   └── errorToast.ts  # 错误提示工具
│   ├── App.tsx            # 根组件
│   └── main.tsx           # 入口文件
├── index.html
├── package.json
├── vite.config.ts         # Vite 配置
├── tsconfig.json          # TypeScript 配置
└── README.md
```

## 📝 注意事项

1. **后端服务**：确保后端 API 服务已启动并运行在 `http://localhost:3000`
2. **跨域问题**：如果前后端不在同一域名，需要后端配置 CORS
3. **Token 存储**：管理员登录后的 token 会保存在浏览器的 localStorage 中
4. **API 文档**：详细的 API 接口文档请查看 [API_DOC.md](../docs/API_DOC.md)

## 📄 许可证

本项目采用 MIT 许可证，详见 [LICENSE](LICENSE) 文件。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！
