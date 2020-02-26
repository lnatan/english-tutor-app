import commonjs from "rollup-plugin-commonjs";
import livereload from "rollup-plugin-livereload";
import postcss from "rollup-plugin-postcss";
import resolve from "rollup-plugin-node-resolve";
import svelte from "rollup-plugin-svelte";
import alias from "@rollup/plugin-alias";
import { terser } from "rollup-plugin-terser";
import sveltePreprocess from "svelte-preprocess";
import path from "path";

const production = !process.env.ROLLUP_WATCH;

export default {
  input: "src/main.js",
  output: {
    format: "iife",
    sourcemap: true,
    name: "app",
    file: "dist/build/bundle.js"
  },
  plugins: [
    svelte({
      dev: !production,
      preprocess: sveltePreprocess({
        postcss: {
          plugins: require("./postcss.config.js")() // Don't need purgecss because Svelte handle unused css for you.
        }
      }),
      css: css => {
        css.write("dist/build/bundle.css");
      }
    }),
    alias({
      resolve: [".js", ".json", ".svelte"],
      entries: {
        dist: path.resolve(__dirname, "dist"),
        src: path.resolve(__dirname, "src"),
        components: path.resolve(__dirname, "src/components")
      }
    }),
    resolve(),
    commonjs(),
    postcss({
      plugins: require("./postcss.config.js")(production),
      extract: path.resolve(__dirname, "./dist/global.css")
    }),
    !production && livereload("dist"),
    production && terser()
  ]
  // watch: {
  //    clearScreen: false,
  // },
};
