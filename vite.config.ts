import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? "/cute-portfolio/" : "/",
  plugins: [tsconfigPaths()],
});
