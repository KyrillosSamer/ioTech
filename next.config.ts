/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tranquil-positivity-9ec86ca654.media.strapiapp.com',
        port: '',
        pathname: '/**', 
      },
    ],
  },
};

module.exports = nextConfig;
