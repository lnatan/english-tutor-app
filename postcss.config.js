module.exports = (production = false) => {
  return [
    require("postcss-import")(),
    require("postcss-url")(),
    require("tailwindcss")("./tailwind.config.js"),
    require("postcss-nesting")(),
    require("autoprefixer")(),
    production && require('@fullhuman/postcss-purgecss')({
      content: ['./**/*.html', './**/*.svelte'],
      whitelist: ["md\:block"],
      whitelistPatterns: [],
      defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
    }),
    production && require("cssnano")
  ].filter(Boolean);
};