import Notifier from './Notifier'
import { notifications } from '@/config'
import { SnackbarProvider } from 'notistack'

function Notifications() {
  return (
    <SnackbarProvider maxSnack={notifications.maxSnack}>
      <Notifier />
    </SnackbarProvider>
  )
}

export default Notifications
