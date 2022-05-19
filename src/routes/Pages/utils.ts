import type { Theme } from '@mui/material'

export const getTopSpacing = (theme: Theme) => Number(theme.mixins.toolbar.minHeight) + parseInt(theme.spacing(1))

export const getPageHeight = (theme: Theme) => `calc(100vh - ${getTopSpacing(theme)}px)`
