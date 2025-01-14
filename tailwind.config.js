module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],  // Add the paths to your template files
  darkMode: false, // Or 'media' if you want dark mode based on media queries
  theme: {
    extend: {
      colors: {
        "blue-custom": "#2f62ff",
        "blue-light": "#E4E4F8",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
