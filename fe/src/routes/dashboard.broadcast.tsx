import { createFileRoute } from '@tanstack/react-router'
import { BroadcastPage } from '@/components/broadcast/BroadcastPage'

export const Route = createFileRoute('/dashboard/broadcast')({
  component: BroadcastPage,
})
