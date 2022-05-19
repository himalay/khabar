import ArticleViewer from './ArticleViewer'
import AuthorName from './AuthorName'
import ImageViewer from './ImageViewer'
import { Article, ArticleContent, ArticleSource } from './types'
import timeAgo from '@/utils/timeAgo'
import CloseIcon from '@mui/icons-material/Close'
import { useScrollTrigger } from '@mui/material'
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

const fixDataImage = (url: string) => {
  if (url.includes('data:image')) {
    return `data:image${url.split('data:image').pop()}`
  } else {
    return url
  }
}

interface SubtitleProps {
  source?: ArticleSource
  title?: string
}

const Subtitle = ({ source, title = '' }: SubtitleProps) => {
  if (source) {
    return (
      <span style={{ color: 'whitesmoke' }}>
        {timeAgo(source.createdAt)} by <AuthorName source={source} />
      </span>
    )
  }
  return (
    <Typography component="span" noWrap style={{ maxWidth: '75vw', display: 'inline-block', color: 'whitesmoke' }}>
      {title}
    </Typography>
  )
}

interface FullscreenDialogProps {
  open: boolean
  handleClose: () => void
  article?: Article
  articleContent?: ArticleContent
}

const FullscreenDialog: FC<FullscreenDialogProps> = ({ open, handleClose, article, articleContent }) => {
  const [showAppBar, setShowAppBar] = useState(false)
  const contentRef = useRef<HTMLDivElement>()
  const scrollTrigger = useScrollTrigger({
    target: contentRef.current || undefined,
  })

  const data = articleContent?.data

  useEffect(() => {
    if (open && !article && !articleContent) {
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
        {!!articleContent && <ArticleViewer articleContent={articleContent} />}
        {!articleContent && !!article && <ImageViewer article={article} />}
      </DialogContent>
      {showAppBar && (
        <Slide appear={false} direction="up" in={!articleContent ? true : !scrollTrigger}>
          <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, zIndex: 5 }}>
            <Toolbar style={{ paddingRight: isMobile ? 8 : 16 }}>
              {data?.icon && (
                <img
                  src={fixDataImage(data.icon)}
                  alt={data.siteName}
                  style={{ width: 32, overflow: 'hidden', marginRight: 8 }}
                  onError={(e) => {
                    const imageEl = e.target as HTMLImageElement
                    imageEl.src = 'https://via.placeholder.com/32?text=X'
                  }}
                />
              )}
              <ListItemText
                primary={
                  <Typography variant="h6" color="inherit" style={{ flex: 1 }} noWrap>
                    {data?.siteName || article?.title}
                  </Typography>
                }
                secondary={<Subtitle source={article?.source} title={data?.title} />}
                style={{ flex: 1 }}
              />
              <IconButton color="inherit" onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </Slide>
      )}
    </Dialog>
  )
}

export default FullscreenDialog
