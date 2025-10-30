import { useState, useEffect } from 'react'
import type { ControllersLoginResponse } from '../types/api'

/**
 * localStorageからユーザー情報を取得するカスタムフック
 *
 * @returns ユーザー情報（存在しない場合はnull）
 */
export function useUser(): ControllersLoginResponse | null {
  const [user, setUser] = useState<ControllersLoginResponse | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('google_user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Failed to parse user data from localStorage:', error)
        setUser(null)
      }
    }
  }, [])

  return user
}