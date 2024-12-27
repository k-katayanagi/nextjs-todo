import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack(config) {
    // 'src'ディレクトリをモジュールの解決の基準に追加
    config.resolve.modules.push(__dirname + '/src');
    return config;
  },
};

export default nextConfig;
