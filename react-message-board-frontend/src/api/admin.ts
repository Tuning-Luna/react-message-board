import request from "../utils/request"

// 管理员登录
export interface LoginParams {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
}

export const adminLogin = async (
  params: LoginParams,
): Promise<LoginResponse> => {
  return request.post("/api/admin/login", params)
}
