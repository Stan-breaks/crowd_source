import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        // Add any other HTML entry points here
      },
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "main.css") {
            return "assets/main.css";
          }
          if (/\.(png|jpe?g|gif|svg)$/.test(assetInfo.name)) {
            return "assets/[name]-[hash][extname]";
          }
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
});
