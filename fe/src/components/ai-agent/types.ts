export interface AIAgent {
  id: number
  name: string
  description: string
  status: 'active' | 'inactive' | 'training'
  conversations: number
  avgResponseTime: string
  satisfactionRate: number
  knowledgeBaseSize: number
}

export interface RAGDocument {
  id: number
  name: string
  type: 'pdf' | 'url' | 'text'
  size?: string
  chunks: number
  status: 'processing' | 'indexed' | 'failed'
  uploadedAt: string
  scope: 'global' | 'agent'
  agentId?: number
  agentName?: string
}

export interface PerformanceData {
  today: {
    conversations: number
    avgResponse: string
    satisfaction: number
    resolved: number
  }
  yesterday: {
    conversations: number
    avgResponse: string
    satisfaction: number
    resolved: number
  }
  weeklyTrend: Array<{
    day: string
    conversations: number
    satisfaction: number
  }>
}

export interface TransferCondition {
  id: number
  trigger: string
  condition: string
  value: string
  action: 'transfer_to_human' | 'assign_to_agent'
  targetAgent?: string
}

export interface TestMessage {
  id: number
  sender: 'user' | 'ai'
  content: string
  timestamp: string
  confidence?: number
}

export interface Evaluation {
  id: number
  date: string
  userMessage: string
  originalAI: string
  correctedAI: string
  status: 'applied' | 'pending'
}
