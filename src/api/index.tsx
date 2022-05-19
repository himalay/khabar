import { GetOptions } from './types'
import { AxiosPromise } from 'axios'
import { setup } from 'axios-cache-adapter'
import localforage from 'localforage'

export const PROXY_BASEURL = 'https://cors-anywhere.himalay.workers.dev/?'

const API_BASEURL = (location.host.endsWith(':3000') ? '' : PROXY_BASEURL) + 'https://api.usepanda.com'

const store = localforage.createInstance({
  driver: [localforage.INDEXEDDB, localforage.LOCALSTORAGE],
  name: 'khabar-api-cache',
})

const session = setup({
  baseURL: API_BASEURL,
  timeout: 10000,
  cache: {
    store,
    maxAge: 24 * 60 * 60 * 1000,
    exclude: { query: false },
  },
})

// eslint-disable-next-line comma-spacing
const get = <T,>(url: string, options?: GetOptions): AxiosPromise<T> =>
  session.get<T>(url, { params: options?.params, cache: options?.cache })

export default { get }
