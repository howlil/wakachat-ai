import { Box, Flex, Text, Button, Badge } from '@chakra-ui/react'
import { Copy, Eye, MoreVertical } from 'lucide-react'
import type { Template } from './types'

interface TemplateTableProps {
  templates: Template[]
  onViewTemplate: (template: Template) => void
}

export const TemplateTable = ({
  templates,
  onViewTemplate,
}: TemplateTableProps) => {
  return (
    <Box
      bg="white"
      borderRadius="lg"
      borderWidth={1}
      borderColor="gray.200"
      overflow="hidden"
    >
      <Box as="table" w="100%">
        <Box
          as="thead"
          bg="gray.50"
          borderBottomWidth={1}
          borderColor="gray.200"
        >
          <Box as="tr">
            <Box
              as="th"
              px={3}
              py={2}
              textAlign="left"
              fontSize="xs"
              color="gray.600"
            >
              Name
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
              textAlign="left"
              fontSize="xs"
              color="gray.600"
            >
              Content
            </Box>
            <Box
              as="th"
              px={3}
              py={2}
              textAlign="left"
              fontSize="xs"
              color="gray.600"
            >
              Variables
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
              Created
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
          {templates.length === 0 ? (
            <Box as="tr">
              <Box
                as="td"
                px={3}
                py={8}
                textAlign="center"
                fontSize="xs"
                color="gray.500"
                style={{ gridColumn: '1 / -1' }}
              >
                No templates found
              </Box>
            </Box>
          ) : (
            templates.map((template) => (
              <Box
                key={template.id}
                as="tr"
                _hover={{ bg: 'gray.50' }}
                borderTopWidth={1}
                borderColor="gray.100"
              >
                <Box as="td" px={3} py={2}>
                  <Button
                    variant="ghost"
                    fontSize="xs"
                    color="blue.600"
                    _hover={{ color: 'blue.700', textDecoration: 'underline' }}
                    onClick={() => onViewTemplate(template)}
                    textAlign="left"
                    h="auto"
                    p={0}
                    fontWeight="normal"
                  >
                    {template.name}
                  </Button>
                </Box>
                <Box as="td" px={3} py={2}>
                  <Badge
                    h="20px"
                    px={2}
                    fontSize="xs"
                    borderRadius="sm"
                    borderWidth={0}
                    bg={
                      template.type === 'marketing' ? 'blue.100' : 'green.100'
                    }
                    color={
                      template.type === 'marketing' ? 'blue.700' : 'green.700'
                    }
                  >
                    {template.type}
                  </Badge>
                </Box>
                <Box as="td" px={3} py={2}>
                  <Text
                    fontSize="xs"
                    color="gray.700"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    display="-webkit-box"
                    style={{
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}
                    maxW="320px"
                  >
                    {template.content}
                  </Text>
                </Box>
                <Box as="td" px={3} py={2}>
                  <Flex flexWrap="wrap" gap={1}>
                    {template.variables?.slice(0, 3).map((v, idx) => (
                      <Box
                        key={idx}
                        px={1.5}
                        py={0.5}
                        bg="purple.50"
                        color="purple.700"
                        fontSize="xs"
                        borderRadius="sm"
                      >
                        {v}
                      </Box>
                    ))}
                    {template.variables && template.variables.length > 3 && (
                      <Box
                        px={1.5}
                        py={0.5}
                        bg="gray.100"
                        color="gray.600"
                        fontSize="xs"
                        borderRadius="sm"
                      >
                        +{template.variables.length - 3}
                      </Box>
                    )}
                  </Flex>
                </Box>
                <Box as="td" px={3} py={2}>
                  <Badge
                    h="20px"
                    px={2}
                    fontSize="xs"
                    borderRadius="sm"
                    borderWidth={0}
                    bg={
                      template.status === 'approved'
                        ? 'green.100'
                        : template.status === 'pending'
                          ? 'yellow.100'
                          : 'red.100'
                    }
                    color={
                      template.status === 'approved'
                        ? 'green.700'
                        : template.status === 'pending'
                          ? 'yellow.700'
                          : 'red.700'
                    }
                  >
                    {template.status}
                  </Badge>
                </Box>
                <Box as="td" px={3} py={2}>
                  <Text fontSize="xs" color="gray.500">
                    {template.createdAt}
                  </Text>
                </Box>
                <Box as="td" px={3} py={2}>
                  <Flex alignItems="center" justifyContent="flex-end" gap={1}>
                    <Button variant="ghost" size="sm" w="28px" h="28px" p={0}>
                      <Copy size={14} color="#6B7280" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      w="28px"
                      h="28px"
                      p={0}
                      onClick={() => onViewTemplate(template)}
                    >
                      <Eye size={14} color="#6B7280" />
                    </Button>
                    <Button variant="ghost" size="sm" w="28px" h="28px" p={0}>
                      <MoreVertical size={14} color="#6B7280" />
                    </Button>
                  </Flex>
                </Box>
              </Box>
            ))
          )}
        </Box>
      </Box>
    </Box>
  )
}
