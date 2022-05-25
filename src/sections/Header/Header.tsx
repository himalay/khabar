import Meta from '@/components/Meta'
import { FlexBox } from '@/components/styled'
import { title } from '@/config'
import routes from '@/routes'
import useTheme from '@/store/theme'
import ThemeIcon from '@mui/icons-material/InvertColors'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import AppBar from '@mui/material/AppBar'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import SvgIcon from '@mui/material/SvgIcon'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import { Box } from '@mui/system'
import { cloneElement, memo, MouseEvent, ReactElement, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

interface Props {
  children: ReactElement
}

function ElevationScroll({ children }: Props) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  })

  return cloneElement(children, {
    elevation: trigger ? 4 : 0,
  })
}
function Header() {
  const [, themeActions] = useTheme()
  const location = useLocation()
  const [currentRoute, setCurrentRoute] = useState<typeof routes[0]>()
  const [anchorElUser, setAnchorElUser] = useState<HTMLElement>()
  const navigate = useNavigate()

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(undefined)
  }

  const handleNavigate = (route: string, isUrl?: boolean) => () => {
    handleCloseUserMenu()
    if (isUrl) {
      window.open(route, '_blank')
    } else {
      navigate(route)
    }
  }

  useEffect(() => {
    const [, path] = location.pathname.split('/')
    if (path) {
      setCurrentRoute(Object.values(routes).find((x) => ['/' + path, '*'].includes(x.path)))
    } else {
      setCurrentRoute(undefined)
    }
  }, [location.pathname])

  return (
    <>
      <Meta title={currentRoute?.title || routes[0].title} />
      <ElevationScroll>
        <AppBar>
          <Toolbar>
            {!currentRoute && (
              <>
                <SvgIcon viewBox="0 0 86.77 86.77" sx={{ mr: 1.5, h: 24 }}>
                  <path d="M20.09 30.42l-6.1 3.53v18.87l58.8 33.95V60.85z" fill="#ef8769" />
                  <path d="M72.79 0l-58.8 33.95v18.87l6.1 3.53 52.7-30.43z" fill="#f4b691" />
                </SvgIcon>
                <Typography variant="h6" color="inherit" noWrap sx={{ flex: 1, textTransform: 'uppercase' }}>
                  {title}
                </Typography>
              </>
            )}
            {!!currentRoute && (
              <Breadcrumbs aria-label="breadcrumb" sx={{ flex: 1 }}>
                <Link
                  underline="hover"
                  sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                  color="inherit"
                  onClick={() => navigate(routes[0].path, { replace: currentRoute.path === '*' })}
                >
                  <Box component={routes[0].icon} sx={{ mr: 0.5 }} fontSize="inherit" />
                  {routes[0].title}
                </Link>
                <Typography sx={{ display: 'flex', alignItems: 'center' }} color="text.primary">
                  <Box component={currentRoute.icon} sx={{ mr: 0.5 }} fontSize="inherit" />
                  {currentRoute.title}
                </Typography>
              </Breadcrumbs>
            )}
            <FlexBox>
              <Tooltip title="Switch theme" arrow>
                <IconButton size="large" onClick={themeActions.toggle}>
                  <ThemeIcon style={{ color: 'whitesmoke' }} />
                </IconButton>
              </Tooltip>
              <Divider orientation="vertical" flexItem />
              <Tooltip title="Menu" arrow>
                <IconButton edge="end" size="large" onClick={handleOpenUserMenu}>
                  <MoreVertIcon style={{ color: 'whitesmoke' }} />
                </IconButton>
              </Tooltip>
            </FlexBox>
          </Toolbar>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={handleNavigate('/manage-feeds')}>
              <Typography>Manage Feeds</Typography>
            </MenuItem>
            <MenuItem onClick={handleNavigate('/reorder-feeds')}>
              <Typography>Reorder Feeds</Typography>
            </MenuItem>
            <MenuItem onClick={handleNavigate('https://github.com/himalay/khabar', true)}>
              <Typography>GitHub</Typography>
            </MenuItem>
          </Menu>
        </AppBar>
      </ElevationScroll>
    </>
  )
}

export default memo(Header)
