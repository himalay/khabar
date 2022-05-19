import AuthorName from './AuthorName'
import CardActionButtons from './CardActionButtons'
import { Article, ArticleContent } from './types'
import api from '@/api'
import FullscreenDialog from '@/components/ArticleGallery/FullscreenDialog'
import useNotifications from '@/store/notifications'
import timeAgo from '@/utils/timeAgo'
import Alert from '@mui/material/Alert'
import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'
import { FC, useState } from 'react'

interface ArticleCardProps {
  article: Article
  hidden: boolean
}

const ArticleCard: FC<ArticleCardProps> = ({ article, hidden }) => {
  const { title, image, description, source } = article
  const noImageAndDescription = !image.normal && !description
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [articleContent, setArticleContent] = useState<ArticleContent>()
  const [, notificationsActions] = useNotifications()
  const articleClickHandler = () => {
    const url = `https://api-panda.com/v2/feeds/story/full?feed=${source.name}&url=${source.targetUrl}?ref=usepanda.com`
    setLoading(true)
    api
      .get<ArticleContent>(url)
      .then(({ data }) => {
        if (data.data && data.data.html.length > 500) {
          setArticleContent(data)
          setOpen(true)
        } else {
          window.open(source.targetUrl, '_blank')
        }
      })
      .catch((e: Error) => {
        console.error(e)
        notificationsActions.push({
          options: {
            autoHideDuration: 4500,
            content: <Alert severity="error">{e.message}</Alert>,
          },
        })
      })
      .finally(() => setLoading(false))
  }

  return (
    <>
      <Card hidden={hidden} component="li" sx={{ mb: 2, breakInside: 'avoid' }}>
        <CardActionArea onClick={articleClickHandler}>
          <CardHeader
            sx={{ pb: 1 }}
            avatar={
              <Avatar style={{ backgroundColor: 'white' }}>
                <img
                  alt={source.name}
                  src={`https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${source.targetUrl}&size=64`}
                  style={{ height: 24 }}
                />
              </Avatar>
            }
            title={title}
            subheader={
              <div>
                {timeAgo(source.createdAt)} by <AuthorName source={source} />
              </div>
            }
          />
          {!!image.normal && (
            <CardMedia
              component="img"
              height="140"
              image={image.normal}
              alt={title}
              onError={(e: any) => e.target.remove(e.target)}
            />
          )}
          {!!description && (
            <CardContent sx={{ pb: 1, pt: image.normal ? 1 : 0 }}>
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            </CardContent>
          )}
        </CardActionArea>
        <CardActions
          sx={{
            justifyContent: 'flex-end',
            pr: 0,
            position: 'relative',
            ...(noImageAndDescription || !description ? { pt: 0 } : {}),
          }}
        >
          {loading && <LinearProgress style={{ position: 'absolute', width: '100%', top: 0, left: 0 }} />}
          <CardActionButtons article={article} />
        </CardActions>
      </Card>
      <FullscreenDialog open={open} articleContent={articleContent} handleClose={() => setOpen(false)} />
    </>
  )
}

export default ArticleCard
