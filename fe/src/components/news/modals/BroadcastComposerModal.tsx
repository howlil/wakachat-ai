import { Box, Flex, Text, Button, Textarea, Badge } from '@chakra-ui/react'
import { X, Send } from 'lucide-react'
import { useState } from 'react'
import type { BroadcastChannel } from '../types'

interface BroadcastComposerModalProps {
  onClose: () => void
}

export const BroadcastComposerModal = ({
  onClose,
}: BroadcastComposerModalProps) => {
  const [selectedChannel, setSelectedChannel] =
    useState<BroadcastChannel>('whatsapp')
  const [selectedSegment, setSelectedSegment] = useState('all')
  const [message, setMessage] = useState(
    `Halo {{name}} 👋\n\n[Headline]: {{headline}}\n\nRingkasan: {{summary}}\n\nBaca selengkapnya: {{url}}`,
  )

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
      <Box
        bg="white"
        borderRadius="lg"
        boxShadow="xl"
        w="100%"
        maxW="1024px"
        maxH="90vh"
        display="flex"
        flexDirection="column"
      >
        <Box
          p={4}
          borderBottomWidth={1}
          borderColor="gray.200"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text fontSize="sm" color="gray.900" fontWeight="medium">
            Broadcast Composer
          </Text>
          <Button variant="ghost" size="sm" w="28px" h="28px" p={0} onClick={onClose}>
            <X size={16} color="#9CA3AF" />
          </Button>
        </Box>
        <Box flex={1} overflow="auto" p={4}>
          <Box display="grid" gridTemplateColumns="1fr 1fr" gap={4}>
            <Box>
              <Box mb={3}>
                <Text fontSize="xs" color="gray.700" mb={1}>
                  Channel
                </Text>
                <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={2}>
                  {[
                    { id: 'whatsapp', label: 'WhatsApp' },
                    { id: 'email', label: 'Email' },
                    { id: 'sms', label: 'SMS' },
                    { id: 'push', label: 'Push' },
                  ].map((channel) => (
                    <Button
                      key={channel.id}
                      onClick={() =>
                        setSelectedChannel(channel.id as BroadcastChannel)
                      }
                      h="36px"
                      borderRadius="md"
                      fontSize="xs"
                      bg={
                        selectedChannel === channel.id
                          ? 'blue.100'
                          : 'gray.50'
                      }
                      color={
                        selectedChannel === channel.id
                          ? 'blue.700'
                          : 'gray.600'
                      }
                      borderWidth={1}
                      borderColor={
                        selectedChannel === channel.id
                          ? 'blue.300'
                          : 'gray.200'
                      }
                      _hover={{ bg: 'gray.100' }}
                    >
                      {channel.label}
                    </Button>
                  ))}
                </Box>
              </Box>
              <Box mb={3}>
                <Text fontSize="xs" color="gray.700" mb={1}>
                  Audience Segment
                </Text>
                <Box
                  as="select"
                  value={selectedSegment}
                  onChange={(e) => setSelectedSegment(e.target.value)}
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
                  <option value="all">All Subscribers (45,678)</option>
                  <option value="tech">Tech Enthusiasts (12,345)</option>
                  <option value="business">Business Leaders (8,765)</option>
                  <option value="active">Active Users (34,567)</option>
                </Box>
              </Box>
              <Box mb={3}>
                <Text fontSize="xs" color="gray.700" mb={1}>
                  Message Template
                </Text>
                <Box
                  as="select"
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
                  <option>Tech News Update</option>
                  <option>Daily Brief</option>
                  <option>Breaking News Alert</option>
                </Box>
              </Box>
              <Box mb={3}>
                <Text fontSize="xs" color="gray.700" mb={1}>
                  Personalization
                </Text>
                <Flex flexWrap="wrap" gap={1} mb={2}>
                  {['{{name}}', '{{headline}}', '{{summary}}', '{{url}}'].map(
                    (variable) => (
                      <Badge
                        key={variable}
                        h="20px"
                        px={2}
                        fontSize="xs"
                        bg="purple.100"
                        color="purple.700"
                        borderWidth={0}
                        cursor="pointer"
                        _hover={{ bg: 'purple.200' }}
                      >
                        {variable}
                      </Badge>
                    ),
                  )}
                </Flex>
                <Textarea
                  placeholder="Compose your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  h="128px"
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
              <Box>
                <Text fontSize="xs" color="gray.700" mb={1}>
                  Schedule
                </Text>
                <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
                  <Button
                    h="36px"
                    bg="blue.50"
                    color="blue.700"
                    borderWidth={1}
                    borderColor="blue.300"
                    borderRadius="md"
                    fontSize="xs"
                  >
                    Send Now
                  </Button>
                  <Button
                    h="36px"
                    bg="gray.50"
                    color="gray.600"
                    borderWidth={1}
                    borderColor="gray.200"
                    borderRadius="md"
                    fontSize="xs"
                    _hover={{ bg: 'gray.100' }}
                  >
                    Schedule Later
                  </Button>
                </Box>
              </Box>
            </Box>
            <Box>
              <Text fontSize="xs" color="gray.700" mb={2}>
                Mobile Preview
              </Text>
              <Box bg="gray.100" borderRadius="lg" p={4}>
                <Box
                  bg="white"
                  borderRadius="2xl"
                  boxShadow="xl"
                  maxW="320px"
                  mx="auto"
                  overflow="hidden"
                  h="500px"
                >
                  <Box bg="gray.800" h="32px" borderRadius="2xl 2xl 0 0" />
                  <Box p={4}>
                    <Box
                      bg="gray.100"
                      borderRadius="lg"
                      p={3}
                      fontSize="xs"
                      whiteSpace="pre-wrap"
                    >
                      {message}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          p={4}
          borderTopWidth={1}
          borderColor="gray.200"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text fontSize="xs" color="gray.600">
            Est. recipients: <Text as="span" color="gray.900">45,678</Text> • Cost:{' '}
            <Text as="span" color="gray.900">~$45.67</Text>
          </Text>
          <Flex gap={2}>
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
              borderWidth={1}
              borderColor="blue.200"
              bg="blue.50"
              color="blue.600"
              borderRadius="md"
              _hover={{ bg: 'blue.100' }}
              fontSize="xs"
            >
              Test Send
            </Button>
            <Button
              h="32px"
              px={4}
              bg="blue.500"
              color="white"
              _hover={{ bg: 'blue.600' }}
              borderRadius="md"
              fontSize="xs"
              display="flex"
              alignItems="center"
              gap={1}
            >
              <Send size={12} />
              Send Broadcast
            </Button>
          </Flex>
        </Box>
      </Box>
    </Box>
  )
}

