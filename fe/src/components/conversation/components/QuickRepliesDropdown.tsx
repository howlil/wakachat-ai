import { Box, Flex, Text } from '@chakra-ui/react'
import { Command, Paperclip } from 'lucide-react'
import type { QuickReply } from '../types'

interface QuickRepliesDropdownProps {
  isOpen: boolean
  quickReplies: QuickReply[]
  searchQuery: string
  onSelect: (quickReply: QuickReply) => void
}

export const QuickRepliesDropdown = ({
  isOpen,
  quickReplies,
  searchQuery,
  onSelect,
}: QuickRepliesDropdownProps) => {
  if (!isOpen) return null

  const filtered = quickReplies.filter((qr) =>
    qr.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Box
      position="absolute"
      bottom={16}
      left={4}
      w="320px"
      bg="white"
      borderWidth={1}
      borderColor="gray.200"
      borderRadius="lg"
      boxShadow="xl"
      zIndex={10}
      maxH="240px"
      overflow="auto"
    >
      <Box
        p={2}
        borderBottomWidth={1}
        borderColor="gray.200"
        display="flex"
        alignItems="center"
        gap={2}
        position="sticky"
        top={0}
        bg="white"
      >
        <Command size={14} color="#9CA3AF" />
        <Text fontSize="xs" color="gray.600">
          Quick Replies
        </Text>
      </Box>
      {filtered.length === 0 ? (
        <Box p={3} textAlign="center">
          <Text fontSize="xs" color="gray.500">
            No quick replies found
          </Text>
        </Box>
      ) : (
        filtered.map((qr) => (
          <Box
            key={qr.id}
            as="button"
            w="100%"
            p={3}
            textAlign="left"
            _hover={{ bg: 'gray.50' }}
            borderBottomWidth={1}
            borderColor="gray.100"
            onClick={() => onSelect(qr)}
          >
            <Flex alignItems="center" justifyContent="space-between" mb={1}>
              <Text fontSize="xs" color="blue.600">
                /{qr.name}
              </Text>
              {qr.hasAttachment && <Paperclip size={12} color="#9CA3AF" />}
            </Flex>
            <Text
              fontSize="xs"
              color="gray.700"
              overflow="hidden"
              textOverflow="ellipsis"
              display="-webkit-box"
              style={{
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {qr.content}
            </Text>
          </Box>
        ))
      )}
      <Box
        p={2}
        bg="gray.50"
        borderTopWidth={1}
        borderColor="gray.200"
        textAlign="center"
      >
        <Text fontSize="xs" color="gray.500">
          Type / to see all quick replies
        </Text>
      </Box>
    </Box>
  )
}
