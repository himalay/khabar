import { FullSizeCenteredFlexBox } from '@/components/styled'
import CircularProgress from '@mui/material/CircularProgress'

function Loading() {
  return (
    <FullSizeCenteredFlexBox>
      <CircularProgress />
    </FullSizeCenteredFlexBox>
  )
}

export default Loading
