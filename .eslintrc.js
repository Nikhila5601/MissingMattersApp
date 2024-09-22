module.exports = {
  extends: ['expo', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
  "extends": [
    "plugin:react/recommended",
    "airbnb",
    "airbnb/hooks",
    "prettier",
    "prettier/react"
  ],
};

