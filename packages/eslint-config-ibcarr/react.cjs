module.exports = {
  extends: [
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:react/recommended",
    "./typescript.cjs"
  ],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react/function-component-definition": [
      2,
      { namedComponents: "arrow-function" }
    ]
  }
};
