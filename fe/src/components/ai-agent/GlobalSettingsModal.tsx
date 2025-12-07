import { Box, Flex, Text, Button, Textarea, Badge } from '@chakra-ui/react'
import {
  Globe,
  X,
  Database,
  Code,
  FileText,
  CheckCircle,
  Link as LinkIcon,
  RefreshCw,
  Trash2,
  Upload,
} from 'lucide-react'
import { useState } from 'react'
import type { RAGDocument } from './types'
import { UploadGlobalDocModal } from './UploadGlobalDocModal'

interface GlobalSettingsModalProps {
  onClose: () => void
}

export const GlobalSettingsModal = ({ onClose }: GlobalSettingsModalProps) => {
  const [activeTab, setActiveTab] = useState<'knowledge' | 'prompts'>(
    'knowledge',
  )
  const [globalPrompt, setGlobalPrompt] = useState(
    `You are a professional customer service AI assistant. Be helpful, friendly, and accurate.\n\nCore principles:\n- Always be polite and professional\n- Provide accurate information\n- Escalate when uncertain`,
  )
  const [showUploadGlobal, setShowUploadGlobal] = useState(false)

  const [globalDocuments, setGlobalDocuments] = useState<RAGDocument[]>([
    {
      id: 1,
      name: 'Product Catalog 2024.pdf',
      type: 'pdf',
      size: '2.4 MB',
      chunks: 45,
      status: 'indexed',
      uploadedAt: '2024-12-05',
      scope: 'global',
    },
    {
      id: 2,
      name: 'FAQ Documentation',
      type: 'url',
      chunks: 28,
      status: 'indexed',
      uploadedAt: '2024-12-04',
      scope: 'global',
    },
    {
      id: 3,
      name: 'Company Policies.pdf',
      type: 'pdf',
      size: '1.8 MB',
      chunks: 32,
      status: 'processing',
      uploadedAt: '2024-12-06',
      scope: 'global',
    },
  ])

  const handleDeleteGlobalDoc = (docId: number) => {
    setGlobalDocuments(globalDocuments.filter((d) => d.id !== docId))
  }

  return (
    <>
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
          maxW="1280px"
          maxH="90vh"
          overflow="hidden"
          display="flex"
          flexDirection="column"
        >
          <Box p={4} borderBottomWidth={1} borderColor="gray.200">
            <Flex alignItems="center" justifyContent="space-between" mb={3}>
              <Box>
                <Text fontSize="sm" color="gray.900" fontWeight="medium" mb={1}>
                  Global Settings
                </Text>
                <Text fontSize="xs" color="gray.500">
                  Shared knowledge and prompts for all AI agents
                </Text>
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
            </Flex>

            <Flex gap={1}>
              {[
                { id: 'knowledge', label: 'Global Knowledge', icon: Database },
                { id: 'prompts', label: 'Global Prompt', icon: Code },
              ].map((tab) => {
                const Icon = tab.icon
                return (
                  <Button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    px={3}
                    h="28px"
                    fontSize="xs"
                    borderRadius="md"
                    bg={activeTab === tab.id ? 'blue.50' : 'transparent'}
                    color={activeTab === tab.id ? 'blue.600' : 'gray.600'}
                    _hover={{ bg: 'gray.50' }}
                    display="flex"
                    alignItems="center"
                    gap={1}
                  >
                    <Icon size={12} />
                    {tab.label}
                  </Button>
                )
              })}
            </Flex>
          </Box>

          <Box flex={1} overflow="auto" p={4}>
            {activeTab === 'knowledge' && (
              <Box>
                <Box
                  bg="blue.50"
                  borderWidth={1}
                  borderColor="blue.200"
                  borderRadius="lg"
                  p={3}
                  mb={3}
                >
                  <Flex alignItems="start" justifyContent="space-between">
                    <Flex alignItems="start" gap={3}>
                      <Globe
                        size={20}
                        color="#2563EB"
                        style={{ marginTop: '2px' }}
                      />
                      <Box>
                        <Text
                          fontSize="sm"
                          color="blue.900"
                          fontWeight="medium"
                          mb={1}
                        >
                          Shared by All Agents
                        </Text>
                        <Text fontSize="xs" color="blue.700">
                          These documents are accessible by all AI agents unless
                          overridden by agent-specific knowledge.
                        </Text>
                      </Box>
                    </Flex>
                    <Button
                      size="sm"
                      bg="blue.500"
                      color="white"
                      _hover={{ bg: 'blue.600' }}
                      h="28px"
                      px={3}
                      fontSize="xs"
                      display="flex"
                      alignItems="center"
                      gap={1}
                      onClick={() => setShowUploadGlobal(true)}
                    >
                      <Upload size={12} />
                      Upload
                    </Button>
                  </Flex>
                </Box>

                <Flex gap={3} mb={3}>
                  {[
                    {
                      label: 'Total Documents',
                      value: globalDocuments.length,
                      icon: FileText,
                    },
                    {
                      label: 'Total Chunks',
                      value: globalDocuments.reduce(
                        (sum, doc) => sum + doc.chunks,
                        0,
                      ),
                      icon: Database,
                    },
                    {
                      label: 'Indexed',
                      value: globalDocuments.filter(
                        (d) => d.status === 'indexed',
                      ).length,
                      icon: CheckCircle,
                    },
                  ].map((stat) => {
                    const Icon = stat.icon
                    return (
                      <Box
                        key={stat.label}
                        bg="white"
                        borderRadius="lg"
                        p={3}
                        borderWidth={1}
                        borderColor="gray.200"
                        flex={1}
                      >
                        <Icon
                          size={16}
                          color="#2563EB"
                          style={{ marginBottom: '8px' }}
                        />
                        <Text fontSize="lg" color="gray.900" mb={0.5}>
                          {stat.value}
                        </Text>
                        <Text fontSize="xs" color="gray.500">
                          {stat.label}
                        </Text>
                      </Box>
                    )
                  })}
                </Flex>

                <Box
                  bg="white"
                  borderRadius="lg"
                  borderWidth={1}
                  borderColor="gray.200"
                  overflow="hidden"
                >
                  <Box p={3} borderBottomWidth={1} borderColor="gray.200">
                    <Text fontSize="sm" color="gray.900" fontWeight="medium">
                      Global Documents
                    </Text>
                  </Box>
                  <Box as="table" w="100%">
                    <Box as="thead" bg="gray.50">
                      <Box as="tr">
                        <Box
                          as="th"
                          px={3}
                          py={2}
                          textAlign="left"
                          fontSize="xs"
                          color="gray.600"
                        >
                          Document
                        </Box>
                        <Box
                          as="th"
                          px={3}
                          py={2}
                          textAlign="left"
                          fontSize="xs"
                          color="gray.600"
                        >
                          Type
                        </Box>
                        <Box
                          as="th"
                          px={3}
                          py={2}
                          textAlign="right"
                          fontSize="xs"
                          color="gray.600"
                        >
                          Chunks
                        </Box>
                        <Box
                          as="th"
                          px={3}
                          py={2}
                          textAlign="left"
                          fontSize="xs"
                          color="gray.600"
                        >
                          Status
                        </Box>
                        <Box
                          as="th"
                          px={3}
                          py={2}
                          textAlign="left"
                          fontSize="xs"
                          color="gray.600"
                        >
                          Uploaded
                        </Box>
                        <Box
                          as="th"
                          px={3}
                          py={2}
                          textAlign="right"
                          fontSize="xs"
                          color="gray.600"
                        >
                          Actions
                        </Box>
                      </Box>
                    </Box>
                    <Box as="tbody">
                      {globalDocuments.map((doc) => (
                        <Box
                          key={doc.id}
                          as="tr"
                          _hover={{ bg: 'gray.50' }}
                          borderTopWidth={1}
                          borderColor="gray.100"
                        >
                          <Box as="td" px={3} py={2}>
                            <Flex alignItems="center" gap={2}>
                              <Box
                                w="28px"
                                h="28px"
                                borderRadius="sm"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                bg={doc.type === 'pdf' ? 'red.100' : 'blue.100'}
                              >
                                {doc.type === 'pdf' ? (
                                  <FileText size={14} color="#DC2626" />
                                ) : (
                                  <LinkIcon size={14} color="#2563EB" />
                                )}
                              </Box>
                              <Box>
                                <Text fontSize="xs" color="gray.900">
                                  {doc.name}
                                </Text>
                                <Text fontSize="xs" color="gray.500">
                                  {doc.size || 'Web URL'}
                                </Text>
                              </Box>
                            </Flex>
                          </Box>
                          <Box as="td" px={3} py={2}>
                            <Text
                              fontSize="xs"
                              color="gray.600"
                              textTransform="uppercase"
                            >
                              {doc.type}
                            </Text>
                          </Box>
                          <Box as="td" px={3} py={2} textAlign="right">
                            <Text fontSize="xs" color="gray.900">
                              {doc.chunks}
                            </Text>
                          </Box>
                          <Box as="td" px={3} py={2}>
                            <Badge
                              h="20px"
                              px={2}
                              fontSize="xs"
                              borderRadius="sm"
                              borderWidth={0}
                              bg={
                                doc.status === 'indexed'
                                  ? 'green.100'
                                  : doc.status === 'processing'
                                    ? 'yellow.100'
                                    : 'red.100'
                              }
                              color={
                                doc.status === 'indexed'
                                  ? 'green.700'
                                  : doc.status === 'processing'
                                    ? 'yellow.700'
                                    : 'red.700'
                              }
                            >
                              {doc.status}
                            </Badge>
                          </Box>
                          <Box as="td" px={3} py={2}>
                            <Text fontSize="xs" color="gray.600">
                              {doc.uploadedAt}
                            </Text>
                          </Box>
                          <Box as="td" px={3} py={2}>
                            <Flex
                              alignItems="center"
                              justifyContent="flex-end"
                              gap={1}
                            >
                              <Button
                                variant="ghost"
                                size="sm"
                                w="28px"
                                h="28px"
                                p={0}
                              >
                                <RefreshCw size={14} color="#6B7280" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                w="28px"
                                h="28px"
                                p={0}
                                _hover={{ bg: 'red.50' }}
                                onClick={() => handleDeleteGlobalDoc(doc.id)}
                              >
                                <Trash2 size={14} color="#DC2626" />
                              </Button>
                            </Flex>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Box>
            )}

            {activeTab === 'prompts' && (
              <Box>
                <Box
                  bg="blue.50"
                  borderWidth={1}
                  borderColor="blue.200"
                  borderRadius="lg"
                  p={3}
                  mb={3}
                >
                  <Flex alignItems="start" gap={3}>
                    <Globe
                      size={20}
                      color="#2563EB"
                      style={{ marginTop: '2px' }}
                    />
                    <Box>
                      <Text
                        fontSize="sm"
                        color="blue.900"
                        fontWeight="medium"
                        mb={1}
                      >
                        Default for All Agents
                      </Text>
                      <Text fontSize="xs" color="blue.700">
                        This prompt applies to all AI agents. Agent-specific
                        prompts will override this.
                      </Text>
                    </Box>
                  </Flex>
                </Box>

                <Box
                  bg="white"
                  borderWidth={1}
                  borderColor="gray.200"
                  borderRadius="lg"
                  p={3}
                >
                  <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    mb={2}
                  >
                    <Text fontSize="sm" color="gray.900" fontWeight="medium">
                      Global System Prompt
                    </Text>
                    <Text
                      fontSize="xs"
                      color="gray.500"
                      px={2}
                      py={1}
                      bg="gray.100"
                      borderRadius="sm"
                    >
                      {globalPrompt.length} chars
                    </Text>
                  </Flex>
                  <Textarea
                    value={globalPrompt}
                    onChange={(e) => setGlobalPrompt(e.target.value)}
                    w="100%"
                    h="320px"
                    p={3}
                    fontSize="xs"
                    borderColor="gray.200"
                    borderRadius="lg"
                    resize="none"
                    _focus={{ ring: 1, ringColor: 'blue.500' }}
                    fontFamily="mono"
                    bg="gray.50"
                  />
                  <Flex justifyContent="flex-end" mt={2}>
                    <Button
                      size="sm"
                      bg="blue.500"
                      color="white"
                      _hover={{ bg: 'blue.600' }}
                      h="32px"
                      px={4}
                      fontSize="xs"
                    >
                      Save Global Prompt
                    </Button>
                  </Flex>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      {showUploadGlobal && (
        <UploadGlobalDocModal onClose={() => setShowUploadGlobal(false)} />
      )}
    </>
  )
}
