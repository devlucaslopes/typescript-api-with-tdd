const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('./tsconfig.json')

module.exports = {
  roots: ['<rootDir>/src'],
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**',
    '!**/protocols/**',
    '!**/migrations/**'
  ],
  coverageDirectory: 'coverage',
  coverageProvider: "babel",
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  },
  preset: 'ts-jest',
  testEnvironment: "node"
};
