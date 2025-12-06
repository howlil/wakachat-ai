import {
  Box,
  Flex,
  Text,
  Button,
  Input,
  Textarea,
  Badge,
} from '@chakra-ui/react'
import { useState } from 'react'
import { Upload, FileText, X } from 'lucide-react'

interface AIAgentConfigProps {
  onSave: (config: any) => void
}

export const AIAgentConfig = ({ onSave }: AIAgentConfigProps) => {
  const [agentName, setAgentName] = useState('')
  const [systemPrompt, setSystemPrompt] = useState('')
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const [restrictionPrompt, setRestrictionPrompt] = useState('')

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const fileNames = Array.from(files).map((f) => f.name)
      setUploadedFiles([...uploadedFiles, ...fileNames])
    }
  }

  const handleRemoveFile = (fileName: string) => {
    setUploadedFiles(uploadedFiles.filter((f) => f !== fileName))
  }

  const handleSave = () => {
    onSave({
      name: agentName,
      systemPrompt,
      documents: uploadedFiles,
      restrictionPrompt,
    })
  }

  return (
    <Box p={6} bg="white" borderRadius="lg" maxW="1000px" mx="auto">
      <Text fontSize="xl" fontWeight="bold" mb={6}>
        Configure AI Agent
      </Text>

      <Box mb={4}>
        <Text mb={2} fontSize="sm" fontWeight="medium">
          Agent Name
        </Text>
        <Input
          placeholder="Enter agent name"
          value={agentName}
          onChange={(e) => setAgentName(e.target.value)}
        />
      </Box>

      <Box mb={4}>
        <Text mb={2} fontSize="sm" fontWeight="medium">
          System Prompt
        </Text>
        <Textarea
          placeholder="Enter system prompt for the AI agent"
          value={systemPrompt}
          onChange={(e) => setSystemPrompt(e.target.value)}
          rows={4}
        />
      </Box>

      <Box mb={4}>
        <Text mb={2} fontSize="sm" fontWeight="medium">
          Restriction Prompt (Prompt Engineering)
        </Text>
        <Textarea
          placeholder="Enter restrictions and guidelines for the AI responses (e.g., 'Only answer questions about products', 'Do not provide pricing information')"
          value={restrictionPrompt}
          onChange={(e) => setRestrictionPrompt(e.target.value)}
          rows={3}
        />
        <Text fontSize="xs" color="gray.600" mt={1}>
          This prompt will restrict and guide the AI responses based on your
          business context
        </Text>
      </Box>

      <Box mb={4}>
        <Text mb={2} fontSize="sm" fontWeight="medium">
          Upload Business Documents (PDF)
        </Text>
        <Text fontSize="xs" color="gray.600" mb={2}>
          Upload PDF documents that will be used as context for RAG (Retrieval
          Augmented Generation)
        </Text>
        <Box as="label" display="inline-block" cursor="pointer">
          <Input
            type="file"
            accept=".pdf"
            multiple
            onChange={handleFileUpload}
            display="none"
          />
          <Button as="span" variant="outline" cursor="pointer">
            <Upload size={18} style={{ marginRight: '8px' }} />
            Upload PDF Documents
          </Button>
        </Box>

        {uploadedFiles.length > 0 && (
          <Box mt={3}>
            <Text fontSize="xs" color="gray.600" mb={2}>
              Uploaded Documents:
            </Text>
            <Flex flexWrap="wrap" gap={2}>
              {uploadedFiles.map((fileName) => (
                <Badge
                  key={fileName}
                  px={3}
                  py={1}
                  borderRadius="full"
                  colorScheme="blue"
                  display="flex"
                  alignItems="center"
                  gap={2}
                >
                  <FileText size={14} />
                  {fileName}
                  <Box
                    as="button"
                    onClick={() => handleRemoveFile(fileName)}
                    _hover={{ opacity: 0.7 }}
                  >
                    <X size={14} />
                  </Box>
                </Badge>
              ))}
            </Flex>
          </Box>
        )}
      </Box>

      <Flex gap={2} justifyContent="flex-end">
        <Button colorScheme="blue" onClick={handleSave}>
          Save Configuration
        </Button>
      </Flex>
    </Box>
  )
}
