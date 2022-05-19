export interface Tag {
  _id: string
  name: string
  displayName: string
  stats: { popularity: number }
  children?: Tag[]
  approved: boolean
  type: string
  root?: boolean
}
