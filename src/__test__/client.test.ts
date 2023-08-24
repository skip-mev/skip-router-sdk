import { rest } from "msw";
import { setupServer } from "msw/node";

import { SKIP_API_URL, SkipAPIClient } from "../client";
import { Chain, ChainJSON } from "../types/types";

export const server = setupServer();

describe("client", () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  describe("/v1/info/chains", () => {
    it("handles 200 OK", async () => {
      server.use(
        rest.get("https://api.skip.money/v1/info/chains", (_, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json({
              chains: [
                {
                  chain_name: "osmosis",
                  chain_id: "osmosis-1",
                  pfm_enabled: true,
                  cosmos_sdk_version: "v0.47.3",
                  modules: {
                    "github.com/cosmos/ibc-go": {
                      path: "github.com/cosmos/ibc-go/v4",
                      version: "v4.3.1",
                      sum: "h1:xbg0CaCdxK3lvgGvSaI91ROOLd7s30UqEcexH6Ba4Ys=",
                    },
                    "github.com/osmosis-labs/osmosis/x/ibc-hooks": {
                      path: "github.com/osmosis-labs/osmosis/x/ibc-hooks",
                      version: "v0.0.7",
                      sum: "h1:rd5guXn/SF6i66PO5rlGaDK0AT81kCpiLixyQ5EJ6Yg=",
                    },
                    "github.com/strangelove-ventures/packet-forward-middleware":
                      {
                        path: "github.com/strangelove-ventures/packet-forward-middleware/v4",
                        version: "v4.0.5",
                        sum: "h1:KKUqeGhVBK38+1LwThC8IeIcsJZ6COX5kvhiJroFqCM=",
                      },
                  },
                  cosmos_module_support: {
                    authz: true,
                    feegrant: false,
                  },
                  supports_memo: true,
                  logo_uri:
                    "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmosis-chain-logo.png",
                  bech32_prefix: "osmo",
                  fee_assets: [
                    {
                      denom: "uosmo",
                      gas_price: {
                        low: "0.0025",
                        average: "0.025",
                        high: "0.04",
                      },
                    },
                  ],
                },
              ] as ChainJSON[],
            }),
          );
        }),
      );

      const client = new SkipAPIClient(SKIP_API_URL);

      const response = await client.chains();

      expect(response).toEqual([
        {
          chainName: "osmosis",
          chainID: "osmosis-1",
          pfmEnabled: true,
          cosmosSDKVersion: "v0.47.3",
          modules: {
            "github.com/cosmos/ibc-go": {
              path: "github.com/cosmos/ibc-go/v4",
              version: "v4.3.1",
              sum: "h1:xbg0CaCdxK3lvgGvSaI91ROOLd7s30UqEcexH6Ba4Ys=",
            },
            "github.com/osmosis-labs/osmosis/x/ibc-hooks": {
              path: "github.com/osmosis-labs/osmosis/x/ibc-hooks",
              version: "v0.0.7",
              sum: "h1:rd5guXn/SF6i66PO5rlGaDK0AT81kCpiLixyQ5EJ6Yg=",
            },
            "github.com/strangelove-ventures/packet-forward-middleware": {
              path: "github.com/strangelove-ventures/packet-forward-middleware/v4",
              version: "v4.0.5",
              sum: "h1:KKUqeGhVBK38+1LwThC8IeIcsJZ6COX5kvhiJroFqCM=",
            },
          },
          cosmosModuleSupport: {
            authz: true,
            feegrant: false,
          },
          supportsMemo: true,
          logoURI:
            "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmosis-chain-logo.png",
          bech32Prefix: "osmo",
          feeAssets: [
            {
              denom: "uosmo",
              gasPrice: {
                low: "0.0025",
                average: "0.025",
                high: "0.04",
              },
            },
          ],
        },
      ] as Chain[]);
    });
  });

  describe("/v1/fungible/assets", () => {
    it("handles 200 OK", async () => {
      server.use(
        rest.get("https://api.skip.money/v1/fungible/assets", (_, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json({
              chain_to_assets_map: {
                "cosmoshub-4": {
                  assets: [
                    {
                      denom:
                        "ibc/6B8A3F5C2AD51CD6171FA41A7E8C35AD594AB69226438DB94450436EA57B3A89",
                      chain_id: "cosmoshub-4",
                      origin_denom: "ustrd",
                      origin_chain_id: "stride-1",
                      trace: "transfer/channel-391",
                      symbol: "STRD",
                      name: "STRD",
                      logo_uri:
                        "https://raw.githubusercontent.com/cosmostation/chainlist/main/chain/stride/asset/strd.png",
                      decimals: 6,
                    },
                    {
                      denom: "uatom",
                      chain_id: "cosmoshub-4",
                      origin_denom: "uatom",
                      origin_chain_id: "cosmoshub-4",
                      trace: "",
                      symbol: "ATOM",
                      name: "ATOM",
                      logo_uri:
                        "https://raw.githubusercontent.com/cosmostation/chainlist/main/chain/cosmos/asset/atom.png",
                      decimals: 6,
                    },
                  ],
                },
                "osmosis-1": {
                  assets: [
                    {
                      denom: "uosmo",
                      chain_id: "osmosis-1",
                      origin_denom: "uosmo",
                      origin_chain_id: "osmosis-1",
                      trace: "",
                      symbol: "OSMO",
                      name: "OSMO",
                      logo_uri:
                        "https://raw.githubusercontent.com/cosmostation/chainlist/main/chain/osmosis/asset/osmo.png",
                      decimals: 6,
                    },
                  ],
                },
              },
            }),
          );
        }),
      );

      const client = new SkipAPIClient(SKIP_API_URL);

      const assets = await client.assets();

      expect(assets).toEqual({
        "cosmoshub-4": [
          {
            denom:
              "ibc/6B8A3F5C2AD51CD6171FA41A7E8C35AD594AB69226438DB94450436EA57B3A89",
            chainID: "cosmoshub-4",
            originDenom: "ustrd",
            originChainID: "stride-1",
            trace: "transfer/channel-391",
            symbol: "STRD",
            name: "STRD",
            logoURI:
              "https://raw.githubusercontent.com/cosmostation/chainlist/main/chain/stride/asset/strd.png",
            decimals: 6,
          },
          {
            denom: "uatom",
            chainID: "cosmoshub-4",
            originDenom: "uatom",
            originChainID: "cosmoshub-4",
            trace: "",
            symbol: "ATOM",
            name: "ATOM",
            logoURI:
              "https://raw.githubusercontent.com/cosmostation/chainlist/main/chain/cosmos/asset/atom.png",
            decimals: 6,
          },
        ],
        "osmosis-1": [
          {
            denom: "uosmo",
            chainID: "osmosis-1",
            originDenom: "uosmo",
            originChainID: "osmosis-1",
            trace: "",
            symbol: "OSMO",
            name: "OSMO",
            logoURI:
              "https://raw.githubusercontent.com/cosmostation/chainlist/main/chain/osmosis/asset/osmo.png",
            decimals: 6,
          },
        ],
      });
    });

    it("handles 200 OK - with parameters", async () => {
      server.use(
        rest.get(
          "https://api.skip.money/v1/fungible/assets",
          (req, res, ctx) => {
            const chainID = req.url.searchParams.get("chain_id");
            const nativeOnly = req.url.searchParams.get("native_only");
            const includeNoMetadataAssets = req.url.searchParams.get(
              "include_no_metadata_assets",
            );

            if (chainID && nativeOnly && includeNoMetadataAssets) {
              return res(
                ctx.status(200),
                ctx.json({
                  chain_to_assets_map: {
                    "osmosis-1": {
                      assets: [
                        {
                          denom: "uosmo",
                          chain_id: "osmosis-1",
                          origin_denom: "uosmo",
                          origin_chain_id: "osmosis-1",
                          trace: "",
                          symbol: "OSMO",
                          name: "OSMO",
                          logo_uri:
                            "https://raw.githubusercontent.com/cosmostation/chainlist/main/chain/osmosis/asset/osmo.png",
                          decimals: 6,
                        },
                      ],
                    },
                  },
                }),
              );
            }

            return res(
              ctx.status(500),
              ctx.json({ message: "should not have reached this" }),
            );
          },
        ),
      );

      const client = new SkipAPIClient(SKIP_API_URL);

      const assets = await client.assets({
        chainID: "osmosis-1",
        nativeOnly: true,
        includeNoMetadataAssets: true,
      });

      expect(assets).toEqual({
        "osmosis-1": [
          {
            denom: "uosmo",
            chainID: "osmosis-1",
            originDenom: "uosmo",
            originChainID: "osmosis-1",
            trace: "",
            symbol: "OSMO",
            name: "OSMO",
            logoURI:
              "https://raw.githubusercontent.com/cosmostation/chainlist/main/chain/osmosis/asset/osmo.png",
            decimals: 6,
          },
        ],
      });
    });

    it("handles 400 Bad Request", async () => {
      server.use(
        rest.get("https://api.skip.money/v1/fungible/assets", (_, res, ctx) => {
          return res(
            ctx.status(400),
            ctx.json({
              code: 3,
              message: "Invalid chain_id",
              details: [],
            }),
          );
        }),
      );

      const client = new SkipAPIClient(SKIP_API_URL);

      await expect(client.assets()).rejects.toThrow("Invalid chain_id");
    });

    it("handles 500 Internal Server Error", async () => {
      server.use(
        rest.get("https://api.skip.money/v1/fungible/assets", (_, res, ctx) => {
          return res(
            ctx.status(500),
            ctx.json({
              code: 2,
              message: "internal server error",
              details: [],
            }),
          );
        }),
      );

      const client = new SkipAPIClient(SKIP_API_URL);

      await expect(client.assets()).rejects.toThrow("internal server error");
    });
  });

  describe("/v1/fungible/assets_from_source", () => {
    it("handles 200 OK", async () => {
      server.use(
        rest.post(
          "https://api.skip.money/v1/fungible/assets_from_source",
          (_, res, ctx) => {
            return res(
              ctx.status(200),
              ctx.json({
                dest_assets: {
                  "osmosis-1": {
                    assets: [
                      {
                        denom:
                          "ibc/14F9BC3E44B8A9C1BE1FB08980FAB87034C9905EF17CF2F5008FC085218811CC",
                        chain_id: "cosmoshub-4",
                        origin_denom: "uosmo",
                        origin_chain_id: "osmosis-1",
                        trace: "transfer/channel-141",
                        symbol: "OSMO",
                        name: "OSMO",
                        logo_uri:
                          "https://raw.githubusercontent.com/cosmostation/chainlist/main/chain/osmosis/asset/osmo.png",
                        decimals: 6,
                      },
                    ],
                  },
                  "neutron-1": {
                    assets: [
                      {
                        denom:
                          "ibc/376222D6D9DAE23092E29740E56B758580935A6D77C24C2ABD57A6A78A1F3955",
                        chain_id: "neutron-1",
                        origin_denom: "uosmo",
                        origin_chain_id: "osmosis-1",
                        trace: "transfer/channel-10",
                        symbol: "OSMO",
                        name: "OSMO",
                        logo_uri:
                          "https://raw.githubusercontent.com/cosmostation/chainlist/main/chain/osmosis/asset/osmo.png",
                        decimals: 6,
                      },
                    ],
                  },
                },
              }),
            );
          },
        ),
      );

      const client = new SkipAPIClient(SKIP_API_URL);

      const assetsFromSource = await client.assetsFromSource({
        sourceAssetChainID: "osmosis-1",
        sourceAssetDenom: "uosmo",
      });

      expect(assetsFromSource).toEqual({
        "osmosis-1": [
          {
            denom:
              "ibc/14F9BC3E44B8A9C1BE1FB08980FAB87034C9905EF17CF2F5008FC085218811CC",
            chainID: "cosmoshub-4",
            originDenom: "uosmo",
            originChainID: "osmosis-1",
            trace: "transfer/channel-141",
            symbol: "OSMO",
            name: "OSMO",
            logoURI:
              "https://raw.githubusercontent.com/cosmostation/chainlist/main/chain/osmosis/asset/osmo.png",
            decimals: 6,
          },
        ],
        "neutron-1": [
          {
            denom:
              "ibc/376222D6D9DAE23092E29740E56B758580935A6D77C24C2ABD57A6A78A1F3955",
            chainID: "neutron-1",
            originDenom: "uosmo",
            originChainID: "osmosis-1",
            trace: "transfer/channel-10",
            symbol: "OSMO",
            name: "OSMO",
            logoURI:
              "https://raw.githubusercontent.com/cosmostation/chainlist/main/chain/osmosis/asset/osmo.png",
            decimals: 6,
          },
        ],
      });
    });

    it("handles 400 Bad Request", async () => {
      server.use(
        rest.post(
          "https://api.skip.money/v1/fungible/assets_from_source",
          (_, res, ctx) => {
            return res(
              ctx.status(400),
              ctx.json({
                code: 3,
                message: "Invalid source_asset_chain_id",
                details: [],
              }),
            );
          },
        ),
      );

      const client = new SkipAPIClient(SKIP_API_URL);

      await expect(
        client.assetsFromSource({
          sourceAssetChainID: "osmosis-1",
          sourceAssetDenom: "uosmo",
        }),
      ).rejects.toThrow("Invalid source_asset_chain_id");
    });

    it("handles 500 Internal Server Error", async () => {
      server.use(
        rest.post(
          "https://api.skip.money/v1/fungible/assets_from_source",
          (_, res, ctx) => {
            return res(
              ctx.status(500),
              ctx.json({
                code: 2,
                message: "internal server error",
                details: [],
              }),
            );
          },
        ),
      );

      const client = new SkipAPIClient(SKIP_API_URL);

      await expect(
        client.assetsFromSource({
          sourceAssetChainID: "osmosis-1",
          sourceAssetDenom: "uosmo",
        }),
      ).rejects.toThrow("internal server error");
    });
  });

  describe("/v1/fungible/venues", () => {
    it("handles 200 OK", async () => {
      server.use(
        rest.get("https://api.skip.money/v1/fungible/venues", (_, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json({
              venues: [
                {
                  name: "neutron-astroport",
                  chain_id: "neutron-1",
                },
                {
                  name: "osmosis-poolmanager",
                  chain_id: "osmosis-1",
                },
              ],
            }),
          );
        }),
      );

      const client = new SkipAPIClient(SKIP_API_URL);

      const response = await client.venues();

      expect(response).toEqual([
        {
          name: "neutron-astroport",
          chainID: "neutron-1",
        },
        {
          name: "osmosis-poolmanager",
          chainID: "osmosis-1",
        },
      ]);
    });
  });
});
