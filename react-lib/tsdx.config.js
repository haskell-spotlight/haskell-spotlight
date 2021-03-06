const path = require("path");
const postcss = require("rollup-plugin-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const stringPlugin = require("rollup-plugin-string");

module.exports = {
  rollup(config) {
    // Fix https://github.com/jaredpalmer/tsdx/issues/954
    config.output.strict = false;
    config.plugins.push(
      stringPlugin.string({
        include: "**/*.svg"
      })
    );
    config.plugins.push(
      postcss({
        sourceMap: false,
        plugins: [
          autoprefixer(),
          cssnano({
            preset: "default"
          })
        ],
        inject: false,
        extract: path.resolve("dist/react-lib.css")
      })
    );
    return config;
  }
};
