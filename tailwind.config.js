module.exports = {
  purge: [],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        'blue-custom': '#2f62ff',
        'blue-light': '#E4E4F8',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
