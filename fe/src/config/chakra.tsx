import { ChakraProvider, defaultSystem } from '@chakra-ui/react'

export const ChakraProviderWrapper = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>
}
