import { AxiosPromise } from 'axios'

export interface GetOptions {
  params?: unknown
  cache?: { maxAge: number }
}
export interface APIContextActions {
  get: <T>(url: string, options?: GetOptions) => AxiosPromise<T>
  post: <T>(url: string, data: unknown, headers?: Record<string, string>) => AxiosPromise<T>
  put: <T>(url: string, data: unknown, headers?: Record<string, string>) => AxiosPromise<T>
  patch: <T>(url: string, data: unknown, headers?: Record<string, string>) => AxiosPromise<T>
  delete: (url: string, headers?: Record<string, string>) => AxiosPromise
}
