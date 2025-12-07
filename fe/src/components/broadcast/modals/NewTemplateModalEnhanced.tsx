import { Box, Flex, Text, Button, Input, Textarea, Badge } from '@chakra-ui/react'
import {
  X,
  Plus,
  Trash2,
  Type,
  Image as ImageIcon,
  Video,
  FileText,
  Phone,
  ExternalLink,
  MessageSquare,
  AlertCircle,
} from 'lucide-react'
import { useState } from 'react'
import type { TemplateHeaderType, ButtonType } from '../types'

interface TemplateButton {
  id: string
  type: 'quick_reply' | 'visit_website' | 'call_phone'
  text: string
  value?: string
}

interface NewTemplateModalEnhancedProps {
  onClose: () => void
}

export const NewTemplateModalEnhanced = ({
  onClose,
}: NewTemplateModalEnhancedProps) => {
  const [templateName, setTemplateName] = useState('')
  const [selectedInbox, setSelectedInbox] = useState('')
  const [language, setLanguage] = useState('id')
  const [category, setCategory] = useState('')
  const [headerType, setHeaderType] = useState<TemplateHeaderType>('none')
  const [headerText, setHeaderText] = useState('')
  const [headerFile, setHeaderFile] = useState<File | null>(null)
  const [bodyText, setBodyText] = useState('')
  const [variableCount, setVariableCount] = useState(0)
  const [buttons, setButtons] = useState<TemplateButton[]>([])

  const addButton = (type: 'quick_reply' | 'visit_website' | 'call_phone') => {
    const quickReplyCount = buttons.filter((b) => b.type === 'quick_reply')
      .length
    const websiteCount = buttons.filter((b) => b.type === 'visit_website')
      .length
    const phoneCount = buttons.filter((b) => b.type === 'call_phone').length

    if (buttons.length >= 10) {
      alert('Maximum 10 buttons allowed')
      return
    }
    if (type === 'visit_website' && websiteCount >= 2) {
      alert('Maximum 2 website buttons allowed')
      return
    }
    if (type === 'call_phone' && phoneCount >= 1) {
      alert('Maximum 1 phone button allowed')
      return
    }

    const newButton: TemplateButton = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      text: '',
      value: type !== 'quick_reply' ? '' : undefined,
    }
    setButtons([...buttons, newButton])
  }

  const updateButton = (
    id: string,
    field: 'text' | 'value',
    value: string,
  ) => {
    setButtons(
      buttons.map((b) => (b.id === id ? { ...b, [field]: value } : b)),
    )
  }

  const removeButton = (id: string) => {
    setButtons(buttons.filter((b) => b.id !== id))
  }

  const insertVariable = () => {
    const newCount = variableCount + 1
    const variable = `{{${newCount}}}`
    setBodyText(bodyText + ' ' + variable)
    setVariableCount(newCount)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setHeaderFile(file)
    }
  }

  const handleCreate = () => {
    if (!templateName || !selectedInbox || !language || !category) {
      alert('Please fill in all required fields')
      return
    }
    if (!bodyText) {
      alert('Body text is required')
      return
    }

    const templateData = {
      name: templateName,
      inbox: selectedInbox,
      language,
      category,
      header: {
        type: headerType,
        text: headerText,
        file: headerFile?.name,
      },
      body: bodyText,
      buttons,
    }

    console.log('Template created:', templateData)
    alert(`Template "${templateName}" created successfully!`)
    onClose()
  }

  const quickReplyCount = buttons.filter((b) => b.type === 'quick_reply')
    .length
  const websiteCount = buttons.filter((b) => b.type === 'visit_website')
    .length
  const phoneCount = buttons.filter((b) => b.type === 'call_phone').length

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
        maxW="1024px"
        maxH="90vh"
        display="flex"
        flexDirection="column"
      >
        <Box p={4} borderBottomWidth={1} borderColor="gray.200">
          <Flex alignItems="center" justifyContent="space-between">
            <Box>
              <Text fontSize="sm" color="gray.900" fontWeight="medium">
                Create New Template
              </Text>
              <Text fontSize="xs" color="gray.500">
                Meta-approved message template for WhatsApp
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

        <Box flex={1} overflow="auto">
          <Flex>
            <Box flex={1} p={4} display="flex" flexDirection="column" gap={4}>
              <Text fontSize="xs" color="gray.700" mb={3} fontWeight="medium">
                Template Information
              </Text>

              <Box>
                <Text fontSize="xs" color="gray.700" mb={1}>
                  Template Name <Text as="span" color="red.500">*</Text>
                </Text>
                <Input
                  type="text"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  placeholder="e.g., flash_sale_december"
                  w="100%"
                  h="36px"
                  px={3}
                  fontSize="xs"
                  borderWidth={1}
                  borderColor="gray.200"
                  borderRadius="md"
                  _focus={{ ring: 1, ringColor: 'blue.500' }}
                />
                <Text fontSize="xs" color="gray.500" mt={1}>
                  Use lowercase and underscores only
                </Text>
              </Box>

              <Box>
                <Text fontSize="xs" color="gray.700" mb={1}>
                  Platform/Inbox <Text as="span" color="red.500">*</Text>
                </Text>
                <select
                  value={selectedInbox}
                  onChange={(e) => setSelectedInbox(e.target.value)}
                  style={{
                    width: '100%',
                    height: '36px',
                    padding: '0 12px',
                    fontSize: '12px',
                    borderWidth: '1px',
                    borderColor: '#E5E7EB',
                    borderRadius: '6px',
                  }}
                >
                  <option value="">Select Inbox</option>
                  <option value="main_whatsapp">Main WhatsApp</option>
                  <option value="sales_whatsapp">Sales WhatsApp</option>
                  <option value="support_whatsapp">Support WhatsApp</option>
                </select>
              </Box>

              <Flex gap={2}>
                <Box flex={1}>
                  <Text fontSize="xs" color="gray.700" mb={1}>
                    Language <Text as="span" color="red.500">*</Text>
                  </Text>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    style={{
                      width: '100%',
                      height: '36px',
                      padding: '0 12px',
                      fontSize: '12px',
                      borderWidth: '1px',
                      borderColor: '#E5E7EB',
                      borderRadius: '6px',
                    }}
                  >
                    <option value="id">Bahasa Indonesia</option>
                    <option value="en">English</option>
                    <option value="en_US">English (US)</option>
                  </select>
                </Box>
                <Box flex={1}>
                  <Text fontSize="xs" color="gray.700" mb={1}>
                    Category <Text as="span" color="red.500">*</Text>
                  </Text>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{
                      width: '100%',
                      height: '36px',
                      padding: '0 12px',
                      fontSize: '12px',
                      borderWidth: '1px',
                      borderColor: '#E5E7EB',
                      borderRadius: '6px',
                    }}
                  >
                    <option value="">Select</option>
                    <option value="marketing">Marketing</option>
                    <option value="utility">Utility</option>
                    <option value="authentication">Authentication</option>
                  </select>
                </Box>
              </Flex>

              <Box>
                <Text fontSize="xs" color="gray.700" mb={2}>
                  Header (Optional)
                </Text>
                <Flex gap={1} mb={2}>
                  {[
                    { id: 'none', label: 'None' },
                    { id: 'text', label: 'Text', icon: Type },
                    { id: 'image', label: 'Image', icon: ImageIcon },
                    { id: 'video', label: 'Video', icon: Video },
                    { id: 'document', label: 'Doc', icon: FileText },
                  ].map((option) => {
                    const Icon = option.icon
                    return (
                      <Button
                        key={option.id}
                        onClick={() => setHeaderType(option.id as TemplateHeaderType)}
                        flex={1}
                        h="32px"
                        px={2}
                        borderRadius="md"
                        fontSize="xs"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        gap={1}
                        borderWidth={1}
                        borderColor={
                          headerType === option.id ? 'blue.300' : 'gray.200'
                        }
                        bg={headerType === option.id ? 'blue.50' : 'gray.50'}
                        color={headerType === option.id ? 'blue.600' : 'gray.600'}
                        _hover={{ bg: 'gray.100' }}
                      >
                        {Icon && <Icon size={12} />}
                        {option.label}
                      </Button>
                    )
                  })}
                </Flex>

                {headerType === 'text' && (
                  <Input
                    type="text"
                    value={headerText}
                    onChange={(e) => setHeaderText(e.target.value)}
                    placeholder="Enter header text..."
                    w="100%"
                    h="36px"
                    px={3}
                    fontSize="xs"
                    borderWidth={1}
                    borderColor="gray.200"
                    borderRadius="md"
                    _focus={{ ring: 1, ringColor: 'blue.500' }}
                  />
                )}

                {(headerType === 'image' ||
                  headerType === 'video' ||
                  headerType === 'document') && (
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
                    {headerFile ? (
                      <Box>
                        <Text fontSize="xs" color="blue.600">
                          {headerFile.name}
                        </Text>
                        <Text fontSize="xs" color="gray.500" mt={1}>
                          {(headerFile.size / 1024).toFixed(2)} KB
                        </Text>
                      </Box>
                    ) : (
                      <>
                        <Box w={8} h={8} mx="auto" mb={2} color="gray.400">
                          {headerType === 'image' && <ImageIcon size={32} />}
                          {headerType === 'video' && <Video size={32} />}
                          {headerType === 'document' && <FileText size={32} />}
                        </Box>
                        <Text fontSize="xs" color="gray.600">
                          Click to upload {headerType}
                        </Text>
                      </>
                    )}
                    <input
                      type="file"
                      style={{ display: 'none' }}
                      onChange={handleFileUpload}
                      accept={
                        headerType === 'image'
                          ? 'image/*'
                          : headerType === 'video'
                            ? 'video/*'
                            : '.pdf,.doc,.docx'
                      }
                    />
                  </Box>
                )}
              </Box>

              <Box>
                <Flex alignItems="center" justifyContent="space-between" mb={1}>
                  <Text fontSize="xs" color="gray.700">
                    Body <Text as="span" color="red.500">*</Text>
                  </Text>
                  <Box
                    as="button"
                    fontSize="xs"
                    color="blue.600"
                    _hover={{ textDecoration: 'underline' }}
                    display="flex"
                    alignItems="center"
                    gap={1}
                    onClick={insertVariable}
                  >
                    <Plus size={12} />
                    Add Variable {'{'}{'{'}
                    {variableCount + 1}
                    {'}'}{'}'}
                  </Box>
                </Flex>
                <Textarea
                  value={bodyText}
                  onChange={(e) => setBodyText(e.target.value)}
                  placeholder="Type your message here... Use {{1}}, {{2}} for variables"
                  w="100%"
                  h={32}
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
                    Variables: {variableCount}
                  </Text>
                  <Text fontSize="xs" color="gray.400">
                    {bodyText.length} chars
                  </Text>
                </Flex>
              </Box>

              <Box>
                <Text fontSize="xs" color="gray.700" mb={2}>
                  Buttons (Optional)
                </Text>

                <Flex gap={2} mb={3}>
                  <Button
                    flex={1}
                    h="32px"
                    px={2}
                    borderWidth={1}
                    borderColor="gray.200"
                    borderRadius="md"
                    fontSize="xs"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap={1}
                    _hover={{ bg: 'gray.50' }}
                    onClick={() => addButton('quick_reply')}
                  >
                    <MessageSquare size={12} />
                    Quick Reply
                  </Button>
                  <Button
                    flex={1}
                    h="32px"
                    px={2}
                    borderWidth={1}
                    borderColor="gray.200"
                    borderRadius="md"
                    fontSize="xs"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap={1}
                    _hover={{ bg: 'gray.50' }}
                    disabled={websiteCount >= 2}
                    opacity={websiteCount >= 2 ? 0.5 : 1}
                    cursor={websiteCount >= 2 ? 'not-allowed' : 'pointer'}
                    onClick={() => addButton('visit_website')}
                  >
                    <ExternalLink size={12} />
                    Website ({websiteCount}/2)
                  </Button>
                  <Button
                    flex={1}
                    h="32px"
                    px={2}
                    borderWidth={1}
                    borderColor="gray.200"
                    borderRadius="md"
                    fontSize="xs"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap={1}
                    _hover={{ bg: 'gray.50' }}
                    disabled={phoneCount >= 1}
                    opacity={phoneCount >= 1 ? 0.5 : 1}
                    cursor={phoneCount >= 1 ? 'not-allowed' : 'pointer'}
                    onClick={() => addButton('call_phone')}
                  >
                    <Phone size={12} />
                    Call ({phoneCount}/1)
                  </Button>
                </Flex>

                {buttons.length > 0 && (
                  <Box display="flex" flexDirection="column" gap={2}>
                    {buttons.map((button) => (
                      <Box
                        key={button.id}
                        p={3}
                        borderWidth={1}
                        borderColor="gray.200"
                        borderRadius="lg"
                      >
                        <Flex
                          alignItems="center"
                          justifyContent="space-between"
                          mb={2}
                        >
                          <Badge
                            h="20px"
                            px={2}
                            fontSize="xs"
                            bg="gray.100"
                            color="gray.700"
                            borderWidth={0}
                          >
                            {button.type === 'quick_reply' && 'Quick Reply'}
                            {button.type === 'visit_website' && 'Website'}
                            {button.type === 'call_phone' && 'Call Phone'}
                          </Badge>
                          <Box
                            as="button"
                            w={5}
                            h={5}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            _hover={{ bg: 'red.50' }}
                            borderRadius="md"
                            transition="all 0.2s"
                            onClick={() => removeButton(button.id)}
                          >
                            <Trash2 size={12} color="#DC2626" />
                          </Box>
                        </Flex>
                        <Box display="flex" flexDirection="column" gap={2}>
                          <Input
                            type="text"
                            value={button.text}
                            onChange={(e) =>
                              updateButton(button.id, 'text', e.target.value)
                            }
                            placeholder="Button text"
                            w="100%"
                            h="32px"
                            px={2}
                            fontSize="xs"
                            borderWidth={1}
                            borderColor="gray.200"
                            borderRadius="md"
                            _focus={{ ring: 1, ringColor: 'blue.500' }}
                          />
                          {button.type !== 'quick_reply' && (
                            <Input
                              type="text"
                              value={button.value || ''}
                              onChange={(e) =>
                                updateButton(button.id, 'value', e.target.value)
                              }
                              placeholder={
                                button.type === 'visit_website'
                                  ? 'https://example.com'
                                  : '+62812345678'
                              }
                              w="100%"
                              h="32px"
                              px={2}
                              fontSize="xs"
                              borderWidth={1}
                              borderColor="gray.200"
                              borderRadius="md"
                              _focus={{ ring: 1, ringColor: 'blue.500' }}
                            />
                          )}
                        </Box>
                      </Box>
                    ))}
                  </Box>
                )}

                <Text fontSize="xs" color="gray.500" mt={2}>
                  {buttons.length}/10 buttons • Max: 10 Quick Reply, 2 Website,
                  1 Phone
                </Text>
              </Box>
            </Box>

            <Box
              flex={1}
              p={4}
              bg="gray.50"
              borderLeftWidth={1}
              borderColor="gray.200"
            >
              <Text fontSize="xs" color="gray.700" mb={3} fontWeight="medium">
                Preview
              </Text>

              <Box
                bg="white"
                borderRadius="lg"
                boxShadow="sm"
                borderWidth={1}
                borderColor="gray.200"
                p={3}
                maxW="256px"
                mx="auto"
              >
                {headerType !== 'none' && (
                  <Box mb={3}>
                    {headerType === 'text' && headerText && (
                      <Box p={2} bg="blue.50" borderRadius="md" fontSize="xs" color="blue.900">
                        {headerText}
                      </Box>
                    )}
                    {(headerType === 'image' ||
                      headerType === 'video' ||
                      headerType === 'document') && (
                      <Box
                        aspectRatio="16/9"
                        bg="gray.200"
                        borderRadius="md"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        {headerType === 'image' && <ImageIcon size={32} color="#9CA3AF" />}
                        {headerType === 'video' && <Video size={32} color="#9CA3AF" />}
                        {headerType === 'document' && (
                          <Flex
                            alignItems="center"
                            gap={2}
                            p={3}
                            bg="gray.100"
                            borderRadius="md"
                          >
                            <FileText size={20} color="#6B7280" />
                            <Text fontSize="xs" color="gray.700">
                              Document
                            </Text>
                          </Flex>
                        )}
                      </Box>
                    )}
                  </Box>
                )}

                <Text
                  fontSize="xs"
                  color="gray.900"
                  whiteSpace="pre-wrap"
                  mb={3}
                >
                  {bodyText || (
                    <Text as="span" fontStyle="italic" color="gray.400">
                      Type your message in the body field...
                    </Text>
                  )}
                </Text>

                {buttons.length > 0 && (
                  <Box
                    display="flex"
                    flexDirection="column"
                    gap={1}
                    borderTopWidth={1}
                    borderColor="gray.200"
                    pt={2}
                  >
                    {buttons.map((button) => (
                      <Box
                        key={button.id}
                        textAlign="center"
                        py={2}
                        fontSize="xs"
                        color="blue.600"
                        borderWidth={1}
                        borderColor="blue.200"
                        borderRadius="md"
                        _hover={{ bg: 'blue.50' }}
                        transition="all 0.2s"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        gap={1}
                      >
                        {button.type === 'quick_reply' && (
                          <MessageSquare size={12} />
                        )}
                        {button.type === 'visit_website' && (
                          <ExternalLink size={12} />
                        )}
                        {button.type === 'call_phone' && <Phone size={12} />}
                        {button.text || 'Button Text'}
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>

              <Box mt={4} p={3} bg="blue.50" borderWidth={1} borderColor="blue.200" borderRadius="lg">
                <Flex alignItems="start" gap={2}>
                  <AlertCircle size={16} color="#2563EB" style={{ marginTop: '2px' }} />
                  <Box fontSize="xs" color="blue.700">
                    <Text mb={1}>
                      This template will be submitted to Meta for approval.
                    </Text>
                    <Text>Approval typically takes 24-48 hours.</Text>
                  </Box>
                </Flex>
              </Box>
            </Box>
          </Flex>
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
            onClick={handleCreate}
          >
            Create Template
          </Button>
        </Flex>
      </Box>
    </Flex>
  )
}

