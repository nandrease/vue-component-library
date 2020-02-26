module.exports = {
    preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
    reporters: ['default', 'jest-junit'],
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.vue', '!**/node_modules/**']
};
