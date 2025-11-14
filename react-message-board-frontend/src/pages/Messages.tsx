import { useState } from "react"
import {
  Pagination,
  Label,
  TextInput,
  Select,
  Button,
  Card,
} from "flowbite-react"
import { useMessages } from "../App"

export default function Messages() {
  const { messages } = useMessages()
  const [keyword, setKeyword] = useState("")
  const [sort, setSort] = useState<"latest" | "popular">("latest")
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 5

  // 过滤 + 排序
  const filteredMessages = messages
    .filter((m) => m.title.includes(keyword) || m.content.includes(keyword))
    .sort((a, b) => {
      if (sort === "latest")
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      return b.likes - a.likes
    })

  const totalPages = Math.ceil(filteredMessages.length / pageSize)
  const pageMessages = filteredMessages.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  )

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
            onChange={(e) => setSort(e.target.value as "latest" | "popular")}
          >
            <option value="latest">最新</option>
            <option value="popular">最受欢迎</option>
          </Select>
        </div>

        <div>
          <Button onClick={() => setCurrentPage(1)}>筛选</Button>
        </div>
      </div>

      {/* 留言列表 */}
      <div className="space-y-4">
        {pageMessages.length === 0 ? (
          <div className="text-center text-gray-500">暂无留言</div>
        ) : (
          pageMessages.map((msg) => (
            <Card>
              <div className="flex items-start justify-between">
                <h5 className="text-xl font-bold">{msg.title}</h5>
                <div className="flex items-center gap-1 text-gray-500">
                  大拇指
                  {msg.likes}
                </div>
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
