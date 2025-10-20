import { useQuery } from '@tanstack/react-query'
import { getArticles } from '../api/articles/articles'

/**
 * 記事一覧を取得するカスタムフック
 * @param {number} page - ページ番号（デフォルト: 1）
 * @returns {Object} { data: articles, isLoading, error }
 */
export function useArticles(page = 1) {
  return useQuery({
    queryKey: ['articles', page],
    queryFn: async () => {
      const api = getArticles()
      const response = await api.getArticleList({ page })
      return response.data
    },
  })
}
