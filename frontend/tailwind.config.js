// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html', // Include the HTML entry point
    './src/**/*.{js,jsx,ts,tsx}', // Include all JS, JSX, TS, TSX files in the src folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

