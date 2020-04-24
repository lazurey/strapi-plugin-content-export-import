module.exports = {
  testPathIgnorePatterns: ["<rootDir>/config/", "<rootDir>/node_modules/"],
  testMatch: [ "**/__tests__/**/*.js"],
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.js",
    "!admin/src/components/**",
    "!admin/src/containers/**",
    "!admin/src/translations/**",
    "!admin/src/constants/**",
    "!admin/src/*.js",
    "!*.config.js",
    "!**/node_modules/**",
    "!coverage/**",
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    }
  }
};
