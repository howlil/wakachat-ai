import { useApiMutation, useApiQuery } from '@/hooks/useApi'

interface LoginRequest {
  email: string
  password: string
}

interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

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

export type LoginResponse = ApiResponse<LoginData>

interface ProfileResponse {
  userId: string
  email: string
  role: string
}

export const useLogin = () => {
  return useApiMutation<LoginResponse, LoginRequest>('/auth/login', 'post')
}

export const useProfile = () => {
  return useApiQuery<ProfileResponse>(['profile'], '/auth/profile', {
    enabled: !!localStorage.getItem('token'),
  })
}
