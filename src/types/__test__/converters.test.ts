import {
  affiliateFromJSON,
  affiliateToJSON,
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
  cosmWasmContractMsgFromJSON,
  cosmWasmContractMsgToJSON,
  feeAssetFromJSON,
  feeAssetToJSON,
  msgsRequestFromJSON,
  msgsRequestToJSON,
  multiChainMsgFromJSON,
  multiChainMsgToJSON,
  operationFromJSON,
  operationToJSON,
  postHandlerFromJSON,
  postHandlerToJSON,
  recommendAssetsRequestFromJSON,
  recommendAssetsRequestToJSON,
  routeRequestFromJSON,
  routeRequestToJSON,
  routeResponseFromJSON,
  routeResponseToJSON,
  submitTxRequestFromJSON,
  submitTxRequestToJSON,
  submitTxResponseFromJSON,
  submitTxResponseToJSON,
  swapExactCoinInFromJSON,
  swapExactCoinInToJSON,
  swapExactCoinOutFromJSON,
  swapExactCoinOutToJSON,
  swapFromJSON,
  swapOperationFromJSON,
  swapOperationToJSON,
  swapToJSON,
  swapVenueFromJSON,
  swapVenueToJSON,
  transferFromJSON,
  transferToJSON,
} from "../converters";
import {
  AffiliateJSON,
  AssetRecommendation,
  AssetRecommendationJSON,
  ChainJSON,
  FeeAssetJSON,
  MsgsRequestJSON,
  MultiChainMsgJSON,
  PostHandler,
  PostHandlerJSON,
  RecommendAssetsRequest,
  RecommendAssetsRequestJSON,
  SubmitTxRequestJSON,
  SubmitTxResponseJSON,
  SwapExactCoinInJSON,
  TransferJSON,
} from "../types";

test("affiliateFromJSON", () => {
  const affiliateJSON: AffiliateJSON = {
    address: "cosmos1xv9tklw7d82sezh9haa573wufgy59vmwe6xxe5",
    basis_points_fee: "100",
  };

  expect(affiliateFromJSON(affiliateJSON)).toEqual({
    address: "cosmos1xv9tklw7d82sezh9haa573wufgy59vmwe6xxe5",
    basisPointsFee: "100",
  });
});

test("affiliateToJSON", () => {
  const affiliate = {
    address: "cosmos1xv9tklw7d82sezh9haa573wufgy59vmwe6xxe5",
    basisPointsFee: "100",
  };

  expect(affiliateToJSON(affiliate)).toEqual({
    address: "cosmos1xv9tklw7d82sezh9haa573wufgy59vmwe6xxe5",
    basis_points_fee: "100",
  });
});

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

test("routeRequestFromJSON - given amount in", () => {
  const routeRequestJSON = {
    source_asset_chain_id: "osmosis-1",
    source_asset_denom: "uosmo",
    dest_asset_chain_id: "cosmoshub-4",
    dest_asset_denom: "uatom",
    amount_in: "1000000",

    cumulative_affiliate_fee_bps: "100",
    swap_venue: {
      name: "neutron-astroport",
      chain_id: "neutron-1",
    },
  };

  expect(routeRequestFromJSON(routeRequestJSON)).toEqual({
    sourceAssetChainID: "osmosis-1",
    sourceAssetDenom: "uosmo",
    destAssetChainID: "cosmoshub-4",
    destAssetDenom: "uatom",
    amountIn: "1000000",

    cumulativeAffiliateFeeBPS: "100",
    swapVenue: {
      name: "neutron-astroport",
      chainID: "neutron-1",
    },
  });
});

test("routeRequestFromJSON - given amount out", () => {
  const routeRequestJSON = {
    source_asset_chain_id: "osmosis-1",
    source_asset_denom: "uosmo",
    dest_asset_chain_id: "cosmoshub-4",
    dest_asset_denom: "uatom",
    amount_out: "1000000",

    cumulative_affiliate_fee_bps: "100",
    swap_venue: {
      name: "neutron-astroport",
      chain_id: "neutron-1",
    },
  };

  expect(routeRequestFromJSON(routeRequestJSON)).toEqual({
    sourceAssetChainID: "osmosis-1",
    sourceAssetDenom: "uosmo",
    destAssetChainID: "cosmoshub-4",
    destAssetDenom: "uatom",
    amountOut: "1000000",

    cumulativeAffiliateFeeBPS: "100",
    swapVenue: {
      name: "neutron-astroport",
      chainID: "neutron-1",
    },
  });
});

test("routeRequestToJSON - given amount in", () => {
  const routeRequest = {
    sourceAssetChainID: "osmosis-1",
    sourceAssetDenom: "uosmo",
    destAssetChainID: "cosmoshub-4",
    destAssetDenom: "uatom",
    amountIn: "1000000",

    cumulativeAffiliateFeeBPS: "100",
    swapVenue: {
      name: "neutron-astroport",
      chainID: "neutron-1",
    },
  };

  expect(routeRequestToJSON(routeRequest)).toEqual({
    source_asset_chain_id: "osmosis-1",
    source_asset_denom: "uosmo",
    dest_asset_chain_id: "cosmoshub-4",
    dest_asset_denom: "uatom",
    amount_in: "1000000",

    cumulative_affiliate_fee_bps: "100",
    swap_venue: {
      name: "neutron-astroport",
      chain_id: "neutron-1",
    },
  });
});

test("routeRequestToJSON - given amount out", () => {
  const routeRequest = {
    sourceAssetChainID: "osmosis-1",
    sourceAssetDenom: "uosmo",
    destAssetChainID: "cosmoshub-4",
    destAssetDenom: "uatom",
    amountOut: "1000000",

    cumulativeAffiliateFeeBPS: "100",
    swapVenue: {
      name: "neutron-astroport",
      chainID: "neutron-1",
    },
  };

  expect(routeRequestToJSON(routeRequest)).toEqual({
    source_asset_chain_id: "osmosis-1",
    source_asset_denom: "uosmo",
    dest_asset_chain_id: "cosmoshub-4",
    dest_asset_denom: "uatom",
    amount_out: "1000000",

    cumulative_affiliate_fee_bps: "100",
    swap_venue: {
      name: "neutron-astroport",
      chain_id: "neutron-1",
    },
  });
});

test("transferFromJSON", () => {
  const transferJSON: TransferJSON = {
    port: "transfer",
    channel: "channel-0",
    chain_id: "osmosis-1",
    pfm_enabled: true,
    dest_denom: "uatom",
    supports_memo: true,
  };

  expect(transferFromJSON(transferJSON)).toEqual({
    port: "transfer",
    channel: "channel-0",
    chainID: "osmosis-1",
    pfmEnabled: true,
    destDenom: "uatom",
    supportsMemo: true,
  });
});

test("transferToJSON", () => {
  const transfer = {
    port: "transfer",
    channel: "channel-0",
    chainID: "osmosis-1",
    pfmEnabled: true,
    destDenom: "uatom",
    supportsMemo: true,
  };

  expect(transferToJSON(transfer)).toEqual({
    port: "transfer",
    channel: "channel-0",
    chain_id: "osmosis-1",
    pfm_enabled: true,
    dest_denom: "uatom",
    supports_memo: true,
  });
});

test("swapOperationFromJSON", () => {
  const swapOperationJSON = {
    pool: "pool-0",
    denom_in: "uosmo",
    denom_out: "uatom",
  };

  expect(swapOperationFromJSON(swapOperationJSON)).toEqual({
    pool: "pool-0",
    denomIn: "uosmo",
    denomOut: "uatom",
  });
});

test("swapOperationToJSON", () => {
  const swapOperation = {
    pool: "pool-0",
    denomIn: "uosmo",
    denomOut: "uatom",
  };

  expect(swapOperationToJSON(swapOperation)).toEqual({
    pool: "pool-0",
    denom_in: "uosmo",
    denom_out: "uatom",
  });
});

test("swapExactCoinInFromJSON", () => {
  const swapExactCoinInJSON: SwapExactCoinInJSON = {
    swap_venue: {
      name: "neutron-astroport",
      chain_id: "neutron-1",
    },
    swap_operations: [
      {
        pool: "pool-0",
        denom_in: "uosmo",
        denom_out: "uatom",
      },
    ],
    swap_amount_in: "1000000",
  };

  expect(swapExactCoinInFromJSON(swapExactCoinInJSON)).toEqual({
    swapVenue: {
      name: "neutron-astroport",
      chainID: "neutron-1",
    },
    swapOperations: [
      {
        pool: "pool-0",
        denomIn: "uosmo",
        denomOut: "uatom",
      },
    ],
    swapAmountIn: "1000000",
  });
});

test("swapExactCoinInToJSON", () => {
  const swapExactCoinIn = {
    swapVenue: {
      name: "neutron-astroport",
      chainID: "neutron-1",
    },
    swapOperations: [
      {
        pool: "pool-0",
        denomIn: "uosmo",
        denomOut: "uatom",
      },
    ],
    swapAmountIn: "1000000",
  };

  expect(swapExactCoinInToJSON(swapExactCoinIn)).toEqual({
    swap_venue: {
      name: "neutron-astroport",
      chain_id: "neutron-1",
    },
    swap_operations: [
      {
        pool: "pool-0",
        denom_in: "uosmo",
        denom_out: "uatom",
      },
    ],
    swap_amount_in: "1000000",
  });
});

test("swapExactCoinOutFromJSON", () => {
  const swapExactCoinOutJSON = {
    swap_venue: {
      name: "neutron-astroport",
      chain_id: "neutron-1",
    },
    swap_operations: [
      {
        pool: "pool-0",
        denom_in: "uosmo",
        denom_out: "uatom",
      },
    ],
    swap_amount_out: "1000000",
  };

  expect(swapExactCoinOutFromJSON(swapExactCoinOutJSON)).toEqual({
    swapVenue: {
      name: "neutron-astroport",
      chainID: "neutron-1",
    },
    swapOperations: [
      {
        pool: "pool-0",
        denomIn: "uosmo",
        denomOut: "uatom",
      },
    ],
    swapAmountOut: "1000000",
  });
});

test("swapExactCoinOutToJSON", () => {
  const swapExactCoinOut = {
    swapVenue: {
      name: "neutron-astroport",
      chainID: "neutron-1",
    },
    swapOperations: [
      {
        pool: "pool-0",
        denomIn: "uosmo",
        denomOut: "uatom",
      },
    ],
    swapAmountOut: "1000000",
  };

  expect(swapExactCoinOutToJSON(swapExactCoinOut)).toEqual({
    swap_venue: {
      name: "neutron-astroport",
      chain_id: "neutron-1",
    },
    swap_operations: [
      {
        pool: "pool-0",
        denom_in: "uosmo",
        denom_out: "uatom",
      },
    ],
    swap_amount_out: "1000000",
  });
});

test("swapFromJSON - swap in", () => {
  const swapJSON = {
    swap_in: {
      swap_venue: {
        name: "neutron-astroport",
        chain_id: "neutron-1",
      },
      swap_operations: [
        {
          pool: "pool-0",
          denom_in: "uosmo",
          denom_out: "uatom",
        },
      ],
      swap_amount_in: "1000000",
    },
    estimated_affiliate_fee: "1000000",
  };

  expect(swapFromJSON(swapJSON)).toEqual({
    swapIn: {
      swapVenue: {
        name: "neutron-astroport",
        chainID: "neutron-1",
      },
      swapOperations: [
        {
          pool: "pool-0",
          denomIn: "uosmo",
          denomOut: "uatom",
        },
      ],
      swapAmountIn: "1000000",
    },
    estimatedAffiliateFee: "1000000",
  });
});

test("swapFromJSON - swap out", () => {
  const swapJSON = {
    swap_out: {
      swap_venue: {
        name: "neutron-astroport",
        chain_id: "neutron-1",
      },
      swap_operations: [
        {
          pool: "pool-0",
          denom_in: "uosmo",
          denom_out: "uatom",
        },
      ],
      swap_amount_out: "1000000",
    },
    estimated_affiliate_fee: "1000000",
  };

  expect(swapFromJSON(swapJSON)).toEqual({
    swapOut: {
      swapVenue: {
        name: "neutron-astroport",
        chainID: "neutron-1",
      },
      swapOperations: [
        {
          pool: "pool-0",
          denomIn: "uosmo",
          denomOut: "uatom",
        },
      ],
      swapAmountOut: "1000000",
    },
    estimatedAffiliateFee: "1000000",
  });
});

test("swapToJSON - swap in", () => {
  const swap = {
    swapIn: {
      swapVenue: {
        name: "neutron-astroport",
        chainID: "neutron-1",
      },
      swapOperations: [
        {
          pool: "pool-0",
          denomIn: "uosmo",
          denomOut: "uatom",
        },
      ],
      swapAmountIn: "1000000",
    },
    estimatedAffiliateFee: "1000000",
  };

  expect(swapToJSON(swap)).toEqual({
    swap_in: {
      swap_venue: {
        name: "neutron-astroport",
        chain_id: "neutron-1",
      },
      swap_operations: [
        {
          pool: "pool-0",
          denom_in: "uosmo",
          denom_out: "uatom",
        },
      ],
      swap_amount_in: "1000000",
    },
    estimated_affiliate_fee: "1000000",
  });
});

test("swapToJSON - swap out", () => {
  const swap = {
    swapOut: {
      swapVenue: {
        name: "neutron-astroport",
        chainID: "neutron-1",
      },
      swapOperations: [
        {
          pool: "pool-0",
          denomIn: "uosmo",
          denomOut: "uatom",
        },
      ],
      swapAmountOut: "1000000",
    },
    estimatedAffiliateFee: "1000000",
  };

  expect(swapToJSON(swap)).toEqual({
    swap_out: {
      swap_venue: {
        name: "neutron-astroport",
        chain_id: "neutron-1",
      },
      swap_operations: [
        {
          pool: "pool-0",
          denom_in: "uosmo",
          denom_out: "uatom",
        },
      ],
      swap_amount_out: "1000000",
    },
    estimated_affiliate_fee: "1000000",
  });
});

test("operationFromJSON - transfer", () => {
  const operationJSON = {
    transfer: {
      port: "transfer",
      channel: "channel-0",
      chain_id: "osmosis-1",
      pfm_enabled: true,
      dest_denom: "uatom",
      supports_memo: true,
    },
  };

  expect(operationFromJSON(operationJSON)).toEqual({
    transfer: {
      port: "transfer",
      channel: "channel-0",
      chainID: "osmosis-1",
      pfmEnabled: true,
      destDenom: "uatom",
      supportsMemo: true,
    },
  });
});

test("operationFromJSON - swap", () => {
  const operationJSON = {
    swap: {
      swap_in: {
        swap_venue: {
          name: "neutron-astroport",
          chain_id: "neutron-1",
        },
        swap_operations: [
          {
            pool: "pool-0",
            denom_in: "uosmo",
            denom_out: "uatom",
          },
        ],
        swap_amount_in: "1000000",
      },
      estimated_affiliate_fee: "1000000",
    },
  };

  expect(operationFromJSON(operationJSON)).toEqual({
    swap: {
      swapIn: {
        swapVenue: {
          name: "neutron-astroport",
          chainID: "neutron-1",
        },
        swapOperations: [
          {
            pool: "pool-0",
            denomIn: "uosmo",
            denomOut: "uatom",
          },
        ],
        swapAmountIn: "1000000",
      },
      estimatedAffiliateFee: "1000000",
    },
  });
});

test("operationToJSON - transfer", () => {
  const operation = {
    transfer: {
      port: "transfer",
      channel: "channel-0",
      chainID: "osmosis-1",
      pfmEnabled: true,
      destDenom: "uatom",
      supportsMemo: true,
    },
  };

  expect(operationToJSON(operation)).toEqual({
    transfer: {
      port: "transfer",
      channel: "channel-0",
      chain_id: "osmosis-1",
      pfm_enabled: true,
      dest_denom: "uatom",
      supports_memo: true,
    },
  });
});

test("operationToJSON - swap", () => {
  const operation = {
    swap: {
      swapIn: {
        swapVenue: {
          name: "neutron-astroport",
          chainID: "neutron-1",
        },
        swapOperations: [
          {
            pool: "pool-0",
            denomIn: "uosmo",
            denomOut: "uatom",
          },
        ],
        swapAmountIn: "1000000",
      },
      estimatedAffiliateFee: "1000000",
    },
  };

  expect(operationToJSON(operation)).toEqual({
    swap: {
      swap_in: {
        swap_venue: {
          name: "neutron-astroport",
          chain_id: "neutron-1",
        },
        swap_operations: [
          {
            pool: "pool-0",
            denom_in: "uosmo",
            denom_out: "uatom",
          },
        ],
        swap_amount_in: "1000000",
      },
      estimated_affiliate_fee: "1000000",
    },
  });
});

test("routeResponseFromJSON", () => {
  const routeResponseJSON = {
    source_asset_denom: "uosmo",
    source_asset_chain_id: "osmosis-1",
    dest_asset_denom: "uatom",
    dest_asset_chain_id: "cosmoshub-4",
    amount_in: "1000000",
    amount_out: "54906",
    operations: [
      {
        swap: {
          swap_in: {
            swap_venue: {
              name: "neutron-astroport",
              chain_id: "neutron-1",
            },
            swap_operations: [
              {
                pool: "pool-0",
                denom_in: "uosmo",
                denom_out: "uatom",
              },
            ],
            swap_amount_in: "1000000",
          },
          estimated_affiliate_fee: "1000000",
        },
      },
      {
        transfer: {
          port: "transfer",
          channel: "channel-0",
          chain_id: "osmosis-1",
          pfm_enabled: true,
          dest_denom: "uatom",
          supports_memo: true,
        },
      },
    ],
    chain_ids: ["osmosis-1", "cosmoshub-4"],
    does_swap: true,
    estimated_amount_out: "54906",
    swap_venue: { name: "osmosis-poolmanager", chain_id: "osmosis-1" },
    txs_required: 1,
  };

  expect(routeResponseFromJSON(routeResponseJSON)).toEqual({
    sourceAssetDenom: "uosmo",
    sourceAssetChainID: "osmosis-1",
    destAssetDenom: "uatom",
    destAssetChainID: "cosmoshub-4",
    amountIn: "1000000",
    amountOut: "54906",
    operations: [
      {
        swap: {
          swapIn: {
            swapVenue: {
              name: "neutron-astroport",
              chainID: "neutron-1",
            },
            swapOperations: [
              {
                pool: "pool-0",
                denomIn: "uosmo",
                denomOut: "uatom",
              },
            ],
            swapAmountIn: "1000000",
          },
          estimatedAffiliateFee: "1000000",
        },
      },
      {
        transfer: {
          port: "transfer",
          channel: "channel-0",
          chainID: "osmosis-1",
          pfmEnabled: true,
          destDenom: "uatom",
          supportsMemo: true,
        },
      },
    ],
    chainIDs: ["osmosis-1", "cosmoshub-4"],
    doesSwap: true,
    estimatedAmountOut: "54906",
    swapVenue: { name: "osmosis-poolmanager", chainID: "osmosis-1" },
    txsRequired: 1,
  });
});

test("routeResponseToJSON", () => {
  const routeResponse = {
    sourceAssetDenom: "uosmo",
    sourceAssetChainID: "osmosis-1",
    destAssetDenom: "uatom",
    destAssetChainID: "cosmoshub-4",
    amountIn: "1000000",
    amountOut: "54906",
    operations: [
      {
        swap: {
          swapIn: {
            swapVenue: {
              name: "neutron-astroport",
              chainID: "neutron-1",
            },
            swapOperations: [
              {
                pool: "pool-0",
                denomIn: "uosmo",
                denomOut: "uatom",
              },
            ],
            swapAmountIn: "1000000",
          },
          estimatedAffiliateFee: "1000000",
        },
      },
      {
        transfer: {
          port: "transfer",
          channel: "channel-0",
          chainID: "osmosis-1",
          pfmEnabled: true,
          destDenom: "uatom",
          supportsMemo: true,
        },
      },
    ],
    chainIDs: ["osmosis-1", "cosmoshub-4"],
    doesSwap: true,
    estimatedAmountOut: "54906",
    swapVenue: { name: "osmosis-poolmanager", chainID: "osmosis-1" },
    txsRequired: 1,
  };

  expect(routeResponseToJSON(routeResponse)).toEqual({
    source_asset_denom: "uosmo",
    source_asset_chain_id: "osmosis-1",
    dest_asset_denom: "uatom",
    dest_asset_chain_id: "cosmoshub-4",
    amount_in: "1000000",
    amount_out: "54906",
    operations: [
      {
        swap: {
          swap_in: {
            swap_venue: {
              name: "neutron-astroport",
              chain_id: "neutron-1",
            },
            swap_operations: [
              {
                pool: "pool-0",
                denom_in: "uosmo",
                denom_out: "uatom",
              },
            ],
            swap_amount_in: "1000000",
          },
          estimated_affiliate_fee: "1000000",
        },
      },
      {
        transfer: {
          port: "transfer",
          channel: "channel-0",
          chain_id: "osmosis-1",
          pfm_enabled: true,
          dest_denom: "uatom",
          supports_memo: true,
        },
      },
    ],
    chain_ids: ["osmosis-1", "cosmoshub-4"],
    does_swap: true,
    estimated_amount_out: "54906",
    swap_venue: { name: "osmosis-poolmanager", chain_id: "osmosis-1" },
    txs_required: 1,
  });
});

test("cosmWasmContractMsgFromJSON", () => {
  const cosmWasmContractMsgJSON = {
    contract_address: "cosmos1xv9tklw7d82sezh9haa573wufgy59vmwe6xxe5",
    msg: "cosmwasm message",
  };

  expect(cosmWasmContractMsgFromJSON(cosmWasmContractMsgJSON)).toEqual({
    contractAddress: "cosmos1xv9tklw7d82sezh9haa573wufgy59vmwe6xxe5",
    msg: "cosmwasm message",
  });
});

test("cosmWasmContractMsgToJSON", () => {
  const cosmWasmContractMsg = {
    contractAddress: "cosmos1xv9tklw7d82sezh9haa573wufgy59vmwe6xxe5",
    msg: "cosmwasm message",
  };

  expect(cosmWasmContractMsgToJSON(cosmWasmContractMsg)).toEqual({
    contract_address: "cosmos1xv9tklw7d82sezh9haa573wufgy59vmwe6xxe5",
    msg: "cosmwasm message",
  });
});

test("postHandlerFromJSON - wasm msg", () => {
  const postHandlerJSON = {
    wasm_msg: {
      contract_address: "cosmos1xv9tklw7d82sezh9haa573wufgy59vmwe6xxe5",
      msg: "cosmwasm message",
    },
  };

  expect(postHandlerFromJSON(postHandlerJSON)).toEqual({
    wasmMsg: {
      contractAddress: "cosmos1xv9tklw7d82sezh9haa573wufgy59vmwe6xxe5",
      msg: "cosmwasm message",
    },
  });
});

test("postHandlerFromJSON - autopilot msg", () => {
  const postHandlerJSON: PostHandlerJSON = {
    autopilot_msg: {
      receiver: "cosmos1xv9tklw7d82sezh9haa573wufgy59vmwe6xxe5",
      action: "LIQUID_STAKE",
    },
  };

  expect(postHandlerFromJSON(postHandlerJSON)).toEqual({
    autopilotMsg: {
      receiver: "cosmos1xv9tklw7d82sezh9haa573wufgy59vmwe6xxe5",
      action: "LIQUID_STAKE",
    },
  });
});

test("postHandlerToJSON - wasm msg", () => {
  const postHandler = {
    wasmMsg: {
      contractAddress: "cosmos1xv9tklw7d82sezh9haa573wufgy59vmwe6xxe5",
      msg: "cosmwasm message",
    },
  };

  expect(postHandlerToJSON(postHandler)).toEqual({
    wasm_msg: {
      contract_address: "cosmos1xv9tklw7d82sezh9haa573wufgy59vmwe6xxe5",
      msg: "cosmwasm message",
    },
  });
});

test("postHandlerToJSON - autopilot msg", () => {
  const postHandler: PostHandler = {
    autopilotMsg: {
      receiver: "cosmos1xv9tklw7d82sezh9haa573wufgy59vmwe6xxe5",
      action: "LIQUID_STAKE",
    },
  };

  expect(postHandlerToJSON(postHandler)).toEqual({
    autopilot_msg: {
      receiver: "cosmos1xv9tklw7d82sezh9haa573wufgy59vmwe6xxe5",
      action: "LIQUID_STAKE",
    },
  });
});

test("msgsRequestFromJSON", () => {
  const msgsRequestJSON: MsgsRequestJSON = {
    source_asset_denom: "uosmo",
    source_asset_chain_id: "osmosis-1",
    dest_asset_denom: "uatom",
    dest_asset_chain_id: "cosmoshub-4",
    amount_in: "1000000",
    amount_out: "54906",
    address_list: [
      "cosmos1xv9tklw7d82sezh9haa573wufgy59vmwe6xxe5",
      "cosmos1xv9tklw7d82sezh9haa573wufgy59vmwe6xxe5",
    ],
    operations: [
      {
        swap: {
          swap_in: {
            swap_venue: {
              name: "neutron-astroport",
              chain_id: "neutron-1",
            },
            swap_operations: [
              {
                pool: "pool-0",
                denom_in: "uosmo",
                denom_out: "uatom",
              },
            ],
            swap_amount_in: "1000000",
          },
          estimated_affiliate_fee: "1000000",
        },
      },
      {
        transfer: {
          port: "transfer",
          channel: "channel-0",
          chain_id: "osmosis-1",
          pfm_enabled: true,
          dest_denom: "uatom",
          supports_memo: true,
        },
      },
    ],

    estimated_amount_out: "54906",
    slippage_tolerance_percent: "0.01",
    affiliates: [
      {
        address: "cosmos1xv9tklw7d82sezh9haa573wufgy59vmwe6xxe5",
        basis_points_fee: "100",
      },
    ],
    post_route_handler: {
      wasm_msg: {
        contract_address: "cosmos1xv9tklw7d82sezh9haa573wufgy59vmwe6xxe5",
        msg: "cosmwasm message",
      },
    },
  };

  expect(msgsRequestFromJSON(msgsRequestJSON)).toEqual({
    sourceAssetDenom: "uosmo",
    sourceAssetChainID: "osmosis-1",
    destAssetDenom: "uatom",
    destAssetChainID: "cosmoshub-4",
    amountIn: "1000000",
    amountOut: "54906",
    addressList: [
      "cosmos1xv9tklw7d82sezh9haa573wufgy59vmwe6xxe5",
      "cosmos1xv9tklw7d82sezh9haa573wufgy59vmwe6xxe5",
    ],
    operations: [
      {
        swap: {
          swapIn: {
            swapVenue: {
              name: "neutron-astroport",
              chainID: "neutron-1",
            },
            swapOperations: [
              {
                pool: "pool-0",
                denomIn: "uosmo",
                denomOut: "uatom",
              },
            ],
            swapAmountIn: "1000000",
          },
          estimatedAffiliateFee: "1000000",
        },
      },
      {
        transfer: {
          port: "transfer",
          channel: "channel-0",
          chainID: "osmosis-1",
          pfmEnabled: true,
          destDenom: "uatom",
          supportsMemo: true,
        },
      },
    ],

    estimatedAmountOut: "54906",
    slippageTolerancePercent: "0.01",
    affiliates: [
      {
        address: "cosmos1xv9tklw7d82sezh9haa573wufgy59vmwe6xxe5",
        basisPointsFee: "100",
      },
    ],
    postRouteHandler: {
      wasmMsg: {
        contractAddress: "cosmos1xv9tklw7d82sezh9haa573wufgy59vmwe6xxe5",
        msg: "cosmwasm message",
      },
    },
  });
});

test("msgsRequestToJSON", () => {
  const msgsRequest = {
    sourceAssetDenom: "uosmo",
    sourceAssetChainID: "osmosis-1",
    destAssetDenom: "uatom",
    destAssetChainID: "cosmoshub-4",
    amountIn: "1000000",
    amountOut: "54906",
    addressList: [
      "cosmos1xv9tklw7d82sezh9haa573wufgy59vmwe6xxe5",
      "cosmos1xv9tklw7d82sezh9haa573wufgy59vmwe6xxe5",
    ],
    operations: [
      {
        swap: {
          swapIn: {
            swapVenue: {
              name: "neutron-astroport",
              chainID: "neutron-1",
            },
            swapOperations: [
              {
                pool: "pool-0",
                denomIn: "uosmo",
                denomOut: "uatom",
              },
            ],
            swapAmountIn: "1000000",
          },
          estimatedAffiliateFee: "1000000",
        },
      },
      {
        transfer: {
          port: "transfer",
          channel: "channel-0",
          chainID: "osmosis-1",
          pfmEnabled: true,
          destDenom: "uatom",
          supportsMemo: true,
        },
      },
    ],

    estimatedAmountOut: "54906",
    slippageTolerancePercent: "0.01",
    affiliates: [
      {
        address: "cosmos1xv9tklw7d82sezh9haa573wufgy59vmwe6xxe5",
        basisPointsFee: "100",
      },
    ],
    postRouteHandler: {
      wasmMsg: {
        contractAddress: "cosmos1xv9tklw7d82sezh9haa573wufgy59vmwe6xxe5",
        msg: "cosmwasm message",
      },
    },
  };

  expect(msgsRequestToJSON(msgsRequest)).toEqual({
    source_asset_denom: "uosmo",
    source_asset_chain_id: "osmosis-1",
    dest_asset_denom: "uatom",
    dest_asset_chain_id: "cosmoshub-4",
    amount_in: "1000000",
    amount_out: "54906",
    address_list: [
      "cosmos1xv9tklw7d82sezh9haa573wufgy59vmwe6xxe5",
      "cosmos1xv9tklw7d82sezh9haa573wufgy59vmwe6xxe5",
    ],
    operations: [
      {
        swap: {
          swap_in: {
            swap_venue: {
              name: "neutron-astroport",
              chain_id: "neutron-1",
            },
            swap_operations: [
              {
                pool: "pool-0",
                denom_in: "uosmo",
                denom_out: "uatom",
              },
            ],
            swap_amount_in: "1000000",
          },
          estimated_affiliate_fee: "1000000",
        },
      },
      {
        transfer: {
          port: "transfer",
          channel: "channel-0",
          chain_id: "osmosis-1",
          pfm_enabled: true,
          dest_denom: "uatom",
          supports_memo: true,
        },
      },
    ],

    estimated_amount_out: "54906",
    slippage_tolerance_percent: "0.01",
    affiliates: [
      {
        address: "cosmos1xv9tklw7d82sezh9haa573wufgy59vmwe6xxe5",
        basis_points_fee: "100",
      },
    ],
    post_route_handler: {
      wasm_msg: {
        contract_address: "cosmos1xv9tklw7d82sezh9haa573wufgy59vmwe6xxe5",
        msg: "cosmwasm message",
      },
    },
  });
});

test("multiChainMsgFromJSON", () => {
  const multiChainMsgJSON: MultiChainMsgJSON = {
    chain_id: "osmosis-1",
    path: ["osmosis-1", "cosmoshub-4"],
    msg: "message",
    msg_type_url: "/cosmos.bank.v1beta1.MsgSend",
  };

  expect(multiChainMsgFromJSON(multiChainMsgJSON)).toEqual({
    chainID: "osmosis-1",
    path: ["osmosis-1", "cosmoshub-4"],
    msg: "message",
    msgTypeURL: "/cosmos.bank.v1beta1.MsgSend",
  });
});

test("multiChainMsgToJSON", () => {
  const multiChainMsg = {
    chainID: "osmosis-1",
    path: ["osmosis-1", "cosmoshub-4"],
    msg: "message",
    msgTypeURL: "/cosmos.bank.v1beta1.MsgSend",
  };

  expect(multiChainMsgToJSON(multiChainMsg)).toEqual({
    chain_id: "osmosis-1",
    path: ["osmosis-1", "cosmoshub-4"],
    msg: "message",
    msg_type_url: "/cosmos.bank.v1beta1.MsgSend",
  });
});

test("submitTxRequestFromJSON", () => {
  const submitTxRequestJSON: SubmitTxRequestJSON = {
    tx: "txbytes123",
    chain_id: "osmosis-1",
  };

  expect(submitTxRequestFromJSON(submitTxRequestJSON)).toEqual({
    tx: "txbytes123",
    chainID: "osmosis-1",
  });
});

test("submitTxRequestToJSON", () => {
  const submitTxRequest = {
    tx: "txbytes123",
    chainID: "osmosis-1",
  };

  expect(submitTxRequestToJSON(submitTxRequest)).toEqual({
    tx: "txbytes123",
    chain_id: "osmosis-1",
  });
});

test("submitTxResponseFromJSON", () => {
  const submitTxResponseJSON: SubmitTxResponseJSON = {
    tx_hash: "txid123",
    success: true,
  };

  expect(submitTxResponseFromJSON(submitTxResponseJSON)).toEqual({
    txHash: "txid123",
    success: true,
  });
});

test("submitTxResponseToJSON", () => {
  const submitTxResponse = {
    txHash: "txid123",
    success: true,
  };

  expect(submitTxResponseToJSON(submitTxResponse)).toEqual({
    tx_hash: "txid123",
    success: true,
  });
});
