------

# 网上留言簿系统接口文档

> **接口前缀**：约定每个前缀都以`/api`开头，前后端可以配置在全局

------

## 统一返回格式规范

| 字段   | 类型                  | 说明             |
| ------ | --------------------- | ---------------- |
| `code` | int                   | 1：成功；0：失败 |
| `msg`  | string                | 返回提示信息     |
| `data` | object / array / null | 实际返回数据     |

示例：

```json
{
  "code": 1,
  "msg": "操作成功",
  "data": {
    "id": 101
  }
}
```

------



## 鉴权设计

- 谁都可以发布留言，不用登录
- 要回复或者删除留言。需要登录管理员账号,默认是：admin  123456。可以后端设置



## 1. 分页 + 筛选查询留言列表

### 请求URL

`GET /api/messages`

### 请求参数（Query）

| 参数名     | 类型   | 必填 | 说明                                |
| ---------- | ------ | ---- | ----------------------------------- |
| `page`     | int    | 否   | 页码，默认 1                        |
| `pageSize` | int    | 否   | 每页数量，默认 10                   |
| `keyword`  | string | 否   | 搜索关键词（匹配内容/标题/昵称）    |
| `sort`     | string | 否   | 排序方式: newest(默认) \| mostLiked |

### 返回示例

```json
{
  "code": 1,
  "msg": "查询成功",
  "data": {
    "total": 56,
    "page": 1,
    "pageSize": 10,
    "list": [
      {
        "id": 101,
        "nickname": "Luna",
        "email": "example@mail.com",
        "title":"留言标题",
        "content": "留言内容",
        "likes":123,
        "reply": ["管理员回复内容1","管理员回复内容2"],
        "createdAt": "2025-11-12 08:20:00"
      }
    ]
  }
}
```

------

## 2. 根据 ID 查询留言详情

### 请求URL

`GET /api/messages/:id`

### 路径参数（Path）

| 参数名 | 类型 | 必填 | 说明   |
| ------ | ---- | ---- | ------ |
| `id`   | int  | 是   | 留言ID |

### 返回示例

```json
{
  "code": 1,
  "msg": "获取成功",
  "data": {
    "id": 101,
    "nickname": "Luna",
    "email": "example@mail.com",
    "title":"留言标题",
    "content": "留言内容",
    "likes":123,
    "reply": ["管理员回复内容1","管理员回复内容2"],
    "createdAt": "2025-11-12 08:20:00"
  }
}
```

------

## 3. 发布留言

### 请求URL

`POST /api/messages`

### 请求体(Request body)

| 参数名   | 类型   | 必填 | 说明                       |
| -------- | ------ | ---- | -------------------------- |
| nickname | string | 是   | 留言者昵称                 |
| title    | string | 是   | 留言标题                   |
| email    | string | 否   | 留言者邮箱，可用于回复通知 |
| content  | string | 是   | 留言内容                   |

```json
{
  "nickname": "Luna",
  "title":"留言标题",
  "email": "example@mail.com",
  "content": "留言的内容"
}
```

### 返回示例

```json
{
  "code": 1,
  "msg": "留言成功",
}
```

### 失败示例

```json
{
  "code": 0,
  "msg": "邮箱格式不正确"
}
```

------

## 4. 点赞留言

### 请求URL

```
POST /api/messages/:id/like
```

------

### 请求参数（Params）

| 参数名 | 类型 | 必填 | 说明            |
| ------ | ---- | ---- | --------------- |
| `id`   | int  | 是   | 要点赞的留言 ID |

------

### 返回示例

```json
{
  "code": 1,
  "msg": "点赞成功",
}
```

### 失败示例

```json
{
  "code": 0,
  "msg": "留言不存在"
}
```

## 5.管理员回复留言

### 请求URL

`POST /api/messages/:id/reply`

**需要管理员登录**

### Header

```
Authorization:<token>
```

### 请求体(Request body)

| 参数名 | 类型   | 必填 | 说明                   |
| ------ | ------ | ---- | ---------------------- |
| reply  | string | 是   | 管理员对留言的回复内容 |

```json
{
  "reply": "谢谢您的建议，我们会改进！"
}
```

### 返回示例

```json
{
  "code": 1,
  "msg": "回复成功"
}
```

### 失败示例

```json
{
  "code": 0,
  "msg": "未登录或权限不足"
}
```

------



## 6. 删除留言

### 请求URL

`DELETE /api/messages/:id`

**需要管理员登录**

### Header

```
Authorization:<token>
```

### 路径参数（Path）

| 参数名 | 类型 | 必填 | 说明   |
| ------ | ---- | ---- | ------ |
| `id`   | int  | 是   | 留言ID |

### 返回示例

```json
{
  "code": 1,
  "msg": "删除成功"
}
```

### 失败示例

```json
{
  "code": 0,
  "msg": "留言不存在或未授权"
}
```

------

## 6. 管理员登录

### 请求URL

`POST /api/admin/login`

### 请求体

| 参数名   | 类型   | 必填 | 说明       |
| -------- | ------ | ---- | ---------- |
| username | string | 是   | 管理员账号 |
| password | string | 是   | 管理员密码 |

```json
{
  "username": "admin",
  "password": "123456"
}
```

### 返回示例

```json
{
  "code": 1,
  "msg": "登录成功",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5c..."
  }
}
```

### 失败示例

```json
{
  "code": 0,
  "msg": "账号或密码错误"
}
```

------

## 7. 邮件通知接口

**不需要接口，在调用回复留言接口的时候，后端查找email字段，如果有就发送邮件通知**

------

