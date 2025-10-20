import { useQuery } from '@tanstack/react-query'
import { getArticles } from '../api/articles/articles'
import type { ModelsArticle } from '../types/api'
import { AxiosError } from 'axios'

/**
 * 記事詳細を取得するカスタムフック
 *
 * @param articleId - 記事ID
 * @param enabled - クエリを有効にするかどうか（デフォルト: true）
 * @returns query object with:
 *  - data: 記事詳細（article_id、title、contents、user_name、nice、comments、created_atを含む）
 *  - isLoading: データ取得中かどうか
 *  - error: エラーオブジェクト
 */
export function useArticleDetail(articleId: number, enabled: boolean = true) {
  return useQuery<ModelsArticle, AxiosError>({
    queryKey: ['article', articleId],
    queryFn: async () => {
      const api = getArticles()
      const response = await api.getArticleId(articleId)
      // APIから返される記事詳細データ（コメント含む）を返す
      return response.data
    },
    enabled: enabled && articleId > 0, // articleIdが有効な場合のみクエリを実行
    staleTime: 1000 * 60 * 3, // 3分間はキャッシュを使用
  })
}
