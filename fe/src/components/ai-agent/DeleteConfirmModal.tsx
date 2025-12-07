import { Box, Flex, Text, Button } from '@chakra-ui/react'
import { Trash2 } from 'lucide-react'

interface DeleteConfirmModalProps {
  agentName: string
  onClose: () => void
  onConfirm: () => void
}

export const DeleteConfirmModal = ({
  agentName,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) => {
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
        <Box p={4}>
          <Box
            w="48px"
            h="48px"
            bg="red.100"
            borderRadius="lg"
            display="flex"
            alignItems="center"
            justifyContent="center"
            mx="auto"
            mb={3}
          >
            <Trash2 size={24} color="#DC2626" />
          </Box>
          <Text
            fontSize="sm"
            color="gray.900"
            fontWeight="medium"
            textAlign="center"
            mb={2}
          >
            Delete Agent
          </Text>
          <Text fontSize="xs" color="gray.600" textAlign="center" mb={4}>
            Are you sure you want to delete <strong>{agentName}</strong>? This
            action cannot be undone.
          </Text>
          <Flex gap={2}>
            <Button
              onClick={onClose}
              flex={1}
              size="sm"
              variant="outline"
              h="32px"
              px={4}
              fontSize="xs"
            >
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              flex={1}
              size="sm"
              bg="red.500"
              color="white"
              _hover={{ bg: 'red.600' }}
              h="32px"
              px={4}
              fontSize="xs"
            >
              Delete
            </Button>
          </Flex>
        </Box>
      </Box>
    </Box>
  )
}
