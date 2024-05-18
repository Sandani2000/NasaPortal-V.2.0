/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".container": {
          maxWidth: "100%",
          marginRight: "auto",
          marginLeft: "auto",
          paddingRight: "1rem",
          paddingLeft: "1rem",
          "@screen sm": {
            maxWidth: "85%",
          },
          "@screen md": {
            maxWidth: "85%",
          },
          "@screen lg": {
            maxWidth: "85%",
          },
          "@screen xl": {
            maxWidth: "85%",
          },
          "@screen 2xl": {
            maxWidth: "1536px",
          },
        },
      });
    },
  ],
};
