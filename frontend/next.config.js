/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'cloudflare-ipfs.com',
          },
          {
            protocol: 'https',
            hostname: 'cdn.intra.42.fr',
          },
          {
            protocol: 'http',
            hostname: 'localhost',
          },
        ],
      },
}

module.exports = nextConfig
