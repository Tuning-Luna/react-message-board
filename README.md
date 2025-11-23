# React 留言板系统

一个基于现代 Web 技术栈构建的在线留言板系统，采用前后端分离架构，支持用户留言、管理员回复、邮件通知等功能。

## 📋 项目简介

这是一个功能完整的在线留言板系统，实现了[课程设计《网上留言簿的设计与实现》](./docs/problem.md)的所有要求。系统采用前后端分离架构，前端使用主流组合 `React` + `TypeScript` + `TailwindCSS` 构建现代化用户界面。项目提供了两个后端实现方案：

- **Bun 后端**：轻量级实现，使用 `Bun` + `Express` + `TypeScript`，数据存储在 JSON 文件中，适合快速开发和演示
- **Java 后端**：企业级微服务架构，使用 `Spring Cloud` + `MySQL`，采用微服务架构设计，适合生产环境

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

#### Bun 后端（轻量级方案）

- **运行时**：Bun（快速的全栈 JavaScript 运行时）
- **Web 框架**：Express 5
- **开发语言**：TypeScript 5
- **跨域支持**：CORS
- **数据存储**：JSON 文件（轻量级，适合演示项目）

#### Java 后端（微服务方案）

- **核心框架**：Spring Boot 2.7.12 + Spring Cloud 2021.0.3
- **微服务组件**：Spring Cloud Alibaba 2021.0.4.0
- **服务注册与发现**：Nacos
- **API 网关**：Spring Cloud Gateway
- **服务间通信**：OpenFeign + LoadBalancer
- **数据持久层**：MyBatis-Plus 3.5.3.1
- **数据库**：MySQL 8.0
- **安全认证**：JWT + Spring Security
- **工具库**：Hutool 5.8.11 + Lombok
- **开发语言**：Java 11
- **构建工具**：Maven

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
├── react-message-board-bun-backend/ # Bun 后端项目（轻量级）
│   ├── index.ts                    # 后端入口文件
│   ├── messages.json               # 数据存储文件
│   ├── package.json
│   ├── API_DOC.md                  # API 接口文档
│   └── README.md                   # 后端详细文档
│
├── react-message-board-java-backend/ # Java 后端项目（微服务）
│   ├── guestbook-api/              # API 定义模块
│   ├── admin-service/              # 管理员服务
│   ├── user-service/               # 用户服务
│   ├── guestbook-gateway/          # API 网关
│   ├── guestbook-common/           # 通用模块
│   ├── pom.xml                     # Maven 父项目配置
│   └── README.md                   # Java 后端详细文档
│
├── docs/                           # 项目文档
│   ├── API_DOC.md                  # API 文档（汇总）
│   └── problem.md                  # 课程设计要求
│
└── README.md                       # 项目总览（本文件）
```

## 🚀 快速开始

### 环境要求

#### 前端环境

- **Node.js** >= 18.0.0
- npm / yarn / pnpm（用于前端依赖管理）

#### Bun 后端环境

- **Bun** >= 1.0.0

#### Java 后端环境

- **JDK** 11+
- **Maven** 3.6+
- **MySQL** 5.7+ 或 8.0+
- **Nacos** 2.0+（服务注册与发现、配置中心）

### 安装步骤

#### 1. 克隆项目

```bash
git clone https://github.com/Tuning-Luna/react-message-board
cd react-message-board
```

#### 2. 选择后端方案并安装依赖

**方案一：使用 Bun 后端（推荐用于快速开发）**

```bash
cd ./react-message-board-bun-backend
bun install
```

**方案二：使用 Java 后端（推荐用于生产环境）**

```bash
cd ./react-message-board-java-backend
mvn clean install
```

> **注意**：使用 Java 后端前，请确保已安装并启动 MySQL 和 Nacos 服务。详细配置请查看 [Java 后端文档](./react-message-board-java-backend/README.md)。

#### 3. 安装前端依赖（如果有 Bun 环境也可替换成 Bun 指令）

```bash
cd ./react-message-board-frontend
npm install
# 或
yarn install
# 或
pnpm install
```

### 运行项目

#### 启动后端服务

**使用 Bun 后端：**

```bash
cd react-message-board-bun-backend
bun run dev
```

Bun 后端服务将在 `http://localhost:3000` 启动。

**使用 Java 后端：**

1. **启动 Nacos 服务**（如果尚未启动）

   ```bash
   # Windows
   startup.cmd -m standalone
   # Linux/Mac
   sh startup.sh -m standalone
   ```

2. **启动各个微服务**（按顺序启动）

   ```bash
   cd react-message-board-java-backend

   # 1. 启动用户服务
   cd user-service
   mvn spring-boot:run

   # 2. 启动管理员服务（新终端）
   cd admin-service
   mvn spring-boot:run

   # 3. 启动网关服务（新终端）
   cd guestbook-gateway
   mvn spring-boot:run
   ```

   Java 后端网关将在 `http://localhost:8080` 启动。

> **提示**：Java 后端需要先配置数据库连接和 Nacos 连接信息，详细配置请查看 [Java 后端文档](./react-message-board-java-backend/README.md)。

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

#### Bun 后端配置

- **后端 API 地址**：`http://localhost:3000`
- **管理员账号**：
  - 用户名：`admin`
  - 密码：`123456`

#### Java 后端配置

- **网关地址**：`http://localhost:8080`
- **API 前缀**：`/api`
- **管理员账号**：
  - 用户名：`admin`
  - 密码：`123456`

#### 前端配置

- **前端开发服务器**：`http://localhost:5173`
- **API 地址配置**：根据使用的后端方案，修改 `react-message-board-frontend/src/utils/request.ts` 中的 `baseURL`

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

#### Bun 后端开发

详细文档请查看：[react-message-board-bun-backend/README.md](./react-message-board-bun-backend/README.md)

**常用命令**：

```bash
bun run dev      # 开发模式（自动重启）
bun run start    # 生产模式
```

#### Java 后端开发

详细文档请查看：[react-message-board-java-backend/README.md](./react-message-board-java-backend/README.md)

**常用命令**：

```bash
# 编译项目
mvn clean compile

# 运行单个服务
cd user-service
mvn spring-boot:run

# 打包项目
mvn clean package

# 跳过测试打包
mvn clean package -DskipTests
```

**模块说明**：

- `guestbook-api`：API 定义模块，包含 Feign Client、DTO、VO 等
- `user-service`：用户服务，处理留言的增删改查、点赞、搜索等
- `admin-service`：管理员服务，处理管理员登录、回复留言、邮件通知等
- `guestbook-gateway`：API 网关，处理路由转发、认证授权、跨域等
- `guestbook-common`：通用模块，包含公共配置和依赖

### API 接口文档

详细的 API 接口文档请查看：

[API_DOC.md](./docs/API_DOC.md)

## 📝 课程设计说明

本项目实现了[《网上留言簿的设计与实现》课程设计](./docs/problem.md)的所有要求：

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

前端需要根据使用的后端方案配置 API 地址，编辑 [src/utils/request.ts](./react-message-board-frontend/src/utils/request.ts) 文件：

```typescript
const request: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000", // Bun 后端地址
  // 或
  // baseURL: "http://localhost:8080/api", // Java 后端网关地址
  timeout: 10000,
  // ...
})
```

### 修改后端端口

#### Bun 后端端口

Bun 后端默认运行在 3000 端口，如需修改，请编辑 [react-message-board-bun-backend/index.ts](./react-message-board-bun-backend/index.ts) 文件。

#### Java 后端端口

Java 后端各服务的端口配置在各自的 `application.yaml` 文件中：

- 网关服务：`react-message-board-java-backend/guestbook-gateway/src/main/resources/application.yaml`
- 用户服务：`react-message-board-java-backend/user-service/src/main/resources/application.yaml`
- 管理员服务：`react-message-board-java-backend/admin-service/src/main/resources/application.yaml`

## 📄 许可证

本项目采用 MIT 许可证，详见 [LICENSE](./LICENSE) 文件。

## 📚 相关文档

- [前端详细文档](./react-message-board-frontend/README.md)
- [Bun 后端详细文档](./react-message-board-bun-backend/README.md)
- [Java 后端详细文档](./react-message-board-java-backend/README.md)
- [API 接口文档](./docs/API_DOC.md)
- [课程设计要求](./docs/problem.md)

## 🔄 后端方案选择

本项目提供了两个后端实现方案，您可以根据需求选择合适的方案：

| 特性         | Bun 后端       | Java 后端            |
| ------------ | -------------- | -------------------- |
| **架构**     | 单体应用       | 微服务架构           |
| **数据存储** | JSON 文件      | MySQL 数据库         |
| **启动速度** | 快速           | 需要启动多个服务     |
| **适用场景** | 快速开发、演示 | 生产环境、企业级应用 |
| **扩展性**   | 简单           | 高（微服务架构）     |
| **学习成本** | 低             | 中高                 |
| **依赖服务** | 无             | MySQL + Nacos        |

**推荐选择**：

- 如果您想快速体验项目功能，推荐使用 **Bun 后端**
- 如果您需要部署到生产环境或学习微服务架构，推荐使用 **Java 后端**
