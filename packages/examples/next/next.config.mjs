/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: async () => [
    {
      source: "/api/skip/(.*)",
      destination: "/api/skip/handler",
    },
  ],
};

export default nextConfig;
