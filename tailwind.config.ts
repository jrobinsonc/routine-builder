import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'media', // or false or 'class'
  content: [
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
  ],
  theme: {
    colors: {
      solitude: '#F1F2F5',
      peacoat: '#3B3D49',
      marengo: '#4D4F5B',
      orange: '#FCA311',
      white: '#ffffff',
      muted: '#8A8A8D',
    },
  },
  plugins: [],
};

export default config;
