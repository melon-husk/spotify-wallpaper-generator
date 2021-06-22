const { resolve } = require("path");
/**
 * @type {import('vite').UserConfig}
 */

const config = {
  server: {
    host: "0.0.0.0",
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        nested: resolve(__dirname, "login.html"),
      },
    },
  },
};

export default config;
