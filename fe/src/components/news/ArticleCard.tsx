import { Box, Flex, Badge } from '@chakra-ui/react'
import { ThumbsUp, ThumbsDown, Meh } from 'lucide-react'
import type { NewsArticle, NewsSentiment } from './types'

interface ArticleCardProps {
  article: NewsArticle
  isSelected: boolean
  onSelect: () => void
}

export const ArticleCard = ({
  article,
  isSelected,
  onSelect,
}: ArticleCardProps) => {
  const getSentimentIcon = () => {
    switch (article.sentiment) {
      case 'positive':
        return <ThumbsUp size={12} color="#10B981" />
      case 'negative':
        return <ThumbsDown size={12} color="#EF4444" />
      default:
        return <Meh size={12} color="#6B7280" />
    }
  }

  const getStatusColor = () => {
    switch (article.status) {
      case 'draft':
        return { bg: 'orange.100', color: 'orange.700' }
      case 'approved':
        return { bg: 'green.100', color: 'green.700' }
      default:
        return { bg: 'blue.100', color: 'blue.700' }
    }
  }

  const statusColors = getStatusColor()

  return (
    <Box
      as="button"
      onClick={onSelect}
      bg="white"
      borderRadius="lg"
      borderWidth={1}
      borderColor={isSelected ? 'blue.500' : 'gray.200'}
      p={3}
      _hover={{ boxShadow: 'md' }}
      transition="all"
      w="100%"
      textAlign="left"
    >
      <Flex alignItems="flex-start" gap={3}>
        <input
          type="checkbox"
          style={{
            marginTop: '4px',
            width: '16px',
            height: '16px',
            cursor: 'pointer',
          }}
          onClick={(e) => e.stopPropagation()}
        />
        <Box flex={1} minW={0}>
          <Flex alignItems="flex-start" justifyContent="space-between" gap={2} mb={2}>
            <Box
              fontSize="xs"
              color="gray.900"
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              flex={1}
            >
              {article.title}
            </Box>
            <Badge
              h="16px"
              px={1.5}
              fontSize="xs"
              borderWidth={0}
              bg={statusColors.bg}
              color={statusColors.color}
              flexShrink={0}
            >
              {article.status}
            </Badge>
          </Flex>
          <Box
            fontSize="xs"
            color="gray.600"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            mb={2}
          >
            {article.summary}
          </Box>
          <Flex alignItems="center" gap={2} flexWrap="wrap" mb={2}>
            <Badge
              h="16px"
              px={1.5}
              fontSize="xs"
              bg="gray.100"
              color="gray.700"
              borderWidth={0}
            >
              {article.source}
            </Badge>
            <Badge
              h="16px"
              px={1.5}
              fontSize="xs"
              bg="purple.100"
              color="purple.700"
              borderWidth={0}
            >
              {article.category}
            </Badge>
            <Flex alignItems="center" gap={1}>
              {getSentimentIcon()}
            </Flex>
            <Box fontSize="xs" color="gray.400">
              {article.publishedAt}
            </Box>
          </Flex>
          {article.engagement && (
            <Flex alignItems="center" gap={3} fontSize="xs" color="gray.500" mt={2}>
              <Box>Sent: {article.engagement.sent}</Box>
              <Box>Read: {article.engagement.read}</Box>
              <Box>Clicked: {article.engagement.clicked}</Box>
            </Flex>
          )}
        </Box>
      </Flex>
    </Box>
  )
}

