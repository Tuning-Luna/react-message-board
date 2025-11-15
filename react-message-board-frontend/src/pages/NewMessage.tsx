import { useState } from "react"
import { Label, TextInput, Button, Card, Alert } from "flowbite-react"
import { useNavigate } from "react-router-dom"
import { createMessage } from "../api/messages"

export default function NewMessage() {
  const navigate = useNavigate()
  const [nickname, setNickname] = useState("")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [email, setEmail] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!nickname.trim()) {
      newErrors.nickname = "昵称不能为空"
    }

    if (!title.trim()) {
      newErrors.title = "标题不能为空"
    }

    if (!content.trim()) {
      newErrors.content = "内容不能为空"
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "请输入有效的邮箱地址"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitSuccess(false)

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // 调用 API 发布留言
      await createMessage({
        nickname,
        title,
        content,
        email: email || undefined,
      })

      // 提交成功后重置表单
      setNickname("")
      setTitle("")
      setContent("")
      setEmail("")
      setErrors({})
      setSubmitSuccess(true)

      // 3秒后隐藏成功提示，然后跳转到留言列表
      setTimeout(() => {
        setSubmitSuccess(false)
        navigate("/")
      }, 2000)
    } catch (error) {
      console.error("提交失败:", error)
      // 错误提示已由拦截器处理，这里只设置表单错误
      setErrors({ submit: "提交失败，请检查输入信息" })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-4">
      <Card>
        <h2 className="mb-6 text-2xl font-bold">发布新留言</h2>

        {submitSuccess && (
          <Alert color="success" className="mb-4">
            留言发布成功！
          </Alert>
        )}

        {errors.submit && (
          <Alert color="failure" className="mb-4">
            {errors.submit}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 昵称 */}
          <div>
            <Label htmlFor="nickname" className="mb-2">
              昵称 <span className="text-red-500">*</span>
            </Label>
            <TextInput
              id="nickname"
              placeholder="请输入您的昵称"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value)
                if (errors.nickname) {
                  setErrors((prev) => {
                    const newErrors = { ...prev }
                    delete newErrors.nickname
                    return newErrors
                  })
                }
              }}
              color={errors.nickname ? "failure" : undefined}
              className="transition-all duration-300 ease-in-out"
            />
            {errors.nickname && (
              <p className="mt-1 text-sm text-red-600 transition-all duration-300 ease-in-out">
                {errors.nickname}
              </p>
            )}
          </div>

          {/* 标题 */}
          <div>
            <Label htmlFor="title" className="mb-2">
              标题 <span className="text-red-500">*</span>
            </Label>
            <TextInput
              id="title"
              placeholder="请输入留言标题"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
                if (errors.title) {
                  setErrors((prev) => {
                    const newErrors = { ...prev }
                    delete newErrors.title
                    return newErrors
                  })
                }
              }}
              color={errors.title ? "failure" : undefined}
              className="transition-all duration-300 ease-in-out"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600 transition-all duration-300 ease-in-out">
                {errors.title}
              </p>
            )}
          </div>

          {/* 内容 */}
          <div>
            <Label htmlFor="content" className="mb-2">
              内容 <span className="text-red-500">*</span>
            </Label>
            <textarea
              id="content"
              rows={6}
              placeholder="请输入留言内容"
              value={content}
              onChange={(e) => {
                setContent(e.target.value)
                if (errors.content) {
                  setErrors((prev) => {
                    const newErrors = { ...prev }
                    delete newErrors.content
                    return newErrors
                  })
                }
              }}
              className={`w-full rounded-lg border transition-all duration-300 ease-in-out ${
                errors.content
                  ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 bg-gray-50 focus:border-blue-500 focus:ring-blue-500"
              } px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:outline-none`}
            />
            {errors.content && (
              <p className="mt-1 text-sm text-red-600 transition-all duration-300 ease-in-out">
                {errors.content}
              </p>
            )}
          </div>

          {/* 邮箱 */}
          <div>
            <Label htmlFor="email" className="mb-2">
              邮箱（选填）
            </Label>
            <TextInput
              id="email"
              type="email"
              placeholder="请输入您的邮箱，回复时会收到邮件通知"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (errors.email) {
                  setErrors((prev) => {
                    const newErrors = { ...prev }
                    delete newErrors.email
                    return newErrors
                  })
                }
              }}
              color={errors.email ? "failure" : undefined}
              className="transition-all duration-300 ease-in-out"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 transition-all duration-300 ease-in-out">
                {errors.email}
              </p>
            )}
          </div>

          {/* 提交按钮 */}
          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={isSubmitting} className="min-w-32">
              {isSubmitting ? "提交中..." : "发布留言"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
