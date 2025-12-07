import { createFileRoute } from '@tanstack/react-router'
import { AnalyticsPage } from '@/components/analytics/AnalyticsPage'

export const Route = createFileRoute('/dashboard/analytics' as any)({
  component: AnalyticsPage,
})
