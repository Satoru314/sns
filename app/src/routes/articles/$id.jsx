import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/articles/$id')({
  component: ArticleDetailPage,
})

function ArticleDetailPage() {
  const { id } = Route.useParams()

  return (
    <div className="px-4 sm:px-0">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">記事詳細 #{id}</h1>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <p className="text-gray-500">記事の詳細を表示します（後で実装）</p>
        </div>
      </div>
    </div>
  )
}
