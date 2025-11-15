import { useState, useEffect } from "react"
import {
  Pagination,
  Label,
  TextInput,
  Select,
  Button,
  Card,
} from "flowbite-react"
import { getMessages, likeMessage } from "../api/messages"
import type { Message } from "../types/messages"

export default function Messages() {
  const [messages, setMessages] = useState<Message[]>([])
  const [keyword, setKeyword] = useState("")
  const [sort, setSort] = useState<"newest" | "mostLiked">("newest")
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const pageSize = 5

  // 从 API 获取留言列表
  const fetchMessages = async () => {
    setLoading(true)
    try {
      const response = await getMessages({
        page: currentPage,
        pageSize,
        keyword: keyword || undefined,
        sort,
      })
      setMessages(response.list)
      setTotal(response.total)
    } catch (error) {
      console.error("获取留言列表失败:", error)
    } finally {
      setLoading(false)
    }
  }

  // 初始加载和参数变化时重新获取
  useEffect(() => {
    fetchMessages()
  }, [currentPage, sort])

  // 处理点赞
  const handleLike = async (id: number) => {
    try {
      await likeMessage(id)
      // 点赞成功后重新获取数据以更新点赞数
      await fetchMessages()
    } catch (error) {
      console.error("点赞失败:", error)
    }
  }

  // 处理搜索
  const handleSearch = () => {
    setCurrentPage(1)
    fetchMessages()
  }

  const totalPages = Math.ceil(total / pageSize)

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-4">
      {/* 筛选区 */}
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex-1">
          <Label htmlFor="keyword">搜索关键词</Label>
          <TextInput
            id="keyword"
            placeholder="输入关键词搜索"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>

        <div className="min-w-40">
          <Label htmlFor="sort">排序方式</Label>
          <Select
            id="sort"
            value={sort}
            onChange={(e) => {
              setSort(e.target.value as "newest" | "mostLiked")
              setCurrentPage(1)
            }}
          >
            <option value="newest">最新</option>
            <option value="mostLiked">最受欢迎</option>
          </Select>
        </div>

        <div>
          <Button onClick={handleSearch} disabled={loading}>
            {loading ? "加载中..." : "搜索"}
          </Button>
        </div>
      </div>

      {/* 留言列表 */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center text-gray-500">加载中...</div>
        ) : messages.length === 0 ? (
          <div className="text-center text-gray-500">暂无留言</div>
        ) : (
          messages.map((msg) => (
            <Card key={msg.id}>
              <div className="flex items-start justify-between">
                <h5 className="text-xl font-bold">{msg.title}</h5>
                <button
                  onClick={() => handleLike(msg.id)}
                  className="flex items-center gap-1 text-gray-500 transition-colors hover:text-blue-600"
                  title="点赞"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                    />
                  </svg>
                  {msg.likes}
                </button>
              </div>
              <p className="mt-2 text-gray-700">{msg.content}</p>
              <div className="mt-2 flex justify-between text-sm text-gray-500">
                <span>by {msg.nickname}</span>
                <span>{msg.createdAt}</span>
              </div>
              {msg.reply && msg.reply.length > 0 && (
                <div className="mt-2 space-y-2">
                  {msg.reply.map((replyText, idx) => (
                    <div
                      key={idx}
                      className="rounded border-l-4 border-blue-600 bg-gray-100 p-2"
                    >
                      <span className="font-medium">管理员回复：</span>
                      <span>{replyText}</span>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          ))
        )}
      </div>

      {/* 分页器 */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
            previousLabel="上一页"
            nextLabel="下一页"
          />
        </div>
      )}
    </div>
  )
}
