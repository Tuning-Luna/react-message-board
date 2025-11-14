import { useState } from "react"
import { Card, Button, Label, TextInput, Textarea, Alert } from "flowbite-react"

interface Message {
  id: number
  title: string
  content: string
  nickname: string
  time: string
  likes: number
  adminReply?: string
}

const mockMessages: Message[] = [
  {
    id: 1,
    title: "你好！",
    content: "这是第一条留言",
    nickname: "Alice",
    time: "2025-11-14 09:00",
    likes: 10,
    adminReply: "谢谢你的留言！",
  },
  {
    id: 2,
    title: "测试留言",
    content: "这是第二条留言",
    nickname: "Bob",
    time: "2025-11-14 09:30",
    likes: 5,
  },
  {
    id: 3,
    title: "问题反馈",
    content: "请问什么时候能回复？",
    nickname: "Charlie",
    time: "2025-11-14 10:15",
    likes: 3,
  },
]

export default function Admin() {
  const [token, setToken] = useState<string | null>(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [loginError, setLoginError] = useState("")

  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [replyDrafts, setReplyDrafts] = useState<Record<number, string>>({})
  const [actionNotice, setActionNotice] = useState<{
    type: "success" | "failure"
    message: string
  } | null>(null)

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
      // TODO: 调用真实的登录 API
      await new Promise((resolve) => setTimeout(resolve, 800))

      if (username === "admin" && password === "123456") {
        setToken("mock-token-123")
        notify("success", "登录成功，已获取管理员权限")
      } else {
        setLoginError("用户名或密码错误")
      }
    } catch (error) {
      console.error("登录失败：", error)
      setLoginError("登录失败，请稍后再试")
    } finally {
      setIsLoggingIn(false)
    }
  }

  const handleLogout = () => {
    setToken(null)
    setUsername("")
    setPassword("")
    setReplyDrafts({})
    notify("success", "已退出管理员登录")
  }

  const handleReplyChange = (id: number, value: string) => {
    setReplyDrafts((prev) => ({ ...prev, [id]: value }))
  }

  const handleSaveReply = (id: number) => {
    const draft = replyDrafts[id]
    if (!draft?.trim()) {
      notify("failure", "回复内容不能为空")
      return
    }

    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id ? { ...msg, adminReply: draft.trim() } : msg,
      ),
    )
    notify("success", "回复已保存")
  }

  const handleDelete = (id: number) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id))
    setReplyDrafts((prev) => {
      const updated = { ...prev }
      delete updated[id]
      return updated
    })
    notify("success", "留言已删除")
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
              <p className="text-sm text-gray-500">
                已使用模拟 token：<span className="font-mono">{token}</span>
              </p>
            </div>
            <Button color="light" onClick={handleLogout}>
              退出登录
            </Button>
          </div>
        </Card>

        {messages.length === 0 ? (
          <Card>
            <p className="text-center text-gray-500">
              暂无留言，去休息一下吧 🎉
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => {
              const draft = replyDrafts[msg.id] ?? msg.adminReply ?? ""
              return (
                <Card key={msg.id}>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">{msg.title}</h3>
                      <p className="text-sm text-gray-500">
                        来自 {msg.nickname} · {msg.time}
                      </p>
                    </div>
                    <Button
                      color="failure"
                      onClick={() => handleDelete(msg.id)}
                    >
                      删除
                    </Button>
                  </div>

                  <p className="mt-3 text-gray-700">{msg.content}</p>

                  {msg.adminReply && (
                    <div className="mt-3 rounded border-l-4 border-blue-600 bg-blue-50 p-3 text-sm text-blue-700">
                      <span className="font-semibold">已发布回复：</span>
                      {msg.adminReply}
                    </div>
                  )}

                  <div className="mt-4 space-y-2">
                    <Label htmlFor={`reply-${msg.id}`} className="font-medium">
                      管理员回复
                    </Label>
                    <Textarea
                      id={`reply-${msg.id}`}
                      rows={4}
                      placeholder="输入或编辑管理员回复内容"
                      value={draft}
                      onChange={(e) =>
                        handleReplyChange(msg.id, e.target.value)
                      }
                    />
                    <div className="flex flex-wrap gap-3">
                      <Button onClick={() => handleSaveReply(msg.id)}>
                        保存回复
                      </Button>
                      <Button
                        color="light"
                        onClick={() =>
                          handleReplyChange(
                            msg.id,
                            msg.adminReply ? msg.adminReply : "",
                          )
                        }
                      >
                        重置
                      </Button>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}
