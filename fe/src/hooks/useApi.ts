import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query'
import api from '@/config/api'
import type { AxiosError, AxiosResponse } from 'axios'

export const useApiQuery = <TData = unknown, TError = AxiosError>(
  key: string[],
  url: string,
  options?: Omit<
    UseQueryOptions<AxiosResponse<TData>, TError>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery<AxiosResponse<TData>, TError>({
    queryKey: key,
    queryFn: () => api.get<TData>(url),
    ...options,
  })
}

export const useApiMutation = <
  TData = unknown,
  TVariables = unknown,
  TError = AxiosError,
>(
  url: string,
  method: 'post' | 'put' | 'patch' | 'delete' = 'post',
  options?: Omit<
    UseMutationOptions<AxiosResponse<TData>, TError, TVariables>,
    'mutationFn'
  >,
) => {
  const queryClient = useQueryClient()

  return useMutation<AxiosResponse<TData>, TError, TVariables>({
    mutationFn: (data: TVariables) => {
      switch (method) {
        case 'post':
          return api.post<TData>(url, data)
        case 'put':
          return api.put<TData>(url, data)
        case 'patch':
          return api.patch<TData>(url, data)
        case 'delete':
          return api.delete<TData>(url)
        default:
          return api.post<TData>(url, data)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries()
    },
    ...options,
  })
}
