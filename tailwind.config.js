const {
  colors: defaultColors,
  maxWidth: defaultMaxWidth
} = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    fontFamily: {
      sans: ["'Roboto'", "sans-serif"],
      secondary: ["'Merriweather'", "sans-serif"]
    },
    colors: {
      ...defaultColors,
      primary: "#40A9FF",
      black: "#262626",
      grey: "#4d4d4d",
      "grey-light": "#c4c1c1",
      "grey-dark": "#797979"
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px"
    },
    container: {
      center: true
    },
    flex: {
      auto: "1 1 auto",
      initial: "0 1 auto",
      none: "none",
      "1": "1 1 0%"
    },
    maxWidth: {
      ...defaultMaxWidth,
      "1/4": "25%",
      "1/2": "50%",
      "3/4": "75%"
    }
  },
  variants: {},
  plugins: []
};
