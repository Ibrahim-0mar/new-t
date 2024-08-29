/**
 * images configuration for Next.js.
 *
 * @type {import('next').NextConfig['images']}
 */

//Note: Whenever changes are made to this file, you need to restart the project for the Next.js configuration to recognize the updates.
const images = {
  remotePatterns: [
    { protocol: 'https', hostname: 'content.travolic.com' },
    { protocol: 'https', hostname: 'storage.googleapis.com' },
    { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
    { protocol: 'https', hostname: 'd29u10q7qlh006.cloudfront.net' },
    { protocol: 'https', hostname: 'kiwitaxistatic-a.akamaihd.net' },
    { protocol: 'https', hostname: 'static.mozio.com' },
    { protocol: 'https', hostname: 'images.kiwi.com' },
    { protocol: 'https', hostname: 'intui.travel' },
    { protocol: 'https', hostname: 'book.atobtransfer.com' },
    { protocol: 'https', hostname: 'cdn.airporttransfer.com' },
    { protocol: 'https', hostname: 'static.talixo.de' },
    { protocol: 'https', hostname: 'daytrip.imgix.net' },
    { protocol: 'http', hostname: 'pix8.agoda.net' },
    { protocol: 'https', hostname: 'd1lk4k9zl9klra.cloudfront.net' },
    { protocol: 'https', hostname: 'content.r9cdn.net' },
    { protocol: 'http', hostname: 'www.kayak.com' },
    { protocol: 'https', hostname: 'cdn77.aj2640.bid' },
  ],
  minimumCacheTTL: 2592000,
  deviceSizes: [320, 375, 414, 640, 768, 1024, 1440, 1920],
  imageSizes: [16, 32, 48, 64, 96, 128, 192, 256, 384],
  dangerouslyAllowSVG: true,
  contentDispositionType: 'attachment',
  contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  formats: ['image/avif', 'image/webp'],
};

module.exports = images;
