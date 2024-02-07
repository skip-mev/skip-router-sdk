// @ts-check

const fs = require("fs/promises");
const path = require("path");
const telescope = require("@cosmology/telescope").default;

async function codegen() {
  const cwd = process.cwd();
  const outPath = path.resolve(cwd, "packages/core/src/codegen/");
  await fs.rm(outPath, { recursive: true, force: true }).catch(() => {});
  await telescope({
    protoDirs: [
      "./node_modules/@protobufs/",
      path.resolve(cwd, "vendor/cosmos-proto/proto"),
      path.resolve(cwd, "vendor/cosmos-sdk/proto"),
      path.resolve(cwd, "vendor/evmos/proto"),
      path.resolve(cwd, "vendor/noble-cctp/proto"),
    ],
    outPath: path.resolve(cwd, "packages/core/src/codegen/"),
    options: {
      aminoEncoding: {
        customTypes: {
          useCosmosSDKDec: true,
        },
        enabled: true,
        typeUrlToAmino: (typeUrl) => {
          // https://github.com/circlefin/noble-cctp/blob/release-2024-01-09T183203/x/cctp/types/codec.go#L30-L56
          if (typeUrl.startsWith("/circle.cctp.v1.Msg")) {
            return typeUrl.replace("/circle.cctp.v1.Msg", "cctp/");
          }
        },
      },
      bundle: {
        enabled: false,
      },
      interfaces: {
        enabled: false,
        useByDefault: false,
        useUnionTypes: false,
      },
      lcdClients: {
        enabled: false,
      },
      prototypes: {
        addTypeUrlToDecoders: true,
        addTypeUrlToObjects: true,
        enableRegistryLoader: false,
        enabled: true,
        parser: {
          keepCase: false,
        },
        typingsFormat: {
          customTypes: {
            useCosmosSDKDec: true,
          },
          duration: "duration",
          num64: "bigint",
          timestamp: "date",
          useDeepPartial: false,
          useExact: false,
        },
      },
      rpcClients: {
        enabled: false,
      },
      stargateClients: {
        enabled: false,
      },
      tsDisable: {
        disableAll: true,
      },
    },
  });
}

void codegen();
