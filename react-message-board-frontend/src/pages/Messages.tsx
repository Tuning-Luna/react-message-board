import { useState } from "react"
import {
  Pagination,
  Label,
  TextInput,
  Select,
  Button,
  Card,
} from "flowbite-react"

interface Message {
  id: number
  title: string
  content: string
  nickname: string
  time: string
  likes: number
  adminReply?: string
}

const mockMessages: Message[] = [
  {
    id: 1,
    title: "你好！",
    content: "这是第一条留言",
    nickname: "Alice",
    time: "2025-11-14 09:00",
    likes: 10,
    adminReply: "谢谢你的留言！",
  },
  {
    id: 2,
    title: "测试留言",
    content: "这是第二条留言",
    nickname: "Bob",
    time: "2025-11-14 09:30",
    likes: 5,
  },
  {
    id: 3,
    title: "测试留言",
    content: "这是第三条留言",
    nickname: "Charlie",
    time: "2025-11-14 09:45",
    likes: 3,
  },
  {
    id: 4,
    title: "测试留言",
    content: "这是第四条留言",
    nickname: "David",
    time: "2025-11-14 10:00",
    likes: 2,
  },
  {
    id: 5,
    title: "测试留言",
    content: "这是第五条留言",
    nickname: "Eve",
    time: "2025-11-14 10:15",
    likes: 1,
  },
  {
    id: 6,
    title: "测试留言",
    content: "这是第六条留言",
    nickname: "Frank",
    time: "2025-11-14 10:30",
    likes: 0,
  },
  {
    id: 7,
    title: "测试留言",
    content: "这是第七条留言",
    nickname: "Grace",
    time: "2025-11-14 10:45",
    likes: 0,
  },
  {
    id: 8,
    title: "测试留言",
    content: "这是第八条留言",
    nickname: "Hank",
    time: "2025-11-14 11:00",
    likes: 0,
  },
  // 可以再添加更多测试数据
]

export default function Messages() {
  const [keyword, setKeyword] = useState("")
  const [sort, setSort] = useState<"latest" | "popular">("latest")
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 5

  // 过滤 + 排序
  const filteredMessages = mockMessages
    .filter((m) => m.title.includes(keyword) || m.content.includes(keyword))
    .sort((a, b) => {
      if (sort === "latest")
        return new Date(b.time).getTime() - new Date(a.time).getTime()
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
                <span>{msg.time}</span>
              </div>
              {msg.adminReply && (
                <div className="mt-2 rounded border-l-4 border-blue-600 bg-gray-100 p-2">
                  <span className="font-medium">管理员回复：</span>
                  <span>{msg.adminReply}</span>
                </div>
              )}
            </Card>
          ))
        )}
      </div>

      {/* 分页器 */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  )
}
