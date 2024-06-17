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
            hostname: 'profileimagebucketeugene.s3.eu-north-1.amazonaws.com',
            // pathname: '/_next/server/',
          },
        ],
      },
};

export default nextConfig;
