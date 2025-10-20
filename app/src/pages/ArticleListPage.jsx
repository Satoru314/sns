import { useArticles } from '../hooks/useArticles'

export default function ArticleListPage() {
  const { data: articles = [], isLoading, error } = useArticles()

  if (isLoading) {
    return (
      <div className="px-4 sm:px-0">
        <p className="text-gray-600">読み込み中...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="px-4 sm:px-0">
        <p className="text-red-600">エラーが発生しました</p>
      </div>
    )
  }

  return (
    <div className="px-4 sm:px-0">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">記事一覧</h1>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        {articles.length === 0 ? (
          <p className="p-4 text-gray-500">記事がありません</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {articles.map(article => (
              <li key={article.article_id} className="p-4">
                <h2 className="text-xl font-semibold">{article.title}</h2>
                {article.contents && (
                  <p className="mt-2 text-gray-600">{article.contents}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
