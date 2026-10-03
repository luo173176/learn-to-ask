import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // 全站主色统一用 primary，换主题色只改这一处
        primary: colors.indigo,
      },
    },
  },
  plugins: [],
};
