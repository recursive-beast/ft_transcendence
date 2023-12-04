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
        ],
      },
}

module.exports = nextConfig
