// vite.config.ts
import { defineConfig } from "file:///home/bizarf/repos/The%20Odin%20Project/Javascript/odin-keep-clone/node_modules/vite/dist/node/index.js";
import react from "file:///home/bizarf/repos/The%20Odin%20Project/Javascript/odin-keep-clone/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  base: "/odin-keep-clone/",
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./tests/setup.js"
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9iaXphcmYvcmVwb3MvVGhlIE9kaW4gUHJvamVjdC9KYXZhc2NyaXB0L29kaW4ta2VlcC1jbG9uZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvYml6YXJmL3JlcG9zL1RoZSBPZGluIFByb2plY3QvSmF2YXNjcmlwdC9vZGluLWtlZXAtY2xvbmUvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvYml6YXJmL3JlcG9zL1RoZSUyME9kaW4lMjBQcm9qZWN0L0phdmFzY3JpcHQvb2Rpbi1rZWVwLWNsb25lL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgICBiYXNlOiBcIi9vZGluLWtlZXAtY2xvbmUvXCIsXG4gICAgcGx1Z2luczogW3JlYWN0KCldLFxuICAgIHRlc3Q6IHtcbiAgICAgICAgZW52aXJvbm1lbnQ6IFwianNkb21cIixcbiAgICAgICAgZ2xvYmFsczogdHJ1ZSxcbiAgICAgICAgc2V0dXBGaWxlczogXCIuL3Rlc3RzL3NldHVwLmpzXCIsXG4gICAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFnWCxTQUFTLG9CQUFvQjtBQUM3WSxPQUFPLFdBQVc7QUFJbEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDeEIsTUFBTTtBQUFBLEVBQ04sU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUFBLEVBQ2pCLE1BQU07QUFBQSxJQUNGLGFBQWE7QUFBQSxJQUNiLFNBQVM7QUFBQSxJQUNULFlBQVk7QUFBQSxFQUNoQjtBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
