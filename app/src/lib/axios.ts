import axios from 'axios'

// Axios インスタンスの設定
axios.defaults.baseURL = '/api'
axios.defaults.withCredentials = true // cookieを送信するために必要

// レスポンスインターセプター: 401エラー時の処理
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 認証エラー時はLocalStorageをクリアしてログインページへ
      localStorage.removeItem('google_user')

      // ログインページにリダイレクト（現在のパスをクエリパラメータで渡す）
      const currentPath = window.location.pathname
      if (currentPath !== '/login') {
        window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}`
      }
    }

    return Promise.reject(error)
  }
)

export default axios
