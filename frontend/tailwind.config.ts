import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F5F0E8',
        taupe: '#C4B5A6',
        charcoal: '#2D2D2D',
        olive: { DEFAULT: '#3D4A2D', dark: '#2E3821' },
        surface: '#FAFAF8',
        'border-light': '#E0D6CC',
        'warm-gray': '#6B6560',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      }
    },
  },
  plugins: [],
}
export default config
