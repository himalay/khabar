export interface Feed {
  id: string
  title: string
  name: string
  type: string
  color: string
  description: string
  contentType: string
  icon: string
  subscribers: number
  paginationType: string
  flags: {
    latest: boolean
    popular: boolean
    display: {
      comments: boolean
      votes: boolean
      author: boolean
      views: boolean
    }
  }
  categories: string[]
  iconSVG: string
}

export type Actions = {
  subscribe: (feed: Feed) => void
  reorder: (feeds: Feed[]) => void
  unsubscribe: (feed: Feed) => void
}
