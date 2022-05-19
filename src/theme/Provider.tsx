import themes from './themes'
import type { CustomThemeProviderProps } from './types'
import useTheme from '@/store/theme'
import { ThemeProvider, createTheme } from '@mui/material/styles'

function CustomThemeProvider({ children }: CustomThemeProviderProps) {
  const [theme] = useTheme()

  return <ThemeProvider theme={createTheme(themes[theme])}>{children}</ThemeProvider>
}

export default CustomThemeProvider
