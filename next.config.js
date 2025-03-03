module.exports = {
  reactStrictMode: true,
  experimental: {
    turbo: {
      rules: {
        "*.mdx": ["mdx-loader"], // Updated from "loaders" to "rules"
      },
    },
  },
};
