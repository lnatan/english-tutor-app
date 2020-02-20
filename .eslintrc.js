module.exports = {
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: "module"
  },
  extends: "eslint:recommended",
  parser: "babel-eslint", // https://github.com/babel/babel-eslint
  env: {
    es6: true,
    node: true,
    browser: true
  },
  plugins: ["svelte3", "babel"],
  overrides: [
    {
      files: "*.svelte",
      processor: "svelte3/svelte3"
    }
  ],
  rules: {
    quotes:  ["error", "double", { "avoidEscape": true, "allowTemplateLiterals": true }]
  },
  settings: {
    "svelte3/ignore-styles": () => true
  }
};
