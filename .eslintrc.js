module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    '@typescript-eslint/no-unused-vars':
      process.env.NODE_ENV === 'production' ? 'error' : 'warn',
  },
};
