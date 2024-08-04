import type { Config } from "tailwindcss";

const config: Config = {
  plugins: [],
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    colors: {
      'transparent': 'transparent',
      'off-white': '#FBFBFA',
      'dark' : '#1f1f1f'
    },
    extend: {
      backgroundImage: {

      },
    },
  },
};
export default config;
