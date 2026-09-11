module.exports = {
  presets: ['module:@react-native/babel-preset'],
  // Worklets must remain last so Drawer/Reanimated can transform worklet code.
  plugins: [
    '@babel/plugin-transform-export-namespace-from',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        alias: { '@app': './src' },
      },
    ],
    'react-native-worklets/plugin',
  ],
};
