# React 留言板系统

一个基于现代 Web 技术栈构建的在线留言板系统，采用前后端分离架构，支持用户留言、管理员回复、邮件通知等功能。

## 📋 项目简介

这是一个功能完整的在线留言板系统，实现了课程设计《网上留言簿的设计与实现》的所有要求。系统采用前后端分离架构，前端使用 React + TypeScript 构建现代化用户界面，后端使用 Bun + Express 提供 RESTful API 服务。

### 核心功能

- **前台功能**：用户浏览留言、发布留言、搜索留言、点赞留言
- **后台功能**：管理员登录、回复留言、删除留言、邮件通知

## 🛠️ 技术栈

### 前端技术栈

- **框架**：React 19 + TypeScript
- **构建工具**：Vite 7
- **路由**：React Router 7
- **UI 组件库**：Flowbite React
- **样式框架**：Tailwind CSS 4
- **HTTP 客户端**：Axios
- **代码规范**：ESLint + Prettier

### 后端技术栈

- **运行时**：Bun（快速的全栈 JavaScript 运行时）
- **Web 框架**：Express 5
- **开发语言**：TypeScript 5
- **跨域支持**：CORS
- **数据存储**：JSON 文件（轻量级，适合演示项目）

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

## 📁 项目结构

```
react-message-board/
├── react-message-board-frontend/    # 前端项目
│   ├── src/
│   │   ├── api/                    # API 接口定义
│   │   ├── pages/                  # 页面组件
│   │   ├── router/                 # 路由配置
│   │   ├── svg/                    # SVG 图标组件
│   │   ├── types/                  # TypeScript 类型定义
│   │   ├── utils/                  # 工具函数
│   │   ├── App.tsx                 # 根组件
│   │   └── main.tsx                # 入口文件
│   ├── public/                     # 静态资源
│   ├── package.json
│   ├── vite.config.ts              # Vite 配置
│   └── README.md                   # 前端详细文档
│
├── react-message-board-bun-backend/ # 后端项目
│   ├── index.ts                    # 后端入口文件
│   ├── messages.json               # 数据存储文件
│   ├── package.json
│   ├── API_DOC.md                  # API 接口文档
│   └── README.md                   # 后端详细文档
│
├── docs/                           # 项目文档
│   ├── API_DOC.md                  # API 文档（汇总）
│   └── problem.md                  # 课程设计要求
│
└── README.md                       # 项目总览（本文件）
```

## 🚀 快速开始

### 环境要求

- **Node.js** >= 18.0.0
- **Bun** >= 1.0.0（用于运行后端）
- npm / yarn / pnpm（用于前端依赖管理）

### 安装步骤

#### 1. 克隆项目

```bash
git clone <repository-url>
cd react-message-board
```

#### 2. 安装后端依赖

```bash
cd react-message-board-bun-backend
bun install
```

#### 3. 安装前端依赖

```bash
cd ../react-message-board-frontend
npm install
# 或
yarn install
# 或
pnpm install
```

### 运行项目

#### 启动后端服务

```bash
cd react-message-board-bun-backend
bun run dev
```

后端服务将在 `http://localhost:3000` 启动。

#### 启动前端应用

```bash
cd react-message-board-frontend
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

前端应用将在 `http://localhost:5173` 启动，并自动在浏览器中打开。

### 默认配置

- **后端 API 地址**：`http://localhost:3000`
- **前端开发服务器**：`http://localhost:5173`
- **管理员账号**：
  - 用户名：`admin`
  - 密码：`123456`

## 📖 使用说明

### 用户操作

1. **浏览留言**

   - 访问首页（留言广场）查看所有留言
   - 使用搜索框输入关键词搜索留言
   - 选择排序方式（最新 / 最受欢迎）
   - 点击点赞按钮为留言点赞
   - 使用分页器翻页查看

2. **发布留言**
   - 点击导航栏的"我也要留言"
   - 填写必填项：昵称、标题、内容
   - （可选）填写邮箱，以便收到管理员回复通知
   - 点击"发布留言"提交

### 管理员操作

1. **登录**

   - 点击导航栏的"管理员登录"
   - 输入管理员账号和密码
   - 登录成功后自动跳转到管理员后台

2. **回复留言**

   - 在管理员后台找到要回复的留言
   - 在"管理员回复"文本框中输入回复内容
   - 点击"追加回复"按钮
   - 可以多次追加回复

3. **删除留言**

   - 在管理员后台找到要删除的留言
   - 点击"删除"按钮
   - 确认删除操作

4. **退出登录**
   - 点击右上角的"退出登录"按钮

## 🔧 开发说明

### 前端开发

详细的前端开发文档请查看：[react-message-board-frontend/README.md](./react-message-board-frontend/README.md)

**常用命令**：

```bash
npm run dev      # 开发模式
npm run build    # 构建生产版本
npm run preview  # 预览生产构建
npm run lint     # 代码检查
npm run format   # 代码格式化
```

### 后端开发

详细的后端开发文档请查看：[react-message-board-bun-backend/README.md](./react-message-board-bun-backend/README.md)

**常用命令**：

```bash
bun run dev      # 开发模式（自动重启）
bun run start    # 生产模式
```

### API 接口文档

详细的 API 接口文档请查看：

- [react-message-board-bun-backend/API_DOC.md](./react-message-board-bun-backend/API_DOC.md)
- [docs/API_DOC.md](./docs/API_DOC.md)

## 📝 课程设计说明

本项目实现了《网上留言簿的设计与实现》课程设计的所有要求：

### 设计要求

- ✅ 进行网上留言簿的需求分析和功能设计
- ✅ 在数据库中构建数据库、表或视图（本项目使用 JSON 文件存储，可轻松迁移到数据库）
- ✅ 根据网上留言薄的功能，设计各页面和脚本，掌握动态网页的制作技术
- ✅ 使用主流的前后端技术进行系统的美观设计与优化

### 设计内容

- ✅ **前台**：用户浏览、发布以及搜索留言部分的设计
- ✅ **后台**：管理员管理、回复留言部分的设计

### 思考题

1. **留言管理优化**：

   - 实现了分页功能，方便浏览大量留言
   - 支持按最新时间和最受欢迎排序
   - 支持关键词搜索，快速找到相关留言
   - 管理员可以筛选已回复/未回复的留言

2. **邮件通知功能**：
   - 当管理员回复留言时，如果用户提供了邮箱，系统会自动发送邮件通知
   - 提高了用户体验和系统的实用性

## ⚙️ 配置说明

### 修改后端 API 地址

如果需要修改后端 API 地址，请编辑前端项目中的 `src/utils/request.ts` 文件：

```typescript
const request: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000", // 修改为你的后端地址
  timeout: 10000,
  // ...
})
```

### 修改后端端口

后端默认运行在 3000 端口，如需修改，请编辑 `react-message-board-bun-backend/index.ts` 文件。

## 📄 许可证

本项目采用 MIT 许可证，详见 [LICENSE](./LICENSE) 文件。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📚 相关文档

- [前端详细文档](./react-message-board-frontend/README.md)
- [后端详细文档](./react-message-board-bun-backend/README.md)
- [API 接口文档](./docs/API_DOC.md)
- [课程设计要求](./docs/problem.md)
