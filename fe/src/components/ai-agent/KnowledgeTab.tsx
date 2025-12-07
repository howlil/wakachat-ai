import { Box, Flex, Text, Button, Badge } from '@chakra-ui/react'
import {
  Brain,
  Upload,
  FileText,
  Database,
  CheckCircle,
  Link as LinkIcon,
  RefreshCw,
  Trash2,
} from 'lucide-react'
import { useState } from 'react'
import type { RAGDocument } from './types'
import { UploadDocModal } from './UploadDocModal'

interface KnowledgeTabProps {
  agentId: number
  agentName: string
}

export const KnowledgeTab = ({ agentId, agentName }: KnowledgeTabProps) => {
  const [documents, setDocuments] = useState<RAGDocument[]>([
    {
      id: 4,
      name: 'Support Scripts.pdf',
      type: 'pdf',
      size: '850 KB',
      chunks: 18,
      status: 'indexed',
      uploadedAt: '2024-12-05',
      scope: 'agent',
      agentId: agentId,
      agentName: agentName,
    },
    {
      id: 5,
      name: `FAQ Specific to ${agentName}`,
      type: 'url',
      chunks: 24,
      status: 'indexed',
      uploadedAt: '2024-12-03',
      scope: 'agent',
      agentId: agentId,
      agentName: agentName,
    },
  ])

  const [showUploadDoc, setShowUploadDoc] = useState(false)

  const handleDeleteDoc = (docId: number) => {
    setDocuments(documents.filter((d) => d.id !== docId))
  }

  const handleReindex = (docId: number) => {
    setDocuments(
      documents.map((doc) => {
        if (doc.id === docId) {
          return { ...doc, status: 'processing' as const }
        }
        return doc
      }),
    )

    setTimeout(() => {
      setDocuments((docs) =>
        docs.map((doc) => {
          if (doc.id === docId) {
            return { ...doc, status: 'indexed' as const }
          }
          return doc
        }),
      )
    }, 2000)
  }

  return (
    <Box>
      <Box
        bg="purple.50"
        borderWidth={1}
        borderColor="purple.200"
        borderRadius="lg"
        p={3}
        mb={3}
      >
        <Flex alignItems="start" justifyContent="space-between">
          <Flex alignItems="start" gap={3}>
            <Box
              w="40px"
              h="40px"
              bg="purple.100"
              borderRadius="lg"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Brain size={20} color="#9333EA" />
            </Box>
            <Box>
              <Text fontSize="sm" color="purple.900" fontWeight="medium" mb={1}>
                Agent-Specific Knowledge Base
              </Text>
              <Text fontSize="xs" color="purple.700">
                Documents specific to {agentName}. These are combined with
                global knowledge.
              </Text>
            </Box>
          </Flex>
          <Button
            size="sm"
            bg="purple.500"
            color="white"
            _hover={{ bg: 'purple.600' }}
            h="28px"
            px={3}
            fontSize="xs"
            display="flex"
            alignItems="center"
            gap={1.5}
            onClick={() => setShowUploadDoc(true)}
          >
            <Upload size={14} />
            Upload
          </Button>
        </Flex>
      </Box>

      <Flex gap={3} mb={3}>
        {[
          {
            label: 'Total Documents',
            value: documents.length,
            icon: FileText,
          },
          {
            label: 'Total Chunks',
            value: documents.reduce((sum, doc) => sum + doc.chunks, 0),
            icon: Database,
          },
          {
            label: 'Indexed',
            value: documents.filter((d) => d.status === 'indexed').length,
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
              <Icon size={16} color="#9333EA" style={{ marginBottom: '8px' }} />
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
            Documents ({documents.length})
          </Text>
        </Box>
        {documents.length === 0 ? (
          <Box p={8} textAlign="center">
            <Database
              size={40}
              color="#D1D5DB"
              style={{ margin: '0 auto 8px' }}
            />
            <Text fontSize="xs" color="gray.500" mb={3}>
              No agent-specific documents yet
            </Text>
            <Button
              size="sm"
              bg="blue.500"
              color="white"
              _hover={{ bg: 'blue.600' }}
              h="28px"
              px={3}
              fontSize="xs"
              onClick={() => setShowUploadDoc(true)}
            >
              Upload First Document
            </Button>
          </Box>
        ) : (
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
              {documents.map((doc) => (
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
                    <Flex alignItems="center" justifyContent="flex-end" gap={1}>
                      <Button
                        variant="ghost"
                        size="sm"
                        w="28px"
                        h="28px"
                        p={0}
                        onClick={() => handleReindex(doc.id)}
                        title="Reindex"
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
                        onClick={() => handleDeleteDoc(doc.id)}
                        title="Delete"
                      >
                        <Trash2 size={14} color="#DC2626" />
                      </Button>
                    </Flex>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Box>

      {showUploadDoc && (
        <UploadDocModal
          agentId={agentId}
          agentName={agentName}
          onClose={() => setShowUploadDoc(false)}
        />
      )}
    </Box>
  )
}
