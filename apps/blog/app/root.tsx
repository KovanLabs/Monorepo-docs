import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Analytics } from "@vercel/analytics/react";
import "./styles.css";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <a
          href="/"
          style={{
            position: "fixed",
            top: 12,
            left: 12,
            zIndex: 9999,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 14px",
            backgroundColor: "#1e1e2f",
            color: "#fff",
            textDecoration: "none",
            fontSize: "0.8125rem",
            fontWeight: 500,
            border: "none",
            cursor: "pointer",
            borderRadius: 0,
          }}
        >
          ← Back to Admin
        </a>
        {children}
        <ScrollRestoration />
        <Scripts />
        <Analytics />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
