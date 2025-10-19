import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/articles/new')({
  component: NewArticlePage,
})

function NewArticlePage() {
  return (
    <div className="px-4 sm:px-0">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">新規記事投稿</h1>
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <p className="text-gray-500">記事投稿フォームを表示します（後で実装）</p>
        </div>
      </div>
    </div>
  )
}
