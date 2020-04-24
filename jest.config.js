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
  ]
};
