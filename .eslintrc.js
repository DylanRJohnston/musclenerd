module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint", "import"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:import/warnings",
    "plugin:import/typescript",
  ],
  rules: {
    "import/order": [
      1,
      {
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
        },
      },
    ],
    "@typescript-eslint/unbound-method": 0,
    "@typescript-eslint/no-unused-vars": 0,
    "@typescript-eslint/explicit-function-return-type": [
      1,
      {
        allowTypedFunctionExpressions: true,
        allowExpressions: true,
      },
    ],
    "@typescript-eslint/member-delimiter-style": [
      1,
      {
        multiline: {
          delimiter: "none",
        },
      },
    ],
    "@typescript-eslint/no-use-before-define": 0,
  },
}
