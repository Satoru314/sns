import { Outlet, createRootRoute, Link, useNavigate } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { useState, useEffect } from 'react'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  const navigate = useNavigate()
  const [username, setUsername] = useState<string | null>(null)

  // ログイン状態を確認
  useEffect(() => {
    const storedUsername = localStorage.getItem('username')
    setUsername(storedUsername)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('username')
    setUsername(null)
    navigate({ to: '/' })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex space-x-8">
              <Link
                to="/"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
              >
                記事一覧
              </Link>
              <Link
                to="/articles/new"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
              >
                記事投稿
              </Link>
            </div>

            {/* ログイン状態表示 */}
            <div className="flex items-center space-x-4">
              {username ? (
                <>
                  <span className="text-sm text-gray-700">
                    ようこそ、{username}さん
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-gray-500 hover:text-gray-900"
                  >
                    ログアウト
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="text-sm text-gray-500 hover:text-gray-900"
                >
                  ログイン
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </div>
  )
}
