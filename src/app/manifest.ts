import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Travolic App',
    short_name: 'Travolic App',
    description:
      'Explore endless travel options, compare prices and save big on your next adventure! Find the cheapest flight tickets and easily book airport transfers.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/pwa-icons/app-icon-48x48.png',
        sizes: '48x48',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/pwa-icons/app-icon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/pwa-icons/app-icon-144x144.png',
        sizes: '144x144',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/pwa-icons/app-icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/pwa-icons/app-icon-256x256.png',
        sizes: '256x256',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/pwa-icons/app-icon-384x384.png',
        sizes: '384x384',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/pwa-icons/app-icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    categories: [
      'travel',
      'flights',
      'hotels',
      'car rental',
      'airport transfers',
    ],
    display_override: ['standalone'],
    orientation: 'portrait-primary',
    prefer_related_applications: true,
    related_applications: [
      {
        platform: 'play',
        url: 'https://play.google.com/store/apps/details?id=com.travolic.app',
        id: 'com.travolic.app',
      },
      {
        platform: 'ios',
        url: 'https://apps.apple.com/us/app/apple-store/id1665657440',
        id: '1665657440',
      },
      {
        platform: 'webapp',
        url: 'https://travolic.com',
      },
    ],
  };
}
