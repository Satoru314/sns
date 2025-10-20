import { useQuery } from '@tanstack/react-query'
import { getArticles } from '../api/articles/articles'
import type { ModelsArticle } from '../types/api'

/**
 * 記事一覧を取得するカスタムフック
 */
export function useArticles(page: number = 1) {
  return useQuery<ModelsArticle[]>({
    queryKey: ['articles', page],
    queryFn: async () => {
      const api = getArticles()
      const response = await api.getArticleList({ page })
      return response.data
    },
  })
}
