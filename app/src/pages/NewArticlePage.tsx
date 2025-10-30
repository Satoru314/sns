import { useNavigate } from '@tanstack/react-router'
import { useCreateArticle, useUser, useArticleForm } from '../hooks'
import { useState, type FormEvent } from 'react'

export default function NewArticlePage() {
  const navigate = useNavigate()
  const { mutate: createArticle, isPending } = useCreateArticle()
  const user = useUser()
  const { formData, handleChange } = useArticleForm(user)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // フォームバリデーション
    if (!formData.title.trim()) {
      setError('タイトルを入力してください')
      return
    }
    if (!formData.contents.trim()) {
      setError('本文を入力してください')
      return
    }
    if (!formData.user_name.trim()) {
      setError('ユーザー名を入力してください')
      return
    }

    setError(null)

    // TanStack Queryのmutateを使用
    createArticle(
      {
        title: formData.title.trim(),
        contents: formData.contents.trim(),
        user_name: formData.user_name.trim(),
      },
      {
        onSuccess: () => {
          // 投稿成功後、記事一覧ページにリダイレクト
          navigate({ to: '/' })
        },
        onError: (err) => {
          console.error('記事の投稿に失敗しました:', err)
          setError('記事の投稿に失敗しました。もう一度お試しください。')
        },
      }
    )
  }

  return (
    <div className="px-4 sm:px-0">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">新規記事投稿</h1>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* エラーメッセージ */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
                {error}
              </div>
            )}
            {/* タイトル */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                タイトル <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                disabled={isPending}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                placeholder="記事のタイトルを入力"
              />
            </div>

            {/* 本文 */}
            <div>
              <label htmlFor="contents" className="block text-sm font-medium text-gray-700 mb-2">
                本文 <span className="text-red-500">*</span>
              </label>
              <textarea
                id="contents"
                name="contents"
                rows={10}
                value={formData.contents}
                onChange={handleChange}
                disabled={isPending}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                placeholder="記事の本文を入力"
              />
            </div>

            {/* 送信ボタン */}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isPending}
                className="flex-1 bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
              >
                {isPending ? '投稿中...' : '投稿する'}
              </button>

              <button
                type="button"
                onClick={() => navigate({ to: '/' })}
                disabled={isPending}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                キャンセル
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
