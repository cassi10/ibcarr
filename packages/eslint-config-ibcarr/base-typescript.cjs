module.exports = {
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "./base.cjs"
  ],
  rules: {
    "@typescript-eslint/explicit-function-return-type": "error",
    "unicorn/consistent-function-scoping": [
      "error",
      {
        checkArrowFunctions: false
      }
    ]
  }
};
