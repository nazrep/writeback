import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/jak-napisac-reklamacje", destination: "/blog/reklamacja-sklep-internetowy", permanent: true },
      { source: "/wzor-reklamacji", destination: "/blog/reklamacja-sklep-internetowy", permanent: true },
      { source: "/reklamacja-allegro", destination: "/blog/reklamacja-allegro", permanent: true },
      { source: "/en", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
