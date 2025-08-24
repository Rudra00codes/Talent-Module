/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust this path based on your project structure
  ],
  theme: {
    fontFamily: {
      'sans': ['Space Grotesk', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    },
    extend: {
      keyframes: {
        'glass-shimmer': {
          '0%, 90%, 100%': { opacity: '0' },
          '45%, 55%': { opacity: '0.18' },
        },
      },
      animation: {
        'glass-shimmer': 'glass-shimmer 14s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

