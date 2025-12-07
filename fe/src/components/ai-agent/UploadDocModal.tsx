import { Box, Flex, Text, Button } from '@chakra-ui/react'
import { Upload, X, FileText, Link as LinkIcon, File } from 'lucide-react'
import { useState } from 'react'

interface UploadDocModalProps {
  agentId: number
  agentName: string
  onClose: () => void
}

export const UploadDocModal = ({
  agentId,
  agentName,
  onClose,
}: UploadDocModalProps) => {
  const [uploadType, setUploadType] = useState<'pdf' | 'url' | 'text'>('pdf')

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
      <Box bg="white" borderRadius="lg" boxShadow="xl" w="100%" maxW="384px">
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
              Upload Document
            </Text>
            <Text fontSize="xs" color="gray.500">
              For: {agentName}
            </Text>
          </Box>
          <Button variant="ghost" size="sm" w="28px" h="28px" p={0} onClick={onClose}>
            <X size={16} color="#9CA3AF" />
          </Button>
        </Box>

        <Box p={4}>
          <Box mb={3}>
            <Text fontSize="xs" color="gray.700" mb={2} display="block">
              Upload Type
            </Text>
            <Flex gap={2}>
              {[
                { value: 'pdf', label: 'PDF', icon: FileText },
                { value: 'url', label: 'URL', icon: LinkIcon },
                { value: 'text', label: 'Text', icon: File },
              ].map((type) => {
                const Icon = type.icon
                return (
                  <Button
                    key={type.value}
                    onClick={() => setUploadType(type.value as any)}
                    h="36px"
                    px={3}
                    borderRadius="md"
                    borderWidth={1}
                    fontSize="xs"
                    bg={uploadType === type.value ? 'blue.50' : 'white'}
                    color={uploadType === type.value ? 'blue.600' : 'gray.700'}
                    borderColor={uploadType === type.value ? 'blue.300' : 'gray.200'}
                    _hover={{ bg: 'gray.50' }}
                    display="flex"
                    alignItems="center"
                    gap={1.5}
                    flex={1}
                  >
                    <Icon size={14} />
                    {type.label}
                  </Button>
                )
              })}
            </Flex>
          </Box>

          {uploadType === 'pdf' && (
            <Box
              borderWidth={2}
              borderStyle="dashed"
              borderColor="gray.300"
              borderRadius="lg"
              p={8}
              textAlign="center"
              _hover={{ borderColor: 'blue.300', bg: 'blue.50' }}
              transition="all 0.2s"
              cursor="pointer"
            >
              <Upload size={40} color="#9CA3AF" style={{ margin: '0 auto 8px' }} />
              <Text fontSize="xs" color="gray.600" mb={1}>
                Drag and drop PDF files here
              </Text>
              <Text fontSize="xs" color="gray.400">
                or click to browse
              </Text>
            </Box>
          )}

          {uploadType === 'url' && (
            <Box>
              <input
                type="url"
                placeholder="https://example.com/document"
                style={{
                  width: '100%',
                  height: '32px',
                  padding: '0 12px',
                  fontSize: '12px',
                  borderWidth: '1px',
                  borderColor: '#D1D5DB',
                  borderRadius: '6px',
                }}
              />
            </Box>
          )}
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
            onClick={onClose}
            size="sm"
            variant="outline"
            h="32px"
            px={4}
            fontSize="xs"
          >
            Cancel
          </Button>
          <Button
            size="sm"
            bg="blue.500"
            color="white"
            _hover={{ bg: 'blue.600' }}
            h="32px"
            px={4}
            fontSize="xs"
          >
            Upload & Process
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

