import useSubscribedFeeds from '@/store/subscribedFeeds'
import { Feed } from '@/store/subscribedFeeds/types'
import arrayMove from '@/utils/arrayMove'
import Avatar from '@mui/material/Avatar'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Switch from '@mui/material/Switch'
import { useState, FC } from 'react'
import SortableList, { SortableItem } from 'react-easy-sort'

const ReorderPage: FC = () => {
  const [subscribedFeeds, subscribedFeedsAction] = useSubscribedFeeds()
  const [subscribedFeedIds, setSubscribedFeedIds] = useState<string[]>(subscribedFeeds.map((x) => x.id))

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    subscribedFeedsAction.reorder(arrayMove(subscribedFeeds, oldIndex, newIndex))
  }

  const handleFeedToggle = (feed: Feed) => (_: unknown, checked: boolean) => {
    if (!checked) {
      setSubscribedFeedIds(subscribedFeedIds.filter((x) => x !== feed.id))
      setTimeout(() => {
        subscribedFeedsAction.unsubscribe(feed)
      }, 300)
    }
  }

  return (
    <Container sx={{ my: 2 }}>
      <SortableList onSortEnd={onSortEnd} draggedItemClassName="dragged">
        {subscribedFeeds.map((x, i) => (
          <SortableItem key={x.id}>
            <div style={{ cursor: 'grab', userSelect: 'none' }}>
              <ListItem component="div">
                <ListItemAvatar>
                  <Avatar>
                    <img alt={x.title} src={x.icon} style={{ height: 40 }} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={x.title} secondary={x.description} />
                <Switch edge="end" onChange={handleFeedToggle(x)} checked={subscribedFeedIds.includes(x.id)} />
              </ListItem>
              {i < subscribedFeedIds.length - 1 && <Divider variant="inset" />}
            </div>
          </SortableItem>
        ))}
      </SortableList>
    </Container>
  )
}

export default ReorderPage
