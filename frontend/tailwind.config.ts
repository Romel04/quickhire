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
      fontFamily: {
        logo:    ['"Red Hat Display"', 'sans-serif'],
        heading: ['"Clash Display"',   'sans-serif'],
        body:    ['Epilogue',          'sans-serif'],
        detail:  ['Inter',             'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#3B3FDD',
          50:  '#EEEEFF',
          100: '#DDDEFF',
          200: '#CCCDFF',
          500: '#3B3FDD',
          600: '#2E32C4',
          700: '#2226AB',
        },
        accent:  { DEFAULT: '#26A4FF' },
        surface: '#F8F8FD',
      },
    },
  },
  plugins: [],
}

export default config