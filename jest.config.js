module.exports = {
  preset: '@react-native/jest-preset',
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/$1',
  },
  // Redux Toolkit currently exposes ESM through Immer; transform it like RN packages.
  transformIgnorePatterns: [
    'node_modules/(?!((@)?react-native|@react-native(-community)?|@reduxjs|redux|react-redux|immer)/)',
  ],
};
