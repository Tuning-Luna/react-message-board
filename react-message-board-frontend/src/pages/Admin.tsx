import { useState, useEffect, useMemo } from "react"
import {
  Card,
  Button,
  Label,
  TextInput,
  Textarea,
  Alert,
  Pagination,
} from "flowbite-react"
import { adminLogin } from "../api/admin"
import {
  getMessages,
  replyMessage,
  deleteMessage as deleteMessageApi,
} from "../api/messages"
import type { Message } from "../types/messages"

const TOKEN_KEY = "admin_token"
const ITEMS_PER_PAGE = 5

export default function Admin() {
  const [token, setToken] = useState<string | null>(() => {
    // 初始化时从 localStorage 读取 token
    return localStorage.getItem(TOKEN_KEY)
  })
  const [messages, setMessages] = useState<Message[]>([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [loginError, setLoginError] = useState("")
  const [loading, setLoading] = useState(false)
  const [replyDrafts, setReplyDrafts] = useState<Record<number, string>>({})
  const [actionNotice, setActionNotice] = useState<{
    type: "success" | "failure"
    message: string
  } | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState(0)

  // 获取留言列表
  const fetchMessages = async () => {
    if (!token) return
    setLoading(true)
    try {
      const response = await getMessages({
        page: currentPage,
        pageSize: ITEMS_PER_PAGE,
      })
      setMessages(response.list)
      setTotal(response.total)
    } catch (error) {
      console.error("获取留言列表失败:", error)
    } finally {
      setLoading(false)
    }
  }

  // 当 token 存在且页面变化时，重新获取留言列表
  useEffect(() => {
    if (token) {
      fetchMessages()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, currentPage])

  // 计算分页数据
  const paginatedMessages = useMemo(() => {
    return messages
  }, [messages])

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE)

  // 当消息数量变化时，如果当前页超出范围，重置到第一页
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1)
    }
  }, [totalPages, currentPage])

  const notify = (type: "success" | "failure", message: string) => {
    setActionNotice({ type, message })
    setTimeout(() => setActionNotice(null), 2500)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError("")

    if (!username.trim() || !password.trim()) {
      setLoginError("用户名和密码均不能为空")
      return
    }

    setIsLoggingIn(true)
    try {
      // 调用登录 API
      const response = await adminLogin({
        username: username.trim(),
        password: password.trim(),
      })
      const newToken = response.token
      setToken(newToken)
      // 保存 token 到 localStorage
      localStorage.setItem(TOKEN_KEY, newToken)
      notify("success", "登录成功，已获取管理员权限")
      // 登录成功后获取留言列表
      await fetchMessages()
    } catch (error) {
      console.error("登录失败：", error)
      // 错误提示已由拦截器处理，这里只设置本地错误
      setLoginError("登录失败，请检查用户名和密码")
    } finally {
      setIsLoggingIn(false)
    }
  }

  const handleLogout = () => {
    setToken(null)
    setUsername("")
    setPassword("")
    setReplyDrafts({})
    // 清除 localStorage 中的 token
    localStorage.removeItem(TOKEN_KEY)
    notify("success", "已退出管理员登录")
  }

  const handleReplyChange = (id: number, value: string) => {
    setReplyDrafts((prev) => ({ ...prev, [id]: value }))
  }

  const handleSaveReply = async (id: number) => {
    const draft = replyDrafts[id]
    if (!draft?.trim()) {
      notify("failure", "回复内容不能为空")
      return
    }

    try {
      await replyMessage(id, { reply: draft.trim() })
      // 清空草稿
      setReplyDrafts((prev) => {
        const updated = { ...prev }
        delete updated[id]
        return updated
      })
      notify("success", "回复已保存")
      // 重新获取留言列表以更新回复
      await fetchMessages()
    } catch (error) {
      console.error("回复失败:", error)
      // 错误提示已由拦截器处理
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteMessageApi(id)
      setReplyDrafts((prev) => {
        const updated = { ...prev }
        delete updated[id]
        return updated
      })
      notify("success", "留言已删除")
      // 重新获取留言列表
      await fetchMessages()
    } catch (error) {
      console.error("删除失败:", error)
      // 错误提示已由拦截器处理
    }
  }

  const noticeNode = actionNotice && (
    <div className="pointer-events-none fixed top-24 right-4 z-50 w-72 max-w-full">
      <Alert
        color={actionNotice.type === "success" ? "success" : "failure"}
        className="shadow-lg"
      >
        {actionNotice.message}
      </Alert>
    </div>
  )

  if (!token) {
    return (
      <>
        {noticeNode}
        <div className="mx-auto max-w-md p-4">
          <Card>
            <h2 className="mb-4 text-2xl font-bold">管理员登录</h2>
            <p className="mb-4 rounded-lg bg-blue-50 p-3 text-sm text-blue-600">
              测试账号：<span className="font-semibold">admin</span> / 密码：
              <span className="font-semibold">123456</span>
            </p>
            {loginError && (
              <Alert color="failure" className="mb-4">
                {loginError}
              </Alert>
            )}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="username" className="mb-2">
                  用户名
                </Label>
                <TextInput
                  id="username"
                  placeholder="请输入管理员用户名"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="password" className="mb-2">
                  密码
                </Label>
                <TextInput
                  id="password"
                  type="password"
                  placeholder="请输入密码"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" disabled={isLoggingIn} className="w-full">
                {isLoggingIn ? "登录中..." : "登录"}
              </Button>
            </form>
          </Card>
        </div>
      </>
    )
  }

  return (
    <>
      {noticeNode}
      <div className="mx-auto max-w-4xl space-y-6 p-4">
        <Card>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold">管理员后台</h2>
              <p className="text-sm text-gray-500">已登录管理员账号</p>
            </div>
            <Button color="light" onClick={handleLogout}>
              退出登录
            </Button>
          </div>
        </Card>

        {loading ? (
          <Card>
            <p className="text-center text-gray-500">加载中...</p>
          </Card>
        ) : messages.length === 0 ? (
          <Card>
            <p className="text-center text-gray-500">
              暂无留言，去休息一下吧 🎉
            </p>
          </Card>
        ) : (
          <>
            {paginatedMessages.map((msg) => {
              const draft = replyDrafts[msg.id] ?? ""
              return (
                <Card>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">{msg.title}</h3>
                      <p className="text-sm text-gray-500">
                        来自 {msg.nickname} · {msg.createdAt}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDelete(msg.id)}
                      className="rounded bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-red-700 focus:outline-none"
                    >
                      删除
                    </button>
                  </div>

                  <p className="mt-3 text-gray-700">{msg.content}</p>

                  {msg.reply && msg.reply.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {msg.reply.map((replyText, idx) => (
                        <div
                          key={idx}
                          className="rounded border-l-4 border-blue-600 bg-blue-50 p-3 text-sm text-blue-700"
                        >
                          <span className="font-semibold">已发布回复：</span>
                          {replyText}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-4 space-y-2">
                    <Label htmlFor={`reply-${msg.id}`} className="font-medium">
                      管理员回复
                    </Label>
                    <Textarea
                      id={`reply-${msg.id}`}
                      rows={4}
                      placeholder="输入新的管理员回复内容（将追加到现有回复）"
                      value={draft}
                      onChange={(e) =>
                        handleReplyChange(msg.id, e.target.value)
                      }
                    />
                    <div className="flex flex-wrap gap-3">
                      <Button onClick={() => handleSaveReply(msg.id)}>
                        追加回复
                      </Button>
                      <Button
                        color="light"
                        onClick={() => handleReplyChange(msg.id, "")}
                      >
                        清空
                      </Button>
                    </div>
                  </div>
                </Card>
              )
            })}
            {totalPages > 1 && (
              <div className="flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  showIcons
                  previousLabel="上一页"
                  nextLabel="下一页"
                />
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}
