import routes from '..'
import { getPageHeight, getTopSpacing } from './utils'
import Box from '@mui/material/Box'
import { Route, Routes } from 'react-router-dom'

function Pages() {
  return (
    <Box sx={{ height: getPageHeight, marginTop: (t) => getTopSpacing(t) + 'px' }}>
      <Routes>
        {Object.values(routes).map(({ path, component: Component }) => {
          return <Route key={path} path={path} element={<Component />} />
        })}
      </Routes>
    </Box>
  )
}

export default Pages
