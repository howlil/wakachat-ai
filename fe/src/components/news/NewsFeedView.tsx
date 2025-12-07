import { Box, Flex, Input, Badge } from '@chakra-ui/react'
import { Search, ChevronLeft, ChevronRight, RefreshCw, Newspaper } from 'lucide-react'
import { useState } from 'react'
import { ArticleCard } from './ArticleCard'
import { ArticleEditorPanel } from './ArticleEditorPanel'
import type { NewsArticle } from './types'

interface NewsFeedViewProps {
  articles: NewsArticle[]
  selectedArticle: NewsArticle | null
  onSelectArticle: (article: NewsArticle | null) => void
}

export const NewsFeedView = ({
  articles,
  selectedArticle,
  onSelectArticle,
}: NewsFeedViewProps) => {
  const [showLeftPanel, setShowLeftPanel] = useState(true)
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterStatus, setFilterStatus] = useState<
    'all' | 'draft' | 'approved' | 'sent'
  >('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredArticles = articles.filter((article) => {
    if (filterCategory !== 'all' && article.category !== filterCategory)
      return false
    if (filterStatus !== 'all' && article.status !== filterStatus) return false
    if (
      searchQuery &&
      !article.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false
    return true
  })

  const categories = [
    'All',
    'Technology',
    'AI & Technology',
    'Economics',
    'Finance',
    'Politics',
    'Health',
  ]

  return (
    <Flex h="100%">
      {showLeftPanel && (
        <Box
          w="240px"
          bg="white"
          borderRightWidth={1}
          borderColor="gray.200"
          display="flex"
          flexDirection="column"
        >
          <Box p={3} borderBottomWidth={1} borderColor="gray.100">
            <Box fontSize="xs" color="gray.700" mb={2}>
              Categories
            </Box>
            <Box>
              {categories.map((cat) => (
                <Box
                  key={cat}
                  as="button"
                  onClick={() =>
                    setFilterCategory(cat === 'All' ? 'all' : cat)
                  }
                  w="100%"
                  textAlign="left"
                  px={2}
                  py={1.5}
                  borderRadius="md"
                  fontSize="xs"
                  bg={
                    (cat === 'All' && filterCategory === 'all') ||
                    cat === filterCategory
                      ? 'blue.50'
                      : 'transparent'
                  }
                  color={
                    (cat === 'All' && filterCategory === 'all') ||
                    cat === filterCategory
                      ? 'blue.600'
                      : 'gray.600'
                  }
                  _hover={{ bg: 'gray.50' }}
                  mb={0.5}
                >
                  {cat}
                </Box>
              ))}
            </Box>
          </Box>
          <Box p={3} borderBottomWidth={1} borderColor="gray.100">
            <Box fontSize="xs" color="gray.700" mb={2}>
              Status
            </Box>
            <Box>
              {['All', 'Draft', 'Approved', 'Sent'].map((status) => (
                <Box
                  key={status}
                  as="button"
                  onClick={() =>
                    setFilterStatus(
                      status.toLowerCase() as 'all' | 'draft' | 'approved' | 'sent',
                    )
                  }
                  w="100%"
                  textAlign="left"
                  px={2}
                  py={1.5}
                  borderRadius="md"
                  fontSize="xs"
                  bg={
                    status.toLowerCase() === filterStatus
                      ? 'blue.50'
                      : 'transparent'
                  }
                  color={
                    status.toLowerCase() === filterStatus
                      ? 'blue.600'
                      : 'gray.600'
                  }
                  _hover={{ bg: 'gray.50' }}
                  mb={0.5}
                >
                  {status}
                </Box>
              ))}
            </Box>
          </Box>
          <Box p={3}>
            <Box fontSize="xs" color="gray.700" mb={2}>
              Quick Stats
            </Box>
            <Box>
              <Flex
                alignItems="center"
                justifyContent="space-between"
                fontSize="xs"
                mb={2}
              >
                <Box color="gray.600">Total Articles</Box>
                <Badge
                  h="16px"
                  px={1.5}
                  fontSize="xs"
                  bg="gray.100"
                  color="gray.700"
                  borderWidth={0}
                >
                  {articles.length}
                </Badge>
              </Flex>
              <Flex
                alignItems="center"
                justifyContent="space-between"
                fontSize="xs"
                mb={2}
              >
                <Box color="gray.600">Pending</Box>
                <Badge
                  h="16px"
                  px={1.5}
                  fontSize="xs"
                  bg="orange.100"
                  color="orange.700"
                  borderWidth={0}
                >
                  {articles.filter((a) => a.status === 'draft').length}
                </Badge>
              </Flex>
              <Flex
                alignItems="center"
                justifyContent="space-between"
                fontSize="xs"
              >
                <Box color="gray.600">Sent Today</Box>
                <Badge
                  h="16px"
                  px={1.5}
                  fontSize="xs"
                  bg="green.100"
                  color="green.700"
                  borderWidth={0}
                >
                  {articles.filter((a) => a.status === 'sent').length}
                </Badge>
              </Flex>
            </Box>
          </Box>
        </Box>
      )}

      <Box flex={1} display="flex" flexDirection="column" bg="gray.50">
        <Box p={3} bg="white" borderBottomWidth={1} borderColor="gray.200">
          <Flex alignItems="center" gap={2}>
            <Box
              as="button"
              onClick={() => setShowLeftPanel(!showLeftPanel)}
              w="32px"
              h="32px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              _hover={{ bg: 'gray.100' }}
              borderRadius="md"
            >
              {showLeftPanel ? (
                <ChevronLeft size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </Box>
            <Box position="relative" flex={1}>
              <Search
                size={14}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9CA3AF',
                }}
              />
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                h="32px"
                pl={9}
                pr={3}
                fontSize="xs"
                borderColor="gray.200"
                _focus={{
                  ring: 1,
                  ringColor: 'blue.500',
                }}
              />
            </Box>
            <Box
              as="button"
              h="32px"
              px={3}
              borderWidth={1}
              borderColor="gray.200"
              borderRadius="md"
              _hover={{ bg: 'gray.50' }}
              fontSize="xs"
              display="flex"
              alignItems="center"
              gap={1}
            >
              <RefreshCw size={12} />
              Refresh
            </Box>
          </Flex>
        </Box>

        <Box flex={1} overflow="auto" p={3}>
          {filteredArticles.length > 0 ? (
            <Box>
              {filteredArticles.map((article) => (
                <Box key={article.id} mb={2}>
                  <ArticleCard
                    article={article}
                    isSelected={selectedArticle?.id === article.id}
                    onSelect={() => onSelectArticle(article)}
                  />
                </Box>
              ))}
            </Box>
          ) : (
            <Box textAlign="center" py={12}>
              <Newspaper
                size={48}
                style={{ color: '#D1D5DB', margin: '0 auto 12px' }}
              />
              <Box fontSize="sm" color="gray.500">
                No articles found
              </Box>
            </Box>
          )}
        </Box>
      </Box>

      {selectedArticle && (
        <ArticleEditorPanel
          article={selectedArticle}
          onClose={() => onSelectArticle(null)}
        />
      )}
    </Flex>
  )
}

