export type NewsSourceType = 'rss' | 'api' | 'scrape'

export type NewsSourceStatus = 'active' | 'paused' | 'error'

export type NewsSentiment = 'positive' | 'neutral' | 'negative'

export type NewsArticleStatus = 'draft' | 'approved' | 'sent'

export type BroadcastChannel = 'whatsapp' | 'email' | 'sms' | 'push'

export interface NewsSource {
  id: number
  name: string
  type: NewsSourceType
  url: string
  category: string
  status: NewsSourceStatus
  lastFetch: string
  articlesCount: number
  scrapeFrequency?: number
  frequencyUnit?: 'minutes' | 'hours' | 'days'
}

export interface NewsArticle {
  id: number
  title: string
  source: string
  category: string
  publishedAt: string
  author?: string
  summary: string
  highlights: string[]
  sentiment: NewsSentiment
  tags: string[]
  status: NewsArticleStatus
  engagement?: {
    sent: number
    delivered: number
    read: number
    clicked: number
  }
  imageUrl?: string
  url: string
  whyItMatters?: string
  targetGroups?: string[]
  scheduledSend?: string
  scrapedAt?: string
}

export interface BroadcastTemplate {
  id: number
  name: string
  channel: BroadcastChannel
  content: string
  variables: string[]
}
