const { map } = require("@project/config/packages/index.js");

module.exports = {
  "stories": [
    ...map("web/components", [
      "**/*.stories.mdx",
      "**/*.stories.@(js|jsx|ts|tsx)"
    ]),
    ...map("web/app", [
      "**/*.stories.mdx",
      "**/*.stories.@(js|jsx|ts|tsx)"
    ]),
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  staticDirs: ["../public"],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      name: "@storybook/addon-postcss",
      options: {
        cssLoaderOptions: {
          importLoaders: 1
        },
        postcssLoaderOptions: {
          // When using postCSS 8
          implementation: require("postcss")
        }
      }
    }
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "@storybook/builder-vite"
  },
  "features": {
    "storyStoreV7": true
  }
};
