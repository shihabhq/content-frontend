import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "ik.imagekit.io",
          pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "nagorikshebabd.org",
          pathname: "/**",
        },
      ],
    },
};

export default nextConfig;
