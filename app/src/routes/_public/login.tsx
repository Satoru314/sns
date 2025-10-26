import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router'
import { GoogleLogin, type CredentialResponse } from '@react-oauth/google'
import { useAuth } from '../../contexts/AuthContext'

export const Route = createFileRoute('/_public/login')({
  component: LoginPage,
})

function LoginPage() {
  const navigate = useNavigate()
  const { login, isLoading, error } = useAuth()
  const search = useSearch({ from: '/_public/login' })

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      try {
        // AuthContextのloginを呼び出してバックエンドで検証
        await login(credentialResponse.credential)

        // リダイレクト先があればそこへ、なければトップページへ
        const redirectPath = (search as any)?.redirect || '/'
        navigate({ to: redirectPath })
      } catch (err) {
        // エラーはAuthContextで管理されているので何もしない
        console.error('Login failed:', err)
      }
    }
  }

  const handleGoogleError = () => {
    console.error('Google login failed')
  }

  return (
    <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="mt-8 space-y-6">
          {/* エラー表示 */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {/* ローディング中の表示 */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="text-sm text-gray-600">ログイン処理中...</p>
            </div>
          ) : (
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                useOneTap
                theme="outline"
                size="large"
                text="signin_with"
                shape="rectangular"
              />
            </div>
          )}

          <div className="text-center">
            <p className="text-xs text-gray-500">
              Googleアカウントでログインしてください
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
