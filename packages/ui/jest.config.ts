import nextJest from 'next/jest'

// const createJestConfig = nextJest({
//   // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
//   dir: './',
// })

// // Add any custom config to be passed to Jest
// const customJestConfig = {
//   // Add more setup options before each test is run
//   // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
//   // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
//   moduleDirectories: ['node_modules', '<rootDir>/'],
//   testEnvironment: 'jest-environment-jsdom',
// }

// // createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
// export default createJestConfig(customJestConfig)

const createJestConfig = nextJest({
  dir: './',
})

const jestConfig = {
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  moduleNameMapper: {
    // Handle CSS imports (with CSS modules)
    // https://jestjs.io/docs/webpack#mocking-css-modules
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',

    // Handle CSS imports (without CSS modules)
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',

    // Handle image imports
    // https://jestjs.io/docs/webpack#handling-static-assets
    '^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$/i': '<rootDir>/__mocks__/fileMock.js',

    // Handle module aliases
    '^@/lib/(.*)$': '<rootDir>/lib/$1',
    // '^(.*)$': '<rootDir>/$1',
  },
  // enables tsconfig.json's baseURL
  moduleDirectories: [
    'node_modules', '.'
  ],
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/', '<rootDir>/.next/'
  ],
  testEnvironment: 'jsdom',
  // testEnvironment: 'jest-environment-jsdom',
  transform: {
    // Use babel-jest to transpile tests with the next/babel preset
    // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  extensionsToTreatAsEsm: ['.ts'],
}

const compiledConfig = await createJestConfig(jestConfig)
console.info({ compiledConfig })
export default compiledConfig
