import { createFileRoute } from '@tanstack/react-router'
import { NewsPage } from '@/components/news/NewsPage'

export const Route = createFileRoute('/dashboard/scraping-news' as any)({
  component: NewsPage,
})
