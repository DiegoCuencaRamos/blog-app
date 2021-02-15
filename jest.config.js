const {defaults} = require('jest-config');

module.exports = {
    setupFilesAfterEnv: [
        "<rootDir>src/tests/setupTest.js"
    ],
    snapshotSerializers: [
        "enzyme-to-json/serializer"
    ],
    moduleFileExtensions: [
        ...defaults.moduleFileExtensions,
         'ts',
          'tsx'
    ],
    moduleDirectories: [
        "node_modules",
         "src"
    ],
    moduleNameMapper: {
        "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
        "\\.(gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.js"
    }
};