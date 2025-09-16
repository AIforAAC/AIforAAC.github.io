/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // High contrast theme colors
        'high-contrast-bg': '#000000',
        'high-contrast-text': '#ffffff',
        'high-contrast-accent': '#ffff00',
        // Primary theme colors
        'primary': {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        'accent': {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        }
      },
      fontSize: {
        // Large text sizes for accessibility
        'xs-large': ['0.875rem', { lineHeight: '1.5' }],
        'sm-large': ['1rem', { lineHeight: '1.6' }],
        'base-large': ['1.125rem', { lineHeight: '1.7' }],
        'lg-large': ['1.25rem', { lineHeight: '1.8' }],
        'xl-large': ['1.5rem', { lineHeight: '1.8' }],
        '2xl-large': ['1.875rem', { lineHeight: '1.8' }],
        '3xl-large': ['2.25rem', { lineHeight: '1.8' }],
      }
    },
  },
  plugins: [],
}

