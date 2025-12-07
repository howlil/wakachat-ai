import { Box, Flex, Text, Button, Textarea, Badge, Input } from '@chakra-ui/react'
import {
  X,
  Sparkles,
  Trash2,
  Check,
  Send,
  Calendar,
  ExternalLink,
  ThumbsUp,
  Meh,
  ThumbsDown,
  Plus,
} from 'lucide-react'
import { useState } from 'react'
import type { NewsArticle } from './types'

interface ArticleEditorPanelProps {
  article: NewsArticle
  onClose: () => void
}

export const ArticleEditorPanel = ({
  article,
  onClose,
}: ArticleEditorPanelProps) => {
  const [editableSummary, setEditableSummary] = useState(article.summary)
  const [editableHighlights, setEditableHighlights] = useState(
    article.highlights,
  )
  const [editableWhyItMatters, setEditableWhyItMatters] = useState(
    article.whyItMatters || '',
  )
  const [showAISuggestions, setShowAISuggestions] = useState(false)

  const updateHighlight = (index: number, value: string) => {
    const newHighlights = [...editableHighlights]
    newHighlights[index] = value
    setEditableHighlights(newHighlights)
  }

  const removeHighlight = (index: number) => {
    setEditableHighlights(
      editableHighlights.filter((_, i) => i !== index),
    )
  }

  const addHighlight = () => {
    setEditableHighlights([...editableHighlights, ''])
  }

  return (
    <Box
      w="384px"
      bg="white"
      borderLeftWidth={1}
      borderColor="gray.200"
      display="flex"
      flexDirection="column"
    >
      <Box
        p={3}
        borderBottomWidth={1}
        borderColor="gray.200"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text fontSize="xs" color="gray.900">
          Article Editor
        </Text>
        <Button
          variant="ghost"
          size="sm"
          w="24px"
          h="24px"
          p={0}
          onClick={onClose}
        >
          <X size={16} color="#9CA3AF" />
        </Button>
      </Box>

      <Box flex={1} overflow="auto" p={3}>
        <Box mb={3}>
          <Text fontSize="xs" color="gray.700" mb={1}>
            Title
          </Text>
          <Box
            fontSize="xs"
            color="gray.900"
            p={2}
            bg="gray.50"
            borderRadius="md"
            borderWidth={1}
            borderColor="gray.200"
          >
            {article.title}
          </Box>
        </Box>

        <Flex gap={2} mb={3}>
          <Box flex={1}>
            <Text fontSize="xs" color="gray.700" mb={1}>
              Source
            </Text>
            <Badge
              h="20px"
              px={2}
              fontSize="xs"
              bg="gray.100"
              color="gray.700"
              borderWidth={0}
            >
              {article.source}
            </Badge>
          </Box>
          <Box flex={1}>
            <Text fontSize="xs" color="gray.700" mb={1}>
              Published
            </Text>
            <Text fontSize="xs" color="gray.600">
              {article.publishedAt}
            </Text>
          </Box>
        </Flex>

        <Box mb={3}>
          <Flex alignItems="center" justifyContent="space-between" mb={1}>
            <Text fontSize="xs" color="gray.700">
              Summary
            </Text>
            <Button
              variant="ghost"
              size="sm"
              fontSize="xs"
              color="blue.600"
              _hover={{ textDecoration: 'underline' }}
              display="flex"
              alignItems="center"
              gap={1}
              onClick={() => setShowAISuggestions(!showAISuggestions)}
            >
              <Sparkles size={12} />
              AI Suggest
            </Button>
          </Flex>
          <Textarea
            value={editableSummary}
            onChange={(e) => setEditableSummary(e.target.value)}
            h="80px"
            p={2}
            fontSize="xs"
            borderColor="gray.200"
            borderRadius="md"
            resize="none"
            _focus={{
              ring: 1,
              ringColor: 'blue.500',
            }}
          />
          {showAISuggestions && (
            <Box mt={2} p={2} bg="purple.50" borderWidth={1} borderColor="purple.200" borderRadius="md">
              <Flex alignItems="flex-start" gap={2}>
                <Sparkles size={12} color="#9333EA" style={{ marginTop: '2px' }} />
                <Box flex={1}>
                  <Text fontSize="xs" color="purple.900" mb={1}>
                    AI Suggestion:
                  </Text>
                  <Text fontSize="xs" color="purple.700">
                    {article.summary}
                  </Text>
                  <Button
                    variant="ghost"
                    size="sm"
                    fontSize="xs"
                    color="purple.600"
                    _hover={{ textDecoration: 'underline' }}
                    mt={1}
                  >
                    Accept
                  </Button>
                </Box>
              </Flex>
            </Box>
          )}
        </Box>

        <Box mb={3}>
          <Text fontSize="xs" color="gray.700" mb={1}>
            Highlights
          </Text>
          <Box>
            {editableHighlights.map((highlight, index) => (
              <Flex key={index} alignItems="flex-start" gap={2} mb={1}>
                <Input
                  type="text"
                  value={highlight}
                  onChange={(e) => updateHighlight(index, e.target.value)}
                  h="28px"
                  px={2}
                  fontSize="xs"
                  borderColor="gray.200"
                  borderRadius="md"
                  flex={1}
                  _focus={{
                    ring: 1,
                    ringColor: 'blue.500',
                  }}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  w="24px"
                  h="28px"
                  p={0}
                  _hover={{ bg: 'red.50' }}
                  onClick={() => removeHighlight(index)}
                >
                  <Trash2 size={12} color="#EF4444" />
                </Button>
              </Flex>
            ))}
            <Button
              w="100%"
              h="28px"
              borderWidth={1}
              borderStyle="dashed"
              borderColor="gray.300"
              borderRadius="md"
              _hover={{ borderColor: 'blue.300' }}
              fontSize="xs"
              color="gray.600"
              _hover={{ color: 'blue.600' }}
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={1}
              onClick={addHighlight}
            >
              <Plus size={12} />
              Add Highlight
            </Button>
          </Box>
        </Box>

        <Box mb={3}>
          <Text fontSize="xs" color="gray.700" mb={1}>
            Why It Matters
          </Text>
          <Textarea
            value={editableWhyItMatters}
            onChange={(e) => setEditableWhyItMatters(e.target.value)}
            placeholder="Explain why this news is important..."
            h="64px"
            p={2}
            fontSize="xs"
            borderColor="gray.200"
            borderRadius="md"
            resize="none"
            _focus={{
              ring: 1,
              ringColor: 'blue.500',
            }}
          />
        </Box>

        <Box mb={3}>
          <Text fontSize="xs" color="gray.700" mb={1}>
            Tags
          </Text>
          <Flex flexWrap="wrap" gap={1}>
            {article.tags.map((tag) => (
              <Badge
                key={tag}
                h="20px"
                px={2}
                fontSize="xs"
                bg="blue.100"
                color="blue.700"
                borderWidth={0}
                display="flex"
                alignItems="center"
                gap={1}
              >
                {tag}
                <X
                  size={12}
                  style={{ cursor: 'pointer' }}
                  onClick={() => {}}
                />
              </Badge>
            ))}
            <Button
              h="20px"
              px={2}
              borderWidth={1}
              borderStyle="dashed"
              borderColor="gray.300"
              borderRadius="md"
              fontSize="xs"
              color="gray.600"
              _hover={{ borderColor: 'blue.300', color: 'blue.600' }}
            >
              + Add
            </Button>
          </Flex>
        </Box>

        <Box mb={3}>
          <Text fontSize="xs" color="gray.700" mb={1}>
            Sentiment
          </Text>
          <Flex gap={2}>
            {[
              { value: 'positive', icon: ThumbsUp },
              { value: 'neutral', icon: Meh },
              { value: 'negative', icon: ThumbsDown },
            ].map((sentiment) => {
              const Icon = sentiment.icon
              const isActive = article.sentiment === sentiment.value
              return (
                <Button
                  key={sentiment.value}
                  flex={1}
                  h="32px"
                  borderRadius="md"
                  fontSize="xs"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  gap={1}
                  bg={isActive ? 'blue.100' : 'gray.50'}
                  color={isActive ? 'blue.700' : 'gray.600'}
                  borderWidth={1}
                  borderColor={isActive ? 'blue.300' : 'gray.200'}
                  _hover={{ bg: isActive ? 'blue.100' : 'gray.100' }}
                >
                  <Icon size={12} />
                  {sentiment.value}
                </Button>
              )
            })}
          </Flex>
        </Box>

        <Box>
          <Text fontSize="xs" color="gray.700" mb={1}>
            Source URL
          </Text>
          <Box
            as="a"
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            fontSize="xs"
            color="blue.600"
            _hover={{ textDecoration: 'underline' }}
            display="flex"
            alignItems="center"
            gap={1}
          >
            <ExternalLink size={12} />
            View Original
          </Box>
        </Box>
      </Box>

      <Box p={3} borderTopWidth={1} borderColor="gray.200">
        <Button
          w="100%"
          h="32px"
          bg="green.500"
          color="white"
          _hover={{ bg: 'green.600' }}
          fontSize="xs"
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={1}
          mb={2}
        >
          <Check size={14} />
          Approve & Save
        </Button>
        <Flex gap={2}>
          <Button
            flex={1}
            h="32px"
            borderWidth={1}
            borderColor="gray.200"
            borderRadius="md"
            _hover={{ bg: 'gray.50' }}
            fontSize="xs"
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={1}
          >
            <Calendar size={12} />
            Schedule
          </Button>
          <Button
            flex={1}
            h="32px"
            bg="blue.500"
            color="white"
            _hover={{ bg: 'blue.600' }}
            fontSize="xs"
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={1}
          >
            <Send size={12} />
            Broadcast
          </Button>
        </Flex>
      </Box>
    </Box>
  )
}

