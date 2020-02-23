module.exports = (production = false) => {
  return [
    require("postcss-import")(),
    require("postcss-url")(),
    require("tailwindcss")("./tailwind.config.js"),
    require("postcss-nesting")(),
    require("autoprefixer")(),
    production &&
      require("@fullhuman/postcss-purgecss")({
        extractor: require("purgecss-from-svelte"),
        content: ["./**/*.html", "./**/*.svelte"],
        whitelist: [],
        whitelistPatterns: [/^md/]
      }),
    production && require("cssnano")
  ].filter(Boolean);
};
