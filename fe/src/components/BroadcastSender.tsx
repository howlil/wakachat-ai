import { Box, Flex, Text, Button, Input } from '@chakra-ui/react'
import { useState } from 'react'
import { Send, Calendar } from 'lucide-react'

interface BroadcastSenderProps {
  templates: any[]
  onSend: (data: any) => void
}

export const BroadcastSender = ({
  templates,
  onSend,
}: BroadcastSenderProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState('')
  const [recipients, setRecipients] = useState<'all' | 'selected'>('all')
  const [scheduleDate, setScheduleDate] = useState('')
  const [scheduleTime, setScheduleTime] = useState('')
  const [isScheduled, setIsScheduled] = useState(false)

  const handleSend = () => {
    onSend({
      templateId: selectedTemplate,
      recipients: recipients === 'all' ? 'all' : [],
      scheduled: isScheduled,
      scheduleDate: isScheduled ? scheduleDate : null,
      scheduleTime: isScheduled ? scheduleTime : null,
    })
  }

  return (
    <Box p={6} bg="white" borderRadius="lg" maxW="800px" mx="auto">
      <Text fontSize="xl" fontWeight="bold" mb={6}>
        Send Broadcast Message
      </Text>

      <Box mb={4}>
        <Text mb={2} fontSize="sm" fontWeight="medium">
          Select Template
        </Text>
        <select
          style={{
            width: '100%',
            padding: '8px',
            borderWidth: '1px',
            borderColor: '#D1D5DB',
            borderRadius: '6px',
          }}
          value={selectedTemplate}
          onChange={(e) => setSelectedTemplate(e.target.value)}
        >
          <option value="">Choose a template</option>
          {templates.map((template) => (
            <option key={template.id} value={template.id}>
              {template.name} ({template.type})
            </option>
          ))}
        </select>
      </Box>

      <Box mb={4}>
        <Text mb={2} fontSize="sm" fontWeight="medium">
          Recipients
        </Text>
        <Flex gap={4} mb={2}>
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
            }}
          >
            <input
              type="radio"
              checked={recipients === 'all'}
              onChange={() => setRecipients('all')}
            />
            <Text>Send to All</Text>
          </label>
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
            }}
          >
            <input
              type="radio"
              checked={recipients === 'selected'}
              onChange={() => setRecipients('selected')}
            />
            <Text>Select Recipients</Text>
          </label>
        </Flex>
        {recipients === 'selected' && (
          <Box>
            <Text fontSize="xs" color="gray.600" mb={2}>
              Select specific contacts (feature to be implemented)
            </Text>
          </Box>
        )}
      </Box>

      <Box mb={4}>
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
          }}
        >
          <input
            type="checkbox"
            checked={isScheduled}
            onChange={(e) => setIsScheduled(e.target.checked)}
          />
          <Text>Schedule Broadcast</Text>
        </label>
        {isScheduled && (
          <Flex gap={2} mt={2}>
            <Input
              type="date"
              value={scheduleDate}
              onChange={(e) => setScheduleDate(e.target.value)}
            />
            <Input
              type="time"
              value={scheduleTime}
              onChange={(e) => setScheduleTime(e.target.value)}
            />
          </Flex>
        )}
      </Box>

      <Flex gap={2} justifyContent="flex-end">
        <Button colorScheme="blue" onClick={handleSend}>
          {isScheduled ? (
            <>
              <Calendar size={18} style={{ marginRight: '8px' }} />
              Schedule
            </>
          ) : (
            <>
              <Send size={18} style={{ marginRight: '8px' }} />
              Send Now
            </>
          )}
        </Button>
      </Flex>
    </Box>
  )
}
