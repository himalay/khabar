import { Pages, Routes } from './types'
import asyncComponentLoader from '@/utils/loader'
import HeartBrokenIcon from '@mui/icons-material/HeartBroken'
import HomeIcon from '@mui/icons-material/Home'
import ReorderIcon from '@mui/icons-material/Reorder'
import RssFeedIcon from '@mui/icons-material/RssFeed'

const routes: Routes = {
  [Pages.Home]: {
    component: asyncComponentLoader(() => import('@/pages/Home')),
    path: '/',
    title: 'Home',
    icon: HomeIcon,
  },
  [Pages.ManageFeeds]: {
    component: asyncComponentLoader(() => import('@/pages/ManageFeeds')),
    path: '/manage-feeds',
    title: 'Manage Feeds',
    icon: RssFeedIcon,
  },
  [Pages.ReorderFeeds]: {
    component: asyncComponentLoader(() => import('@/pages/ReorderFeeds')),
    path: '/reorder-feeds',
    title: 'Reorder Feeds',
    icon: ReorderIcon,
  },
  [Pages.NotFound]: {
    component: asyncComponentLoader(() => import('@/pages/NotFound')),
    path: '*',
    title: 'Not Found',
    icon: HeartBrokenIcon,
  },
}

export default routes
