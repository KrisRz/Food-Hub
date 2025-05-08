/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './ui/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4CAF50',
          dark: '#388E3C',
          light: '#81C784',
        },
        secondary: {
          DEFAULT: '#FFC107',
          dark: '#FFA000',
          light: '#FFD54F',
        },
        background: {
          DEFAULT: '#F5F5F5',
          dark: '#E0E0E0',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
  safelist: [
    'bg-primary',
    'bg-primary-dark',
    'bg-primary-light',
    'text-primary',
    'text-primary-dark',
    'text-primary-light',
    'border-primary',
    'border-primary-dark',
    'border-primary-light',
    'hover:bg-primary',
    'hover:bg-primary-dark',
    'hover:bg-primary-light',
  ],
}

