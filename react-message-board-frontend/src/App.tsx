import { Outlet, Link, useLocation } from "react-router-dom";
import { Navbar } from "flowbite-react";

export default function App() {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen">
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
              所有留言
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
              新增留言
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
              管理员登录
            </Link>
          </div>
        </div>
      </Navbar>

      {/* 页面内容区域 */}
      <div className="mx-auto max-w-3xl p-4">
        <Outlet />
      </div>
    </div>
  );
}
