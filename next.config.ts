import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: process.env.NODE_ENV === 'production' ? '/colorful_base64' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/colorful_base64/' : ''
};

export default nextConfig;
