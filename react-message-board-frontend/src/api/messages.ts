import request from "../utils/request"
import type { Message } from "../types/messages"

// 留言列表响应类型
export interface MessagesListResponse {
  total: number
  page: number
  pageSize: number
  list: Message[]
}

// 获取留言列表
export interface GetMessagesParams {
  page?: number
  pageSize?: number
  keyword?: string
  sort?: "newest" | "mostLiked"
}

export const getMessages = async (
  params?: GetMessagesParams,
): Promise<MessagesListResponse> => {
  return request.get("/api/messages", { params })
}

// 获取留言详情
export const getMessageById = async (id: number): Promise<Message> => {
  return request.get(`/api/messages/${id}`)
}

// 发布留言
export interface CreateMessageParams {
  nickname: string
  title: string
  content: string
  email?: string
}

export const createMessage = async (
  params: CreateMessageParams,
): Promise<void> => {
  return request.post("/api/messages", params)
}

// 点赞留言
export const likeMessage = async (id: number): Promise<void> => {
  return request.post(`/api/messages/${id}/like`)
}

// 管理员回复留言
export interface ReplyMessageParams {
  reply: string
}

export const replyMessage = async (
  id: number,
  params: ReplyMessageParams,
): Promise<void> => {
  return request.post(`/api/messages/${id}/reply`, params)
}

// 删除留言
export const deleteMessage = async (id: number): Promise<void> => {
  return request.delete(`/api/messages/${id}`)
}
