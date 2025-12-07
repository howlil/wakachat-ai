export interface Conversation {
  id: string
  customerName: string
  customerPhone: string
  lastMessage: string
  timestamp: string
  status: 'open' | 'pending' | 'assigned' | 'resolved'
  assignedTo?: string
  assignedToRole?: 'admin' | 'agent'
  channel: 'whatsapp' | 'sms' | 'email'
  isAIHandled: boolean
  unreadCount?: number
  whatsappNumber?: string
  inbox: string
  labels: string[]
  pipelineStatus: string
  isCollaborator?: boolean
  unreplied?: boolean
  isTakenOver?: boolean
  takenOverBy?: string
  takenOverAt?: string
}

export interface Message {
  id: string
  sender: 'customer' | 'agent' | 'ai' | 'admin'
  senderName?: string
  content: string
  timestamp: string
  status?: 'sent' | 'delivered' | 'read'
}

export interface QuickReply {
  id: string
  name: string
  content: string
  hasAttachment?: boolean
}

export type FilterStatus = 'unassigned' | 'assigned' | 'resolved'
export type UserRole = 'admin' | 'agent' | 'supervisor' | 'super_agent'
