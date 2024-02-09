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
        exceptions: {
          "/ethermint.crypto.v1.ethsecp256k1.PrivKey": {
            aminoType: "ethermint/PrivKeyEthSecp256k1",
          },
          "/ethermint.crypto.v1.ethsecp256k1.PubKey": {
            aminoType: "ethermint/PubKeyEthSecp256k1",
          },
        },
        typeUrlToAmino: (typeUrl) => {
          /**
           * regex to match typeUrl, e.g.:
           * - typeUrl  : /ethermint.evm.v1.MsgUpdateParams
           * - mod      : ethermint
           * - submod   : evm
           * - version  : v1
           * - type     : MsgUpdateParams
           */
          const matcher =
            /^\/(?<mod>\w+)\.(?<submod>\w+)\.(?<version>\w+)\.(?<type>\w+)/;

          const { mod, submod, type } = typeUrl.match(matcher)?.groups ?? {};

          // https://github.com/circlefin/noble-cctp/blob/release-2024-01-09T183203/x/cctp/types/codec.go#L30-L56
          if (typeUrl.startsWith("/circle.cctp.v1.Msg")) {
            return typeUrl.replace("/circle.cctp.v1.Msg", "cctp/");
          }

          /**
           * lookup mod to assign primary MsgUpdateParams amino type, e.g.:
           *
           * - typeUrl  : ethermint.evm.v1.MsgUpdateParams
           * - mod      : ethermint
           * - submod   : evm
           * - type     : ethermint/MsgUpdateParams
           */
          const lookup = {
            ethermint: "evm",
            evmos: "revenue",
          };

          if (lookup[mod]) {
            if (type === "MsgUpdateParams" && lookup[mod] === submod) {
              return `${mod}/MsgUpdateParams`;
            }
            if (type === "MsgUpdateParams") {
              return `${mod}/${submod}/MsgUpdateParams`;
            }
            if (type.startsWith("Msg")) {
              return `${mod}/${type}`;
            }
            return `${submod}/${type}`;
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
        methods: {
          decode: true,
          encode: true,
          fromAmino: true,
          fromJSON: true,
          fromProto: true,
          toAmino: true,
          toJSON: true,
          toProto: true,
        },
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
