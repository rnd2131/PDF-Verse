const sitemap = require("nextjs-sitemap-generator");
const withPWA = require("next-pwa");

sitemap({
  baseUrl: "https://localpdf.tech",
  pagesDirectory: __dirname + "./",
  targetDirectory: "./",
  ignoreIndexFiles: true,
});

// module.exports = withPWA({
//   experimental: {
//     optimizeFonts: true,
//     optimizeImages: true,
//   },
//   pwa: {
//     dest: "./public",
//   },
// });

module.exports = {
  experimental: {
    optimizeFonts: true,
    optimizeImages: true,
  },
  pwa: {
    dest: "./public",
  },
};
