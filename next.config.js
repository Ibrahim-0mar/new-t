// eslint-disable-next-line @typescript-eslint/no-var-requires
const redirects = require('./nextConfig/redirects.config');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const headers = require('./nextConfig/headers.config');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const images = require('./nextConfig/images.config');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();

/* eslint-disable */
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images,
  headers,
  redirects,
  logging: {
    fetches: {
      fullUrl: true,
      hmrRefreshes: true,
    },
  },
  optimizeFonts: true,
  reactStrictMode: false,
};

module.exports = withNextIntl(nextConfig);
