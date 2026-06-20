import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";

import Home from "@/routes/index";
import "@/styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Home />
    <Toaster theme="dark" position="bottom-right" />
  </StrictMode>,
);
