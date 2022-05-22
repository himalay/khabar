import { withErrorHandler } from '@/error-handling'
import AppErrorBoundaryFallback from '@/error-handling/fallbacks/App'
import useServiceWorker from '@/hooks/useServiceWorker'
import Pages from '@/routes/Pages'
import Header from '@/sections/Header'
import Notifications from '@/sections/Notifications'
import CssBaseline from '@mui/material/CssBaseline'
import { Fragment } from 'react'
import { BrowserRouter } from 'react-router-dom'

function App() {
  useServiceWorker()

  return (
    <Fragment>
      <CssBaseline />
      <Notifications />
      <BrowserRouter>
        <Header />
        <Pages />
      </BrowserRouter>
    </Fragment>
  )
}

export default withErrorHandler(App, AppErrorBoundaryFallback)
