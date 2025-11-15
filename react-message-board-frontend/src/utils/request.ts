import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios"
import { showErrorToast } from "./errorToast"

// 统一返回格式
interface ApiResponse<T = unknown> {
  code: number
  msg: string
  data: T
}

// 创建 axios 实例
const request: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// 请求拦截器：自动添加 token
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("admin_token")
    if (token && config.headers) {
      config.headers.Authorization = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 响应拦截器：根据返回码进行拦截处理
request.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const { code, msg, data } = response.data

    // code: 1 表示成功，直接返回 data
    if (code === 1) {
      return data as unknown as AxiosResponse
    }

    // code: 0 表示失败，显示错误提示并抛出错误
    const errorMessage = msg || "请求失败"
    showErrorToast(errorMessage)
    const error = new Error(errorMessage)
    // @ts-expect-error - 添加 code 字段以便外部处理
    error.code = code
    return Promise.reject(error)
  },
  (error) => {
    // 处理 HTTP 错误（网络错误、超时等）
    const errorMessage =
      error.response?.data?.msg || error.message || "网络错误，请稍后重试"
    const errorCode = error.response?.data?.code || error.response?.status || 0

    // 显示错误提示
    showErrorToast(errorMessage)

    const customError = new Error(errorMessage)
    // @ts-expect-error - 添加 code 字段以便外部处理
    customError.code = errorCode
    return Promise.reject(customError)
  },
)

export default request
