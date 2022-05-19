import { Themes } from './types'
import { deepOrange, blue } from '@mui/material/colors'
import { ThemeOptions } from '@mui/material/styles'

const palette = {
  primary: deepOrange,
  secondary: blue,
}

const themes: Record<Themes, ThemeOptions> = {
  light: {
    palette: {
      mode: 'light',
      ...palette,
    },
  },

  dark: {
    palette: {
      mode: 'dark',
      ...palette,
    },
  },
}

export default themes
