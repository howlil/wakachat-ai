import axios, { AxiosError } from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import toast from 'react-hot-toast'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  (response) => {
    if (response.data?.message) {
      toast.success(response.data.message)
    }
    return response
  },
  (
    error: AxiosError<{ success?: boolean; message?: string; error?: string }>,
  ) => {
    const apiError = error.response?.data?.error
    const apiMessage = error.response?.data?.message
    const fallbackMessage = error.message || 'An error occurred'

    const status = error.response?.status

    if (status === 401) {
      const message =
        apiError || apiMessage || 'Unauthorized. Please login again.'
      localStorage.removeItem('token')
      toast.error(message)
    } else if (status === 403) {
      const message =
        apiError ||
        apiMessage ||
        'You do not have permission to access this resource.'
      toast.error(message)
    } else if (status && status >= 500) {
      const message =
        apiError || apiMessage || 'Server error. Please try again later.'
      toast.error(message)
    } else {
      const message = apiError || apiMessage || fallbackMessage
      toast.error(message)
    }

    return Promise.reject(error)
  },
)

export default api
