import { createFileRoute } from '@tanstack/react-router'
import ArticleListPage from '../../pages/ArticleListPage'

export const Route = createFileRoute('/_public/')({
  component: ArticleListPage,
})
