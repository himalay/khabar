import { Search, SearchIconWrapper, StyledInputBase } from './styled'
import { Tag } from './types'
import api from '@/api'
import { FeedsSkeleton, TagsSkeleton } from '@/components/Skeletons'
import useNotifications from '@/store/notifications'
import useSubscribedFeeds from '@/store/subscribedFeeds'
import { Feed } from '@/store/subscribedFeeds/types'
import ClearIcon from '@mui/icons-material/Clear'
import SearchIcon from '@mui/icons-material/Search'
import Alert from '@mui/material/Alert'
import Avatar from '@mui/material/Avatar'
import Chip from '@mui/material/Chip'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import { ChangeEvent, Fragment, SetStateAction, useCallback, useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'

const getFeedsUrl = ({ _id }: Tag) => `/v4/feeds/query?category=${_id.split('$').pop()}&limit=100&page=1`

function Feeds() {
  const [, notificationsActions] = useNotifications()
  const [tagsLoading, setTagsLoading] = useState(false)
  const [tags, setTags] = useState<Tag[]>([])
  const [tag, setTag] = useState<Tag>()
  const [subTag, setSubTag] = useState<Tag>()
  const [feedsLoading, setFeedsLoading] = useState(false)
  const [feeds, setFeeds] = useState<Feed[]>([])
  const [subscribedFeeds, subscribedFeedsAction] = useSubscribedFeeds()
  const [subscribedFeedIds, setSubscribedFeedIds] = useState<string[]>(subscribedFeeds.map((x) => x.id))
  const [searchQuery, setSearchQuery] = useState<string>('')

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const tagClickHandler = (t: Tag) => {
    setTag(t)
    setSearchQuery('')
  }

  const subTagClickHandler = (t: Tag) => {
    setSubTag(t)
    setSearchQuery('')
  }

  const handleFeedToggle = useCallback(
    (feed: Feed) => (_: ChangeEvent<HTMLInputElement>, checked: boolean) => {
      if (checked) {
        subscribedFeedsAction.subscribe(feed)
        setSubscribedFeedIds([...subscribedFeedIds, feed.id])
      } else {
        subscribedFeedsAction.unsubscribe(feed)
        setSubscribedFeedIds(subscribedFeedIds.filter((x) => x !== feed.id))
      }
    },
    [subscribedFeedIds, subscribedFeedsAction],
  )

  /* eslint-disable comma-spacing */
  const makeApiCall = useCallback(
    <T,>(
      loadingSetter: (value: SetStateAction<boolean>) => void,
      url: string,
      stateSetter: (value: SetStateAction<T>) => void,
      processor?: (data: T) => T,
    ) => {
      loadingSetter(true)
      api
        .get<T>(url)
        .then(({ data }) => stateSetter(processor ? processor(data) : data))
        .catch((e: Error) => {
          console.error(e)
          notificationsActions.push({
            options: {
              autoHideDuration: 4500,
              content: <Alert severity="error">{e.message}</Alert>,
            },
          })
        })
        .finally(() => setTimeout(() => loadingSetter(false), 1000))
    },
    [notificationsActions],
  )

  useEffect(() => {
    if (tags.length && !tag) {
      setTag(tags[0])
    } else {
      const url = '/v1/tags'
      makeApiCall(setTagsLoading, url, setTags, (data) => data.sort((a, b) => a.stats.popularity - b.stats.popularity))
    }
  }, [tags.length])

  useEffect(() => {
    if (tag?._id && tag.children?.length) {
      setSubTag(tag.children[0])
    } else {
      setSubTag(undefined)
    }
  }, [tag?._id])

  useEffect(() => {
    let url = ''
    if (searchQuery.length > 2) {
      url = `/v4/feeds/query?limit=100&page=1&q=${searchQuery}`
    } else if (subTag?._id && (!feeds.length || !feeds[0].categories.includes(subTag._id))) {
      url = getFeedsUrl(subTag)
    } else if (tag?._id && (!feeds.length || !feeds[0].categories.includes(tag._id))) {
      url = getFeedsUrl(tag)
    }

    if (url) {
      makeApiCall(setFeedsLoading, url, setFeeds)
    }
  }, [tag?._id, subTag?._id, searchQuery, feeds.length])

  return (
    <Container sx={{ my: 2 }}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Type website name, topic, or URL"
          inputProps={{ 'aria-label': 'search' }}
          onChange={searchHandler}
          value={searchQuery}
        />
        {!!searchQuery && (
          <IconButton color="inherit" onClick={() => setSearchQuery('')} style={{ position: 'absolute', right: 0 }}>
            <ClearIcon />
          </IconButton>
        )}
      </Search>

      <Grid container spacing={1} justifyContent="center">
        {tagsLoading && <TagsSkeleton />}
        {!tagsLoading &&
          tags.map((t) => (
            <Grid item key={t._id}>
              <Chip
                size="small"
                color="primary"
                variant={tag?._id === t._id ? 'filled' : 'outlined'}
                onClick={() => tagClickHandler(t)}
                label={t.displayName}
              />
            </Grid>
          ))}
      </Grid>

      {!!tag?.children?.length && (
        <>
          <Typography variant="h5" gutterBottom component="div" align="center" color="" style={{ marginTop: 16 }}>
            Be more specific
          </Typography>
          <Grid container spacing={1} justifyContent="center">
            {tag.children.map((t) => (
              <Grid item key={t._id}>
                <Chip
                  size="small"
                  color="secondary"
                  variant={subTag?._id === t._id ? 'filled' : 'outlined'}
                  onClick={() => subTagClickHandler(t)}
                  label={t.displayName}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {feedsLoading && <FeedsSkeleton n={12} isMobile={isMobile} />}
      {!feedsLoading &&
        feeds.map((x, i, a) => (
          <Fragment key={x.id}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <img alt={x.title} src={x.icon} style={{ height: 40 }} loading="lazy" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={x.title} secondary={x.description} />
              <Switch edge="end" onChange={handleFeedToggle(x)} checked={subscribedFeedIds.includes(x.id)} />
            </ListItem>
            {i < a.length - 1 && <Divider variant="inset" component="li" style={{ listStyleType: 'none' }} />}
          </Fragment>
        ))}
    </Container>
  )
}

export default Feeds
