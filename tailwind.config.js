import flowbite from "flowbite-react/tailwind";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      fontFamily: {
        primaryFont: "Fredoka One, Dancing Script",
        heroFont: ['Raleway', 'sans-serif']
      },
      colors: {
        priBg: "#EAD7B4",
        primary: '#BB531E',
        secondary: '#9C712B',
        third: '#553B10'
      },
    },
  },
  plugins: [flowbite.plugin()],
};
