import { useState, useEffect, type ChangeEvent } from 'react'
import type { ControllersLoginResponse } from '../types/api'

interface ArticleFormData {
  title: string
  contents: string
  user_name: string
}

/**
 * 記事投稿フォームの状態管理を行うカスタムフック
 *
 * @param userData - ログイン中のユーザー情報
 * @returns フォームデータ、更新関数、変更ハンドラー
 */
export function useArticleForm(userData: ControllersLoginResponse | null) {
  const [formData, setFormData] = useState<ArticleFormData>({
    title: '',
    contents: '',
    user_name: '',
  })

  // userDataが読み込まれたらformDataを更新
  useEffect(() => {
    if (userData?.name) {
      setFormData(prev => ({
        ...prev,
        user_name: userData.name || ''
      }))
    }
  }, [userData])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return { formData, setFormData, handleChange }
}
