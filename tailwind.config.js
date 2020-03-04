const {
  colors: defaultColors,
  maxWidth: defaultMaxWidth
} = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    fontFamily: {
      sans: ["SF Pro Display", "sans-serif"]
      // secondary: ["'Merriweather'", "sans-serif"]
    },
    colors: {
      ...defaultColors,
      primary: "#1890FF",
      bgcolor: "#F5F5F5",
      textcolor: "#595959",
      black: "#262626",
      "grey-3": "#f5f5f5",
      "grey-4": "#e8e8e8",
      "grey-5": "#d9d9d9",
      "grey-6": "#bfbfbf",
      "blue-6": "#1890FF",
      "blue-5": "#40A9FF",
      "blue-1": "#E6F7FF"
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
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
  variants: {
    opacity: ["responsive", "hover", "focus", "disabled"],
  },
  plugins: []
};
