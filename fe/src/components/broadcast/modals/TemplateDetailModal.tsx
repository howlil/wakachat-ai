import { Box, Flex, Text, Button, Badge } from '@chakra-ui/react'
import { X, Copy, Send, Trash2, Link as LinkIcon, Phone } from 'lucide-react'
import type { Template } from '../types'

interface TemplateDetailModalProps {
  template: Template
  onClose: () => void
}

export const TemplateDetailModal = ({
  template,
  onClose,
}: TemplateDetailModalProps) => {
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
          <Box>
            <Text fontSize="sm" color="gray.900" fontWeight="medium">
              {template.name}
            </Text>
            <Flex alignItems="center" gap={2} mt={1}>
              <Badge
                h="20px"
                px={2}
                fontSize="xs"
                borderRadius="sm"
                borderWidth={0}
                bg={template.type === 'marketing' ? 'blue.100' : 'green.100'}
                color={template.type === 'marketing' ? 'blue.700' : 'green.700'}
              >
                {template.type}
              </Badge>
              <Badge
                h="20px"
                px={2}
                fontSize="xs"
                borderRadius="sm"
                borderWidth={0}
                bg="green.100"
                color="green.700"
              >
                {template.status}
              </Badge>
            </Flex>
          </Box>
          <Button
            variant="ghost"
            size="sm"
            w="28px"
            h="28px"
            p={0}
            onClick={onClose}
          >
            <X size={16} color="#9CA3AF" />
          </Button>
        </Box>

        <Box p={4}>
          <Flex gap={4}>
            <Box flex={1}>
              <Box mb={3}>
                <Text fontSize="xs" color="gray.500" mb={1} display="block">
                  Message Type
                </Text>
                <Text fontSize="xs" color="gray.900">
                  {template.messageType.replace(/_/g, ' ')}
                </Text>
              </Box>
              <Box mb={3}>
                <Text fontSize="xs" color="gray.500" mb={1} display="block">
                  Language
                </Text>
                <Text fontSize="xs" color="gray.900">
                  {template.language}
                </Text>
              </Box>
              <Box mb={3}>
                <Text fontSize="xs" color="gray.500" mb={1} display="block">
                  Created
                </Text>
                <Text fontSize="xs" color="gray.900">
                  {template.createdAt}
                </Text>
              </Box>
              {template.variables && template.variables.length > 0 && (
                <Box>
                  <Text fontSize="xs" color="gray.500" mb={1} display="block">
                    Variables (Twilio Format)
                  </Text>
                  <Flex flexWrap="wrap" gap={1}>
                    {template.variables.map((v, idx) => (
                      <Box
                        key={idx}
                        px={2}
                        py={1}
                        bg="purple.50"
                        color="purple.700"
                        fontSize="xs"
                        borderRadius="sm"
                        borderWidth={1}
                        borderColor="purple.200"
                      >
                        {v}
                      </Box>
                    ))}
                  </Flex>
                </Box>
              )}
            </Box>

            <Box flex={1}>
              <Text fontSize="xs" color="gray.500" mb={2} display="block">
                Preview
              </Text>
              <Box
                bg="#e5ddd5"
                borderRadius="lg"
                p={4}
                borderWidth={1}
                borderColor="gray.200"
              >
                <Box bg="white" borderRadius="lg" boxShadow="sm" p={3}>
                  {template.imageUrl && (
                    <img
                      src={template.imageUrl}
                      alt=""
                      style={{
                        width: '100%',
                        height: '128px',
                        objectFit: 'cover',
                        borderRadius: '6px',
                        marginBottom: '8px',
                      }}
                    />
                  )}
                  <Text
                    fontSize="xs"
                    color="gray.900"
                    whiteSpace="pre-wrap"
                    mb={2}
                  >
                    {template.content}
                  </Text>
                  {template.buttons && template.buttons.length > 0 && (
                    <Box pt={2} borderTopWidth={1} borderColor="gray.200">
                      {template.buttons.map((btn) => (
                        <Button
                          key={btn.id}
                          w="100%"
                          h="28px"
                          px={3}
                          bg="blue.500"
                          color="white"
                          _hover={{ bg: 'blue.600' }}
                          fontSize="xs"
                          mb={1}
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          gap={1}
                        >
                          {btn.type === 'url' && <LinkIcon size={12} />}
                          {btn.type === 'phone' && <Phone size={12} />}
                          {btn.text}
                        </Button>
                      ))}
                    </Box>
                  )}
                  <Flex justifyContent="flex-end" mt={2}>
                    <Text fontSize="xs" color="gray.400">
                      10:30
                    </Text>
                  </Flex>
                </Box>
              </Box>
            </Box>
          </Flex>
        </Box>

        <Box
          p={4}
          borderTopWidth={1}
          borderColor="gray.200"
          display="flex"
          justifyContent="space-between"
        >
          <Button
            size="sm"
            variant="outline"
            borderColor="red.300"
            color="red.600"
            _hover={{ bg: 'red.50' }}
            h="32px"
            px={4}
            fontSize="xs"
            display="flex"
            alignItems="center"
            gap={1}
          >
            <Trash2 size={12} />
            Delete
          </Button>
          <Flex gap={2}>
            <Button
              size="sm"
              variant="outline"
              h="32px"
              px={4}
              fontSize="xs"
              display="flex"
              alignItems="center"
              gap={1}
            >
              <Copy size={12} />
              Duplicate
            </Button>
            <Button
              size="sm"
              bg="blue.500"
              color="white"
              _hover={{ bg: 'blue.600' }}
              h="32px"
              px={4}
              fontSize="xs"
              display="flex"
              alignItems="center"
              gap={1}
            >
              <Send size={12} />
              Use in Campaign
            </Button>
          </Flex>
        </Box>
      </Box>
    </Box>
  )
}
