import React from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "@repo/auth/react";
import App from "./app";
import "./index.css";

const el = document.getElementById("root");
if (el) {
  const root = createRoot(el);
  root.render(
    <React.StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </React.StrictMode>
  );
} else {
  throw new Error("Could not find root element");
}
