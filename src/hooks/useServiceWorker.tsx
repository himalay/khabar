import useNotifications from '@/store/notifications'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import type { SnackbarKey } from 'notistack'
import { useCallback, useEffect, useRef } from 'react'
import { useRegisterSW } from 'virtual:pwa-register/react'

function useServiceWorker() {
  const [, notificationsActions] = useNotifications()
  const notificationKey = useRef<SnackbarKey | null>(null)
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW()

  const close = useCallback(() => {
    setOfflineReady(false)
    setNeedRefresh(false)

    if (notificationKey.current) {
      notificationsActions.close(notificationKey.current)
    }
  }, [setOfflineReady, setNeedRefresh, notificationsActions])

  useEffect(() => {
    if (offlineReady) {
      notificationsActions.push({
        options: {
          autoHideDuration: 4500,
          content: <Alert severity="success">App is ready to work offline.</Alert>,
        },
      })
    } else if (needRefresh) {
      notificationKey.current = notificationsActions.push({
        message: 'New content is available, click on reload button to update.',
        options: {
          variant: 'warning',
          persist: true,
          action: (
            <>
              <Button onClick={() => updateServiceWorker(true)}>Reload</Button>
              <Button onClick={close}>Close</Button>
            </>
          ),
        },
      })
    }
  }, [close, needRefresh, offlineReady, notificationsActions, updateServiceWorker])
}

export default useServiceWorker
