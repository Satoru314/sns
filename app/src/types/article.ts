import type { ModelsArticle } from './api'

/**
 * 記事作成時に必要な入力データ
 */
export type ArticleCreateInput = Pick<ModelsArticle, 'title' | 'contents' | 'user_name'> & {
  title: string
  contents: string
  user_name: string
}

/**
 * APIから返される完全な記事データ
 */
export type ArticleResponse = Required<ModelsArticle>
