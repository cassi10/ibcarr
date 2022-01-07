module.exports = {
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "./base.cjs"
  ],
  ignorePatterns: ["dist", ".next", "next-env.d.ts"],
  rules: {
    "@typescript-eslint/explicit-function-return-type": "error",
    "prettier/prettier": "error"
  }
};
