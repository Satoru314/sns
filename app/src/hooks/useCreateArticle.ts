import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getArticles } from '../api/articles/articles'
import type { ModelsArticle } from '../types/api'
import type { ArticleCreateInput } from '../types/article'
import { AxiosError } from 'axios'

/**
 * 記事を投稿するカスタムフック
 *
 * @returns mutation object with:
 *  - mutate: 記事投稿を実行
 *  - data: 投稿された記事の完全なデータ（article_id、created_atなどを含む）
 *  - isPending: 投稿処理中かどうか
 *  - error: エラーオブジェクト
 */
export function useCreateArticle() {
  const queryClient = useQueryClient()

  return useMutation<ModelsArticle, AxiosError, ArticleCreateInput>({
    mutationFn: async (articleData) => {
      const api = getArticles()
      const response = await api.postArticle(articleData)
      // APIから返される完全なArticleデータ（article_id、created_atなど）を返す
      return response.data
    },
    onSuccess: (data) => {
      // 記事投稿成功後、記事一覧のキャッシュを無効化して再フェッチ
      queryClient.invalidateQueries({ queryKey: ['articles'] })

      // 成功時のログ（デバッグ用）
      console.log('記事投稿成功:', {
        article_id: data.article_id,
        title: data.title,
        created_at: data.created_at
      })
    },
    onError: (error) => {
      // エラー時のログ
      console.error('記事投稿失敗:', {
        status: error.response?.status,
        message: error.response?.data,
      })
    },
  })
}
