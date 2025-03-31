/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: {
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
          },
          pg: {
            light: '#F3F4F6',
            DEFAULT: '#6366F1',
            dark: '#4338CA',
          },
          accent: {
            light: '#FDE68A',
            DEFAULT: '#F59E0B',
            dark: '#D97706',
          },
          secondary: "#4f46e5",
          light: "#f8fafc",
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
          mono: ['var(--font-roboto-mono)'],
        },
        spacing: {
          '18': '4.5rem',
          '112': '28rem',
          '128': '32rem',
        },
        borderRadius: {
          'xl': '1rem',
          '2xl': '2rem',
        },
        boxShadow: {
          'soft': '0 0 20px rgba(0, 0, 0, 0.1)',
        },
        animation: {
          'fade-in': 'fadeIn 0.5s ease-in-out',
          'slide-up': 'slideUp 0.5s ease-in-out',
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
    plugins: [
      require('@tailwindcss/typography'),
    ],
  };