/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'christmas-red': '#E53935',
        'ocean-blue': '#1565C0',
        'accent-red': '#FF3B3F',
        'accent-blue': '#1E88E5',
        'snow-bg': '#F5F8FF',
        'light-blue': '#EDF2FF',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'snow': 'snow 10s linear infinite',
        'wave': 'wave 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        snow: {
          '0%': { transform: 'translateY(-100vh) rotate(0deg)' },
          '100%': { transform: 'translateY(100vh) rotate(360deg)' },
        },
        wave: {
          '0%, 100%': { transform: 'translateX(0) translateY(0)' },
          '50%': { transform: 'translateX(-25px) translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}

