export interface ArticleSource {
  name: string
  id: string
  authorUrl: string
  authorName: string
  userId: string
  sourceUrl: string
  targetUrl: string
  likesCount: number
  createdAt: string
  originalFeed: string
  absoluteUrl: string
  commentsCount: number
  viewsCount: number
  username: string
}

export interface Article {
  _id: string
  source: ArticleSource
  image: {
    normal: string
    big: string
    small: string
  }
  flags: {
    iframe: {
      checked: boolean
      supported: boolean
    }
    promoted: boolean
  }
  title: string
  description: string
  url: {
    panda: string
    social: string
    target: string
  }
  uniqueid: string
  isGallery: boolean
}

export interface ArticleContentData {
  html: string
  title: string
  pageUrl: string
  icon: string
  author?: string
  authorUrl?: string
  siteName: string
  date: number
}

export interface ArticleContent {
  _id: string
  url: string
  data: ArticleContentData
  extracted: Date
  sourceName: string
}
