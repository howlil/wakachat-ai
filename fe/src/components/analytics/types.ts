export interface StatCardData {
  icon: React.ComponentType<{ size?: number; className?: string }>
  label: string
  value: string
  change: string
  trend: 'up' | 'down'
}

export interface ChartDataPoint {
  date?: string
  hour?: string
  [key: string]: string | number | undefined
}

export interface PieChartData {
  name: string
  value: number
}

export interface SessionListItem {
  id: string
  customer: string
  platform: string
  inbox: string
  phone: string
  sessionNumber: number
  status: 'Open' | 'Pending' | 'Assigned' | 'Resolved'
  agent: string
  createdAt: string
  handoffAt: string
  resolvedAt: string
  aiDuration: string
  agentDuration: string
  slaStatus: 'In' | 'Out'
}

export interface AIPerformanceData {
  agent: string
  messagesSent: number
  creditsUsed: number
  sessionsHandled: number
  handoffCount: number
  handoffRate: number
  inputTokens: number
  outputTokens: number
  estimatedCost: number
}

export interface FAQData {
  question: string
  count: number
}

