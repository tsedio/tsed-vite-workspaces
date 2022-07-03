<p style="text-align: center" align="center">
 <a href="https://tsed.io" target="_blank"><img src="https://tsed.io/tsed-og.png" width="200" alt="Ts.ED logo"/></a>
</p>

<div align="center">
  <h1>Ts.ED + Vite + Nx + Mono repo</h1>

[![PR Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/tsedio/tsed-cli/blob/master/CONTRIBUTING.md)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![backers](https://opencollective.com/tsed/tiers/badge.svg)](https://opencollective.com/tsed)

  <br />
<div align="center">
  <a href="https://tsed.io/">Website</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://tsed.io/getting-started.html">Getting started</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://api.tsed.io/rest/slack/tsedio/tsed">Slack</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://twitter.com/TsED_io">Twitter</a>
</div>
  <hr />
</div>

## Introduction

This repository show you how to create mono repository with Ts.ED and Vite/React.

## Features

- Node.js 16+
- TypeScript
- Ts.ED
- React
- Tailwind 3
- Vite
- Nx and Yarn 3 workspaces
- Jest 28+
- Eslint & Prettier
- Lint-staged
- Husky

### Step

```sh
corepack enable
yarn init -2
```

Add `nodeLinker: node-modules` in `.yarnrc.yml`.

Edit `package.json` and add:

```json
{
  "workspaces": [
    "packages/*",
    "packages/**/*"
  ]
}
```

```sh
mkdir packages/web/components && cd packages/web/components && yarn init -y
mkdir packages/web/utils && cd packages/web/utils && yarn init -y
mkdir packages/config && cd packages/config && yarn init -y
```

For the app:

```shell
mkdir packages/web/app && cd packages/web/app && yarn create vite .
```

Then select react-ts option.

> Note: Edit all `package.json` and add `"version": "1.0.0"`.

## Add NX

```sh
npx add-nx-to-monorepo
```

## Eslint & prettier

```shell
cd packages/config
yarn add -D eslint
yarn workspace add -D eslint prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-workspaces eslint-config-prettier eslint-plugin-import eslint-plugin-simple-import-sort
yarn workspace add -D eslint-config-react-app eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-testing-library
yarn workspace add -D eslint-plugin-jsx-a11y
```

In `packages/config/eslint`:

- Create a [`packages/config/eslint/node.js`](./packages/config/eslint/node.js) file,
- Create a [`packages/config/eslint/web.js`](./packages/config/eslint/web.js) file.

Then create `.eslintrc.js` for each packages in `packages/config`.

### Web

Add the following configuration if the packages is for a `web` (front) env:

```js
module.exports = {
  extends: [require.resolve("@project/config/eslint/web")]
};
```

Edit also the `vite.config.ts` in `packages/web/app` directory and the lines related to eslint:

```diff
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
+ import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 
+    eslint()
  ]
});
```

### Node

Add the following configuration if the packages is for a `node.js` (back) env:

```js
module.exports = {
  extends: [require.resolve("@project/config/eslint/node")]
};
```

Then, add for each `packages/**/*/package.json`:

```json
{
  "scripts": {
    "lint": "eslint \"./src/**/*.{js,jsx,ts,tsx}\"",
    "lint:fix": "yarn lint --fix"
  }
}
```

Finally, add the following scripts in the root `package.json`:

```json
{
  "scripts": {
    "lint": "nx run-many --target=lint",
    "lint:fix": "nx run-many --target=lint:fix"
  }
}
```

## Add lint-staged

```shell
yarn add -D lint-staged
```

Edit root `package.json` and add the following configuration:

```json
{
  "lint-staged": {
    "**/*.{ts,tsx,js,jsx}": [
      "eslint --fix",
      "git add"
    ],
    "**/*.{json,md,yml,yaml}": [
      "prettier --write",
      "git add"
    ]
  }
}
```

## Commit lint

```shell
yarn add -D @commitlint/cli @commitlint/config-conventional
echo "module.exports = {extends: ['@commitlint/config-angular']};" > commitlint.config.js
```

## Husky

```shell
yarn dlx husky-init --yarn2 && yarn
yarn add is-ci
yarn husky add .husky/commit-msg 'yarn commitlint --edit $1'
yarn husky add .husky/post-commit 'git update-index --again'
yarn husky add .husky/pre-commit 'npx lint-staged $1'
```

Edit `package.json` and replace "postinstall" step by:

```diff
"scripts": {
-    "postinstall":  "husky install",
+    "prepare": "is-ci || husky install",
}
```

## Jest & testing-library

```shell
yarn add -D cross-env jest jest-environment-jsdom jest-watch-typeahead @swc/core @swc/jest @types/jest @testing-library/dom @testing-library/jest-dom @testing-library/react @testing-library/user-event
yarn workspace @project/config add -D camelcase 
```

### Web

In `packages/config/jest`, create the following files:

- Create [`jest.web.config.js`](./packages/config/jest/jest.web.config.js),
- Create [`cssTransform.js`](./packages/config/jest/cssTransform.js),
- Create [`fileTransform.js`](./packages/config/jest/fileTransform.js),
- Create [`setupTest.js`](./packages/config/jest/setupTest.js),
- Create [`swc.json`](./packages/config/jest/swc.json).

In `packages/web/app` and `packages/web/components`, create a `jest.config.js` with the following code:

```js
module.exports = require("@project/config/jest/jest.web.config.js");
```

Edit `packages/web/app/package.json` and `packages/web/components/package.json` and add the following scripts:

```json
{
  "scripts": {
    "test": "cross-env NODE_ENV=test jest --coverage"
  }
}
```

And finally, edit the root `package.json` and add the following scripts:

```json
{
  "scripts": {
    "test": "nx run-many --target=test --all"
  }
}
```

## Tailwind

```shell
yarn workspace @project/config add -D tailwindcss tailwindcss-cli postcss autoprefixer postcss-flexbugs-fixes postcss-preset-env postcss-nested
```

In `packages/config`:

- Create [postcss.config.js](./packages/config/postcss.config.js),
- Create [tailwind.config.js](./packages/config/tailwind.config.js).

In `packages/web/app`, create a `postcss.config.js` file with the following content:

```js
module.exports = require("@project/config/postcss.config.js");
```

In `packages/web/app`, create a `tailwind.config.js` file with the following content:

```js
module.exports = require("@project/config/tailwind.config.js");
```

In `packages/web/components/styles/tailwind`, create an `index.css` file with the following content:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

In `packages/web/components/styles`, create an `index.css` file with the following content:

```css
@import "./tailwind/index.css";
```

Then, in `packages/web/components`, create an `index.ts` file with the following content:

```typescript
import "./styles/index.css";

export * from "./components/button/Button";
```

Now, when a component is used in app or any other web package, the tailwind configuration will be loaded automatically.

## Create server
