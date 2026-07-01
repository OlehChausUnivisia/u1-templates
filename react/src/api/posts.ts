import ky from 'ky'

const client = ky.create({
  baseUrl: 'https://jsonplaceholder.typicode.com/',
})

export interface Post {
  id: number
  userId: number
  title: string
  body: string
}

export async function fetchPosts({
  signal,
}: { signal?: AbortSignal } = {}): Promise<Array<Post>> {
  return client.get('posts', { signal }).json<Array<Post>>()
}
