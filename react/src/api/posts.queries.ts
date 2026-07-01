import { queryOptions } from '@tanstack/react-query'
import { fetchPosts } from './posts'
import { postsKeys } from './posts.keys'

export const postsQueryOptions = () =>
  queryOptions({
    queryKey: postsKeys.lists(),
    queryFn: ({ signal }) => fetchPosts({ signal }),
  })
