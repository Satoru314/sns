import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getArticles } from '../api/articles/articles'

/**
 * 記事を投稿するカスタムフック
 * @returns {Object} { mutate, mutateAsync, isLoading, error }
 */
export function useCreateArticle() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (articleData) => {
      const api = getArticles()
      const response = await api.postArticle(articleData)
      return response.data
    },
    onSuccess: () => {
      // 記事投稿成功後、記事一覧のキャッシュを無効化して再フェッチ
      queryClient.invalidateQueries({ queryKey: ['articles'] })
    },
  })
}
