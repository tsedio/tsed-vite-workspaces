# tsed-vite-workspaces

### Step

```sh
corepack enable
yarn init -2
yarn plugin import workspace-tools
```

Add `nodeLinker: node-modules` in `.yarnrc.yml`.

Edit `package.json` and add:

```json
{
  "workspaces": ["packages/*", "packages/**/*"]
}
```

```sh
mkdir packages/web/app && cd packages/web/app && yarn init -y
mkdir packages/web/components && cd packages/web/components && yarn init -y
mkdir packages/web/utils && cd packages/web/utils && yarn init -y
mkdir packages/config && cd packages/config && yarn init -y
```

Edit all `package.json` and add `"version": "1.0.0"`.

## Add NX

```sh
npx add-nx-to-monorepo
```

## Eslint & prettier

```shell
cd packages/config
yarn add -D eslint prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-workspaces eslint-config-prettier eslint-plugin-import eslint-plugin-simple-import-sort
yarn add -D eslint-config-react-app eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-testing-library
yarn add -D eslint-plugin-jsx-a11y
```

Create a `packages/config/eslint/node.js` with this initiale configuration:

```js
module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  plugins: ["workspaces", "simple-import-sort"],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module"
  },
  env: {
    node: true,
    es6: true
  },
  rules: {
    "@typescript-eslint/ban-ts-comment": 0,
    "@typescript-eslint/camelcase": 0,
    "@typescript-eslint/no-inferrable-types": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "@typescript-eslint/no-unused-vars": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-non-null-assertion": 0,
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "workspaces/no-absolute-imports": "error"
  },
  overrides: [
    {
      files: ["**/*.spec.ts", "**/test/**", "**/__mock__/**"],
      rules: {
        "workspaces/no-absolute-imports": 0
      }
    },
    {
      files: ["**/*.js"],
      rules: {
        "@typescript-eslint/no-var-requires": 0
      }
    }
  ]
};
```

Create a `packages/config/eslint/web.js` with this initiale configuration:

```js
module.exports = {
  extends: ["react-app", "react-app/jest", "plugin:jsx-a11y/strict"],
  plugins: ["prettier", "simple-import-sort"],
  rules: {
    "prettier/prettier": "error",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error"
  }
};
```

Then create `.eslintrc.js` for each packages in `packages/config`.

Add the following configuration if the packages is for a `node.js` env:

```js
module.exports = {
  extends: [require.resolve("@project/config/eslint/node")]
};
```

Add the following configuration if the packages is for a `web` env:

```js
module.exports = {
  extends: [require.resolve("@project/config/eslint/web")]
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

Finally, add the followings scripts in the root `package.json`:

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
    "**/*.{ts,tsx,js,jsx}": ["yarn lint:fix", "git add"],
    "**/*.{json,md,yml,yaml}": ["prettier --write"]
  }
}
```

## Commit lint

```shell
yarn add -D @commitlint/cli @commitlint/config-conventional
echo "module.exports = {extends: ['@commitlint/config-angular']};" > commitlint.config.js
```

## Add husky

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
yarn add -D jest ts-jest @types/jest @testing-library/dom @testing-library/jest-dom @testing-library/react @testing-library/user-event
```
