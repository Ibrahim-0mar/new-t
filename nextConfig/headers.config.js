/**
 * Headers configuration for Next.js.
 *
 * @type {import('next').NextConfig['headers']}
 */

//Note: Whenever changes are made to this file, you need to restart the project for the Next.js configuration to recognize the updates.
const headers = async () => [
  {
    source: '/flights/search/', // Path for which headers are applied
    headers: [
      {
        key: 'Cache-Control', // Header key
        value: 'no-store', // Header value to prevent caching
      },
    ],
  },
];

module.exports = headers;
