import AuthorName from './AuthorName'
import CardActionButtons from './CardActionButtons'
import { Article } from './types'
import FullscreenDialog from '@/components/ArticleGallery/FullscreenDialog'
import timeAgo from '@/utils/timeAgo'
import Box from '@mui/material/Box'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import Paper from '@mui/material/Paper'
import { FC, memo, useState } from 'react'

interface ImageCardProps {
  article: Article
  hidden: boolean
}

const ImageCard: FC<ImageCardProps> = ({ article, hidden }) => {
  const { title, image, source } = article
  const [open, setOpen] = useState(false)
  const imageClickHandler = () => setOpen(true)
  return (
    <Box component="li" hidden={hidden}>
      <ImageListItem component={Paper} style={{ borderRadius: 4, width: '100%' }}>
        <img
          src={image.normal}
          alt={title}
          loading="lazy"
          onError={(e) => {
            const imageEl = e.target as HTMLImageElement
            imageEl.dataset.originalSrc = imageEl.src
            imageEl.src = 'https://via.placeholder.com/404?text=404'
          }}
          onClick={imageClickHandler}
          style={{ cursor: 'pointer', borderRadius: 4, minHeight: 250 }}
        />
        <ImageListItemBar
          title={title}
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', borderRadius: '0 0 3px 3px' }}
          subtitle={
            <>
              {timeAgo(source.createdAt)} by <AuthorName source={source} />
            </>
          }
          actionIcon={<CardActionButtons article={article} />}
        />
      </ImageListItem>
      <FullscreenDialog open={open} article={article} handleClose={() => setOpen(false)} />
    </Box>
  )
}
export default memo(ImageCard)
