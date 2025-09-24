module.exports = {
  preset: 'react-native',
  transform: { '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest' },
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@constants/(.*)$': '<rootDir>/src/constants/$1',
    '^@navigators/(.*)$': '<rootDir>/src/navigators/$1',
    '^@redux/(.*)$': '<rootDir>/src/redux/$1',
    '^@screens/(.*)$': '<rootDir>/src/screens/$1',
  },
};
