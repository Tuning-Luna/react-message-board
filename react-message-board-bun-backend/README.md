# React 留言板后端服务

基于 Bun 和 Express 构建的留言板后端 API 服务，提供留言的增删查改、点赞、管理员回复等功能。

## 项目简介

这是一个轻量级的留言板后端服务，使用 JSON 文件作为数据存储，支持：

- 📝 留言发布与管理
- 🔍 留言搜索与筛选（关键词、已回复/未回复状态）
- 📄 分页查询
- 🔄 排序功能（最新/最受欢迎）
- 👍 点赞功能
- 💬 管理员回复功能
- 🔐 管理员权限控制

## 技术栈

- **Bun** - 快速的全栈 JavaScript 运行时
- **Express** - Node.js Web 框架
- **TypeScript** - 类型安全的 JavaScript
- **CORS** - 跨域资源共享支持

## 安装依赖

```bash
bun install
```

## 运行项目

### 开发模式

```bash
bun run dev
```

### 生产模式

```bash
bun run start
# 或
bun run index.ts
```

服务器将在 `http://localhost:3000` 启动。

## API 接口文档

见：[API_DOC.md](./API_DOC.md)

## 数据存储

留言数据存储在项目根目录的 `messages.json` 文件中，采用 JSON 格式持久化。

## 注意事项

- 管理员 Token 为 `mock_admin_token`（生产环境请使用更安全的认证方式）
- 默认管理员账号：`admin` / `123456`
- 服务器默认运行在 `3000` 端口
