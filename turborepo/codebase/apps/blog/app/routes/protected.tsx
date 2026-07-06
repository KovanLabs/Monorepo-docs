import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireAuth } from "@repo/auth/remix";

export function loader({ request }: LoaderFunctionArgs) {
  const user = requireAuth(request, "/login");
  return { user };
}

export default function Protected() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: 24 }}>
      <h1>Protected Page</h1>
      <p>Welcome, <strong>{user.sub}</strong>! This content is only for authenticated users.</p>
    </div>
  );
}
