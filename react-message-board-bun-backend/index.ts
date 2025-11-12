import express from "express"
import cors from "cors"
import fs from "fs"
import path from "path"

const app = express()
app.use(cors())
app.use(express.json())

// 统一返回格式的函数
function ok(data: unknown, msg = "操作成功") {
  return { code: 1, data, msg }
}
function error(msg: string) {
  return { code: 0, data: null, msg }
}

// 模拟数据库文件
const DB_PATH = path.resolve("./messages.json")

interface Message {
  id: number
  nickname: string
  title?: string
  email?: string
  content: string
  reply?: string
  createdAt: string
  updatedAt?: string
  repliedAt?: string
}

type DB = Message[]

// 读写 JSON 文件
function readDB(): DB {
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify({ messages: [] }, null, 2))
  }
  return JSON.parse(fs.readFileSync(DB_PATH, "utf8")) as DB
}

function writeDB(db: DB) {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2))
}

// 模拟管理员 token
const ADMIN_TOKEN = "mock_admin_token"

// 创建路由
const router = express.Router()

// 1.分页 + 筛选查询留言列表
router.get("/messages", (req, res) => {
  const {
    page = "1",
    limit = "10",
    keyword = "",
    sort = "newest",
    replied,
  } = req.query
  const db = readDB()
  let list = db

  // 模糊查询
  if (keyword) {
    const kw = (keyword as string).toLowerCase()
    list = list.filter(
      (m) =>
        m.nickname.toLowerCase().includes(kw) ||
        m.title?.toLowerCase().includes(kw) ||
        m.content.toLowerCase().includes(kw)
    )
  }

  // 是否筛选已回复
  if (replied === "true") list = list.filter((m) => !!m.reply)
  if (replied === "false") list = list.filter((m) => !m.reply)

  // 排序
  if (sort === "oldest")
    list.sort((a, b) => +new Date(a.createdAt) - +new Date(b.createdAt))
  else list.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))

  // 分页
  const p = parseInt(page as string)
  const l = parseInt(limit as string)
  const total = list.length
  const sliced = list.slice((p - 1) * l, p * l)

  res.send(ok({ total, page: p, limit: l, list: sliced }, "查询成功"))
})

// 2. 根据 ID 查询留言详情
router.get("/messages/:id", (req, res) => {
  const db = readDB()
  const msg = db.find((m) => m.id === Number(req.params.id))
  if (!msg) return res.send(error("留言不存在"))
  res.send(ok(msg, "获取成功"))
})

// 3. 发布留言
router.post("/messages", (req, res) => {
  const { nickname, title, email, content } = req.body
  if (!nickname || !content || !title)
    return res.send(error("昵称,内容和标题必填"))

  // 验证邮箱
  if (email && !/^[\w.-]+@[\w.-]+\.\w+$/.test(email))
    return res.send(error("邮箱格式不正确"))

  const db = readDB()
  const now = new Date().toISOString().replace("T", " ").substring(0, 19)
  const newMsg: Message = {
    id: Date.now(),
    nickname,
    title,
    email,
    content,
    createdAt: now,
  }
  // 类型“DB”上不存在属性“push”。ts(2339)
  db.push(newMsg)
  writeDB(db)
  res.send(ok({ id: newMsg.id, createdAt: now }, "留言成功"))
})

// 4.管理员回复留言
router.post("/messages/:id/reply", (req, res) => {
  const token = req.headers.authorization
  if (token !== ADMIN_TOKEN) return res.send(error("未登录或权限不足"))

  const { reply } = req.body
  const db = readDB()
  const msg = db.find((m) => m.id === Number(req.params.id))
  if (!msg) return res.send(error("留言不存在"))

  msg.reply = reply
  msg.repliedAt = new Date().toISOString().replace("T", " ").substring(0, 19)
  msg.updatedAt = msg.repliedAt
  writeDB(db)

  res.send(ok({ id: msg.id, repliedAt: msg.repliedAt }, "回复成功"))
})

// 5. 删除留言
router.delete("/messages/:id", (req, res) => {
  const token = req.headers.authorization
  if (token !== ADMIN_TOKEN) return res.send(error("未登录或权限不足"))

  const db = readDB()
  const index = db.findIndex((m) => m.id === Number(req.params.id))
  if (index === -1) return res.send(error("留言不存在或未授权"))

  db.splice(index, 1)
  writeDB(db)
  res.send(ok(null, "删除成功"))
})

// 6. 管理员登录
router.post("/admin/login", (req, res) => {
  const { username, password } = req.body
  if (username === "admin" && password === "123456") {
    res.send(ok({ token: ADMIN_TOKEN }, "登录成功"))
  } else {
    res.send(error("账号或密码错误"))
  }
})

// 测试接口
router.get("/", (req, res) => {
  res.send(ok("test"))
})

// 注册 /api 路由前缀
app.use("/api", router)

// 全局 404 兜底
app.use((req, res) => {
  res.status(404).send(error("Not found"))
})

// 启动服务器
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000")
})
