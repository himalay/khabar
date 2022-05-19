import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Paper from '@mui/material/Paper'
import Skeleton from '@mui/material/Skeleton'
import { CSSProperties, FC, Fragment, memo } from 'react'

interface ActionButtonsProps {
  style?: CSSProperties
}

const ActionButtons = memo(({ style = {} }: ActionButtonsProps) => (
  <>
    <Skeleton
      animation="wave"
      variant="text"
      width={70}
      height={30}
      style={{ marginRight: 8, display: 'inline-block' }}
    />
    <Skeleton
      animation="wave"
      variant="text"
      width={30}
      height={30}
      style={{ marginRight: 16, display: 'inline-block', ...style }}
    />
  </>
))

interface SkeletonProps {
  n: number
  isMobile?: boolean
}

export const ImageCardSkeleton: FC<SkeletonProps> = memo(({ n = 1 }) => (
  <>
    {[...new Array(n)].map((_, i) => (
      <ImageListItem key={i + Date.now()} sx={{ mb: 2 }} component={Paper} style={{ borderRadius: 4, width: '100%' }}>
        <Skeleton
          sx={{
            height: 240,
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
            borderBottomLeftRadius: 4,
            borderBottomRightRadius: 4,
          }}
          animation="wave"
          variant="rectangular"
        />
        <ImageListItemBar
          title={<Skeleton animation="wave" width="80%" style={{ marginBottom: 6 }} />}
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            borderRadius: '0 0 3px 3px',
          }}
          subtitle={<Skeleton animation="wave" width="40%" />}
          actionIcon={<ActionButtons />}
        />
      </ImageListItem>
    ))}
  </>
))

export const ArticleCardSkeleton: FC<SkeletonProps> = memo(({ n = 1 }) => (
  <>
    {[...new Array(n)].map((_, i) => (
      <Card key={i + Date.now()} sx={{ mb: 2 }}>
        <CardHeader
          avatar={<Skeleton animation="wave" variant="circular" width={40} height={40} />}
          title={<Skeleton animation="wave" variant="text" width="80%" />}
          subheader={<Skeleton animation="wave" variant="text" width="50%" />}
        />
        {i === 4 && (
          <Skeleton
            sx={{
              height: 140,
            }}
            animation="wave"
            variant="rectangular"
          />
        )}
        {i % 2 === 0 && (
          <CardContent sx={{ pb: 0, ...(i !== 4 ? { pt: 0 } : {}) }}>
            <Skeleton animation="wave" variant="text" width="45%" />
          </CardContent>
        )}
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <ActionButtons style={{ marginRight: 8, marginLeft: 0 }} />
        </CardActions>
      </Card>
    ))}
  </>
))

export const TagsSkeleton: FC = memo(() => (
  <>
    {[54, 55, 62, 34, 42, 35, 46, 75, 76].map((n) => (
      <Grid item key={'tags' + n}>
        <Chip size="small" variant="filled" label={<Skeleton animation="wave" variant="text" width={n} />} />
      </Grid>
    ))}
  </>
))

export const FeedsSkeleton: FC<SkeletonProps> = memo(({ n = 1, isMobile = false }) => (
  <>
    {[...new Array(n)].map((_, i, feeds) => (
      <Fragment key={i + Date.now()}>
        <ListItem>
          <ListItemAvatar>
            <Skeleton animation="wave" variant="circular" width={40} height={40} />
          </ListItemAvatar>
          <ListItemText
            primary={<Skeleton animation="wave" width={100} style={{ marginBottom: 6 }} />}
            secondary={
              <>
                {isMobile && <Skeleton animation="wave" width="90%" />}
                <Skeleton animation="wave" width="60%" />
              </>
            }
          />
          <Skeleton animation="wave" width={36} style={{ marginRight: 4 }} />
        </ListItem>
        {i < feeds.length - 1 && <Divider variant="inset" component="li" style={{ listStyleType: 'none' }} />}
      </Fragment>
    ))}
  </>
))
