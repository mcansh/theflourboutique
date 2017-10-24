module.exports = {
  extends: ['airbnb-base', 'prettier'],
  parser: 'babel-eslint',
  env: {
    browser: true,
  },
  plugins: ['import', 'prettier'],
  rules: {
    'no-unused-vars': 1,
    'comma-dangle': 0,
    'no-console': 0,
  },
};
