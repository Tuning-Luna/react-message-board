/**
 * 全局错误提示工具
 * 在 axios 拦截器中调用，显示错误弹框
 */

// 转义 HTML 防止 XSS 攻击
const escapeHtml = (text: string): string => {
  const div = document.createElement("div")
  div.textContent = text
  return div.innerHTML
}

// 创建错误提示容器
let toastContainer: HTMLDivElement | null = null

const getToastContainer = (): HTMLDivElement => {
  if (!toastContainer) {
    toastContainer = document.createElement("div")
    toastContainer.className = "fixed top-24 right-4 z-50 pointer-events-none"
    toastContainer.id = "error-toast-container"
    document.body.appendChild(toastContainer)
  }
  return toastContainer
}

/**
 * 显示错误提示
 * @param message 错误信息
 * @param duration 显示时长（毫秒），默认 3000ms
 */
export const showErrorToast = (message: string, duration = 3000): void => {
  const container = getToastContainer()

  // 创建 Alert 元素
  const alertDiv = document.createElement("div")
  alertDiv.className =
    "mb-4 w-72 max-w-full rounded-lg border border-red-300 bg-red-50 p-4 text-red-800 shadow-lg transition-all duration-300 ease-in-out"
  alertDiv.setAttribute("role", "alert")
  alertDiv.style.opacity = "0"
  alertDiv.style.transform = "translateX(100%)"
  alertDiv.innerHTML = `
    <div class="flex items-center">
      <svg class="mr-2 h-5 w-5 shrink-0 text-red-600" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
      </svg>
      <span class="font-medium">${escapeHtml(message)}</span>
    </div>
  `

  // 添加到容器
  container.appendChild(alertDiv)

  // 触发动画
  setTimeout(() => {
    alertDiv.style.opacity = "1"
    alertDiv.style.transform = "translateX(0)"
  }, 10)

  // 自动移除
  setTimeout(() => {
    alertDiv.style.opacity = "0"
    alertDiv.style.transform = "translateX(100%)"
    setTimeout(() => {
      if (alertDiv.parentNode) {
        alertDiv.parentNode.removeChild(alertDiv)
      }
    }, 300)
  }, duration)
}
