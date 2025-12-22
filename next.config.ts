import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
      },
      {
        protocol: "https",
        hostname: "image.tmdb.org",
      },
      {
        protocol: "http",
        hostname: "books.google.com",
      },
      {
        protocol: "https",
        hostname: "favory.s3.ap-northeast-2.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
