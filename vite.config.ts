import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? "/cute-portfolio/" : "/",
  plugins: [tsconfigPaths()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("react-dom") || id.includes("scheduler")) {
              return "vendor-react";
            }
            if (id.includes("framer-motion")) {
              return "vendor-framer";
            }
            if (id.includes("@radix-ui")) {
              return "vendor-radix";
            }
            if (id.includes("recharts")) {
              return "vendor-recharts";
            }
            return "vendor";
          }
        },
      },
    },
  },
});
