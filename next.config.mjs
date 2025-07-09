/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsHmrCache: false,
  },

  // Disable ESLint during builds if needed
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Suppress module resolution warnings during build
  webpack: (config, { isServer }) => {
    // Ignore module not found warnings for specific patterns
    config.ignoreWarnings = [
      /Module not found/,
      /Can't resolve/,
    ];

    return config;
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
