import { Box, Flex, Text, Input, Button, Textarea } from '@chakra-ui/react'
import { X, Paperclip, Image as ImageIcon, File } from 'lucide-react'
import { useState } from 'react'
import type { QuickReply } from '../types'

interface QuickReplyModalProps {
  quickReply: QuickReply | null
  onClose: () => void
}

export const QuickReplyModal = ({
  quickReply,
  onClose,
}: QuickReplyModalProps) => {
  const [name, setName] = useState(quickReply?.name || '')
  const [content, setContent] = useState(quickReply?.content || '')
  const [attachmentType, setAttachmentType] = useState<
    'image' | 'document' | null
  >(null)
  const [attachmentFile, setAttachmentFile] = useState<File | null>(null)

  const handleSave = () => {
    if (!name && !content) {
      alert('Please fill in at least Name or Content')
      return
    }
    alert(`Quick Reply saved: ${name || 'Unnamed'}`)
    onClose()
  }

  return (
    <Flex
      position="fixed"
      inset={0}
      bg="blackAlpha.500"
      alignItems="center"
      justifyContent="center"
      p={4}
      zIndex={50}
    >
      <Box bg="white" borderRadius="lg" boxShadow="xl" w="full" maxW="lg">
        <Flex
          p={4}
          borderBottomWidth={1}
          borderColor="gray.200"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text fontSize="sm" fontWeight="medium" color="gray.900">
            {quickReply ? 'Edit Quick Reply' : 'New Quick Reply'}
          </Text>
          <Box
            as="button"
            w={7}
            h={7}
            display="flex"
            alignItems="center"
            justifyContent="center"
            _hover={{ bg: 'gray.100' }}
            borderRadius="md"
            transition="all 0.2s"
            onClick={onClose}
          >
            <X size={16} color="#9CA3AF" />
          </Box>
        </Flex>

        <Box p={4} display="flex" flexDirection="column" gap={3}>
          <Box
            bg="blue.50"
            borderWidth={1}
            borderColor="blue.200"
            borderRadius="lg"
            p={3}
          >
            <Text fontSize="xs" color="blue.700">
              <Text as="span" fontWeight="medium">
                Note:
              </Text>{' '}
              Content or Attachment is required. You can fill both or just one.
            </Text>
          </Box>

          <Box>
            <Text fontSize="xs" color="gray.700" mb={1}>
              Quick Reply Name{' '}
              <Text as="span" color="red.500">
                *
              </Text>
            </Text>
            <Box position="relative">
              <Text
                position="absolute"
                left={3}
                top="50%"
                transform="translateY(-50%)"
                fontSize="xs"
                color="gray.400"
              >
                /
              </Text>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., greeting, pricing, followup"
                h="36px"
                pl={7}
                pr={3}
                fontSize="xs"
                borderWidth={1}
                borderColor="gray.200"
                borderRadius="md"
                _focus={{ ring: 1, ringColor: 'blue.500' }}
              />
            </Box>
            <Text fontSize="xs" color="gray.500" mt={1}>
              Type /{name || 'name'} in conversation to use this quick reply
            </Text>
          </Box>

          <Box>
            <Text fontSize="xs" color="gray.700" mb={1}>
              Content
            </Text>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Type your message here..."
              w="100%"
              h={24}
              p={3}
              fontSize="xs"
              borderWidth={1}
              borderColor="gray.200"
              borderRadius="md"
              resize="none"
              _focus={{ ring: 1, ringColor: 'blue.500' }}
            />
            <Flex justifyContent="space-between" alignItems="center" mt={1}>
              <Text fontSize="xs" color="gray.500">
                Optional if you add attachment
              </Text>
              <Text fontSize="xs" color="gray.400">
                {content.length} chars
              </Text>
            </Flex>
          </Box>

          <Box>
            <Text fontSize="xs" color="gray.700" mb={1}>
              Attachment (Optional)
            </Text>
            <Flex gap={2} mb={2}>
              <Button
                flex={1}
                h="36px"
                px={3}
                borderRadius="md"
                fontSize="xs"
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap={1.5}
                borderWidth={1}
                borderColor={
                  attachmentType === 'image' ? 'blue.300' : 'gray.200'
                }
                bg={attachmentType === 'image' ? 'blue.50' : 'white'}
                color={attachmentType === 'image' ? 'blue.600' : 'gray.600'}
                _hover={{
                  bg: attachmentType === 'image' ? 'blue.50' : 'gray.50',
                }}
                onClick={() => setAttachmentType('image')}
              >
                <ImageIcon size={14} />
                Image
              </Button>
              <Button
                flex={1}
                h="36px"
                px={3}
                borderRadius="md"
                fontSize="xs"
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap={1.5}
                borderWidth={1}
                borderColor={
                  attachmentType === 'document' ? 'blue.300' : 'gray.200'
                }
                bg={attachmentType === 'document' ? 'blue.50' : 'white'}
                color={attachmentType === 'document' ? 'blue.600' : 'gray.600'}
                _hover={{
                  bg: attachmentType === 'document' ? 'blue.50' : 'gray.50',
                }}
                onClick={() => setAttachmentType('document')}
              >
                <File size={14} />
                Document
              </Button>
            </Flex>

            {attachmentType && (
              <Box>
                <Box
                  as="label"
                  display="block"
                  borderWidth={2}
                  borderStyle="dashed"
                  borderColor="gray.300"
                  borderRadius="lg"
                  p={4}
                  textAlign="center"
                  _hover={{ borderColor: 'blue.300' }}
                  transition="all 0.2s"
                  cursor="pointer"
                >
                  <Paperclip
                    size={24}
                    color="#9CA3AF"
                    style={{ margin: '0 auto 8px' }}
                  />
                  <Text fontSize="xs" color="gray.600" mb={1}>
                    Click to upload{' '}
                    {attachmentType === 'image' ? 'PNG, JPG' : 'PDF, XLS, DOC'}
                  </Text>
                  {attachmentFile && (
                    <Text fontSize="xs" color="blue.600" mt={2}>
                      {attachmentFile.name}
                    </Text>
                  )}
                  <input
                    type="file"
                    accept={
                      attachmentType === 'image'
                        ? 'image/png,image/jpeg'
                        : '.pdf,.xls,.xlsx,.doc,.docx'
                    }
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setAttachmentFile(e.target.files[0])
                      }
                    }}
                  />
                </Box>
              </Box>
            )}
          </Box>
        </Box>

        <Flex
          p={4}
          borderTopWidth={1}
          borderColor="gray.200"
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
            borderRadius="md"
            _hover={{ bg: 'blue.600' }}
            fontSize="xs"
            onClick={handleSave}
          >
            {quickReply ? 'Update' : 'Create'}
          </Button>
        </Flex>
      </Box>
    </Flex>
  )
}
