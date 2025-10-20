import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import axios from 'axios'
import './index.css'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Configure axios base URL for Vite proxy
axios.defaults.baseURL = '/api'

// Create a new router instance
const router = createRouter({ routeTree })

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
