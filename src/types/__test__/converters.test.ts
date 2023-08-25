import {
  assetFromJSON,
  assetRecommendationFromJSON,
  assetRecommendationToJSON,
  assetsFromSourceRequestFromJSON,
  assetsFromSourceRequestToJSON,
  assetsRequestFromJSON,
  assetsRequestToJSON,
  assetToJSON,
  chainFromJSON,
  chainToJSON,
  feeAssetFromJSON,
  feeAssetToJSON,
  recommendAssetsRequestFromJSON,
  recommendAssetsRequestToJSON,
  swapVenueFromJSON,
  swapVenueToJSON,
} from "../converters";
import {
  AssetRecommendation,
  AssetRecommendationJSON,
  ChainJSON,
  FeeAssetJSON,
  RecommendAssetsRequest,
  RecommendAssetsRequestJSON,
} from "../types";

test("assetFromJSON", () => {
  const assetJSON = {
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
  };

  expect(assetFromJSON(assetJSON)).toEqual({
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
  });
});

test("assetToJSON", () => {
  const asset = {
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
  };

  expect(assetToJSON(asset)).toEqual({
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
  });
});

test("assetRecommendationFromJSON", () => {
  const assetRecommendationJSON: AssetRecommendationJSON = {
    asset: {
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
    reason: "MOST_LIQUID",
  };

  expect(assetRecommendationFromJSON(assetRecommendationJSON)).toEqual({
    asset: {
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
    reason: "MOST_LIQUID",
  });
});

test("assetRecommendationToJSON", () => {
  const assetRecommendation: AssetRecommendation = {
    asset: {
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
    reason: "MOST_LIQUID",
  };

  expect(assetRecommendationToJSON(assetRecommendation)).toEqual({
    asset: {
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
    reason: "MOST_LIQUID",
  });
});

test("assetsFromSourceRequestFromJSON", () => {
  const assetsFromSourceRequestJSON = {
    source_asset_denom: "uosmo",
    source_asset_chain_id: "osmosis-1",
    allow_multi_tx: true,
  };

  expect(assetsFromSourceRequestFromJSON(assetsFromSourceRequestJSON)).toEqual({
    sourceAssetDenom: "uosmo",
    sourceAssetChainID: "osmosis-1",
    allowMultiTx: true,
  });
});

test("assetsFromSourceRequestToJSON", () => {
  const assetsFromSourceRequest = {
    sourceAssetDenom: "uosmo",
    sourceAssetChainID: "osmosis-1",
    allowMultiTx: true,
  };

  expect(assetsFromSourceRequestToJSON(assetsFromSourceRequest)).toEqual({
    source_asset_denom: "uosmo",
    source_asset_chain_id: "osmosis-1",
    allow_multi_tx: true,
  });
});

test("assetsRequestFromJSON", () => {
  const assetsRequestJSON = {
    chain_id: "osmosis-1",
    native_only: true,
    include_no_metadata_assets: true,
  };

  expect(assetsRequestFromJSON(assetsRequestJSON)).toEqual({
    chainID: "osmosis-1",
    nativeOnly: true,
    includeNoMetadataAssets: true,
  });
});

test("assetsRequestToJSON", () => {
  const assetsRequest = {
    chainID: "osmosis-1",
    nativeOnly: true,
    includeNoMetadataAssets: true,
  };

  expect(assetsRequestToJSON(assetsRequest)).toEqual({
    chain_id: "osmosis-1",
    native_only: true,
    include_no_metadata_assets: true,
  });
});

test("chainFromJSON", () => {
  const chainJSON: ChainJSON = {
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
      "github.com/strangelove-ventures/packet-forward-middleware": {
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
  };

  expect(chainFromJSON(chainJSON)).toEqual({
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
  });
});

test("chainToJSON", () => {
  const chain = {
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
  };

  expect(chainToJSON(chain)).toEqual({
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
      "github.com/strangelove-ventures/packet-forward-middleware": {
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
  });
});

test("feeAssetFromJSON", () => {
  const feeAssetJSON: FeeAssetJSON = {
    denom: "uosmo",
    gas_price: {
      low: "0.0025",
      average: "0.025",
      high: "0.04",
    },
  };

  expect(feeAssetFromJSON(feeAssetJSON)).toEqual({
    denom: "uosmo",
    gasPrice: {
      low: "0.0025",
      average: "0.025",
      high: "0.04",
    },
  });
});

test("feeAssetToJSON", () => {
  const feeAsset = {
    denom: "uosmo",
    gasPrice: {
      low: "0.0025",
      average: "0.025",
      high: "0.04",
    },
  };

  expect(feeAssetToJSON(feeAsset)).toEqual({
    denom: "uosmo",
    gas_price: {
      low: "0.0025",
      average: "0.025",
      high: "0.04",
    },
  });
});

test("recommendAssetsRequestFromJSON", () => {
  const recommendAssetsRequestJSON: RecommendAssetsRequestJSON = {
    source_asset_denom: "uosmo",
    source_asset_chain_id: "osmosis-1",
    dest_chain_id: "neutron-1",
    reason: "MOST_LIQUID",
  };

  expect(recommendAssetsRequestFromJSON(recommendAssetsRequestJSON)).toEqual({
    sourceAssetDenom: "uosmo",
    sourceAssetChainID: "osmosis-1",
    destChainID: "neutron-1",
    reason: "MOST_LIQUID",
  });
});

test("recommendAssetsRequestToJSON", () => {
  const recommendAssetsRequest: RecommendAssetsRequest = {
    sourceAssetDenom: "uosmo",
    sourceAssetChainID: "osmosis-1",
    destChainID: "neutron-1",
    reason: "MOST_LIQUID",
  };

  expect(recommendAssetsRequestToJSON(recommendAssetsRequest)).toEqual({
    source_asset_denom: "uosmo",
    source_asset_chain_id: "osmosis-1",
    dest_chain_id: "neutron-1",
    reason: "MOST_LIQUID",
  });
});

test("swapVenueFromJSON", () => {
  const swapVenueJSON = {
    name: "neutron-astroport",
    chain_id: "neutron-1",
  };

  expect(swapVenueFromJSON(swapVenueJSON)).toEqual({
    name: "neutron-astroport",
    chainID: "neutron-1",
  });
});

test("swapVenueToJSON", () => {
  const swapVenue = {
    name: "neutron-astroport",
    chainID: "neutron-1",
  };

  expect(swapVenueToJSON(swapVenue)).toEqual({
    name: "neutron-astroport",
    chain_id: "neutron-1",
  });
});
