import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: '#3483FA',
        primaryDarker: '#2868C7',
        black: '#191919',
        dark: '#646464',
        secondary: '#F2F2F2',
        secondaryDarker: '#E6F0FF',
      },
      padding: {
        default: "1.5rem"
      },
      fontFamily: {
        roboto: ['var(--font-roboto)', 'sans-serif'],
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.icon-filled': {
          fontVariationSettings: '"FILL" 1',
        },
      })
    }),
  ],
} satisfies Config
