import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const root = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig(({ command }) => ({
  plugins: [viteSingleFile()],
  build: {
    cssMinify: true,
    minify: "esbuild",
    rollupOptions: {
      // Dev: both pages. Build: portfolio only — styleguide stays out of dist/.
      input:
        command === "serve"
          ? {
              main: resolve(root, "index.html"),
              styleguide: resolve(root, "styleguide.html"),
            }
          : resolve(root, "index.html"),
    },
  },
}));
