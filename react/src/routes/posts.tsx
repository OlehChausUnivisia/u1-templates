import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { postsQueryOptions } from '#/api/posts.queries'

export const Route = createFileRoute('/posts')({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(postsQueryOptions()),
  pendingComponent: PendingComponent,
  component: PostsComponent,
})

function PendingComponent() {
  return <div className="p-8">Loading posts…</div>
}

function PostsComponent() {
  const { data: posts } = useSuspenseQuery(postsQueryOptions())

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">Posts</h1>
      <ul className="mt-4 space-y-4">
        {posts.map((post) => (
          <li key={post.id}>
            <h2 className="font-semibold">{post.title}</h2>
            <p className="text-sm text-gray-600">{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
