/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'hero-bg': "url('/assets/hero-image-github-profile.png')"
      },
      colors: {
        customNavyBlue: '#20293A',
        'customNavyBlue--dark': '#111629'
      }
    }
  },
  plugins: []
}
