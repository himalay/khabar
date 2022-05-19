import api from '@/api'
import ArticleCard from '@/components/ArticleGallery/ArticleCard'
import ImageCard from '@/components/ArticleGallery/ImageCard'
import { Article } from '@/components/ArticleGallery/types'
import { ArticleCardSkeleton, ImageCardSkeleton } from '@/components/Skeletons'
import useNotifications from '@/store/notifications'
import useSubscribedFeeds from '@/store/subscribedFeeds'
import { LinearProgress, Typography, useTheme } from '@mui/material'
import Alert from '@mui/material/Alert'
import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import ImageList from '@mui/material/ImageList'
import Slide from '@mui/material/Slide'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Toolbar from '@mui/material/Toolbar'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import { useCallback, useEffect, useState } from 'react'
import { isTablet, isMobile } from 'react-device-detect'
import { useNavigate } from 'react-router-dom'
import SwipeableViews from 'react-swipeable-views'

function Home() {
  const [subscribedFeeds] = useSubscribedFeeds()
  const [loadingArticles, setLoadingArticles] = useState(false)
  const [articles, setArticles] = useState<Article[]>([])
  const [feedIndex, setFeedIndex] = useState(0)
  const trigger = useScrollTrigger()
  const theme = useTheme()
  const [showCards, setShowCards] = useState(false)
  const [, notificationsActions] = useNotifications()
  const navigate = useNavigate()

  const handleTabChange = useCallback((_: unknown, newValue: number) => {
    setFeedIndex(newValue)
  }, [])

  const handleChangeIndex = useCallback((index: number) => {
    setFeedIndex(index)
  }, [])

  useEffect(() => {
    if (subscribedFeeds.length) {
      const sort = 'popular'
      const url = `/v4/articles?feeds=${subscribedFeeds[feedIndex].id}&limit=30&page=1&sort=${sort}`

      setLoadingArticles(true)
      setShowCards(false)
      api
        .get<Article[]>(url, { cache: { maxAge: 30 * 60 * 1000 } })
        .then(({ data }) => {
          const isGallery =
            data.filter((a) => {
              if (a.image.normal && !a.description && !/(undefined|\.com|\.net)$/.test(a.image.normal)) {
                try {
                  // eslint-disable-next-line no-new
                  new URL(a.image.normal)
                  return true
                } catch {}
              }
              return false
            }).length === data.length
          setArticles(data.map((x) => ({ ...x, isGallery })))
          setTimeout(() => setShowCards(true), isGallery ? 1000 : 500)
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
        .finally(() => setLoadingArticles(false))
    }
  }, [subscribedFeeds.length, feedIndex, subscribedFeeds, notificationsActions])

  useEffect(() => {
    if (!subscribedFeeds.length) {
      navigate('/manage-feeds')
    }
  }, [navigate, subscribedFeeds.length])

  return (
    <>
      <Container sx={{ my: 2 }}>
        {loadingArticles && <LinearProgress />}
        <SwipeableViews
          index={feedIndex}
          onChangeIndex={handleChangeIndex}
          containerStyle={{ minHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)` }}
        >
          {subscribedFeeds.map((x, i) => (
            <div key={'tabpanel' + x.id} role="tabpanel" hidden={feedIndex !== i} id={`full-width-tabpanel-${i}`}>
              <Typography variant="h4" color="inherit" component="div" sx={{ mt: 1 }} gutterBottom noWrap>
                {x.title}
              </Typography>
              {feedIndex === i && !!articles.length && articles[0].source.name === x.name && (
                <ImageList variant="masonry" cols={isTablet ? 2 : isMobile ? 1 : 3} sx={{ mt: 0, mb: 0 }} gap={16}>
                  {!showCards && articles[0].isGallery && <ImageCardSkeleton n={isTablet ? 8 : isMobile ? 4 : 12} />}
                  {!showCards && !articles[0].isGallery && (
                    <ArticleCardSkeleton n={isTablet ? 15 : isMobile ? 5 : 20} />
                  )}
                  {articles.map((item) => {
                    if (item.isGallery) {
                      return <ImageCard key={item._id} hidden={!showCards} article={item} />
                    } else {
                      return <ArticleCard key={item._id} hidden={!showCards} article={item} />
                    }
                  })}
                </ImageList>
              )}
            </div>
          ))}
        </SwipeableViews>
      </Container>
      <Slide appear={false} direction="up" in={!trigger}>
        <AppBar color="secondary" position="fixed" sx={{ top: 'auto', bottom: 0 }}>
          <Toolbar style={{ padding: '0 16px' }}>
            <Tabs
              indicatorColor="primary"
              value={feedIndex}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons={false}
            >
              {subscribedFeeds.map((x) => (
                <Tab key={'tab' + x.id} icon={<img src={x.icon} style={{ height: 24 }} />} />
              ))}
            </Tabs>
          </Toolbar>
        </AppBar>
      </Slide>
    </>
  )
}

export default Home
