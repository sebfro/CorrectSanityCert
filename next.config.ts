import type { NextConfig } from "next";

/** type {import('next').NextConfig} */
const nextConfig: NextConfig = {
    images: {
        domains: ["cdn.sanity.io", "via.placeholder.com"]
    }
  /* config options here */
};

export default nextConfig;
