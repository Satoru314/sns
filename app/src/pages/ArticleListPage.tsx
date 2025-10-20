import { useArticles } from '../hooks/useArticles'
import { useState } from 'react'

export default function ArticleListPage() {
  const [page, setPage] = useState(1)
  const { data: articles = [], isLoading, error } = useArticles(page)

  const formatDate = (dateString?: string) => {
    if (!dateString) return '不明'
    const date = new Date(dateString)
    return date.toLocaleString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1)
  }

  const handleNextPage = () => {
    // 記事が5件未満の場合は次のページがない可能性が高い
    if (articles.length === 5) {
      setPage(page + 1)
    }
  }

  const handlePageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    if (!isNaN(value) && value > 0) {
      setPage(value)
    }
  }

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
        <p className="text-red-600">エラーが発生しました: {error.message}</p>
      </div>
    )
  }

  return (
    <div className="px-4 sm:px-0">
      {/* ヘッダーとページネーション */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">記事一覧</h1>

        {/* ページネーション */}
        <div className="flex items-center gap-4">
          <button
            onClick={handlePreviousPage}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            前へ
          </button>

          <div className="flex items-center gap-2">
            <span className="text-gray-700">ページ:</span>
            <input
              type="number"
              min="1"
              value={page}
              onChange={handlePageInput}
              className="w-16 px-2 py-1 border border-gray-300 rounded-md text-center"
            />
          </div>

          <button
            onClick={handleNextPage}
            disabled={articles.length < 5}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            次へ
          </button>
        </div>
      </div>

      {/* 記事一覧 */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        {articles.length === 0 ? (
          <p className="p-4 text-gray-500">記事がありません</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {articles.map(article => (
              <li key={article.article_id} className="p-6 hover:bg-gray-50">
                {/* タイトル */}
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {article.title}
                </h2>

                {/* 本文 */}
                {article.contents && (
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.contents}
                  </p>
                )}

                {/* メタ情報 */}
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  {/* 作成者 */}
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>{article.user_name || '匿名'}</span>
                  </div>

                  {/* 作成日時 */}
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{formatDate(article.created_at)}</span>
                  </div>

                  {/* いいね数 */}
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span>{article.nice || 0}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
