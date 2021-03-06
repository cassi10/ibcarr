module.exports = {
  extends: [
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "./base-typescript.cjs"
  ],
  rules: {
    "react/prop-types": "off",
    "react/require-default-props": "off",
    "react/function-component-definition": [
      2,
      { namedComponents: "arrow-function" }
    ]
  }
};
