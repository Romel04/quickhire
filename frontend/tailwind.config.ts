import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B3FDD',
          50:  '#EEEEFF',
          100: '#DDDEFF',
          500: '#3B3FDD',
          600: '#2E32C4',
          700: '#2226AB',
        },
        accent: {
          DEFAULT: '#26A4FF',
        },
        surface: '#F8F8FD',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-pattern': "url(\"data:image/svg+xml,%3Csvg width='600' height='500' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='200' y='50' width='300' height='300' fill='none' stroke='%233B3FDD' stroke-width='1' transform='rotate(15 350 200)' opacity='0.15'/%3E%3Crect x='250' y='80' width='250' height='250' fill='none' stroke='%233B3FDD' stroke-width='1' transform='rotate(25 375 205)' opacity='0.1'/%3E%3Crect x='300' y='110' width='200' height='200' fill='none' stroke='%233B3FDD' stroke-width='1' transform='rotate(35 400 210)' opacity='0.08'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}

export default config
