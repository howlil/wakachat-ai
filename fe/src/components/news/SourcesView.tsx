import { Box, Flex, Text, Button, Badge } from '@chakra-ui/react'
import { Edit, Trash2 } from 'lucide-react'
import type { NewsSource } from './types'

interface SourcesViewProps {
  sources: NewsSource[]
}

export const SourcesView = ({ sources }: SourcesViewProps) => {
  return (
    <Box p={6}>
      <Box
        display="grid"
        gridTemplateColumns={{
          base: '1fr',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
        }}
        gap={4}
      >
        {sources.map((source) => (
          <Box
            key={source.id}
            bg="white"
            borderRadius="lg"
            borderWidth={1}
            borderColor="gray.200"
            p={4}
          >
            <Flex alignItems="flex-start" justifyContent="space-between" mb={3}>
              <Box flex={1}>
                <Text fontSize="sm" color="gray.900" mb={1}>
                  {source.name}
                </Text>
                <Badge
                  h="16px"
                  px={1.5}
                  fontSize="xs"
                  borderWidth={0}
                  bg={
                    source.status === 'active'
                      ? 'green.100'
                      : source.status === 'paused'
                        ? 'gray.100'
                        : 'red.100'
                  }
                  color={
                    source.status === 'active'
                      ? 'green.700'
                      : source.status === 'paused'
                        ? 'gray.700'
                        : 'red.700'
                  }
                >
                  {source.status}
                </Badge>
              </Box>
              <Flex gap={1}>
                <Button
                  variant="ghost"
                  size="sm"
                  w="24px"
                  h="24px"
                  p={0}
                  _hover={{ bg: 'gray.100' }}
                >
                  <Edit size={12} color="#6B7280" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  w="24px"
                  h="24px"
                  p={0}
                  _hover={{ bg: 'red.50' }}
                >
                  <Trash2 size={12} color="#EF4444" />
                </Button>
              </Flex>
            </Flex>
            <Box fontSize="xs">
              <Flex alignItems="center" gap={2} mb={2}>
                <Badge
                  h="16px"
                  px={1.5}
                  fontSize="xs"
                  bg="blue.100"
                  color="blue.700"
                  borderWidth={0}
                >
                  {source.type.toUpperCase()}
                </Badge>
                <Badge
                  h="16px"
                  px={1.5}
                  fontSize="xs"
                  bg="purple.100"
                  color="purple.700"
                  borderWidth={0}
                >
                  {source.category}
                </Badge>
              </Flex>
              <Text color="gray.600" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap" mb={2}>
                {source.url}
              </Text>
              <Flex
                alignItems="center"
                justifyContent="space-between"
                pt={2}
                borderTopWidth={1}
                borderColor="gray.100"
              >
                <Text color="gray.500">Last fetch: {source.lastFetch}</Text>
                <Text color="gray.900">{source.articlesCount} articles</Text>
              </Flex>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

