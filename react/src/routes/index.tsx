import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">Welcome to U1 React Template</h1>
      <p className="mt-4 text-lg">
        Edit <code>src/routes/index.tsx</code> to get started.
      </p>
      <p className="mt-4">
        <Link to="/account" className="underline">
          Account
        </Link>
      </p>
      <p className="mt-4">
        <Link to="/posts" className="underline">
          Posts
        </Link>
      </p>
    </div>
  )
}
