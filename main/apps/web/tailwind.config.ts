import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        aim: {
          ink: '#17201b',
          field: '#eff4ef',
          line: '#c9d6cc',
          action: '#0f766e',
          alert: '#b45309'
        }
      }
    }
  },
  plugins: []
};

export default config;
