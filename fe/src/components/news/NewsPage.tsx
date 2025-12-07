import { Box, Flex, Button, Badge } from '@chakra-ui/react'
import { Plus, Send } from 'lucide-react'
import { useState } from 'react'
import { NewsFeedView } from './NewsFeedView'
import { SourcesView } from './SourcesView'
import { BroadcastsView } from './BroadcastsView'
import { NewsAnalyticsView } from './NewsAnalyticsView'
import { AddSourceModal } from './modals/AddSourceModal'
import { BroadcastComposerModal } from './modals/BroadcastComposerModal'
import type { NewsArticle } from './types'

const mockArticles: NewsArticle[] = [
  {
    id: 1,
    title: 'OpenAI Launches GPT-5 with Revolutionary Reasoning Capabilities',
    source: 'TechCrunch',
    category: 'AI & Technology',
    publishedAt: '2 hours ago',
    author: 'Sarah Johnson',
    summary:
      'OpenAI today unveiled GPT-5, featuring advanced reasoning capabilities that can solve complex mathematical problems and provide detailed explanations.',
    highlights: [
      'GPT-5 can solve complex math problems with step-by-step reasoning',
      'Improved accuracy by 45% compared to GPT-4',
      'New multimodal features support video understanding',
      'Available to Plus subscribers starting next week',
      'Enterprise API access coming Q2 2025',
    ],
    sentiment: 'positive',
    tags: ['AI', 'OpenAI', 'GPT-5', 'Technology'],
    status: 'approved',
    engagement: {
      sent: 1250,
      delivered: 1235,
      read: 892,
      clicked: 456,
    },
    url: 'https://techcrunch.com/...',
    whyItMatters:
      'This advancement could significantly change how businesses use AI for complex problem-solving and decision-making.',
  },
  {
    id: 2,
    title: 'Indonesia Announces $5B Investment in EV Infrastructure',
    source: 'CNN Indonesia',
    category: 'Economics',
    publishedAt: '4 hours ago',
    author: 'Ahmad Rizki',
    summary:
      'Indonesian government commits $5 billion to build nationwide electric vehicle charging infrastructure over the next 3 years.',
    highlights: [
      '$5B investment for EV infrastructure',
      '10,000 charging stations planned by 2027',
      'Focus on major cities and toll roads',
      'Partnership with local manufacturers',
      'Tax incentives for EV buyers extended',
    ],
    sentiment: 'positive',
    tags: ['Economics', 'EV', 'Indonesia', 'Infrastructure'],
    status: 'draft',
    url: 'https://cnn.co.id/...',
    whyItMatters:
      "Major step toward Indonesia's green energy transition and could accelerate EV adoption in Southeast Asia.",
  },
  {
    id: 3,
    title: 'Global Stock Markets React to Fed Rate Decision',
    source: 'Bloomberg',
    category: 'Finance',
    publishedAt: '1 hour ago',
    summary:
      'Markets showed mixed reactions as Federal Reserve maintains interest rates, signaling cautious optimism about inflation control.',
    highlights: [
      'Fed holds rates at 5.25-5.50%',
      'S&P 500 up 0.8% after announcement',
      'Dollar strengthens against major currencies',
      'Inflation shows signs of cooling',
      'Next rate review scheduled for March',
    ],
    sentiment: 'neutral',
    tags: ['Finance', 'Fed', 'Markets', 'Economics'],
    status: 'draft',
    url: 'https://bloomberg.com/...',
    whyItMatters:
      'Rate decisions directly impact borrowing costs, mortgages, and business investments.',
  },
]

const mockSources = [
  {
    id: 1,
    name: 'TechCrunch',
    type: 'rss' as const,
    url: 'https://techcrunch.com/feed/',
    category: 'Technology',
    status: 'active' as const,
    lastFetch: '5 min ago',
    articlesCount: 142,
  },
  {
    id: 2,
    name: 'CNN Indonesia',
    type: 'api' as const,
    url: 'api.cnn.co.id/v1',
    category: 'News',
    status: 'active' as const,
    lastFetch: '10 min ago',
    articlesCount: 298,
  },
  {
    id: 3,
    name: 'Kompas.com',
    type: 'scrape' as const,
    url: 'https://kompas.com',
    category: 'News',
    status: 'active' as const,
    lastFetch: '3 min ago',
    articlesCount: 456,
  },
  {
    id: 4,
    name: 'The Verge',
    type: 'rss' as const,
    url: 'https://theverge.com/rss',
    category: 'Technology',
    status: 'paused' as const,
    lastFetch: '2 hours ago',
    articlesCount: 89,
  },
]

export const NewsPage = () => {
  const [activeTab, setActiveTab] = useState<
    'feed' | 'sources' | 'broadcasts' | 'analytics'
  >('feed')
  const [showSourceModal, setShowSourceModal] = useState(false)
  const [showBroadcastModal, setShowBroadcastModal] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(
    null,
  )
  const [articles] = useState<NewsArticle[]>(mockArticles)
  const [sources] = useState(mockSources)

  const draftCount = articles.filter((a) => a.status === 'draft').length

  return (
    <Box h="100%" display="flex" flexDirection="column" bg="white">
      <Box
        h="48px"
        px={4}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        bg="white"
        borderBottomWidth={1}
        borderColor="gray.200"
      >
        <Flex alignItems="center" gap={6}>
          <Box fontSize="sm" color="gray.900" fontWeight="medium">
            News Broadcasting
          </Box>
          <Flex gap={1}>
            {[
              { id: 'feed', label: 'Feed' },
              { id: 'sources', label: 'Sources' },
              { id: 'broadcasts', label: 'Broadcasts' },
              { id: 'analytics', label: 'Analytics' },
            ].map((tab) => (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                px={3}
                h="28px"
                fontSize="xs"
                borderRadius="md"
                bg={activeTab === tab.id ? 'blue.50' : 'transparent'}
                color={activeTab === tab.id ? 'blue.600' : 'gray.600'}
                _hover={{ bg: 'gray.50' }}
              >
                {tab.label}
              </Button>
            ))}
          </Flex>
        </Flex>
        <Flex alignItems="center" gap={2}>
          {activeTab === 'feed' && (
            <>
              <Badge
                h="24px"
                px={2}
                fontSize="xs"
                borderRadius="sm"
                borderWidth={0}
                bg="orange.100"
                color="orange.700"
              >
                {draftCount} Awaiting Approval
              </Badge>
              <Button
                size="sm"
                bg="blue.500"
                color="white"
                _hover={{ bg: 'blue.600' }}
                h="32px"
                px={3}
                fontSize="xs"
                display="flex"
                alignItems="center"
                gap={1.5}
                onClick={() => setShowBroadcastModal(true)}
              >
                <Send size={14} />
                Broadcast Selected
              </Button>
            </>
          )}
          {activeTab === 'sources' && (
            <Button
              size="sm"
              bg="blue.500"
              color="white"
              _hover={{ bg: 'blue.600' }}
              h="32px"
              px={3}
              fontSize="xs"
              display="flex"
              alignItems="center"
              gap={1.5}
              onClick={() => setShowSourceModal(true)}
            >
              <Plus size={14} />
              Add Source
            </Button>
          )}
        </Flex>
      </Box>

      <Box flex={1} overflow="hidden">
        {activeTab === 'feed' && (
          <NewsFeedView
            articles={articles}
            selectedArticle={selectedArticle}
            onSelectArticle={setSelectedArticle}
          />
        )}
        {activeTab === 'sources' && <SourcesView sources={sources} />}
        {activeTab === 'broadcasts' && <BroadcastsView />}
        {activeTab === 'analytics' && <NewsAnalyticsView />}
      </Box>

      {showSourceModal && (
        <AddSourceModal onClose={() => setShowSourceModal(false)} />
      )}
      {showBroadcastModal && (
        <BroadcastComposerModal onClose={() => setShowBroadcastModal(false)} />
      )}
    </Box>
  )
}
