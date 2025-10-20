import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getArticles } from '../api/articles/articles'
import type { ModelsArticle } from '../types/api'
import { AxiosError } from 'axios'

/**
 * 記事にいいねを追加するカスタムフック
 *
 * @returns mutation object with:
 *  - mutate: いいね追加を実行
 *  - data: 更新された記事データ（niceカウントがインクリメントされている）
 *  - isPending: 処理中かどうか
 *  - error: エラーオブジェクト
 */
export function useArticleNice() {
  const queryClient = useQueryClient()

  return useMutation<ModelsArticle, AxiosError, { article_id: number }>({
    mutationFn: async ({ article_id }) => {
      const api = getArticles()
      // APIはModelsArticle型を期待しているので、article_idを含むオブジェクトを渡す
      const response = await api.postArticleNice({ article_id })
      return response.data
    },
    onSuccess: (data, variables) => {
      // いいね成功後、該当記事のキャッシュを無効化
      queryClient.invalidateQueries({ queryKey: ['article', variables.article_id] })
      // 記事一覧のキャッシュも無効化（いいね数を更新するため）
      queryClient.invalidateQueries({ queryKey: ['articles'] })

      // 成功時のログ
      console.log('いいね追加成功:', {
        article_id: data.article_id,
        nice_count: data.nice
      })
    },
    onError: (error) => {
      console.error('いいね追加失敗:', {
        status: error.response?.status,
        message: error.response?.data,
      })
    },
  })
}
