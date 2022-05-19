import { Article } from './types'
import CommentIcon from '@mui/icons-material/Comment'
import LinkIcon from '@mui/icons-material/Link'
import ShareIcon from '@mui/icons-material/Share'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import VisibilityIcon from '@mui/icons-material/Visibility'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { FC } from 'react'

interface CardActionButtonsProps {
  article: Article
}

const CardActionButtons: FC<CardActionButtonsProps> = ({ article }) => {
  const isSameUrl = article.source.sourceUrl === article.source.targetUrl
  const hasCount = article.source.likesCount || article.source.commentsCount || article.source.viewsCount

  const getHandleShare = (data: Article) => () => {
    if (navigator.share) {
      navigator
        .share({
          title: data.title,
          text: data.description,
          url: data.source.targetUrl,
        })
        .catch((error) => console.log('Error sharing', error))
    }
  }

  return (
    <div style={{ whiteSpace: 'nowrap', marginRight: 11 }}>
      {!!navigator.share && (
        <IconButton onClick={getHandleShare(article)} size="small" color="secondary">
          <ShareIcon fontSize="small" />
        </IconButton>
      )}
      {!!hasCount && (
        <Button disabled={isSameUrl} href={article.source.sourceUrl} target="_blank" size="small" color="secondary">
          <ThumbUpIcon sx={{ fontSize: 14, mr: 0.5 }} />
          {article.source.likesCount}
          <CommentIcon sx={{ fontSize: 14, ml: 1, mr: 0.5 }} /> {article.source.commentsCount}
          {!!article.source.viewsCount && (
            <>
              <VisibilityIcon sx={{ fontSize: 14, ml: 1, mr: 0.5 }} /> {article.source.viewsCount}
            </>
          )}
        </Button>
      )}
      {!!hasCount && (
        <Typography sx={{ display: 'inline' }} color="text.secondary">
          |
        </Typography>
      )}
      <IconButton href={article.source.targetUrl} target="_blank" size="small" color="secondary">
        <LinkIcon fontSize="small" />
      </IconButton>
    </div>
  )
}

export default CardActionButtons
