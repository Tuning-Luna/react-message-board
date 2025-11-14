import { useState, createContext, useContext } from "react"
import { Outlet, Link, useLocation } from "react-router-dom"
import { Navbar } from "flowbite-react"
import type { Message } from "./types/messages"
import { MessageIconFill } from "./svg/MessageIconFill"
import { MessageIcon } from "./svg/MessageIcon"
import { UserIconFill } from "./svg/UserIconFill"
import { UserIcon } from "./svg/UserIcon"
import { AddIcon } from "./svg/AddIcon"

// 初始 mock 数据
const initialMessages: Message[] = [
  {
    id: 1,
    title: "你好！",
    content: "这是第一条留言",
    nickname: "Alice",
    createdAt: "2025-11-14 09:00:00",
    likes: 10,
    reply: ["谢谢你的留言！"],
  },
  {
    id: 2,
    title: "测试留言",
    content: "这是第二条留言",
    nickname: "Bob",
    createdAt: "2025-11-14 09:30:00",
    likes: 5,
  },
  {
    id: 3,
    title: "测试留言",
    content: "这是第三条留言",
    nickname: "Charlie",
    createdAt: "2025-11-14 09:45:00",
    likes: 3,
  },
  {
    id: 4,
    title: "测试留言",
    content: "这是第四条留言",
    nickname: "David",
    createdAt: "2025-11-14 10:00:00",
    likes: 2,
  },
  {
    id: 5,
    title: "测试留言",
    content: "这是第五条留言",
    nickname: "Eve",
    createdAt: "2025-11-14 10:15:00",
    likes: 1,
  },
  {
    id: 6,
    title: "测试留言",
    content: "这是第六条留言",
    nickname: "Frank",
    createdAt: "2025-11-14 10:30:00",
    likes: 0,
  },
  {
    id: 7,
    title: "测试留言",
    content: "这是第七条留言",
    nickname: "Grace",
    createdAt: "2025-11-14 10:45:00",
    likes: 0,
  },
  {
    id: 8,
    title: "测试留言",
    content: "这是第八条留言",
    nickname: "Hank",
    createdAt: "2025-11-14 11:00:00",
    likes: 0,
  },
]

interface MessagesContextType {
  messages: Message[]
  addMessage: (message: Omit<Message, "id">) => void
  deleteMessage: (id: number) => void
  addReply: (id: number, reply: string) => void
  likeMessage: (id: number) => void
}

const MessagesContext = createContext<MessagesContextType | undefined>(
  undefined,
)

export const useMessages = () => {
  const context = useContext(MessagesContext)
  if (!context) {
    throw new Error("useMessages must be used within MessagesProvider")
  }
  return context
}

export default function App() {
  const { pathname } = useLocation()
  const [messages, setMessages] = useState<Message[]>(initialMessages)

  // 添加新留言
  const addMessage = (messageData: Omit<Message, "id">) => {
    const newId = Math.max(...messages.map((m) => m.id), 0) + 1
    const newMessage: Message = {
      ...messageData,
      id: newId,
    }
    setMessages((prev) => [...prev, newMessage])
  }

  // 删除留言
  const deleteMessage = (id: number) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id))
  }

  // 添加回复
  const addReply = (id: number, reply: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id
          ? {
              ...msg,
              reply: [...(msg.reply || []), reply],
            }
          : msg,
      ),
    )
  }

  // 点赞
  const likeMessage = (id: number) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id ? { ...msg, likes: msg.likes + 1 } : msg,
      ),
    )
  }

  const contextValue: MessagesContextType = {
    messages,
    addMessage,
    deleteMessage,
    addReply,
    likeMessage,
  }

  return (
    <MessagesContext.Provider value={contextValue}>
      <div className="min-h-screen bg-white">
        {/* 顶部导航栏 */}
        <Navbar fluid rounded>
          {/* 三个 居中且更大 的 Tab */}
          <div className="flex w-full justify-center">
            <div className="flex items-center gap-8">
              <Link
                to="/"
                className={`border-b-2 px-4 py-2 pb-1 text-lg font-medium transition-all duration-300 ease-in-out ${
                  pathname === "/"
                    ? "border-blue-600 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-gray-600 hover:border-gray-300 dark:text-gray-300"
                }`}
                aria-current={pathname === "/" ? "page" : undefined}
              >
                <span className="flex items-center gap-1">
                  {pathname === "/" ? (
                    <MessageIconFill color="#1c64f2" size={18} />
                  ) : (
                    <MessageIcon color="#000000" size={18} />
                  )}
                  <span className="text-lg font-medium">留言广场</span>
                </span>
              </Link>
              <Link
                to="/new"
                className={`border-b-2 px-4 py-2 pb-1 text-lg font-medium transition-all duration-300 ease-in-out ${
                  pathname === "/new"
                    ? "border-blue-600 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-gray-600 hover:border-gray-300 dark:text-gray-300"
                }`}
                aria-current={pathname === "/new" ? "page" : undefined}
              >
                <span className="flex items-center gap-1">
                  {pathname === "/new" ? (
                    <AddIcon color="#1c64f2" size={18} />
                  ) : (
                    <AddIcon color="#000000" size={18} />
                  )}
                  <span className="text-lg font-medium">我也要留言</span>
                </span>
              </Link>
              <Link
                to="/admin"
                className={`border-b-2 px-4 py-2 pb-1 text-lg font-medium transition-all duration-300 ease-in-out ${
                  pathname === "/admin"
                    ? "border-blue-600 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-gray-600 hover:border-gray-300 dark:text-gray-300"
                }`}
                aria-current={pathname === "/admin" ? "page" : undefined}
              >
                <span className="flex items-center gap-1">
                  {pathname === "/admin" ? (
                    <UserIconFill color="#1c64f2" size={18} />
                  ) : (
                    <UserIcon color="#000000" size={18} />
                  )}
                  <span className="text-lg font-medium">管理员登录</span>
                </span>
              </Link>
            </div>
          </div>
        </Navbar>

        {/* 页面内容区域 */}
        <div className="mx-auto max-w-3xl p-4">
          <Outlet />
        </div>
      </div>
    </MessagesContext.Provider>
  )
}
