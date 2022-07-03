module.exports = {
  plugins: {
    "postcss-flexbugs-fixes": {},
    "postcss-preset-env": {
      autoprefixer: {
        flexbox: "no-2009"
      },
      stage: 3
    },
    tailwindcss: {
      config: require("./tailwind.config.js")
    },
    "postcss-nested": {},
    autoprefixer: {}
  }
};
