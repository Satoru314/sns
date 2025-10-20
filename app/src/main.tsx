import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import axios from 'axios'
import './index.css'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Configure axios base URL for Vite proxy
axios.defaults.baseURL = '/api'

// Create a new router instance
const router = createRouter({ routeTree })

// Create a client for TanStack Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5分間はキャッシュを使用
      refetchOnWindowFocus: false, // ウィンドウフォーカス時の再フェッチを無効化
    },
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)
