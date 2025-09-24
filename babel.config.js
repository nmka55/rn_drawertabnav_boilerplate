module.exports = {
  presets: ["module:@react-native/babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"],
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
        alias: {
          "@app": "./src",
          "@components": "./src/components",
          "@constants": "./src/constants",
          "@navigators": "./src/navigators",
          "@redux": "./src/redux",
          "@screens": "./src/screens",
        },
      },
    ],
    "react-native-worklets/plugin",
  ],
};
