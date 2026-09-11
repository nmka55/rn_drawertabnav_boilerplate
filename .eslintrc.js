module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    // Navigation APIs intentionally receive render callbacks as option props.
    'react/no-unstable-nested-components': ['warn', { allowAsProps: true }],
  },
};
