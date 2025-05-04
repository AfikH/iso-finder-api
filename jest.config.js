// Path mappings in jest.config.ts should align with your tsconfig paths
module.exports = {
  preset: "ts-jest", // Use ts-jest for transpiling TypeScript
  testEnvironment: "node", // Node environment for backend testing
  transform: {
    "^.+\\.ts$": "ts-jest", // Use ts-jest for transforming TypeScript files
  },
  moduleNameMapper: {
    // Align Jest's path mappings with the ones in tsconfig
    "^@db/(.*)$": "<rootDir>/src/db/$1",
    "^@controllers/(.*)$": "<rootDir>/src/controllers/$1",
    "^@services/(.*)$": "<rootDir>/src/services/$1",
    "^@middlewares/(.*)$": "<rootDir>/src/middlewares/$1",
    "^@routes/(.*)$": "<rootDir>/src/routes/$1",
    "^@configs/(.*)$": "<rootDir>/src/configs/$1",
    "^@errors/(.*)$": "<rootDir>/src/errors/$1",
    "^@zod/(.*)$": "<rootDir>/src/zod/$1",
    "^@customTypes/(.*)$": "<rootDir>/src/customTypes/$1", // Add missing path mapping
    "^@utils/(.*)$": "<rootDir>/src/utils/$1", // Add missing path mapping
    "^@app$": "<rootDir>/src/app", // Handle the special '@app' mapping
  },
  testMatch: ["**/tests/**/*.test.ts"], // Your test file location
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // Setup file after env is ready
  moduleDirectories: ["node_modules", "src"], // Include "src" for resolving modules
  globals: {
    // Optionally, if you want to set global settings for ts-jest
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.json", // Explicitly specify tsconfig.json path
    },
  },
};
