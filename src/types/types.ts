export type Reason = "UNKNOWN" | "BASE_TOKEN" | "MOST_LIQUID" | "DIRECT";

export type AssetJSON = {
  denom: string;
  chain_id: string;

  origin_denom: string;
  origin_chain_id: string;
  trace: string;

  symbol?: string;
  name?: string;
  logo_uri?: string;
  decimals?: number;
};

export type Asset = {
  denom: string;
  chainID: string;

  originDenom: string;
  originChainID: string;
  trace: string;

  symbol?: string;
  name?: string;
  logoURI?: string;
  decimals?: number;
};

export type AssetsFromSourceRequestJSON = {
  source_asset_denom: string;
  source_asset_chain_id: string;
  allow_multi_tx?: boolean;
};

export type AssetsFromSourceRequest = {
  sourceAssetDenom: string;
  sourceAssetChainID: string;
  allowMultiTx?: boolean;
};

export type AssetRecommendation = {
  asset: Asset;
  reason: Reason;
};

export type AssetRecommendationJSON = {
  asset: AssetJSON;
  reason: Reason;
};

export type AssetsRequestJSON = {
  chain_id?: string;
  native_only?: boolean;
  include_no_metadata_assets?: boolean;
};

export type AssetsRequest = {
  chainID?: string;
  nativeOnly?: boolean;
  includeNoMetadataAssets?: boolean;
};

export type Chain = {
  chainName: string;
  chainID: string;
  pfmEnabled: boolean;
  cosmosSDKVersion: string;
  modules: Record<string, ModuleVersionInfo>;
  cosmosModuleSupport: ModuleSupport;
  supportsMemo: boolean;
  logoURI?: string;
  bech32Prefix: string;
  feeAssets: FeeAsset[];
};

export type ChainJSON = {
  chain_name: string;
  chain_id: string;
  pfm_enabled: boolean;
  cosmos_sdk_version: string;
  modules: Record<string, ModuleVersionInfo>;
  cosmos_module_support: ModuleSupport;
  supports_memo: boolean;
  logo_uri?: string;
  bech32_prefix: string;
  fee_assets: FeeAssetJSON[];
};

export type FeeAsset = {
  denom: string;
  gasPrice: GasPriceInfo;
};

export type FeeAssetJSON = {
  denom: string;
  gas_price: GasPriceInfo;
};

export type GasPriceInfo = {
  low: string;
  average: string;
  high: string;
};

export type ModuleSupport = {
  authz: boolean;
  feegrant: boolean;
};

export type ModuleVersionInfo = {
  path: string;
  version: string;
  sum: string;
};

export type RecommendAssetsRequestJSON = {
  source_asset_denom: string;
  source_asset_chain_id: string;
  dest_chain_id: string;
  reason?: Reason;
};

export type RecommendAssetsRequest = {
  sourceAssetDenom: string;
  sourceAssetChainID: string;
  destChainID: string;
  reason?: Reason;
};

export type SwapVenueJSON = {
  name: string;
  chain_id: string;
};

export type SwapVenue = {
  name: string;
  chainID: string;
};

export type RouteRequestBaseJSON = {
  source_asset_denom: string;
  source_asset_chain_id: string;
  dest_asset_denom: string;
  dest_asset_chain_id: string;

  cumulative_affiliate_fee_bps?: string;
  swap_venue?: SwapVenueJSON;
};

export type RouteRequestGivenInJSON = RouteRequestBaseJSON & {
  amount_in: string;
  amount_out?: never;
};

export type RouteRequestGivenOutJSON = RouteRequestBaseJSON & {
  amount_in?: never;
  amount_out: string;
};

export type RouteRequestJSON =
  | RouteRequestGivenInJSON
  | RouteRequestGivenOutJSON;

export type RouteRequestBase = {
  sourceAssetDenom: string;
  sourceAssetChainID: string;
  destAssetDenom: string;
  destAssetChainID: string;

  cumulativeAffiliateFeeBPS?: string;
  swapVenue?: SwapVenue;
};

export type RouteRequestGivenIn = RouteRequestBase & {
  amountIn: string;
  amountOut?: never;
};

export type RouteRequestGivenOut = RouteRequestBase & {
  amountIn?: never;
  amountOut: string;
};

export type RouteRequest = RouteRequestGivenIn | RouteRequestGivenOut;

export type TransferJSON = {
  port: string;
  channel: string;
  chain_id: string;
  pfm_enabled: boolean;
  dest_denom: string;
  supports_memo: boolean;
};

export type Transfer = {
  port: string;
  channel: string;
  chainID: string;
  pfmEnabled: boolean;
  destDenom: string;
  supportsMemo: boolean;
};

export type SwapOperationJSON = {
  pool: string;
  denom_in: string;
  denom_out: string;
};

export type SwapOperation = {
  pool: string;
  denomIn: string;
  denomOut: string;
};

export type SwapExactCoinInJSON = {
  swap_venue: SwapVenueJSON;
  swap_operations: SwapOperationJSON[];
  swap_amount_in?: string;
};

export type SwapExactCoinIn = {
  swapVenue: SwapVenue;
  swapOperations: SwapOperation[];
  swapAmountIn?: string;
};

export type SwapExactCoinOutJSON = {
  swap_venue: SwapVenueJSON;
  swap_operations: SwapOperationJSON[];
  swap_amount_out: string;
};

export type SwapExactCoinOut = {
  swapVenue: SwapVenue;
  swapOperations: SwapOperation[];
  swapAmountOut: string;
};

export type SwapJSON = (
  | { swap_in: SwapExactCoinInJSON }
  | { swap_out: SwapExactCoinOutJSON }
) & {
  estimated_affiliate_fee?: string;
};

export type Swap = (
  | { swapIn: SwapExactCoinIn }
  | { swapOut: SwapExactCoinOut }
) & {
  estimatedAffiliateFee?: string;
};

export type OperationJSON = { transfer: TransferJSON } | { swap: SwapJSON };

export type Operation = { transfer: Transfer } | { swap: Swap };

export type RouteResponseJSON = {
  source_asset_denom: string;
  source_asset_chain_id: string;
  dest_asset_denom: string;
  dest_asset_chain_id: string;
  amount_in: string;
  amount_out: string;

  operations: OperationJSON[];
  chain_ids: string[];

  does_swap: boolean;
  estimated_amount_out?: string;
  swap_venue?: SwapVenueJSON;

  txs_required: number;
};

export type RouteResponse = {
  sourceAssetDenom: string;
  sourceAssetChainID: string;
  destAssetDenom: string;
  destAssetChainID: string;
  amountIn: string;
  amountOut: string;

  operations: Operation[];
  chainIDs: string[];

  doesSwap: boolean;
  estimatedAmountOut?: string;
  swapVenue?: SwapVenue;

  txsRequired: number;
};
