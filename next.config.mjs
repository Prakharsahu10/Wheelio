/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsHmrCache: false,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "issqezywrfqqqcuriwme.supabase.co",
      },
    ],
  },
};

export default nextConfig;
