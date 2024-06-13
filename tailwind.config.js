/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    '!./src/components/CertificatesCategory/Adca.jsx',
    // '!./src/pages/Certificate.jsx',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

