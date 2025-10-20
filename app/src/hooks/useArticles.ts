import { useQuery } from '@tanstack/react-query'
import { getArticles } from '../api/articles/articles'
import type { ModelsArticle } from '../types/api'
import { AxiosError } from 'axios'

/**
 * 記事一覧を取得するカスタムフック
 *
 * @param page - ページ番号（デフォルト: 1）
 * @returns query object with:
 *  - data: 記事一覧（各記事にはarticle_id、title、contents、user_name、nice、created_atなどを含む）
 *  - isLoading: データ取得中かどうか
 *  - error: エラーオブジェクト
 *  - refetch: 手動で再取得する関数
 */
export function useArticles(page: number = 1) {
  return useQuery<ModelsArticle[], AxiosError>({
    queryKey: ['articles', page],
    queryFn: async () => {
      const api = getArticles()
      const response = await api.getArticleList({ page })
      // APIから返される記事一覧データ全体を返す
      return response.data
    },
    // エラー時の再試行設定
    retry: 1,
    // データが古くなるまでの時間（5分）
    staleTime: 1000 * 60 * 5,
  })
}
