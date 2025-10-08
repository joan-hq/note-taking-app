import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import * as path from "path";

const rootPath = path.resolve(__dirname, "node_modules");

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      // Force all imports of @emotion/react to use one location
      {
        find: /^@emotion\/react$/,
        replacement: path.resolve(rootPath, "@emotion/react"),
      },
      // Force all imports of @emotion/styled to use one location
      {
        find: /^@emotion\/styled$/,
        replacement: path.resolve(rootPath, "@emotion/styled"),
      },
    ],
  },
});
