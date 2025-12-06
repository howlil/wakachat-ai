import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Box, Button, Heading, Input, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useLogin } from '@/services/auth.service'

interface LoginData {
  user: {
    id: string
    name: string
    email: string
    role: string
    createdAt: string
    updatedAt: string
  }
  token: string
}

export const Route = createFileRoute('/login' as any)({
  component: LoginPage,
})

function LoginPage() {
  const navigate = useNavigate()
  const { setAuth } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const loginMutation = useLogin()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (response) => {
          const loginData = response.data.data as LoginData
          if (loginData) {
            const { user, token } = loginData
            setAuth(
              {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
              },
              token,
            )
            navigate({ to: '/dashboard' as any })
          }
        },
      },
    )
  }

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
    >
      <Box
        w="100%"
        maxW="400px"
        p={8}
        bg="white"
        borderWidth={1}
        borderRadius="lg"
        boxShadow="md"
      >
        <Box display="flex" flexDirection="column" gap={6}>
          <Box textAlign="center">
            <Heading size="xl" mb={2}>
              Login
            </Heading>
            <Text color="gray.600">Masuk ke akun Anda</Text>
          </Box>
          <form onSubmit={handleLogin}>
            <Box display="flex" flexDirection="column" gap={4}>
              <Box>
                <Text mb={2} fontSize="sm" fontWeight="medium">
                  Email
                </Text>
                <Input
                  type="email"
                  placeholder="nama@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  size="lg"
                />
              </Box>
              <Box>
                <Text mb={2} fontSize="sm" fontWeight="medium">
                  Password
                </Text>
                <Input
                  type="password"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  size="lg"
                />
              </Box>
              <Button
                type="submit"
                colorScheme="blue"
                width="full"
                size="lg"
                loading={loginMutation.isPending}
                mt={2}
              >
                {loginMutation.isPending ? 'Memproses...' : 'Login'}
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  )
}
