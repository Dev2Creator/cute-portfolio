import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";

import Home from "@/routes/index";
import { registerServiceWorker } from "@/lib/register-service-worker";
import "@/styles.css";

registerServiceWorker();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Home />
    <Toaster theme="dark" position="bottom-right" />
  </StrictMode>,
);
