import type { AtomEffectParams } from '../types'
import type { Actions } from './types'
import { Themes } from '@/theme/types'
import { useEffect } from 'react'
import { atom, useRecoilState } from 'recoil'

const THEME_QUERY = '(prefers-color-scheme: light)'

const themeModeState = atom({
  key: 'theme-mode-state',
  default: window.matchMedia(THEME_QUERY).matches ? Themes.LIGTH : Themes.DARK,
  effects: [synchronizeWithLocalStorage],
})

function synchronizeWithLocalStorage({ setSelf, onSet }: AtomEffectParams) {
  const storedTheme = localStorage.getItem('theme-mode')
  storedTheme && setSelf(storedTheme)
  onSet((value: Themes) => localStorage.setItem('theme-mode', value))
}

function useTheme(): [Themes, Actions] {
  const [themeMode, setThemeMode] = useRecoilState(themeModeState)

  function toggle() {
    setThemeMode((mode: Themes) => (mode === Themes.DARK ? Themes.LIGTH : Themes.DARK))
  }

  useEffect(() => {
    const matchMedia = window.matchMedia(THEME_QUERY)
    const handleChange = (e: MediaQueryListEvent) => setThemeMode(e.matches ? Themes.LIGTH : Themes.DARK)

    matchMedia.addEventListener('change', handleChange)

    return () => {
      matchMedia.removeEventListener('change', handleChange)
    }
  })

  return [themeMode, { toggle }]
}

export default useTheme
