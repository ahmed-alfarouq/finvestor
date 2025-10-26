import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "plaid-merchant-logos.plaid.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "plaid-category-icons.plaid.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
