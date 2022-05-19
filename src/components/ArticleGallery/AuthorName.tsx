import { ArticleSource } from './types'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { FC } from 'react'

interface AuthorNameProps {
  source: ArticleSource
}

const AuthorName: FC<AuthorNameProps> = ({ source }) => {
  const name = <strong>{source.authorName || source.username || source.name}</strong>

  if (!source.authorUrl && source.name.startsWith('reddit')) {
    source.authorUrl = `https://reddit.com${source.authorName}`
  }

  if (source.authorUrl) {
    return (
      <Link href={source.authorUrl} color="secondary" target="_blank" underline="hover">
        {name}
      </Link>
    )
  }

  return (
    <Typography component="span" style={{ fontSize: 14 }}>
      {name}
    </Typography>
  )
}

export default AuthorName
