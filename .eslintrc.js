/**
 * @type {import('eslint').Linter.Config}
 */
const config = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:jsx-a11y/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "jsx-a11y", "@typescript-eslint", "unused-imports"],
  rules: {
    "react/self-closing-comp": "error",
    "react/prop-types": "off",
    "import/order": [
      "error",
      {
        groups: [
          "external",
          "internal",
          "sibling",
          "index",
          "parent",
          "builtin",
          "object",
          "type",
        ],
        "newlines-between": "always",
        alphabetize: { order: "asc", caseInsensitive: true },
        warnOnUnassignedImports: true,
      },
    ],
    "unused-imports/no-unused-imports": "error",
    "@typescript-eslint/consistent-type-imports": [
      "error",
      { prefer: "type-imports" },
    ],
  },
  ignorePatterns: ["node_modules", ".eslintrc.js"],
  settings: {
    react: {
      version: "detect",
    },
  },
};

module.exports = config;
