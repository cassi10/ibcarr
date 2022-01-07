module.exports = {
  extends: [
    "plugin:unicorn/recommended",
    "plugin:promise/recommended",
    "plugin:no-use-extend-native/recommended",
    "plugin:eslint-comments/recommended",
    "plugin:prettier/recommended"
  ],
  rules: {
    "unicorn/no-useless-undefined": "off",
    "unicorn/prefer-export-from": ["error", { ignoreUsedVariables: true }]
  }
};
