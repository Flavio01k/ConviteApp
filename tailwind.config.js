// tailwind.config.js
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // inclui todos os arquivos React
  ],
  darkMode: 'class', // permite usar .dark no <html> para alternar temas
  theme: {
    extend: {
      colors: {
        base: {
          light: 'var(--color-bg)',
          dark: 'var(--color-text)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          hover: 'var(--color-accent-hover)',
        },
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
