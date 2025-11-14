export interface Message {
  id: number
  nickname: string
  title: string
  email?: string
  content: string
  likes: number
  reply?: string[]
  createdAt: string
}
