/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'localhost:3000',
          },
          {
            protocol: 'https',
            hostname: 'https://chat-room-chi-seven.vercel.app/',
            // pathname: '/_next/server/',
          },
        ],
      },
};

export default nextConfig;
