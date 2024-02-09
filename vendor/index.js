// @ts-check

const path = require("path");

const protoDirs = [
  path.resolve(__dirname, "../node_modules/@protobufs/"),
  path.resolve(__dirname, "cosmos-proto/proto"),
  path.resolve(__dirname, "cosmos-sdk/proto"),
  path.resolve(__dirname, "evmos/proto"),
  path.resolve(__dirname, "noble-cctp/proto"),
];

module.exports = protoDirs;
