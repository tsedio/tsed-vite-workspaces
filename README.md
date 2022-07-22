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

This repository show you how to create mono repository with Ts.ED and Vite/React. It tries to show step by step, how to install
the different techno to obtain an integrated build chain.

The technologies presented are switchable. If you want to make an application on Vue/Svelte, it's possible because Vite support it.
You can also change Ts.ED to another backend framework. 

The idea is essentially to see how the mono repository is structured to put a front and back and tools like storybook!

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
- Storybook and tailwind viewer

# Steps
## Prepare workspaces

To begin we need to configure yarn:

```sh
corepack enable
yarn init -2
```

Add `nodeLinker: node-modules` in `.yarnrc.yml`. 

> Note: PNP support is not covered at this step.

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
mkdir packages/config && cd packages/config && yarn init -y
```

For the app:

```shell
mkdir packages/web/app && cd packages/web/app && yarn create vite .
```

Then select react-ts option.

> Note: Edit all `package.json` and add `"version": "1.0.0"`.

Then install NX:

```sh
yarn dlx add-nx-to-monorepo
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

- Create a `packages/config/eslint/node.js` file from [this example](./packages/config/eslint/node.js),
- Create a `packages/config/eslint/web.js` file from [this example](./packages/config/eslint/web.js).

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

- Create `jest.web.config.js` file from [this example](./packages/config/jest/jest.web.config.js),
- Create `cssTransform.js` file from [this example](./packages/config/jest/cssTransform.js),
- Create `fileTransform.js` file from [this example](./packages/config/jest/fileTransform.js),
- Create `setupTest.js` file from [this example](./packages/config/jest/setupTest.js),
- Create `swc.web.json` file from [this example](./packages/config/jest/swc.web.json).

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

- Create `postcss.config.js` file from [this example](./packages/config/postcss.config.js),
- Create `tailwind.config.js` file from [this example](./packages/config/tailwind.config.js).

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

## Storybook

Create the new package with:

```shell
mkdir packages/web/storybook && cd packages/web/storybook && yarn init -y
```

Add version in the generated `package.json`:

```json
{
  "name": "@project/storybook",
  "version": "1.0.0"
}
```

Run the following command under `packages/web/storybook`:

```shell
yarn dlx sb init --builder @storybook/builder-vite --type react
yarn workspace @project/storybook add -D @storybook/addon-postcss
```

Edit `package.json` in `packages/web/storybook` and change the following lines:

```diff
{
  "scripts": {
+    "start:storybook": "start-storybook -p 6006",
+    "build:storybook": "build-storybook -o dist"
-    "storybook": "start-storybook -p 6006",
-    "build-storybook": "build-storybook -o dist"
  } 
}
```

Edit the root `package.json` and add the following scripts:

```json
{
  "scripts": {
    "start:storybook": "nx start:storybook @project/storybook",
    "build:storybook": "nx build:storybook @project/storybook"
  }
}
```

Edit `main.js` located in `packages/web/storybook/.storybook` and add the following code:

```js
const { map } = require('@project/config/packages/index.js');

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
  "addons": [
    {
      name: '@storybook/addon-postcss',
      options: {
        cssLoaderOptions: {
          importLoaders: 1,
        },
        postcssLoaderOptions: {
          // When using postCSS 8
          implementation: require('postcss'),
        },
      },
    }
  ]
}
```

Edit `preview.js` located in `packages/web/storybook/.storybook` and add the following code:

```typescript
import "@project/components";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  }
}
```

In `packages/web/storybook`, create a `postcss.config.js` file with the following content:

```js
module.exports = require("@project/config/postcss.config.js");
```

In `packages/web/storybook`, create a `tailwind.config.js` file with the following content:

```js
module.exports = require("@project/config/tailwind.config.js");
```

### Display tailwind configuration in storybook

Run:

```shell
yarn workspace @project/config add -D tailwindcss-cli tailwind-config-viewer rimraf
```

Then add in `packages/config/package.json` the following scripts:

```json
{
  "scripts": {
    "start:tailwind": "tailwind-config-viewer -o",
    "build:tailwind": "tailwind-config-viewer export ../web/storybook/public && cp ../web/storybook/public/index.html ../web/storybook/public/tailwind.html && yarn clean:tailwind",
    "clean:tailwind": "rimraf ../web/storybook/public/index.html ../web/storybook/public/favicon.ico"
  }
}
```

Edit the root `package.json` and change the following scripts:

```diff
{
  "scripts": {
-    "start:storybook": "nx start:storybook @project/storybook",
-    "build:storybook": "nx build:storybook @project/storybook",
+    "start:storybook": "nx build:tailwind @project/config && nx start:storybook @project/storybook",
+    "build:storybook": "nx build:tailwind @project/config && nx build:storybook @project/storybook",
  }
}
```

Edit `main.js` located in `packages/web/storybook/.storybook` and add the following code:

```js
module.exports = {
  staticDirs: ["../public"]
}
```

Finally, create a new story  `tailwind.stories.mdx` in `packages/web/storybook/stories` with the following code:

```
import { Meta } from '@storybook/addon-docs/blocks'

<Meta title="Tailwind"/>

<style>{`
import { Meta } from '@storybook/addon-docs/blocks'

<Meta title="Tailwind"/>

<style>{`
.sbdocs-wrapper {
  padding: 0 !important;
}
.sbdocs .sbdocs-content {
  max-width: 100%;
}
`}</style>

<iframe src="./tailwind.html" style={{height: '100vh', width: '100vw'}}/>
```

## Create server

Run the following commands:

```shell
mkdir packages/back/server
cd packages/back/server
yarn dlx @tsed/cli init .
```

Select the following options:

```shell
? Choose the target platform: Express.js
? Choose the architecture for your project: Ts.ED
? Choose the convention file styling: Ts.ED
? Check the features needed for your project Database, Swagger, Testing
? Choose a ORM manager Mongoose
? Choose unit framework Jest
```

Edit the `packages/back/server/package.json` and apply changes:

```diff
{
+ "name": "@project/server",
  "scripts": {
+   "clean": "rimraf dist tsconfig.tsbuildinfo",  
-   "build": "yarn run barrels && tsc --project tsconfig.compile.json",  
+   "build": "yarn run barrels && tsc --build",
-   "test": "yarn run test:lint && yarn run test:coverage",
+   "test": "yarn run lint && yarn run test:coverage",
    "test:unit": "cross-env NODE_ENV=test jest",
    "test:coverage": "yarn run test:unit",
-   "test:lint": "eslint '**/*.{ts,js}'",
-   "test:lint:fix": "eslint '**/*.{ts,js}' --fix"
+   "lint": "eslint '**/*.{ts,js}'",
+   "lint:fix": "eslint '**/*.{ts,js}' --fix"
  },
  "devDependencies": {
-   "@typescript-eslint/eslint-plugin": "^5.30.4",
-   "@typescript-eslint/parser": "^5.30.4",
-   "eslint-config-prettier": "^8.5.0",
-   "eslint-plugin-prettier": "^4.2.1",
-   "husky": "^8.0.1",
-   "is-ci": "^3.0.1",
-   "jest": "^28.1.2",
  }
}
```

Edit the root `package.json` and add the following scripts:

```json
{
  "scripts": {
    "clean": "nx run-many --target=clean --all",
    "start:back:server": "nx build @project/server",
    "build:barrels": "nx run-many --target=barrels --all",
    "build": "nx run-many --target=build --all"
  }
}
```

### Configure TypeScript

Edit the root `tsconfig.json` and add the following scripts:

```json
{
  "files": [],
  "references": [
    {
      "path": "./packages/web/app"
    },
    {
      "path": "./packages/web/components"
    },
    {
      "path": "./packages/back/server"
    }
  ]
}

```

- Edit the [`packages/back/server/tsconfig.json`](./packages/server/tsconfig.json) file,

### Eslint

Create `.eslintrc.js` in `packages/back/server` with the following code: 

```js
module.exports = require("@project/config/eslint/node.js");
```

### Jest

- Create a `packages/config/jest.node.config.json` file from [this example](./packages/config/jest.node.config.json),
- Create `swc.web.json` file from [this example](./packages/config/jest/swc.web.json).

Create a `packages/back/server/jest.config.json` with the following code:

```typescript
module.exports = require("@project/config/jest/jest.node.config.js");
```

### Add subpackages in back

It's possible to use Yarn workspace to create backend package. This is an effective way to better organize your code. 
However, adding a back package requires performing some steps.

#### Create the new package

Here we will create the `api` package which will contain all our Ts.ED Controllers

```shell
mkdir packages/back/api && cd packages/back/api && yarn init -y
```

Edit the `packages/back/api/package.json` and apply changes:

```diff
{
- "name": "api"
+ "name": "@project/api"
+ "scripts": {
+   "clean": "rimraf dist tsconfig.tsbuildinfo",
+   "build": "yarn run barrels && tsc --build",
+   "barrels": "barrelsby --config .barrelsby.json",
+   "test": "yarn run lint && yarn run test:coverage",
+   "test:unit": "cross-env NODE_ENV=test jest",
+   "test:coverage": "yarn run test:unit",
+   "lint": "eslint '**/*.{ts,js}'",
+   "lint:fix": "eslint '**/*.{ts,js}' --fix"
+ }
}
```

- Create `.barrelsby.json` file from [this example](./packages/back/domain/.barrelsby.json)
- Create `.eslintrc.js` file from [this example](./packages/back/domain/.eslintrc.js)
- Create `.jest.config.js` file from [this example](./packages/back/domain/jest.config.js)
- Create `tsconfig.json` file from [this example](./packages/back/domain/tsconfig.json)

### Add references

Edit the root `tsconfig.json` and add the following references:

```json
{
  "references": [
    {
      "path": "./packages/back/api"
    }
  ]
}
```

To link the `server` package to the new `api` package, you have to edit the  `packages/back/server/tsconfig.json` and
add also a reference:

```json
{
  "references": [
    {
      "path": "../api"
    }
  ]
}
```

And to preserve the build order when you'll run the `yarn build` command, you have to add the `api` package dependency to the `server` package:

```json
{
  "dependencies": {
    "@project/api": "1.0.0"
  }
}
```

Finally, run `yarn install` to create link between packages!

## Generate HttpClient from Ts.ED

Add the Ts.ED plugin `@tsed/cli-core` to use custom commands:

```shell
yarn workspace @project/server add @tsed/cli-core @tsed/cli swagger-typescript-api @tsed/cli-generate-http-client
```

Then add `packages/back/server/bin/index.ts` file and add the following code:

```typescript
#!/usr/bin/env node
import { CliCore } from "@tsed/cli-core";
import { GenerateHttpClientCmd } from "@tsed/cli-generate-http-client";

import { config } from "../config";
import { Server } from "../Server";

CliCore.bootstrap({
  ...config,
  server: Server,
  // add your custom commands here
  commands: [GenerateHttpClientCmd],
  httpClient: {
    transformOperationId(operationId: string) {
      return operationId.replace(/Controller/g, "");
    }
  }
}).catch(console.error);
```

Edit also the `packages/back/server/package.json` and add the following script:

```json
{
  "scripts": {
    "build:http:client": "tsed run generate-http-client --output ../../web/http-client/src/__generated__"
  }
}
```

The following script will generate the HttpClient in the `packages/web/http-client`. 

Add a `package.json` in `packages/web/http-client` with the following content:

```json
{
  "name": "@project/http-client",
  "version": "1.0.0",
  "main": "src/index.ts",
  "scripts": {
    "build": "yarn run barrels",
    "lint": "eslint \"./src/**/*.{js,jsx,ts,tsx}\"",
    "lint:fix": "yarn lint --fix",
    "test": "cross-env NODE_ENV=test jest --coverage",
    "barrels": "barrelsby --config .barrelsby.json"
  },
  "devDependencies": {
    "@project/server": "1.0.0"
  }
}
```

Then add the following scripts to the root package.json:

```json
{
  "scripts": {
    "build:http:client": "nx build:http:client @project/server && nx barrels @project/http-client",
    "postinstall": "yarn build:http:client"
  }
}
```

Run `yarn build:http:client` to generate the client!

## Configure proxy

Update the `packages/web/app/vite.config.ts` to allow communication between the front and backend via the proxy options:

```typescript
export default defineConfig({
  plugins: [react(), eslint()],
  server: {
    proxy: {
      "/rest": "http://localhost:8083"
    }
  }
});
```

## Get the server version and display it in the web app

We need to create a hook to call our backend. Here is the useVersion hook:

```tsx
import "./App.css";

import { Button } from "@project/components";
import { httpClient, VersionInfoModel } from "@project/http-client";
import { useEffect, useState } from "react";

import logo from "./logo.svg";

function useVersion() {
  const [versionInfo, setVersionInfo] = useState<VersionInfoModel>({} as any);

  useEffect(() => {
    httpClient.version.get().then((versionInfo: VersionInfoModel) => {
      setVersionInfo(versionInfo);
    });
  }, [setVersionInfo]);

  return { versionInfo };
}
```

Here we use the http client generated previously to consume data from our API. 

Here is the complete App.tsx code:
```tsx
import "./App.css";

import { Button } from "@project/components";
import { httpClient, VersionInfoModel } from "@project/http-client";
import { useEffect, useState } from "react";

import logo from "./logo.svg";

function useVersion() {
  const [versionInfo, setVersionInfo] = useState<VersionInfoModel>({} as any);

  useEffect(() => {
    httpClient.version.get().then((versionInfo: VersionInfoModel) => {
      setVersionInfo(versionInfo);
    });
  }, [setVersionInfo]);

  return { versionInfo };
}

function App() {
  const [count, setCount] = useState(0);
  const { versionInfo } = useVersion();

  return (
    <div className="text-center">
      <header className="bg-gray-800 min-h-screen flex items-center justify-center app-header text-white flex-col">
        <img src={logo} className="app-logo" alt="logo" />
        <p>Hello Ts.ED + Vite + React!</p>

        <p>Version: {versionInfo.version}</p>

        <p>
          <Button onClick={() => setCount((count) => count + 1)}>count is: {count}</Button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a className="app-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            Learn React
          </a>
          {" | "}
          <a className="app-link" href="https://vitejs.dev/guide/features.html" target="_blank" rel="noopener noreferrer">
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
```

## Publish packages

> Unfortunately, I haven't found a good alternative for the `lerna version`. So, we need to install lerna to maintain and update packages version.

Install the following modules:

```shell
yarn add lerna @tsed/monorepo-utils semantic-release 
```

Then add the following lines in the root `package.json`:

```json
{
  "scripts": {
    "configure": "monorepo ci configure",
    "release": "semantic-release"
  },
  "monorepo": {
    "productionBranch": "master",
    "developBranch": "master",
    "npmAccess": "public"
  }
}
```

- Create a [`release.config.json`](./release.config.json) file from this [example](./release.config.json),
- Create a [`lerna.json`](./lerna.json) file from this [example](./lerna.json).

That all! `release` command will bump version, apply Git tag, publish all packages on NPM and push a release note on Github releases.

If you use Github Actions you can use the `release` command as following:

```yml
  deploy-packages:
    runs-on: ubuntu-latest
    needs: [ lint, test ]
    if: github.event_name != 'pull_request' && contains('
      refs/heads/production
      refs/heads/alpha
      refs/heads/beta
      refs/heads/rc
      ', github.ref)

    strategy:
      matrix:
        node-version: [ 16.x ]

    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v1
        with:
          node-version: ${{ matrix.node-version }}
      - name: Install dependencies
        run: yarn install --immutable
      - name: Release packages
        env:
          CI: true
          GH_TOKEN: ${{ secrets.GH_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
        run: yarn release
```
