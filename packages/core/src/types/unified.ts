import {
  Affiliate,
  AffiliateJSON,
  ApiError,
  Asset,
  AssetJSON,
  AxelarTransfer,
  AxelarTransferJSON,
  EvmTx,
  EvmTxJSON,
  MultiChainMsg,
  MultiChainMsgJSON,
  PostHandler,
  PostHandlerJSON,
  Reason,
  Swap,
  SwapJSON,
  SwapVenue,
  SwapVenueJSON,
  Transfer,
  TransferJSON,
} from "./shared";

export type AssetsRequestJSON = {
  chain_id?: string;
  native_only?: boolean;
  include_no_metadata_assets?: boolean;
  include_cw20_assets?: boolean;
  include_evm_assets?: boolean;
  client_id?: string;
};

export type AssetsRequest = {
  chainID?: string;
  nativeOnly?: boolean;
  includeNoMetadataAssets?: boolean;
  includeCW20Assets?: boolean;
  includeEvmAssets?: boolean;
  clientID?: string;
};

export type AssetsFromSourceRequestJSON = {
  source_asset_denom: string;
  source_asset_chain_id: string;

  allow_multi_tx?: boolean;
  recommendation_reason?: Reason;
  include_swaps?: boolean;
  swap_venues?: SwapVenueJSON[];
  native_only?: boolean;
  group_by?: string;
  include_cw20_assets: boolean;
  client_id?: string;
};

export type AssetsFromSourceRequest = {
  sourceAssetDenom: string;
  sourceAssetChainID: string;

  allowMultiTx?: boolean;
  recommendationReason?: Reason;
  includeSwaps?: boolean;
  swapVenues?: SwapVenue[];
  nativeOnly?: boolean;
  groupBy?: string;
  includeCW20Assets: boolean;
  clientID?: string;
};

export type AssetRecommendation = {
  asset: Asset;
  reason: Reason;
};

export type AssetRecommendationJSON = {
  asset: AssetJSON;
  reason: Reason;
};

export type AssetRecommendationRequestJSON = {
  source_asset_denom: string;
  source_asset_chain_id: string;
  dest_chain_id: string;
  reason?: Reason;
};

export type AssetRecommendationRequest = {
  sourceAssetDenom: string;
  sourceAssetChainID: string;
  destChainID: string;
  reason?: Reason;
};

export type RecommendAssetsRequestJSON = {
  requests: AssetRecommendationRequestJSON[];
  client_id?: string;
};

export type RecommendAssetsRequest = {
  requests: AssetRecommendationRequest[];
  clientID?: string;
};

export type RecommendAssetsResponseJSON = {
  recommendations: AssetRecommendationJSON[];
  recommendation_entries: RecommendationEntryJSON[];
};

export type RecommendAssetsResponse = {
  recommendations: AssetRecommendation[];
  recommendationEntries: RecommendationEntry[];
};

export type RecommendationEntryJSON = {
  recommendations: AssetRecommendationJSON[];
  error?: ApiError;
};

export type RecommendationEntry = {
  recommendations: AssetRecommendation[];
  error?: ApiError;
};

export type RouteRequestBaseJSON = {
  source_asset_denom: string;
  source_asset_chain_id: string;
  dest_asset_denom: string;
  dest_asset_chain_id: string;

  cumulative_affiliate_fee_bps?: string;
  swap_venue?: SwapVenueJSON;
  unsafe?: boolean;
  client_id?: string;
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
  unsafe?: boolean;
  clientID?: string;
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

export type RouteWarningType = "LOW_INFO_WARNING" | "BAD_PRICE_WARNING";

export type RouteWarning = {
  type: RouteWarningType;
  message: string;
};

export type OperationJSON =
  | { transfer: TransferJSON }
  | { swap: SwapJSON }
  | { axelar_transfer: AxelarTransferJSON };

export type Operation =
  | { transfer: Transfer }
  | { swap: Swap }
  | { axelarTransfer: AxelarTransfer };

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

  usd_amount_in?: string;
  usd_amount_out?: string;
  swap_price_impact_percent?: string;

  warning?: RouteWarning;
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

  usdAmountIn?: string;
  usdAmountOut?: string;
  swapPriceImpactPercent?: string;

  warning?: RouteWarning;
};

export type MsgsRequestJSON = {
  source_asset_denom: string;
  source_asset_chain_id: string;
  dest_asset_denom: string;
  dest_asset_chain_id: string;
  amount_in: string;
  amount_out: string;
  address_list: string[];
  operations: OperationJSON[];

  estimated_amount_out?: string;
  slippage_tolerance_percent?: string;
  affiliates?: AffiliateJSON[];

  post_route_handler?: PostHandlerJSON;

  client_id?: string;
};

export type MsgsRequest = {
  sourceAssetDenom: string;
  sourceAssetChainID: string;
  destAssetDenom: string;
  destAssetChainID: string;
  amountIn: string;
  amountOut: string;
  addressList: string[];
  operations: Operation[];

  estimatedAmountOut?: string;
  slippageTolerancePercent?: string;
  affiliates?: Affiliate[];

  postRouteHandler?: PostHandler;

  clientID?: string;
};

export type MsgJSON =
  | { multi_chain_msg: MultiChainMsgJSON }
  | { evm_tx: EvmTxJSON };

export type Msg = { multiChainMsg: MultiChainMsg } | { evmTx: EvmTx };

export type MsgsResponseJSON = {
  msgs: MsgJSON[];
};

export type MsgsResponse = {
  msgs: Msg[];
};

export type BridgeType = "IBC" | "AXELAR";

export type AssetBetweenChainsJSON = {
  asset_on_source: AssetJSON;
  asset_on_dest: AssetJSON;
  txs_required: number;
  bridges: BridgeType[];
};

export type AssetBetweenChains = {
  assetOnSource: Asset;
  assetOnDest: Asset;
  txsRequired: number;
  bridges: BridgeType[];
};

export type AssetsBetweenChainsRequestJSON = {
  source_chain_id: string;
  dest_chain_id: string;

  include_no_metadata_assets?: boolean;
  include_cw20_assets?: boolean;
  include_evm_assets?: boolean;

  allow_multi_tx?: boolean;
};

export type AssetsBetweenChainsRequest = {
  sourceChainID: string;
  destChainID: string;

  includeNoMetadataAssets?: boolean;
  includeCW20Assets?: boolean;
  includeEvmAssets?: boolean;

  allowMultiTx?: boolean;
};

export type AssetsBetweenChainsResponseJSON = {
  assets_between_chains: AssetBetweenChainsJSON[];
};

export type AssetsBetweenChainsResponse = {
  assetsBetweenChains: AssetBetweenChains[];
};
