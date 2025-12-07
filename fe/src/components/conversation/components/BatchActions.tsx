import { Box, Flex, Text, Button } from '@chakra-ui/react'

interface BatchActionsProps {
  selectedCount: number
  onBatchResolve: () => void
  onBatchAssign: () => void
  onBatchLabel: () => void
}

export const BatchActions = ({
  selectedCount,
  onBatchResolve,
  onBatchAssign,
  onBatchLabel,
}: BatchActionsProps) => {
  if (selectedCount === 0) return null

  return (
    <Box p={2} bg="blue.50" borderTopWidth={1} borderColor="blue.100">
      <Flex alignItems="center" gap={2}>
        <Text fontSize="xs" color="blue.900">
          {selectedCount} selected
        </Text>
        <Button
          size="sm"
          h={6}
          px={2}
          bg="green.500"
          color="white"
          _hover={{ bg: 'green.600' }}
          fontSize="xs"
          onClick={onBatchResolve}
        >
          Resolve
        </Button>
        <Button
          size="sm"
          h={6}
          px={2}
          bg="blue.500"
          color="white"
          _hover={{ bg: 'blue.600' }}
          fontSize="xs"
          onClick={onBatchAssign}
        >
          Assign
        </Button>
        <Button
          size="sm"
          h={6}
          px={2}
          bg="purple.500"
          color="white"
          _hover={{ bg: 'purple.600' }}
          fontSize="xs"
          onClick={onBatchLabel}
        >
          Add Label
        </Button>
      </Flex>
    </Box>
  )
}
