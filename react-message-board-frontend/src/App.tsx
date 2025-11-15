import { createContext, useContext } from "react"
import { Outlet, Link, useLocation } from "react-router-dom"
import { Navbar } from "flowbite-react"
import { MessageIconFill } from "./svg/MessageIconFill"
import { MessageIcon } from "./svg/MessageIcon"
import { UserIconFill } from "./svg/UserIconFill"
import { UserIcon } from "./svg/UserIcon"
import { AddIcon } from "./svg/AddIcon"

// 保留 Context 以保持兼容性，但不再维护全局状态
// 各个页面自己从 API 获取数据
interface MessagesContextType {
  // 这些方法已不再使用，保留仅为兼容性
  refreshMessages?: () => void
}

const MessagesContext = createContext<MessagesContextType | undefined>(
  undefined,
)

export const useMessages = () => {
  const context = useContext(MessagesContext)
  // 不再强制要求 context，允许为 undefined
  return context
}

export default function App() {
  const { pathname } = useLocation()

  const contextValue: MessagesContextType = {
    // 不再维护全局状态，各页面自己管理
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
