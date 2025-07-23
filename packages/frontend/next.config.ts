/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["en", "pt"],
    defaultLocale: "pt",
  },

  output: "standalone",

  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },
};
import path from "path";
module.exports = {
  turbopack: {
    root: path.join(__dirname, ".."),
  },
};

module.exports = nextConfig;
