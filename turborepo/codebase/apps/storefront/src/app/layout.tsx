import "./styles.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
      </body>
    </html>
  );
}
