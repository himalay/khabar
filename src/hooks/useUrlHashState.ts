import { Dispatch, SetStateAction, useEffect, useState } from 'react'

export function useUrlHashState(hash: string): [state: boolean, setState: Dispatch<SetStateAction<boolean>>] {
  const [state, setState] = useState<boolean>(window.location.hash === hash)

  useEffect(() => {
    const onHashChange = () => setState(window.location.hash === hash)
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [hash])

  return [
    state,
    (setStateAction) => {
      if (
        (typeof setStateAction === 'boolean' && setStateAction) ||
        (typeof setStateAction === 'function' && setStateAction(state))
      ) {
        window.location.hash = hash
      } else if (window.location.pathname !== '/' || window.location.hash !== '') {
        window.history.back()
      }
    },
  ]
}
