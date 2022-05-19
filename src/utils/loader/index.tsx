import asyncComponentLoader from './loader'
import type { AnyProps, LoadComponent, LoaderDefaultOptions } from './types'
import Loading from '@/components/Loading'
import { loader as loaderDefaultOptions } from '@/config'

const configuredAsyncComponentLoader = (
  loadComponent: LoadComponent,
  additionalProps: AnyProps = {},
  loaderOptions: LoaderDefaultOptions = loaderDefaultOptions,
  FallbackWaiting = Loading,
) => asyncComponentLoader(loadComponent, additionalProps, loaderOptions, FallbackWaiting)

export { loaderDefaultOptions }
export default configuredAsyncComponentLoader
