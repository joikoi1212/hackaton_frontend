const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  fallbacks: {
    document: "/offline.html",
  },
  buildExcludes: [/.*dynamic-css-manifest.json$/, /.*\.map$/], // 🔹 Excluir ficheiros problemáticos
});

module.exports = withPWA({
  reactStrictMode: true,
  experimental: {
    turbo: {
      enabled: false,
    },
  },
});

