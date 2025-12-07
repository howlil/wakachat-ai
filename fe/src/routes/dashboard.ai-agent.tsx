import { createFileRoute } from '@tanstack/react-router'
import { AIAgentPage } from '@/components/ai-agent/AIAgentPage'

export const Route = createFileRoute('/dashboard/ai-agent')({
  component: AIAgentPage,
})
