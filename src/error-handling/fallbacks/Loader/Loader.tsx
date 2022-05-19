import { messages } from '@/config'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

function LoaderErrorBoundaryFallback() {
  return (
    <Box>
      <Typography variant="h5">{messages.loader.fail}</Typography>
    </Box>
  )
}

export default LoaderErrorBoundaryFallback
