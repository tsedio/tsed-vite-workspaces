module.exports = {
  extends: ["react-app", "react-app/jest", "plugin:jsx-a11y/strict"],
  plugins: ["prettier", "simple-import-sort"],
  rules: {
    "prettier/prettier": "error",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error"
  }
};
