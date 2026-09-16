import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
    // Breakpoints tuned for a photography site: large hero widths matter more
    // than the default small end of the scale.
    deviceSizes: [420, 640, 828, 1080, 1280, 1600, 1920, 2560, 3200],
    imageSizes: [180, 240, 320, 400],
  },
};

export default nextConfig;
