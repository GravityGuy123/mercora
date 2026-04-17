import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Django backend media
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // Unsplash secondary domain (needed!)
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },

      // Cloudinary
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },

      // Cloudinary
      {
        protocol: "https",
        hostname: "your-project-id.supabase.co",
      },

      // Render
      {
        protocol: "https",
        hostname: "course-pilot-backend.onrender.com",
        pathname: "/media/**",
      },
    ],
  },
};

export default nextConfig;
