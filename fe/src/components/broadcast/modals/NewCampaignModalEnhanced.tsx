import {
  Box,
  Flex,
  Text,
  Button,
  Input,
  Textarea,
  Badge,
} from '@chakra-ui/react'
import {
  X,
  Check,
  Play,
  Calendar,
  Upload,
  Download,
  Database,
  Search,
  FileSpreadsheet,
} from 'lucide-react'
import { useState } from 'react'
import type { Recipient, ScheduleType, RecipientSource } from '../types'

interface NewCampaignModalEnhancedProps {
  onClose: () => void
}

const mockRecipients: Recipient[] = [
  {
    id: '1',
    name: 'John Doe',
    phone: '+6281234567890',
    email: 'john@example.com',
    tags: ['VIP', 'Active'],
  },
  {
    id: '2',
    name: 'Jane Smith',
    phone: '+6281234567891',
    email: 'jane@example.com',
    tags: ['Active'],
  },
  {
    id: '3',
    name: 'Bob Wilson',
    phone: '+6281234567892',
    tags: ['New'],
  },
  {
    id: '4',
    name: 'Alice Brown',
    phone: '+6281234567893',
    email: 'alice@example.com',
    tags: ['VIP'],
  },
  {
    id: '5',
    name: 'Charlie Davis',
    phone: '+6281234567894',
    tags: ['Active'],
  },
]

export const NewCampaignModalEnhanced = ({
  onClose,
}: NewCampaignModalEnhancedProps) => {
  const [step, setStep] = useState(1)
  const [campaignName, setCampaignName] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState('')
  const [recipientSource, setRecipientSource] =
    useState<RecipientSource | null>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [scheduleType, setScheduleType] = useState<ScheduleType>('now')
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([])
  const [selectAll, setSelectAll] = useState(false)
  const [searchRecipient, setSearchRecipient] = useState('')

  const filteredRecipients = mockRecipients.filter(
    (r) =>
      r.name.toLowerCase().includes(searchRecipient.toLowerCase()) ||
      r.phone.includes(searchRecipient),
  )

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRecipients([])
    } else {
      setSelectedRecipients(filteredRecipients.map((r) => r.id))
    }
    setSelectAll(!selectAll)
  }

  const handleSelectRecipient = (id: string) => {
    if (selectedRecipients.includes(id)) {
      setSelectedRecipients(selectedRecipients.filter((rid) => rid !== id))
    } else {
      setSelectedRecipients([...selectedRecipients, id])
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const validTypes = ['.csv', '.xls', '.xlsx']
      const fileExt = file.name
        .substring(file.name.lastIndexOf('.'))
        .toLowerCase()
      if (!validTypes.includes(fileExt)) {
        alert('Please upload CSV or Excel file only')
        return
      }
      setUploadedFile(file)
    }
  }

  const downloadTemplate = () => {
    const csvContent =
      'name,phone,email\nJohn Doe,+6281234567890,john@example.com\nJane Smith,+6281234567891,jane@example.com'
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'recipient_template.csv'
    a.click()
  }

  const canProceed = () => {
    if (step === 1) return campaignName.trim() !== ''
    if (step === 2) return selectedTemplate !== ''
    if (step === 3) {
      if (recipientSource === 'csv') return uploadedFile !== null
      if (recipientSource === 'backend') return selectedRecipients.length > 0
      return false
    }
    return true
  }

  const handleNext = () => {
    if (canProceed()) {
      setStep(step + 1)
    }
  }

  const handleCreate = () => {
    alert(
      `Campaign Created!\nName: ${campaignName}\nTemplate: ${selectedTemplate}\nRecipients: ${
        recipientSource === 'csv'
          ? uploadedFile?.name
          : `${selectedRecipients.length} contacts from backend`
      }\nSchedule: ${scheduleType === 'now' ? 'Send Now' : 'Scheduled'}`,
    )
    onClose()
  }

  const templates = [
    'flash_sale_template',
    'order_confirmation',
    'welcome_message',
  ]

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
      <Box
        bg="white"
        borderRadius="lg"
        boxShadow="xl"
        w="full"
        maxW="512px"
        maxH="90vh"
        display="flex"
        flexDirection="column"
      >
        <Box p={4} borderBottomWidth={1} borderColor="gray.200">
          <Flex alignItems="center" justifyContent="space-between">
            <Box>
              <Text fontSize="sm" color="gray.900" fontWeight="medium">
                New Campaign
              </Text>
              <Text fontSize="xs" color="gray.500">
                Step {step} of 4
              </Text>
            </Box>
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
        </Box>

        <Box px={4} pt={4}>
          <Flex gap={1}>
            {[1, 2, 3, 4].map((s) => (
              <Box
                key={s}
                h="4px"
                flex={1}
                borderRadius="full"
                bg={s <= step ? 'blue.500' : 'gray.200'}
              />
            ))}
          </Flex>
        </Box>

        <Box flex={1} overflow="auto" p={4}>
          {step === 1 && (
            <Box display="flex" flexDirection="column" gap={3}>
              <Box>
                <Text fontSize="xs" color="gray.700" mb={1}>
                  Campaign Name{' '}
                  <Text as="span" color="red.500">
                    *
                  </Text>
                </Text>
                <Input
                  type="text"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  placeholder="e.g., Weekend Flash Sale"
                  w="100%"
                  h="36px"
                  px={3}
                  fontSize="xs"
                  borderWidth={1}
                  borderColor="gray.200"
                  borderRadius="md"
                  _focus={{ ring: 1, ringColor: 'blue.500' }}
                />
              </Box>
              <Box>
                <Text fontSize="xs" color="gray.700" mb={1}>
                  Description
                </Text>
                <Textarea
                  placeholder="Optional campaign description..."
                  w="100%"
                  h={20}
                  p={2}
                  fontSize="xs"
                  borderWidth={1}
                  borderColor="gray.200"
                  borderRadius="md"
                  resize="none"
                  _focus={{ ring: 1, ringColor: 'blue.500' }}
                />
              </Box>
            </Box>
          )}

          {step === 2 && (
            <Box>
              <Text fontSize="xs" color="gray.700" mb={2}>
                Select Template
              </Text>
              <Box
                maxH="384px"
                overflow="auto"
                display="flex"
                flexDirection="column"
                gap={2}
              >
                {templates.map((template) => (
                  <Box
                    as="button"
                    key={template}
                    onClick={() => setSelectedTemplate(template)}
                    w="100%"
                    p={3}
                    borderWidth={1}
                    borderRadius="lg"
                    textAlign="left"
                    borderColor={
                      selectedTemplate === template ? 'blue.500' : 'gray.200'
                    }
                    bg={selectedTemplate === template ? 'blue.50' : 'white'}
                    _hover={{ borderColor: 'gray.300' }}
                    transition="all 0.2s"
                  >
                    <Flex alignItems="center" justifyContent="space-between">
                      <Text fontSize="xs" color="gray.900">
                        {template}
                      </Text>
                      {selectedTemplate === template && (
                        <Box
                          w={5}
                          h={5}
                          bg="blue.500"
                          borderRadius="full"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Check size={12} color="white" />
                        </Box>
                      )}
                    </Flex>
                    <Text fontSize="xs" color="gray.500" mt={0.5}>
                      Marketing • Approved
                    </Text>
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          {step === 3 && (
            <Box display="flex" flexDirection="column" gap={4}>
              <Text fontSize="xs" color="gray.700">
                Select Recipient Source
              </Text>

              <Flex gap={3}>
                <Box
                  as="button"
                  onClick={() => setRecipientSource('csv')}
                  flex={1}
                  p={4}
                  borderWidth={2}
                  borderRadius="lg"
                  textAlign="left"
                  borderColor={
                    recipientSource === 'csv' ? 'blue.500' : 'gray.200'
                  }
                  bg={recipientSource === 'csv' ? 'blue.50' : 'white'}
                  _hover={{ borderColor: 'gray.300' }}
                  transition="all 0.2s"
                >
                  <FileSpreadsheet
                    size={24}
                    color="#2563EB"
                    style={{ marginBottom: '8px' }}
                  />
                  <Text fontSize="xs" color="gray.900" mb={0.5}>
                    Upload CSV/Excel
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    Import contacts from file
                  </Text>
                </Box>
                <Box
                  as="button"
                  onClick={() => setRecipientSource('backend')}
                  flex={1}
                  p={4}
                  borderWidth={2}
                  borderRadius="lg"
                  textAlign="left"
                  borderColor={
                    recipientSource === 'backend' ? 'blue.500' : 'gray.200'
                  }
                  bg={recipientSource === 'backend' ? 'blue.50' : 'white'}
                  _hover={{ borderColor: 'gray.300' }}
                  transition="all 0.2s"
                >
                  <Database
                    size={24}
                    color="#16A34A"
                    style={{ marginBottom: '8px' }}
                  />
                  <Text fontSize="xs" color="gray.900" mb={0.5}>
                    Select from Database
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    Choose existing contacts
                  </Text>
                </Box>
              </Flex>

              {recipientSource === 'csv' && (
                <Box display="flex" flexDirection="column" gap={3}>
                  <Flex alignItems="center" justifyContent="space-between">
                    <Text fontSize="xs" color="gray.700">
                      Upload File
                    </Text>
                    <Box
                      as="button"
                      fontSize="xs"
                      color="blue.600"
                      _hover={{ textDecoration: 'underline' }}
                      display="flex"
                      alignItems="center"
                      gap={1}
                      onClick={downloadTemplate}
                    >
                      <Download size={12} />
                      Download Template
                    </Box>
                  </Flex>
                  <Box
                    as="label"
                    display="block"
                    borderWidth={2}
                    borderStyle="dashed"
                    borderColor="gray.300"
                    borderRadius="lg"
                    p={6}
                    textAlign="center"
                    _hover={{ borderColor: 'blue.300' }}
                    transition="all 0.2s"
                    cursor="pointer"
                  >
                    <Upload
                      size={32}
                      color="#9CA3AF"
                      style={{ margin: '0 auto 8px' }}
                    />
                    {uploadedFile ? (
                      <Box>
                        <Text fontSize="xs" color="blue.600" mb={1}>
                          {uploadedFile.name}
                        </Text>
                        <Text fontSize="xs" color="gray.500">
                          {(uploadedFile.size / 1024).toFixed(2)} KB
                        </Text>
                      </Box>
                    ) : (
                      <>
                        <Text fontSize="xs" color="gray.600" mb={1}>
                          Click to upload CSV or Excel file
                        </Text>
                        <Text fontSize="xs" color="gray.400">
                          Max file size: 5MB
                        </Text>
                      </>
                    )}
                    <input
                      type="file"
                      accept=".csv,.xls,.xlsx"
                      style={{ display: 'none' }}
                      onChange={handleFileUpload}
                    />
                  </Box>
                  <Box
                    bg="blue.50"
                    borderWidth={1}
                    borderColor="blue.200"
                    borderRadius="lg"
                    p={3}
                  >
                    <Text fontSize="xs" color="blue.700" mb={2}>
                      <Text as="span" fontWeight="medium">
                        CSV Format:
                      </Text>
                    </Text>
                    <Box
                      bg="white"
                      p={2}
                      borderRadius="md"
                      borderWidth={1}
                      borderColor="blue.200"
                      fontFamily="mono"
                      fontSize="xs"
                    >
                      name,phone,email
                      <br />
                      John Doe,+6281234567890,john@example.com
                    </Box>
                  </Box>
                </Box>
              )}

              {recipientSource === 'backend' && (
                <Box display="flex" flexDirection="column" gap={3}>
                  <Box position="relative">
                    <Search
                      size={14}
                      style={{
                        position: 'absolute',
                        left: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#9CA3AF',
                      }}
                    />
                    <Input
                      type="text"
                      value={searchRecipient}
                      onChange={(e) => setSearchRecipient(e.target.value)}
                      placeholder="Search by name or phone..."
                      w="100%"
                      h="36px"
                      pl={9}
                      pr={3}
                      fontSize="xs"
                      borderWidth={1}
                      borderColor="gray.200"
                      borderRadius="md"
                      _focus={{ ring: 1, ringColor: 'blue.500' }}
                    />
                  </Box>

                  <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    p={2}
                    bg="gray.50"
                    borderRadius="md"
                  >
                    <Box
                      as="label"
                      display="flex"
                      alignItems="center"
                      gap={2}
                      cursor="pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                        style={{
                          width: '16px',
                          height: '16px',
                          colorScheme: 'blue',
                          borderColor: '#D1D5DB',
                          borderRadius: '2px',
                        }}
                      />
                      <Text fontSize="xs" color="gray.700">
                        Select All ({filteredRecipients.length})
                      </Text>
                    </Box>
                    {selectedRecipients.length > 0 && (
                      <Badge
                        h="20px"
                        px={2}
                        fontSize="xs"
                        bg="blue.500"
                        color="white"
                        borderWidth={0}
                      >
                        {selectedRecipients.length} selected
                      </Badge>
                    )}
                  </Flex>

                  <Box
                    maxH="256px"
                    overflow="auto"
                    display="flex"
                    flexDirection="column"
                    gap={1}
                    borderWidth={1}
                    borderColor="gray.200"
                    borderRadius="lg"
                    p={2}
                  >
                    {filteredRecipients.map((recipient) => (
                      <Box
                        as="label"
                        key={recipient.id}
                        display="flex"
                        alignItems="center"
                        gap={3}
                        p={2}
                        _hover={{ bg: 'gray.50' }}
                        borderRadius="md"
                        cursor="pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedRecipients.includes(recipient.id)}
                          onChange={() => handleSelectRecipient(recipient.id)}
                          style={{
                            width: '16px',
                            height: '16px',
                            colorScheme: 'blue',
                            borderColor: '#D1D5DB',
                            borderRadius: '2px',
                          }}
                        />
                        <Box flex={1} minW={0}>
                          <Text fontSize="xs" color="gray.900">
                            {recipient.name}
                          </Text>
                          <Flex alignItems="center" gap={2} mt={0.5}>
                            <Text fontSize="xs" color="gray.500">
                              {recipient.phone}
                            </Text>
                            {recipient.tags &&
                              recipient.tags.map((tag) => (
                                <Badge
                                  key={tag}
                                  h="16px"
                                  px={1.5}
                                  fontSize="xs"
                                  bg="purple.100"
                                  color="purple.700"
                                  borderWidth={0}
                                >
                                  {tag}
                                </Badge>
                              ))}
                          </Flex>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          )}

          {step === 4 && (
            <Box display="flex" flexDirection="column" gap={3}>
              <Text fontSize="xs" color="gray.700" mb={2}>
                When to send?
              </Text>
              <Flex gap={3}>
                <Box
                  as="button"
                  onClick={() => setScheduleType('now')}
                  flex={1}
                  p={4}
                  borderWidth={2}
                  borderRadius="lg"
                  textAlign="left"
                  borderColor={scheduleType === 'now' ? 'blue.500' : 'gray.200'}
                  bg={scheduleType === 'now' ? 'blue.50' : 'white'}
                  _hover={{ borderColor: 'gray.300' }}
                  transition="all 0.2s"
                >
                  <Play
                    size={24}
                    color="#2563EB"
                    style={{ marginBottom: '8px' }}
                  />
                  <Text fontSize="xs" color="gray.900" mb={0.5}>
                    Send Now
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    Send immediately
                  </Text>
                </Box>
                <Box
                  as="button"
                  onClick={() => setScheduleType('scheduled')}
                  flex={1}
                  p={4}
                  borderWidth={2}
                  borderRadius="lg"
                  textAlign="left"
                  borderColor={
                    scheduleType === 'scheduled' ? 'blue.500' : 'gray.200'
                  }
                  bg={scheduleType === 'scheduled' ? 'blue.50' : 'white'}
                  _hover={{ borderColor: 'gray.300' }}
                  transition="all 0.2s"
                >
                  <Calendar
                    size={24}
                    color="#9333EA"
                    style={{ marginBottom: '8px' }}
                  />
                  <Text fontSize="xs" color="gray.900" mb={0.5}>
                    Schedule
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    Send at specific time
                  </Text>
                </Box>
              </Flex>

              {scheduleType === 'scheduled' && (
                <Flex gap={2} pt={2}>
                  <Box flex={1}>
                    <Text fontSize="xs" color="gray.700" mb={1}>
                      Date
                    </Text>
                    <Input
                      type="date"
                      w="100%"
                      h="36px"
                      px={3}
                      fontSize="xs"
                      borderWidth={1}
                      borderColor="gray.200"
                      borderRadius="md"
                      _focus={{ ring: 1, ringColor: 'blue.500' }}
                    />
                  </Box>
                  <Box flex={1}>
                    <Text fontSize="xs" color="gray.700" mb={1}>
                      Time
                    </Text>
                    <Input
                      type="time"
                      w="100%"
                      h="36px"
                      px={3}
                      fontSize="xs"
                      borderWidth={1}
                      borderColor="gray.200"
                      borderRadius="md"
                      _focus={{ ring: 1, ringColor: 'blue.500' }}
                    />
                  </Box>
                </Flex>
              )}

              <Box
                mt={4}
                p={4}
                bg="gray.50"
                borderRadius="lg"
                display="flex"
                flexDirection="column"
                gap={2}
              >
                <Text fontSize="xs" color="gray.700" mb={2} fontWeight="medium">
                  Campaign Summary
                </Text>
                <Flex justifyContent="space-between" fontSize="xs">
                  <Text color="gray.600">Campaign Name:</Text>
                  <Text color="gray.900">{campaignName}</Text>
                </Flex>
                <Flex justifyContent="space-between" fontSize="xs">
                  <Text color="gray.600">Template:</Text>
                  <Text color="gray.900">{selectedTemplate}</Text>
                </Flex>
                <Flex justifyContent="space-between" fontSize="xs">
                  <Text color="gray.600">Recipients:</Text>
                  <Text color="gray.900">
                    {recipientSource === 'csv'
                      ? uploadedFile?.name || 'No file'
                      : `${selectedRecipients.length} contacts`}
                  </Text>
                </Flex>
                <Flex justifyContent="space-between" fontSize="xs">
                  <Text color="gray.600">Schedule:</Text>
                  <Text color="gray.900">
                    {scheduleType === 'now' ? 'Send Now' : 'Scheduled'}
                  </Text>
                </Flex>
              </Box>
            </Box>
          )}
        </Box>

        <Flex
          p={4}
          borderTopWidth={1}
          borderColor="gray.200"
          justifyContent="space-between"
        >
          <Button
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            h="32px"
            px={4}
            borderWidth={1}
            borderColor="gray.200"
            borderRadius="md"
            _hover={{ bg: 'gray.50' }}
            fontSize="xs"
            opacity={step === 1 ? 0.5 : 1}
            cursor={step === 1 ? 'not-allowed' : 'pointer'}
          >
            Back
          </Button>
          <Flex gap={2}>
            <Button
              onClick={onClose}
              h="32px"
              px={4}
              borderWidth={1}
              borderColor="gray.200"
              borderRadius="md"
              _hover={{ bg: 'gray.50' }}
              fontSize="xs"
            >
              Cancel
            </Button>
            {step < 4 ? (
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                h="32px"
                px={4}
                bg="blue.500"
                color="white"
                borderRadius="md"
                _hover={{ bg: 'blue.600' }}
                fontSize="xs"
                opacity={!canProceed() ? 0.5 : 1}
                cursor={!canProceed() ? 'not-allowed' : 'pointer'}
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleCreate}
                h="32px"
                px={4}
                bg="green.500"
                color="white"
                borderRadius="md"
                _hover={{ bg: 'green.600' }}
                fontSize="xs"
              >
                Create Campaign
              </Button>
            )}
          </Flex>
        </Flex>
      </Box>
    </Flex>
  )
}
