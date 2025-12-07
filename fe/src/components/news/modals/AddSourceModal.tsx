import { Box, Flex, Text, Button, Input } from '@chakra-ui/react'
import { X } from 'lucide-react'
import { useState } from 'react'
import type { NewsSourceType } from '../types'

interface AddSourceModalProps {
  onClose: () => void
}

export const AddSourceModal = ({ onClose }: AddSourceModalProps) => {
  const [sourceType, setSourceType] = useState<NewsSourceType>('rss')
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    category: '',
    fetchInterval: '5 minutes',
  })

  const handleSubmit = () => {
    if (!formData.name || !formData.url || !formData.category) {
      return
    }
    onClose()
  }

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg="blackAlpha.500"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
      zIndex={50}
    >
      <Box bg="white" borderRadius="lg" boxShadow="xl" w="100%" maxW="512px">
        <Box
          p={4}
          borderBottomWidth={1}
          borderColor="gray.200"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text fontSize="sm" color="gray.900" fontWeight="medium">
            Add News Source
          </Text>
          <Button variant="ghost" size="sm" w="28px" h="28px" p={0} onClick={onClose}>
            <X size={16} color="#9CA3AF" />
          </Button>
        </Box>
        <Box p={4}>
          <Box mb={3}>
            <Text fontSize="xs" color="gray.700" mb={1}>
              Source Name
            </Text>
            <Input
              type="text"
              placeholder="e.g., TechCrunch, CNN Indonesia"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              h="36px"
              px={3}
              fontSize="xs"
              borderColor="gray.200"
              borderRadius="md"
              _focus={{
                ring: 1,
                ringColor: 'blue.500',
              }}
            />
          </Box>
          <Box mb={3}>
            <Text fontSize="xs" color="gray.700" mb={1}>
              Source Type
            </Text>
            <Flex gap={2}>
              {['RSS', 'API', 'Scrape'].map((type) => (
                <Button
                  key={type}
                  onClick={() => setSourceType(type.toLowerCase() as NewsSourceType)}
                  flex={1}
                  h="36px"
                  borderRadius="md"
                  fontSize="xs"
                  bg={
                    sourceType === type.toLowerCase()
                      ? 'blue.100'
                      : 'gray.50'
                  }
                  color={
                    sourceType === type.toLowerCase()
                      ? 'blue.700'
                      : 'gray.600'
                  }
                  borderWidth={1}
                  borderColor={
                    sourceType === type.toLowerCase()
                      ? 'blue.300'
                      : 'gray.200'
                  }
                  _hover={{ bg: 'gray.100' }}
                >
                  {type}
                </Button>
              ))}
            </Flex>
          </Box>
          <Box mb={3}>
            <Text fontSize="xs" color="gray.700" mb={1}>
              URL
            </Text>
            <Input
              type="url"
              placeholder={
                sourceType === 'rss'
                  ? 'https://example.com/feed'
                  : sourceType === 'api'
                    ? 'https://api.example.com/v1'
                    : 'https://example.com'
              }
              value={formData.url}
              onChange={(e) =>
                setFormData({ ...formData, url: e.target.value })
              }
              h="36px"
              px={3}
              fontSize="xs"
              borderColor="gray.200"
              borderRadius="md"
              _focus={{
                ring: 1,
                ringColor: 'blue.500',
              }}
            />
          </Box>
          <Box mb={3}>
            <Text fontSize="xs" color="gray.700" mb={1}>
              Category
            </Text>
            <Box
              as="select"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              w="100%"
              h="36px"
              px={3}
              fontSize="xs"
              borderWidth={1}
              borderColor="gray.200"
              borderRadius="md"
              bg="white"
              _focus={{
                ring: 1,
                ringColor: 'blue.500',
              }}
            >
              <option value="">Select category...</option>
              <option value="Technology">Technology</option>
              <option value="Economics">Economics</option>
              <option value="Politics">Politics</option>
              <option value="Health">Health</option>
              <option value="Sports">Sports</option>
            </Box>
          </Box>
          <Box mb={3}>
            <Text fontSize="xs" color="gray.700" mb={1}>
              Fetch Interval
            </Text>
            <Box
              as="select"
              value={formData.fetchInterval}
              onChange={(e) =>
                setFormData({ ...formData, fetchInterval: e.target.value })
              }
              w="100%"
              h="36px"
              px={3}
              fontSize="xs"
              borderWidth={1}
              borderColor="gray.200"
              borderRadius="md"
              bg="white"
              _focus={{
                ring: 1,
                ringColor: 'blue.500',
              }}
            >
              <option value="5 minutes">Every 5 minutes</option>
              <option value="15 minutes">Every 15 minutes</option>
              <option value="30 minutes">Every 30 minutes</option>
              <option value="1 hour">Every hour</option>
            </Box>
          </Box>
        </Box>
        <Box
          p={4}
          borderTopWidth={1}
          borderColor="gray.200"
          display="flex"
          justifyContent="flex-end"
          gap={2}
        >
          <Button
            h="32px"
            px={4}
            borderWidth={1}
            borderColor="gray.200"
            borderRadius="md"
            _hover={{ bg: 'gray.50' }}
            fontSize="xs"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            h="32px"
            px={4}
            bg="blue.500"
            color="white"
            _hover={{ bg: 'blue.600' }}
            borderRadius="md"
            fontSize="xs"
            onClick={handleSubmit}
            disabled={!formData.name || !formData.url || !formData.category}
          >
            Add Source
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

