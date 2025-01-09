import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',    // appディレクトリ内のファイルを指定
    './src/**/*.{js,ts,jsx,tsx}',    // srcディレクトリ内のファイルを指定
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
