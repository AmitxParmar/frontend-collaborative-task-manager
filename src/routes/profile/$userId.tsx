import { createFileRoute, useParams } from '@tanstack/react-router'

export const Route = createFileRoute('/profile/$userId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { userId } = useParams({ from: "/profile/$userId" });
  return <div>Hello "/profile/$userId"!{userId}</div>
}
