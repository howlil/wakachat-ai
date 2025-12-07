export type TemplateType = 'utility' | 'marketing' | 'authentication'

export type MessageType =
  | 'text'
  | 'text_with_button'
  | 'image'
  | 'image_with_button'

export type CampaignStatus =
  | 'draft'
  | 'scheduled'
  | 'sending'
  | 'completed'
  | 'failed'

export type TemplateStatus = 'approved' | 'pending' | 'rejected'

export type TemplateHeaderType =
  | 'none'
  | 'text'
  | 'image'
  | 'video'
  | 'document'

export type ButtonType =
  | 'quick_reply'
  | 'visit_website'
  | 'call_phone'
  | 'url'
  | 'phone'

export type RecipientSource = 'csv' | 'backend'

export type ScheduleType = 'now' | 'scheduled'

export interface TemplateButton {
  id: string
  type: 'url' | 'phone' | 'quick_reply' | 'visit_website' | 'call_phone'
  text: string
  value?: string
}

export interface Template {
  id: number
  name: string
  type: TemplateType
  messageType: MessageType
  content: string
  buttons?: TemplateButton[]
  imageUrl?: string
  variables?: string[]
  language: string
  status: TemplateStatus
  createdAt: string
  headerType?: TemplateHeaderType
  headerText?: string
  headerFile?: string
  category?: string
  inbox?: string
}

export interface BroadcastCampaign {
  id: number
  name: string
  template: Template
  status: CampaignStatus
  scheduledAt?: string
  sentAt?: string
  recipients: number
  delivered: number
  read: number
  replied: number
  failed: number
}

export interface QuickReply {
  id: number
  name: string
  content: string
  attachmentType?: 'image' | 'document' | 'pdf' | 'excel' | 'word'
  attachmentName?: string
  createdAt: string
  usageCount: number
}

export interface Recipient {
  id: string
  name: string
  phone: string
  email?: string
  tags?: string[]
}
