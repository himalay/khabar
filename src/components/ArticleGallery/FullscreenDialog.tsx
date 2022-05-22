import AuthorName from './AuthorName'
import ImageViewer from './ImageViewer'
import { Article } from './types'
import timeAgo from '@/utils/timeAgo'
import CloseIcon from '@mui/icons-material/Close'
import AppBar from '@mui/material/AppBar'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import ListItemText from '@mui/material/ListItemText'
import Slide from '@mui/material/Slide'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { TransitionProps } from '@mui/material/transitions'
import { FC, forwardRef, ReactElement, Ref, useEffect, useRef, useState } from 'react'
import { isMobile } from 'react-device-detect'

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: ReactElement },
  ref: Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />
})

interface FullscreenDialogProps {
  open: boolean
  handleClose: () => void
  article?: Article
}

const FullscreenDialog: FC<FullscreenDialogProps> = ({ open, handleClose, article }) => {
  const [showAppBar, setShowAppBar] = useState(false)
  const contentRef = useRef<HTMLDivElement>()

  useEffect(() => {
    if (open && !article) {
      handleClose()
    } else {
      if (open) {
        setTimeout(() => setShowAppBar(true), 200)
      } else {
        setShowAppBar(false)
      }
    }
  }, [open])

  return (
    <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
      <DialogContent ref={contentRef} sx={{ p: 0, ox: 'hidden' }}>
        {!!article && <ImageViewer article={article} />}
      </DialogContent>
      {showAppBar && (
        <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, zIndex: 5 }}>
          <Toolbar style={{ paddingRight: isMobile ? 8 : 16 }}>
            <ListItemText
              primary={
                <Typography variant="h6" color="inherit" style={{ flex: 1 }} noWrap>
                  {article?.title}
                </Typography>
              }
              secondary={
                !!article && (
                  <span style={{ color: 'whitesmoke' }}>
                    {timeAgo(article.source.createdAt)} by <AuthorName source={article.source} />
                  </span>
                )
              }
              style={{ flex: 1 }}
            />
            <IconButton color="inherit" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      )}
    </Dialog>
  )
}

export default FullscreenDialog
