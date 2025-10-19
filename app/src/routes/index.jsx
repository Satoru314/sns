import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: ArticleListPage,
})

function ArticleListPage() {
  return (
    <div className="px-4 sm:px-0">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">記事一覧</h1>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <p className="p-4 text-gray-500">記事一覧を表示します（後で実装）</p>
      </div>
    </div>
  )
}
