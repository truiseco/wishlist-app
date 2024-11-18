/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        holiday: {
          red: '#DE354C',
          green: '#3C8D2F',
          gold: '#FFB800',
          cream: '#FFF3E6',
          pine: '#183A37'
        }
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px rgba(0, 0, 0, 0.08)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.06)',
      },
      animation: {
        'snow': 'snow 10s linear infinite',
      },
      keyframes: {
        snow: {
          '0%': { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateY(100vh)' },
        }
      }
    },
  },
  plugins: [],
}
