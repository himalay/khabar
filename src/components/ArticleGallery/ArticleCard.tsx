import AuthorName from './AuthorName'
import CardActionButtons from './CardActionButtons'
import { Article } from './types'
import timeAgo from '@/utils/timeAgo'
import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { FC } from 'react'

interface ArticleCardProps {
  article: Article
  hidden: boolean
}

const ArticleCard: FC<ArticleCardProps> = ({ article, hidden }) => {
  const { title, image, description, source } = article
  const noImageAndDescription = !image.normal && !description
  const articleClickHandler = () => window.open(source.targetUrl, '_blank')

  return (
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
                loading="lazy"
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
          ...(noImageAndDescription || !description ? { pt: 0 } : {}),
        }}
      >
        <CardActionButtons article={article} />
      </CardActions>
    </Card>
  )
}

export default ArticleCard
