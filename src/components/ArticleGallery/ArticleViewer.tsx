import './articleView.css'
import { ArticleContent } from './types'
import Container from '@mui/material/Container'
import { FC, useEffect } from 'react'

interface ArticleViewerProps {
  articleContent: ArticleContent
}

const ArticleViewer: FC<ArticleViewerProps> = ({ articleContent }) => {
  useEffect(() => {
    if (!document.querySelector('[href*="highlight.js"]')) {
      const theme = matchMedia('(prefers-color-scheme: dark)').matches ? '' : '-night'
      const style = document.createElement('link')
      style.href = `//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/base16/tomorrow${theme}.min.css`
      style.type = 'text/css'
      style.rel = 'stylesheet'
      document.head.append(style)
    }

    if (!document.querySelector('[src*="highlight.js"]')) {
      const script = document.createElement('script')
      script.src = '//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/highlight.min.js'
      script.type = 'text/javascript'
      document.head.append(script)
    }

    let i = 0
    const hlInterval = setInterval(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { hljs } = window as any
      if (hljs) {
        document.querySelectorAll('article pre,code').forEach((el) => {
          hljs.highlightElement(el)
        })
        clearInterval(hlInterval)
      }
      if (i > 50) {
        clearInterval(hlInterval)
      }
      i++
    }, 100)
  }, [articleContent.data?.html])

  return (
    <Container maxWidth="md">
      <article dangerouslySetInnerHTML={{ __html: articleContent.data?.html }} />
    </Container>
  )
}

export default ArticleViewer
