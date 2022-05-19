import { ReactNode } from 'react'

enum Themes {
  DARK = 'dark',
  LIGTH = 'light',
}

type CustomThemeProviderProps = {
  children: ReactNode
}

export type { CustomThemeProviderProps }
export { Themes }
