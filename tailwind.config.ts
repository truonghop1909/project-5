import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/(pages)/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1280px',
      '2xl': '1280px',
    },

    extend: {
      colors: {
        primary: '#003459',
        secondary: '#00171F',
        light: '#667479'
      }
    },
  },
  plugins: [],
};
export default config;
