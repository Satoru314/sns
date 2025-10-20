import { createFileRoute } from '@tanstack/react-router'
import NewArticlePage from '../../pages/NewArticlePage'

export const Route = createFileRoute('/articles/new')({
  component: NewArticlePage,
})
