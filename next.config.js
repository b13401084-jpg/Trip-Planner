/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'api.example.com'],
  },
  env: {
    NEXT_PUBLIC_APP_NAME: 'Trip Planner',
  },
};

module.exports = nextConfig;
