import type { SvgIconProps } from '@mui/material/SvgIcon'
import { FC } from 'react'
import { PathRouteProps } from 'react-router-dom'

enum Pages {
  Home,
  ManageFeeds,
  ReorderFeeds,
  NotFound,
}

type PathRouteCustomProps = {
  title?: string
  component: FC
  icon?: FC<SvgIconProps>
}

type Routes = Record<Pages, PathRouteProps & PathRouteCustomProps>

export type { Routes }
export { Pages }
