import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { getAuth } from '../api/auth/auth'
import type { ControllersLoginResponse } from '../types/api'

interface AuthContextType {
  user: ControllersLoginResponse | null
  login: (credential: string) => Promise<void>
  logout: () => Promise<void>
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<ControllersLoginResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 初期化: LocalStorageから復元
  useEffect(() => {
    const storedUser = localStorage.getItem('google_user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (credential: string) => {
    setIsLoading(true)
    setError(null)

    try {
      // orvalで生成されたAPIクライアントを使用
      const authApi = getAuth()
      const response = await authApi.postAuthLogin({
        idToken: credential,
      })

      const userData = response.data

      // 必須フィールドのチェック
      if (!userData.name || !userData.email) {
        throw new Error('ユーザー情報が不完全です')
      }

      setUser(userData)

      // localStorageにユーザー情報を保存（トークンはcookieに自動保存される）
      localStorage.setItem('google_user', JSON.stringify(userData))
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'ログインに失敗しました'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // orvalで生成されたAPIクライアントを使用
      const authApi = getAuth()
      await authApi.postAuthLogout()

      setUser(null)

      // LocalStorageをクリア
      localStorage.removeItem('google_user')
      localStorage.removeItem('username') // 旧ログイン方式のデータもクリア
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'ログアウトに失敗しました'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isLoading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
