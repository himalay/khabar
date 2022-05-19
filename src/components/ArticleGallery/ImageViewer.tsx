import ErrorBoundary from './ErrorBoundary'
import { Article } from './types'
import RefreshIcon from '@mui/icons-material/Refresh'
import ZoomInIcon from '@mui/icons-material/ZoomIn'
import ZoomOutIcon from '@mui/icons-material/ZoomOut'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import { FC } from 'react'
import { isDesktop, isMobile, useMobileOrientation } from 'react-device-detect'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'

interface ImageViewerProps {
  article: Article
}

const ImageViewer: FC<ImageViewerProps> = ({ article }) => {
  const { isLandscape } = useMobileOrientation()

  return (
    <ErrorBoundary>
      <TransformWrapper centerOnInit minScale={isMobile ? 1 : 0.5} maxScale={4}>
        {({ resetTransform, zoomIn, zoomOut }) => (
          <>
            {isDesktop && (
              <ButtonGroup color="secondary" style={{ position: 'fixed', top: 16, right: 16, zIndex: 2 }} size="small">
                <Button color="inherit" onClick={() => zoomIn()}>
                  <ZoomInIcon />
                </Button>
                <Button color="inherit" onClick={() => zoomOut()}>
                  <ZoomOutIcon />
                </Button>
                <Button color="inherit" onClick={() => resetTransform()}>
                  <RefreshIcon />
                </Button>
              </ButtonGroup>
            )}
            <TransformComponent wrapperStyle={{ width: '100%', height: '100%' }}>
              <img
                onLoad={() => {
                  resetTransform()
                  if (isDesktop) zoomOut()
                }}
                src={article?.image.big}
                style={isLandscape ? { height: '100%' } : { width: '100%' }}
              />
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </ErrorBoundary>
  )
}

export default ImageViewer
