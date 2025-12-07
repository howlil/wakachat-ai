import { Box, Flex, Text, Button, Input, Badge } from '@chakra-ui/react'
import { Plus, X, AlertCircle, Users } from 'lucide-react'
import { useState } from 'react'
import type { TransferCondition } from './types'

interface AgentTransferSettingsProps {
  agentName: string
}

export const AgentTransferSettings = ({
  agentName: _agentName,
}: AgentTransferSettingsProps) => {
  const [stopAfterHandoff, setStopAfterHandoff] = useState(true)
  const [conditions, setConditions] = useState<TransferCondition[]>([
    {
      id: 1,
      trigger: 'keyword_detected',
      condition: 'contains',
      value: 'bicara dengan manusia, speak to human, talk to agent',
      action: 'transfer_to_human',
    },
    {
      id: 2,
      trigger: 'sentiment',
      condition: 'is',
      value: 'negative',
      action: 'transfer_to_human',
    },
    {
      id: 3,
      trigger: 'unresolved_after',
      condition: 'greater_than',
      value: '3',
      action: 'transfer_to_human',
    },
  ])
  const [showAddCondition, setShowAddCondition] = useState(false)
  const [newCondition, setNewCondition] = useState({
    trigger: 'keyword_detected',
    condition: 'contains',
    value: '',
    action: 'transfer_to_human' as const,
  })

  const handleAddCondition = () => {
    if (newCondition.value.trim()) {
      setConditions([
        ...conditions,
        {
          id: Date.now(),
          ...newCondition,
        },
      ])
      setNewCondition({
        trigger: 'keyword_detected',
        condition: 'contains',
        value: '',
        action: 'transfer_to_human',
      })
      setShowAddCondition(false)
    }
  }

  const handleRemoveCondition = (id: number) => {
    setConditions(conditions.filter((c) => c.id !== id))
  }

  const getTriggerLabel = (trigger: string) => {
    const labels: Record<string, string> = {
      keyword_detected: 'Keyword Detected',
      sentiment: 'Customer Sentiment',
      unresolved_after: 'Unresolved After X Messages',
      confidence_low: 'AI Confidence Low',
      custom_field: 'Custom Field Value',
    }
    return labels[trigger] || trigger
  }

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Box
        bg="orange.50"
        borderWidth={1}
        borderColor="orange.200"
        borderRadius="lg"
        p={3}
      >
        <Flex alignItems="start" gap={3}>
          <Box
            w="40px"
            h="40px"
            bg="orange.100"
            borderRadius="lg"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Users size={20} color="#EA580C" />
          </Box>
          <Box>
            <Text fontSize="sm" color="orange.900" fontWeight="medium" mb={1}>
              Agent Transfer Conditions
            </Text>
            <Text fontSize="xs" color="orange.700">
              Kondisi di mana AI akan melempar percakapan ke Human Agent.
              Berguna jika perlu memproses orderan atau membantu pelanggan lebih
              lanjut.
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
        <Box
          as="label"
          display="flex"
          alignItems="start"
          gap={3}
          cursor="pointer"
        >
          <input
            type="checkbox"
            checked={stopAfterHandoff}
            onChange={(e) => setStopAfterHandoff(e.target.checked)}
            style={{
              width: '16px',
              height: '16px',
              marginTop: '2px',
              colorScheme: 'blue',
              borderColor: '#D1D5DB',
              borderRadius: '2px',
            }}
          />
          <Box flex={1}>
            <Text fontSize="sm" color="gray.900" mb={1}>
              Stop AI After Handoff
            </Text>
            <Text fontSize="xs" color="gray.500">
              AI tidak akan memberikan respons lebih lanjut setelah percakapan
              dialihkan ke agen manusia
            </Text>
          </Box>
        </Box>
      </Box>

      <Box
        bg="white"
        borderWidth={1}
        borderColor="gray.200"
        borderRadius="lg"
        overflow="hidden"
      >
        <Flex
          p={3}
          borderBottomWidth={1}
          borderColor="gray.200"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text fontSize="sm" color="gray.900" fontWeight="medium">
            Transfer Conditions ({conditions.length})
          </Text>
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
            onClick={() => setShowAddCondition(true)}
          >
            <Plus size={12} />
            Add Condition
          </Button>
        </Flex>

        {conditions.length === 0 ? (
          <Box p={8} textAlign="center">
            <AlertCircle
              size={40}
              color="#D1D5DB"
              style={{ margin: '0 auto 8px' }}
            />
            <Text fontSize="xs" color="gray.500" mb={3}>
              No transfer conditions set
            </Text>
            <Button
              size="sm"
              bg="blue.500"
              color="white"
              _hover={{ bg: 'blue.600' }}
              h="28px"
              px={3}
              fontSize="xs"
              onClick={() => setShowAddCondition(true)}
            >
              Add First Condition
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
                  Trigger
                </Box>
                <Box
                  as="th"
                  px={3}
                  py={2}
                  textAlign="left"
                  fontSize="xs"
                  color="gray.600"
                >
                  Condition
                </Box>
                <Box
                  as="th"
                  px={3}
                  py={2}
                  textAlign="left"
                  fontSize="xs"
                  color="gray.600"
                >
                  Value
                </Box>
                <Box
                  as="th"
                  px={3}
                  py={2}
                  textAlign="left"
                  fontSize="xs"
                  color="gray.600"
                >
                  Action
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
              {conditions.map((condition) => (
                <Box
                  as="tr"
                  key={condition.id}
                  _hover={{ bg: 'gray.50' }}
                  borderBottomWidth={1}
                  borderColor="gray.100"
                >
                  <Box as="td" px={3} py={2} fontSize="xs" color="gray.900">
                    {getTriggerLabel(condition.trigger)}
                  </Box>
                  <Box as="td" px={3} py={2} fontSize="xs" color="gray.600">
                    {condition.condition}
                  </Box>
                  <Box as="td" px={3} py={2} fontSize="xs" color="gray.900">
                    {condition.value}
                  </Box>
                  <Box as="td" px={3} py={2}>
                    <Badge
                      h="20px"
                      px={2}
                      fontSize="xs"
                      bg="orange.100"
                      color="orange.700"
                      borderWidth={0}
                    >
                      Transfer to Human
                    </Badge>
                  </Box>
                  <Box as="td" px={3} py={2}>
                    <Flex alignItems="center" justifyContent="flex-end" gap={1}>
                      <Box
                        as="button"
                        w={7}
                        h={7}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        _hover={{ bg: 'red.50' }}
                        borderRadius="md"
                        transition="all 0.2s"
                        onClick={() => handleRemoveCondition(condition.id)}
                        title="Remove"
                      >
                        <X size={14} color="#DC2626" />
                      </Box>
                    </Flex>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Box>

      {showAddCondition && (
        <Flex
          position="fixed"
          inset={0}
          bg="blackAlpha.500"
          alignItems="center"
          justifyContent="center"
          p={4}
          zIndex={50}
        >
          <Box bg="white" borderRadius="lg" boxShadow="xl" w="full" maxW="md">
            <Flex
              p={4}
              borderBottomWidth={1}
              borderColor="gray.200"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text fontSize="sm" color="gray.900" fontWeight="medium">
                Add Transfer Condition
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
                onClick={() => setShowAddCondition(false)}
              >
                <X size={16} color="#9CA3AF" />
              </Box>
            </Flex>

            <Box p={4} display="flex" flexDirection="column" gap={3}>
              <Box>
                <Text fontSize="xs" color="gray.700" mb={1}>
                  Trigger Type
                </Text>
                <select
                  value={newCondition.trigger}
                  onChange={(e) =>
                    setNewCondition({
                      ...newCondition,
                      trigger: e.target.value,
                    })
                  }
                  style={{
                    width: '100%',
                    height: '32px',
                    padding: '0 12px',
                    fontSize: '12px',
                    borderWidth: '1px',
                    borderColor: '#E5E7EB',
                    borderRadius: '6px',
                  }}
                >
                  <option value="keyword_detected">Keyword Detected</option>
                  <option value="sentiment">Customer Sentiment</option>
                  <option value="unresolved_after">
                    Unresolved After X Messages
                  </option>
                  <option value="confidence_low">AI Confidence Low</option>
                </select>
              </Box>

              <Box>
                <Text fontSize="xs" color="gray.700" mb={1}>
                  Condition
                </Text>
                <select
                  value={newCondition.condition}
                  onChange={(e) =>
                    setNewCondition({
                      ...newCondition,
                      condition: e.target.value,
                    })
                  }
                  style={{
                    width: '100%',
                    height: '32px',
                    padding: '0 12px',
                    fontSize: '12px',
                    borderWidth: '1px',
                    borderColor: '#E5E7EB',
                    borderRadius: '6px',
                  }}
                >
                  <option value="contains">Contains</option>
                  <option value="is">Is</option>
                  <option value="greater_than">Greater Than</option>
                  <option value="less_than">Less Than</option>
                </select>
              </Box>

              <Box>
                <Text fontSize="xs" color="gray.700" mb={1}>
                  Value
                </Text>
                <Input
                  type="text"
                  value={newCondition.value}
                  onChange={(e) =>
                    setNewCondition({ ...newCondition, value: e.target.value })
                  }
                  placeholder="e.g., speak to human, negative, 3"
                  w="100%"
                  h="32px"
                  px={3}
                  fontSize="xs"
                  borderWidth={1}
                  borderColor="gray.200"
                  borderRadius="md"
                  _focus={{ ring: 1, ringColor: 'blue.500' }}
                />
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
                onClick={() => setShowAddCondition(false)}
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
                onClick={handleAddCondition}
              >
                Add Condition
              </Button>
            </Flex>
          </Box>
        </Flex>
      )}
    </Box>
  )
}
