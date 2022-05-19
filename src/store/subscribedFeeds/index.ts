import { Feed, Actions } from './types'
import { useCallback, useMemo } from 'react'
import { atom, useRecoilState } from 'recoil'

const SUBSCRIBED_FEEDS_STATE = 'subscribedFeedsState'

const getSubscribedFeedsInitialState = () => {
  try {
    return JSON.parse(localStorage.getItem(SUBSCRIBED_FEEDS_STATE) || '[]')
  } catch {
    return []
  }
}

const setSubscribedFeedsPersistentState = (feeds: Feed[]) => {
  try {
    localStorage.setItem(SUBSCRIBED_FEEDS_STATE, JSON.stringify(feeds))
  } catch {}
}

const subscribedFeedsState = atom<Feed[]>({
  key: SUBSCRIBED_FEEDS_STATE,
  default: getSubscribedFeedsInitialState(),
})

function useSubscribedFeeds(): [Feed[], Actions] {
  const [subscribedFeeds, setSubscribedFeeds] = useRecoilState(subscribedFeedsState)

  const subscribe = useCallback(
    (feed: Feed) =>
      setSubscribedFeeds((feeds) => {
        const state = [...feeds, feed]
        setSubscribedFeedsPersistentState(state)
        return state
      }),
    [setSubscribedFeeds],
  )

  const reorder = useCallback(
    (feeds: Feed[]) => {
      setSubscribedFeedsPersistentState(feeds)
      setSubscribedFeeds(feeds)
    },
    [setSubscribedFeeds],
  )

  const unsubscribe = useCallback(
    (feed: Feed) =>
      setSubscribedFeeds((feeds) => {
        const state = feeds.filter((x) => x.id !== feed.id)
        setSubscribedFeedsPersistentState(state)
        return state
      }),
    [setSubscribedFeeds],
  )

  const actions = useMemo(() => ({ subscribe, reorder, unsubscribe }), [subscribe, reorder, unsubscribe])

  return [subscribedFeeds, actions]
}

export default useSubscribedFeeds
