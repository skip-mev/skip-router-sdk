/* eslint-disable @typescript-eslint/no-var-requires */
const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig");

const esModules = [
  "@evmos/provider",
  "@evmos/transactions",
  "@evmos/eip712",
  "@evmos/proto",
  "@buf/cosmos_cosmos-sdk.bufbuild_es",
  "@buf/evmos_evmos.bufbuild_es",
  "@buf/cosmos_ibc.bufbuild_es",
].join("|");

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>"],
  modulePaths: [compilerOptions.baseUrl], // <-- This will be set to 'baseUrl' value
  moduleNameMapper: pathsToModuleNameMapper(
    compilerOptions.paths /*, { prefix: '<rootDir>/' } */,
  ),
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
  transform: {
    "^.+\\.js$": "babel-jest",
  },
};
