import {
  AxelarTransferInfo,
  AxelarTransferInfoJSON,
  AxelarTransferTransactions,
  AxelarTransferTransactionsJSON,
  ChainTransaction,
  ChainTransactionJSON,
  ContractCallWithTokenTransactions,
  ContractCallWithTokenTransactionsJSON,
  NextBlockingTransfer,
  NextBlockingTransferJSON,
  Packet,
  PacketJSON,
  SendTokenTransactions,
  SendTokenTransactionsJSON,
  StatusRequest,
  StatusRequestJSON,
  SubmitTxRequest,
  SubmitTxRequestJSON,
  SubmitTxResponse,
  SubmitTxResponseJSON,
  TrackTxRequest,
  TrackTxRequestJSON,
  TrackTxResponse,
  TrackTxResponseJSON,
  TransferAssetRelease,
  TransferAssetReleaseJSON,
  TransferEvent,
  TransferEventJSON,
  TransferInfo,
  TransferInfoJSON,
  TransferStatus,
  TransferStatusJSON,
  TxStatusResponse,
  TxStatusResponseJSON,
} from "./lifecycle";
import { Chain, ChainJSON, FeeAsset, FeeAssetJSON } from "./routing";
import {
  Affiliate,
  AffiliateJSON,
  Asset,
  AssetJSON,
  AssetOrError,
  AssetOrErrorJSON,
  AxelarTransfer,
  AxelarTransferJSON,
  CosmWasmContractMsg,
  CosmWasmContractMsgJSON,
  DenomWithChainID,
  DenomWithChainIDJSON,
  ERC20Approval,
  ERC20ApprovalJSON,
  EvmTx,
  EvmTxJSON,
  IBCAddress,
  IBCAddressJSON,
  MultiChainMsg,
  MultiChainMsgJSON,
  OriginAssetsRequest,
  OriginAssetsRequestJSON,
  OriginAssetsResponse,
  OriginAssetsResponseJSON,
  PostHandler,
  PostHandlerJSON,
  Swap,
  SwapExactCoinIn,
  SwapExactCoinInJSON,
  SwapExactCoinOut,
  SwapExactCoinOutJSON,
  SwapJSON,
  SwapOperation,
  SwapOperationJSON,
  SwapVenue,
  SwapVenueJSON,
  Transfer,
  TransferJSON,
} from "./shared";
import {
  AssetBetweenChains,
  AssetBetweenChainsJSON,
  AssetRecommendation,
  AssetRecommendationJSON,
  AssetRecommendationRequest,
  AssetRecommendationRequestJSON,
  AssetsBetweenChainsRequest,
  AssetsBetweenChainsRequestJSON,
  AssetsBetweenChainsResponse,
  AssetsBetweenChainsResponseJSON,
  AssetsFromSourceRequest,
  AssetsFromSourceRequestJSON,
  AssetsRequest,
  AssetsRequestJSON,
  Msg,
  MsgJSON,
  MsgsRequest,
  MsgsRequestJSON,
  Operation,
  OperationJSON,
  RecommendAssetsRequest,
  RecommendAssetsRequestJSON,
  RecommendAssetsResponse,
  RecommendAssetsResponseJSON,
  RecommendationEntry,
  RecommendationEntryJSON,
  RouteRequest,
  RouteRequestJSON,
  RouteResponse,
  RouteResponseJSON,
} from "./unified";

export function affiliateFromJSON(affiliateJSON: AffiliateJSON): Affiliate {
  return {
    address: affiliateJSON.address,
    basisPointsFee: affiliateJSON.basis_points_fee,
  };
}

export function affiliateToJSON(affiliate: Affiliate): AffiliateJSON {
  return {
    address: affiliate.address,
    basis_points_fee: affiliate.basisPointsFee,
  };
}

export function assetFromJSON(assetJSON: AssetJSON): Asset {
  return {
    denom: assetJSON.denom,
    chainID: assetJSON.chain_id,
    originDenom: assetJSON.origin_denom,
    originChainID: assetJSON.origin_chain_id,
    trace: assetJSON.trace,
    isCW20: assetJSON.is_cw20,
    isEVM: assetJSON.is_evm,
    symbol: assetJSON.symbol,
    name: assetJSON.name,
    logoURI: assetJSON.logo_uri,
    decimals: assetJSON.decimals,
    tokenContract: assetJSON.token_contract,
    description: assetJSON.description,
    coingeckoID: assetJSON.coingecko_id,
    recommendedSymbol: assetJSON.recommended_symbol,
  };
}

export function assetToJSON(asset: Asset): AssetJSON {
  return {
    denom: asset.denom,
    chain_id: asset.chainID,
    origin_denom: asset.originDenom,
    origin_chain_id: asset.originChainID,
    trace: asset.trace,
    is_cw20: asset.isCW20,
    is_evm: asset.isEVM,
    symbol: asset.symbol,
    name: asset.name,
    logo_uri: asset.logoURI,
    decimals: asset.decimals,
    token_contract: asset.tokenContract,
    description: asset.description,
    coingecko_id: asset.coingeckoID,
    recommended_symbol: asset.recommendedSymbol,
  };
}

export function assetRecommendationFromJSON(
  assetRecommendationJSON: AssetRecommendationJSON,
): AssetRecommendation {
  return {
    asset: assetFromJSON(assetRecommendationJSON.asset),
    reason: assetRecommendationJSON.reason,
  };
}

export function assetRecommendationToJSON(
  assetRecommendation: AssetRecommendation,
): AssetRecommendationJSON {
  return {
    asset: assetToJSON(assetRecommendation.asset),
    reason: assetRecommendation.reason,
  };
}

export function assetsFromSourceRequestFromJSON(
  assetsFromSourceRequestJSON: AssetsFromSourceRequestJSON,
): AssetsFromSourceRequest {
  return {
    sourceAssetDenom: assetsFromSourceRequestJSON.source_asset_denom,
    sourceAssetChainID: assetsFromSourceRequestJSON.source_asset_chain_id,
    allowMultiTx: assetsFromSourceRequestJSON.allow_multi_tx,
    recommendationReason: assetsFromSourceRequestJSON.recommendation_reason,
    includeSwaps: assetsFromSourceRequestJSON.include_swaps,
    swapVenues: assetsFromSourceRequestJSON.swap_venues?.map(swapVenueFromJSON),
    nativeOnly: assetsFromSourceRequestJSON.native_only,
    groupBy: assetsFromSourceRequestJSON.group_by,
    includeCW20Assets: assetsFromSourceRequestJSON.include_cw20_assets,
    clientID: assetsFromSourceRequestJSON.client_id,
  };
}

export function assetsFromSourceRequestToJSON(
  assetsFromSourceRequest: AssetsFromSourceRequest,
): AssetsFromSourceRequestJSON {
  return {
    source_asset_denom: assetsFromSourceRequest.sourceAssetDenom,
    source_asset_chain_id: assetsFromSourceRequest.sourceAssetChainID,
    allow_multi_tx: assetsFromSourceRequest.allowMultiTx,
    recommendation_reason: assetsFromSourceRequest.recommendationReason,
    include_swaps: assetsFromSourceRequest.includeSwaps,
    swap_venues: assetsFromSourceRequest.swapVenues?.map(swapVenueToJSON),
    native_only: assetsFromSourceRequest.nativeOnly,
    group_by: assetsFromSourceRequest.groupBy,
    include_cw20_assets: assetsFromSourceRequest.includeCW20Assets,
    client_id: assetsFromSourceRequest.clientID,
  };
}

export function assetsRequestFromJSON(
  assetsRequestJSON: AssetsRequestJSON,
): AssetsRequest {
  return {
    chainID: assetsRequestJSON.chain_id,
    nativeOnly: assetsRequestJSON.native_only,
    includeNoMetadataAssets: assetsRequestJSON.include_no_metadata_assets,
    includeCW20Assets: assetsRequestJSON.include_cw20_assets,
    includeEvmAssets: assetsRequestJSON.include_evm_assets,
    clientID: assetsRequestJSON.client_id,
  };
}

export function assetsRequestToJSON(
  assetsRequest: AssetsRequest,
): AssetsRequestJSON {
  return {
    chain_id: assetsRequest.chainID,
    native_only: assetsRequest.nativeOnly,
    include_no_metadata_assets: assetsRequest.includeNoMetadataAssets,
    include_cw20_assets: assetsRequest.includeCW20Assets,
    include_evm_assets: assetsRequest.includeEvmAssets,
    client_id: assetsRequest.clientID,
  };
}

export function chainFromJSON(chainJSON: ChainJSON): Chain {
  return {
    chainName: chainJSON.chain_name,
    chainID: chainJSON.chain_id,
    pfmEnabled: chainJSON.pfm_enabled,
    cosmosSDKVersion: chainJSON.cosmos_sdk_version,
    modules: chainJSON.modules,
    cosmosModuleSupport: chainJSON.cosmos_module_support,
    supportsMemo: chainJSON.supports_memo,
    logoURI: chainJSON.logo_uri,
    bech32Prefix: chainJSON.bech32_prefix,
    feeAssets: chainJSON.fee_assets.map(feeAssetFromJSON),
    chainType: chainJSON.chain_type,
  };
}

export function chainToJSON(chain: Chain): ChainJSON {
  return {
    chain_name: chain.chainName,
    chain_id: chain.chainID,
    pfm_enabled: chain.pfmEnabled,
    cosmos_sdk_version: chain.cosmosSDKVersion,
    modules: chain.modules,
    cosmos_module_support: chain.cosmosModuleSupport,
    supports_memo: chain.supportsMemo,
    logo_uri: chain.logoURI,
    bech32_prefix: chain.bech32Prefix,
    fee_assets: chain.feeAssets.map(feeAssetToJSON),
    chain_type: chain.chainType,
  };
}

export function feeAssetFromJSON(feeAssetJSON: FeeAssetJSON): FeeAsset {
  return {
    denom: feeAssetJSON.denom,
    gasPrice: feeAssetJSON.gas_price,
  };
}

export function feeAssetToJSON(feeAsset: FeeAsset): FeeAssetJSON {
  return {
    denom: feeAsset.denom,
    gas_price: feeAsset.gasPrice,
  };
}

export function recommendAssetsRequestFromJSON(
  recommendAssetsRequestJSON: RecommendAssetsRequestJSON,
): RecommendAssetsRequest {
  return {
    requests: recommendAssetsRequestJSON.requests.map(
      assetRecommendationRequestFromJSON,
    ),
    clientID: recommendAssetsRequestJSON.client_id,
  };
}

export function recommendAssetsRequestToJSON(
  recommendAssetsRequest: RecommendAssetsRequest,
): RecommendAssetsRequestJSON {
  return {
    requests: recommendAssetsRequest.requests.map(
      assetRecommendationRequestToJSON,
    ),
    client_id: recommendAssetsRequest.clientID,
  };
}

export function recommendAssetsResponseFromJSON(
  value: RecommendAssetsResponseJSON,
): RecommendAssetsResponse {
  return {
    recommendations: value.recommendations.map(assetRecommendationFromJSON),
    recommendationEntries: value.recommendation_entries.map(
      recommendationEntryFromJSON,
    ),
  };
}

export function recommendAssetsResponseToJSON(
  value: RecommendAssetsResponse,
): RecommendAssetsResponseJSON {
  return {
    recommendations: value.recommendations.map(assetRecommendationToJSON),
    recommendation_entries: value.recommendationEntries.map(
      recommendationEntryToJSON,
    ),
  };
}

export function recommendationEntryFromJSON(
  value: RecommendationEntryJSON,
): RecommendationEntry {
  return {
    recommendations: value.recommendations.map(assetRecommendationFromJSON),
    error: value.error,
  };
}

export function recommendationEntryToJSON(
  value: RecommendationEntry,
): RecommendationEntryJSON {
  return {
    recommendations: value.recommendations.map(assetRecommendationToJSON),
    error: value.error,
  };
}

export function swapVenueFromJSON(swapVenueJSON: SwapVenueJSON): SwapVenue {
  return {
    name: swapVenueJSON.name,
    chainID: swapVenueJSON.chain_id,
  };
}

export function swapVenueToJSON(swapVenue: SwapVenue): SwapVenueJSON {
  return {
    name: swapVenue.name,
    chain_id: swapVenue.chainID,
  };
}

export function routeRequestFromJSON(
  routeRequestJSON: RouteRequestJSON,
): RouteRequest {
  if (routeRequestJSON.amount_in !== undefined) {
    return {
      sourceAssetDenom: routeRequestJSON.source_asset_denom,
      sourceAssetChainID: routeRequestJSON.source_asset_chain_id,
      destAssetDenom: routeRequestJSON.dest_asset_denom,
      destAssetChainID: routeRequestJSON.dest_asset_chain_id,
      amountIn: routeRequestJSON.amount_in,

      cumulativeAffiliateFeeBPS: routeRequestJSON.cumulative_affiliate_fee_bps,
      swapVenue: routeRequestJSON.swap_venue
        ? swapVenueFromJSON(routeRequestJSON.swap_venue)
        : undefined,
      unsafe: routeRequestJSON.unsafe,
      clientID: routeRequestJSON.client_id,
    };
  }

  return {
    sourceAssetDenom: routeRequestJSON.source_asset_denom,
    sourceAssetChainID: routeRequestJSON.source_asset_chain_id,
    destAssetDenom: routeRequestJSON.dest_asset_denom,
    destAssetChainID: routeRequestJSON.dest_asset_chain_id,
    amountOut: routeRequestJSON.amount_out,

    cumulativeAffiliateFeeBPS: routeRequestJSON.cumulative_affiliate_fee_bps,
    swapVenue: routeRequestJSON.swap_venue
      ? swapVenueFromJSON(routeRequestJSON.swap_venue)
      : undefined,
    unsafe: routeRequestJSON.unsafe,
    clientID: routeRequestJSON.client_id,
  };
}

export function routeRequestToJSON(
  routeRequest: RouteRequest,
): RouteRequestJSON {
  if (routeRequest.amountIn !== undefined) {
    return {
      source_asset_denom: routeRequest.sourceAssetDenom,
      source_asset_chain_id: routeRequest.sourceAssetChainID,
      dest_asset_denom: routeRequest.destAssetDenom,
      dest_asset_chain_id: routeRequest.destAssetChainID,
      amount_in: routeRequest.amountIn,

      cumulative_affiliate_fee_bps: routeRequest.cumulativeAffiliateFeeBPS,
      swap_venue: routeRequest.swapVenue
        ? swapVenueToJSON(routeRequest.swapVenue)
        : undefined,
      unsafe: routeRequest.unsafe,
      client_id: routeRequest.clientID,
    };
  }

  return {
    source_asset_denom: routeRequest.sourceAssetDenom,
    source_asset_chain_id: routeRequest.sourceAssetChainID,
    dest_asset_denom: routeRequest.destAssetDenom,
    dest_asset_chain_id: routeRequest.destAssetChainID,
    amount_out: routeRequest.amountOut,

    cumulative_affiliate_fee_bps: routeRequest.cumulativeAffiliateFeeBPS,
    swap_venue: routeRequest.swapVenue
      ? swapVenueToJSON(routeRequest.swapVenue)
      : undefined,
    unsafe: routeRequest.unsafe,
    client_id: routeRequest.clientID,
  };
}

export function transferFromJSON(transferJSON: TransferJSON): Transfer {
  return {
    port: transferJSON.port,
    channel: transferJSON.channel,
    chainID: transferJSON.chain_id,
    pfmEnabled: transferJSON.pfm_enabled,
    destDenom: transferJSON.dest_denom,
    supportsMemo: transferJSON.supports_memo,
    feeAmount: transferJSON.fee_amount,
    usdFeeAmount: transferJSON.usd_fee_amount,
    feeAsset: transferJSON.fee_asset && assetFromJSON(transferJSON.fee_asset),
  };
}

export function transferToJSON(transfer: Transfer): TransferJSON {
  return {
    port: transfer.port,
    channel: transfer.channel,
    chain_id: transfer.chainID,
    pfm_enabled: transfer.pfmEnabled,
    dest_denom: transfer.destDenom,
    supports_memo: transfer.supportsMemo,
    fee_amount: transfer.feeAmount,
    usd_fee_amount: transfer.usdFeeAmount,
    fee_asset: transfer.feeAsset && assetToJSON(transfer.feeAsset),
  };
}

export function swapOperationFromJSON(
  swapOperationJSON: SwapOperationJSON,
): SwapOperation {
  return {
    pool: swapOperationJSON.pool,
    denomIn: swapOperationJSON.denom_in,
    denomOut: swapOperationJSON.denom_out,
  };
}

export function swapOperationToJSON(
  swapOperation: SwapOperation,
): SwapOperationJSON {
  return {
    pool: swapOperation.pool,
    denom_in: swapOperation.denomIn,
    denom_out: swapOperation.denomOut,
  };
}

export function swapExactCoinInFromJSON(
  swapExactCoinInJSON: SwapExactCoinInJSON,
): SwapExactCoinIn {
  return {
    swapVenue: swapVenueFromJSON(swapExactCoinInJSON.swap_venue),
    swapOperations: swapExactCoinInJSON.swap_operations.map(
      swapOperationFromJSON,
    ),
    swapAmountIn: swapExactCoinInJSON.swap_amount_in,
    priceImpactPercent: swapExactCoinInJSON.price_impact_percent,
  };
}

export function swapExactCoinInToJSON(
  swapExactCoinIn: SwapExactCoinIn,
): SwapExactCoinInJSON {
  return {
    swap_venue: swapVenueToJSON(swapExactCoinIn.swapVenue),
    swap_operations: swapExactCoinIn.swapOperations.map(swapOperationToJSON),
    swap_amount_in: swapExactCoinIn.swapAmountIn,
    price_impact_percent: swapExactCoinIn.priceImpactPercent,
  };
}

export function swapExactCoinOutFromJSON(
  swapExactCoinOutJSON: SwapExactCoinOutJSON,
): SwapExactCoinOut {
  return {
    swapVenue: swapVenueFromJSON(swapExactCoinOutJSON.swap_venue),
    swapOperations: swapExactCoinOutJSON.swap_operations.map(
      swapOperationFromJSON,
    ),
    swapAmountOut: swapExactCoinOutJSON.swap_amount_out,
    priceImpactPercent: swapExactCoinOutJSON.price_impact_percent,
  };
}

export function swapExactCoinOutToJSON(
  swapExactCoinOut: SwapExactCoinOut,
): SwapExactCoinOutJSON {
  return {
    swap_venue: swapVenueToJSON(swapExactCoinOut.swapVenue),
    swap_operations: swapExactCoinOut.swapOperations.map(swapOperationToJSON),
    swap_amount_out: swapExactCoinOut.swapAmountOut,
    price_impact_percent: swapExactCoinOut.priceImpactPercent,
  };
}

export function swapFromJSON(swapJSON: SwapJSON): Swap {
  if ("swap_in" in swapJSON) {
    return {
      swapIn: swapExactCoinInFromJSON(swapJSON.swap_in),
      estimatedAffiliateFee: swapJSON.estimated_affiliate_fee,
    };
  }

  return {
    swapOut: swapExactCoinOutFromJSON(swapJSON.swap_out),
    estimatedAffiliateFee: swapJSON.estimated_affiliate_fee,
  };
}

export function swapToJSON(swap: Swap): SwapJSON {
  if ("swapIn" in swap) {
    return {
      swap_in: swapExactCoinInToJSON(swap.swapIn),
      estimated_affiliate_fee: swap.estimatedAffiliateFee,
    };
  }

  return {
    swap_out: swapExactCoinOutToJSON(swap.swapOut),
    estimated_affiliate_fee: swap.estimatedAffiliateFee,
  };
}

export function operationFromJSON(operationJSON: OperationJSON): Operation {
  if ("transfer" in operationJSON) {
    return { transfer: transferFromJSON(operationJSON.transfer) };
  }

  if ("axelar_transfer" in operationJSON) {
    return {
      axelarTransfer: axelarTransferFromJSON(operationJSON.axelar_transfer),
    };
  }

  return { swap: swapFromJSON(operationJSON.swap) };
}

export function operationToJSON(operation: Operation): OperationJSON {
  if ("transfer" in operation) {
    return { transfer: transferToJSON(operation.transfer) };
  }

  if ("axelarTransfer" in operation) {
    return { axelar_transfer: axelarTransferToJSON(operation.axelarTransfer) };
  }

  return { swap: swapToJSON(operation.swap) };
}

export function routeResponseFromJSON(
  routeResponseJSON: RouteResponseJSON,
): RouteResponse {
  return {
    sourceAssetDenom: routeResponseJSON.source_asset_denom,
    sourceAssetChainID: routeResponseJSON.source_asset_chain_id,
    destAssetDenom: routeResponseJSON.dest_asset_denom,
    destAssetChainID: routeResponseJSON.dest_asset_chain_id,
    amountIn: routeResponseJSON.amount_in,
    amountOut: routeResponseJSON.amount_out,

    operations: routeResponseJSON.operations.map(operationFromJSON),
    chainIDs: routeResponseJSON.chain_ids,

    doesSwap: routeResponseJSON.does_swap,
    estimatedAmountOut: routeResponseJSON.estimated_amount_out,
    swapVenue: routeResponseJSON.swap_venue
      ? swapVenueFromJSON(routeResponseJSON.swap_venue)
      : undefined,

    txsRequired: routeResponseJSON.txs_required,

    usdAmountIn: routeResponseJSON.usd_amount_in,
    usdAmountOut: routeResponseJSON.usd_amount_out,
    swapPriceImpactPercent: routeResponseJSON.swap_price_impact_percent,

    warning: routeResponseJSON.warning,
  };
}

export function routeResponseToJSON(
  routeResponse: RouteResponse,
): RouteResponseJSON {
  return {
    source_asset_denom: routeResponse.sourceAssetDenom,
    source_asset_chain_id: routeResponse.sourceAssetChainID,
    dest_asset_denom: routeResponse.destAssetDenom,
    dest_asset_chain_id: routeResponse.destAssetChainID,
    amount_in: routeResponse.amountIn,
    amount_out: routeResponse.amountOut,

    operations: routeResponse.operations.map(operationToJSON),
    chain_ids: routeResponse.chainIDs,

    does_swap: routeResponse.doesSwap,
    estimated_amount_out: routeResponse.estimatedAmountOut,
    swap_venue: routeResponse.swapVenue
      ? swapVenueToJSON(routeResponse.swapVenue)
      : undefined,

    txs_required: routeResponse.txsRequired,

    usd_amount_in: routeResponse.usdAmountIn,
    usd_amount_out: routeResponse.usdAmountOut,
    swap_price_impact_percent: routeResponse.swapPriceImpactPercent,

    warning: routeResponse.warning,
  };
}

export function cosmWasmContractMsgFromJSON(
  cosmWasmContractMsgJSON: CosmWasmContractMsgJSON,
): CosmWasmContractMsg {
  return {
    contractAddress: cosmWasmContractMsgJSON.contract_address,
    msg: cosmWasmContractMsgJSON.msg,
  };
}

export function cosmWasmContractMsgToJSON(
  cosmWasmContractMsg: CosmWasmContractMsg,
): CosmWasmContractMsgJSON {
  return {
    contract_address: cosmWasmContractMsg.contractAddress,
    msg: cosmWasmContractMsg.msg,
  };
}

export function postHandlerFromJSON(
  postHandlerJSON: PostHandlerJSON,
): PostHandler {
  if ("wasm_msg" in postHandlerJSON) {
    return {
      wasmMsg: cosmWasmContractMsgFromJSON(postHandlerJSON.wasm_msg),
    };
  }

  return {
    autopilotMsg: postHandlerJSON.autopilot_msg,
  };
}

export function postHandlerToJSON(postHandler: PostHandler): PostHandlerJSON {
  if ("wasmMsg" in postHandler) {
    return {
      wasm_msg: cosmWasmContractMsgToJSON(postHandler.wasmMsg),
    };
  }

  return {
    autopilot_msg: postHandler.autopilotMsg,
  };
}

export function msgsRequestFromJSON(
  msgsRequestJSON: MsgsRequestJSON,
): MsgsRequest {
  return {
    sourceAssetDenom: msgsRequestJSON.source_asset_denom,
    sourceAssetChainID: msgsRequestJSON.source_asset_chain_id,
    destAssetDenom: msgsRequestJSON.dest_asset_denom,
    destAssetChainID: msgsRequestJSON.dest_asset_chain_id,
    amountIn: msgsRequestJSON.amount_in,
    amountOut: msgsRequestJSON.amount_out,
    addressList: msgsRequestJSON.address_list,
    operations: msgsRequestJSON.operations.map(operationFromJSON),

    estimatedAmountOut: msgsRequestJSON.estimated_amount_out,
    slippageTolerancePercent: msgsRequestJSON.slippage_tolerance_percent,
    affiliates: msgsRequestJSON.affiliates?.map(affiliateFromJSON),

    postRouteHandler:
      msgsRequestJSON.post_route_handler &&
      postHandlerFromJSON(msgsRequestJSON.post_route_handler),
    clientID: msgsRequestJSON.client_id,
  };
}

export function msgsRequestToJSON(msgsRequest: MsgsRequest): MsgsRequestJSON {
  return {
    source_asset_denom: msgsRequest.sourceAssetDenom,
    source_asset_chain_id: msgsRequest.sourceAssetChainID,
    dest_asset_denom: msgsRequest.destAssetDenom,
    dest_asset_chain_id: msgsRequest.destAssetChainID,
    amount_in: msgsRequest.amountIn,
    amount_out: msgsRequest.amountOut,
    address_list: msgsRequest.addressList,
    operations: msgsRequest.operations.map(operationToJSON),

    estimated_amount_out: msgsRequest.estimatedAmountOut,
    slippage_tolerance_percent: msgsRequest.slippageTolerancePercent,
    affiliates: msgsRequest.affiliates?.map(affiliateToJSON),

    post_route_handler:
      msgsRequest.postRouteHandler &&
      postHandlerToJSON(msgsRequest.postRouteHandler),
    client_id: msgsRequest.clientID,
  };
}

export function multiChainMsgFromJSON(
  multiChainMsgJSON: MultiChainMsgJSON,
): MultiChainMsg {
  return {
    chainID: multiChainMsgJSON.chain_id,
    path: multiChainMsgJSON.path,
    msg: multiChainMsgJSON.msg,
    msgTypeURL: multiChainMsgJSON.msg_type_url,
  };
}

export function multiChainMsgToJSON(
  multiChainMsg: MultiChainMsg,
): MultiChainMsgJSON {
  return {
    chain_id: multiChainMsg.chainID,
    path: multiChainMsg.path,
    msg: multiChainMsg.msg,
    msg_type_url: multiChainMsg.msgTypeURL,
  };
}

export function submitTxRequestFromJSON(
  submitTxRequestJSON: SubmitTxRequestJSON,
): SubmitTxRequest {
  return {
    tx: submitTxRequestJSON.tx,
    chainID: submitTxRequestJSON.chain_id,
    clientID: submitTxRequestJSON.client_id,
  };
}

export function submitTxRequestToJSON(
  submitTxRequest: SubmitTxRequest,
): SubmitTxRequestJSON {
  return {
    tx: submitTxRequest.tx,
    chain_id: submitTxRequest.chainID,
    client_id: submitTxRequest.clientID,
  };
}

export function submitTxResponseFromJSON(
  submitTxResponseJSON: SubmitTxResponseJSON,
): SubmitTxResponse {
  return {
    txHash: submitTxResponseJSON.tx_hash,
    success: submitTxResponseJSON.success,
  };
}

export function submitTxResponseToJSON(
  submitTxResponse: SubmitTxResponse,
): SubmitTxResponseJSON {
  return {
    tx_hash: submitTxResponse.txHash,
    success: submitTxResponse.success,
  };
}

export function trackTxRequestFromJSON(
  trackRequestJSON: TrackTxRequestJSON,
): TrackTxRequest {
  return {
    txHash: trackRequestJSON.tx_hash,
    chainID: trackRequestJSON.chain_id,
    clientID: trackRequestJSON.client_id,
  };
}

export function trackTxRequestToJSON(
  trackRequest: TrackTxRequest,
): TrackTxRequestJSON {
  return {
    tx_hash: trackRequest.txHash,
    chain_id: trackRequest.chainID,
    client_id: trackRequest.clientID,
  };
}

export function trackTxResponseFromJSON(
  trackResponseJSON: TrackTxResponseJSON,
): TrackTxResponse {
  return {
    txHash: trackResponseJSON.tx_hash,
  };
}

export function trackTxResponseToJSON(
  trackResponse: TrackTxResponse,
): TrackTxResponseJSON {
  return {
    tx_hash: trackResponse.txHash,
  };
}

export function txStatusRequestFromJSON(
  txStatusRequestJSON: StatusRequestJSON,
): StatusRequest {
  return {
    txHash: txStatusRequestJSON.tx_hash,
    chainID: txStatusRequestJSON.chain_id,
    clientID: txStatusRequestJSON.client_id,
  };
}

export function txStatusRequestToJSON(
  txStatusRequest: StatusRequest,
): StatusRequestJSON {
  return {
    tx_hash: txStatusRequest.txHash,
    chain_id: txStatusRequest.chainID,
    client_id: txStatusRequest.clientID,
  };
}

export function chainTransactionFromJSON(
  chainTransactionJSON: ChainTransactionJSON,
): ChainTransaction {
  return {
    txHash: chainTransactionJSON.tx_hash,
    chainID: chainTransactionJSON.chain_id,
    explorerLink: chainTransactionJSON.explorer_link,
  };
}

export function chainTransactionToJSON(
  chainTransaction: ChainTransaction,
): ChainTransactionJSON {
  return {
    tx_hash: chainTransaction.txHash,
    chain_id: chainTransaction.chainID,
    explorer_link: chainTransaction.explorerLink,
  };
}

export function packetFromJSON(packetJSON: PacketJSON): Packet {
  return {
    sendTx: packetJSON.send_tx && chainTransactionFromJSON(packetJSON.send_tx),
    receiveTx:
      packetJSON.receive_tx && chainTransactionFromJSON(packetJSON.receive_tx),
    acknowledgeTx:
      packetJSON.acknowledge_tx &&
      chainTransactionFromJSON(packetJSON.acknowledge_tx),
    timeoutTx:
      packetJSON.timeout_tx && chainTransactionFromJSON(packetJSON.timeout_tx),

    error: packetJSON.error,
  };
}

export function packetToJSON(packet: Packet): PacketJSON {
  return {
    send_tx: packet.sendTx && chainTransactionToJSON(packet.sendTx),
    receive_tx: packet.receiveTx && chainTransactionToJSON(packet.receiveTx),
    acknowledge_tx:
      packet.acknowledgeTx && chainTransactionToJSON(packet.acknowledgeTx),
    timeout_tx: packet.timeoutTx && chainTransactionToJSON(packet.timeoutTx),

    error: packet.error,
  };
}

export function transferInfoFromJSON(
  transferInfoJSON: TransferInfoJSON,
): TransferInfo {
  return {
    srcChainID: transferInfoJSON.src_chain_id,
    dstChainID: transferInfoJSON.dst_chain_id,
    state: transferInfoJSON.state,
    packetTXs:
      transferInfoJSON.packet_txs &&
      packetFromJSON(transferInfoJSON.packet_txs),
  };
}

export function transferInfoToJSON(
  transferInfo: TransferInfo,
): TransferInfoJSON {
  return {
    src_chain_id: transferInfo.srcChainID,
    dst_chain_id: transferInfo.dstChainID,
    state: transferInfo.state,
    packet_txs: transferInfo.packetTXs && packetToJSON(transferInfo.packetTXs),
  };
}

export function nextBlockingTransferFromJSON(
  nextBlockingTransferJSON: NextBlockingTransferJSON,
): NextBlockingTransfer {
  return {
    transferSequenceIndex: nextBlockingTransferJSON.transfer_sequence_index,
  };
}

export function nextBlockingTransferToJSON(
  nextBlockingTransfer: NextBlockingTransfer,
): NextBlockingTransferJSON {
  return {
    transfer_sequence_index: nextBlockingTransfer.transferSequenceIndex,
  };
}

export function transferAssetReleaseFromJSON(
  transferAssetReleaseJSON: TransferAssetReleaseJSON,
): TransferAssetRelease {
  return {
    chainID: transferAssetReleaseJSON.chain_id,
    denom: transferAssetReleaseJSON.denom,
  };
}

export function transferAssetReleaseToJSON(
  transferAssetRelease: TransferAssetRelease,
): TransferAssetReleaseJSON {
  return {
    chain_id: transferAssetRelease.chainID,
    denom: transferAssetRelease.denom,
  };
}

export function txStatusResponseFromJSON(
  statusResponseJSON: TxStatusResponseJSON,
): TxStatusResponse {
  return {
    status: statusResponseJSON.status,
    nextBlockingTransfer:
      statusResponseJSON.next_blocking_transfer &&
      nextBlockingTransferFromJSON(statusResponseJSON.next_blocking_transfer),
    transferSequence: statusResponseJSON.transfer_sequence.map(
      transferEventFromJSON,
    ),
    transferAssetRelease:
      statusResponseJSON.transfer_asset_release &&
      transferAssetReleaseFromJSON(statusResponseJSON.transfer_asset_release),
    error: statusResponseJSON.error,
    state: statusResponseJSON.state,
    transfers: statusResponseJSON.transfers.map(transferStatusFromJSON),
  };
}

export function txStatusResponseToJSON(
  statusResponse: TxStatusResponse,
): TxStatusResponseJSON {
  return {
    status: statusResponse.status,
    next_blocking_transfer:
      statusResponse.nextBlockingTransfer &&
      nextBlockingTransferToJSON(statusResponse.nextBlockingTransfer),
    transfer_sequence: statusResponse.transferSequence.map(transferEventToJSON),
    transfer_asset_release:
      statusResponse.transferAssetRelease &&
      transferAssetReleaseToJSON(statusResponse.transferAssetRelease),
    error: statusResponse.error,
    state: statusResponse.state,
    transfers: statusResponse.transfers.map(transferStatusToJSON),
  };
}

export function ibcAddressFromJSON(ibcAddressJSON: IBCAddressJSON): IBCAddress {
  return {
    address: ibcAddressJSON.address,
    chainID: ibcAddressJSON.chain_id,
  };
}

export function ibcAddressToJSON(ibcAddress: IBCAddress): IBCAddressJSON {
  return {
    address: ibcAddress.address,
    chain_id: ibcAddress.chainID,
  };
}

export function axelarTransferFromJSON(
  axelarTransferJSON: AxelarTransferJSON,
): AxelarTransfer {
  return {
    fromChain: axelarTransferJSON.from_chain,
    fromChainID: axelarTransferJSON.from_chain_id,
    toChain: axelarTransferJSON.to_chain,
    toChainID: axelarTransferJSON.to_chain_id,
    asset: axelarTransferJSON.asset,
    shouldUnwrap: axelarTransferJSON.should_unwrap,
    feeAmount: axelarTransferJSON.fee_amount,
    feeAsset: assetFromJSON(axelarTransferJSON.fee_asset),
    isTestnet: axelarTransferJSON.is_testnet,
  };
}

export function axelarTransferToJSON(
  axelarTransfer: AxelarTransfer,
): AxelarTransferJSON {
  return {
    from_chain: axelarTransfer.fromChain,
    from_chain_id: axelarTransfer.fromChainID,
    to_chain: axelarTransfer.toChain,
    to_chain_id: axelarTransfer.toChainID,
    asset: axelarTransfer.asset,
    should_unwrap: axelarTransfer.shouldUnwrap,
    fee_amount: axelarTransfer.feeAmount,
    fee_asset: assetToJSON(axelarTransfer.feeAsset),
    is_testnet: axelarTransfer.isTestnet,
  };
}

export function erc20ApprovalFromJSON(
  erc20ApprovalJSON: ERC20ApprovalJSON,
): ERC20Approval {
  return {
    tokenContract: erc20ApprovalJSON.token_contract,
    spender: erc20ApprovalJSON.spender,
    amount: erc20ApprovalJSON.amount,
  };
}

export function erc20ApprovalToJSON(
  erc20Approval: ERC20Approval,
): ERC20ApprovalJSON {
  return {
    token_contract: erc20Approval.tokenContract,
    spender: erc20Approval.spender,
    amount: erc20Approval.amount,
  };
}

export function evmTxFromJSON(evmTxJSON: EvmTxJSON): EvmTx {
  return {
    chainID: evmTxJSON.chain_id,
    to: evmTxJSON.to,
    value: evmTxJSON.value,
    data: evmTxJSON.data,
    requiredERC20Approvals: evmTxJSON.required_erc20_approvals.map(
      erc20ApprovalFromJSON,
    ),
  };
}

export function evmTxToJSON(evmTx: EvmTx): EvmTxJSON {
  return {
    chain_id: evmTx.chainID,
    to: evmTx.to,
    value: evmTx.value,
    data: evmTx.data,
    required_erc20_approvals:
      evmTx.requiredERC20Approvals.map(erc20ApprovalToJSON),
  };
}

export function msgFromJSON(msgJSON: MsgJSON): Msg {
  if ("multi_chain_msg" in msgJSON) {
    return {
      multiChainMsg: multiChainMsgFromJSON(msgJSON.multi_chain_msg),
    };
  }

  return {
    evmTx: evmTxFromJSON(msgJSON.evm_tx),
  };
}

export function msgToJSON(msg: Msg): MsgJSON {
  if ("multiChainMsg" in msg) {
    return {
      multi_chain_msg: multiChainMsgToJSON(msg.multiChainMsg),
    };
  }

  return {
    evm_tx: evmTxToJSON(msg.evmTx),
  };
}

export function sendTokenTransactionsFromJSON(
  sendTokenTransactionsJSON: SendTokenTransactionsJSON,
): SendTokenTransactions {
  return {
    sendTx: sendTokenTransactionsJSON.send_tx
      ? chainTransactionFromJSON(sendTokenTransactionsJSON.send_tx)
      : null,
    confirmTx: sendTokenTransactionsJSON.confirm_tx
      ? chainTransactionFromJSON(sendTokenTransactionsJSON.confirm_tx)
      : null,
    executeTx: sendTokenTransactionsJSON.execute_tx
      ? chainTransactionFromJSON(sendTokenTransactionsJSON.execute_tx)
      : null,
    error: sendTokenTransactionsJSON.error,
  };
}

export function sendTokenTransactionsToJSON(
  sendTokenTransactions: SendTokenTransactions,
): SendTokenTransactionsJSON {
  return {
    send_tx: sendTokenTransactions.sendTx
      ? chainTransactionToJSON(sendTokenTransactions.sendTx)
      : null,
    confirm_tx: sendTokenTransactions.confirmTx
      ? chainTransactionToJSON(sendTokenTransactions.confirmTx)
      : null,
    execute_tx: sendTokenTransactions.executeTx
      ? chainTransactionToJSON(sendTokenTransactions.executeTx)
      : null,
    error: sendTokenTransactions.error,
  };
}

export function contractCallWithTokenTransactionsFromJSON(
  value: ContractCallWithTokenTransactionsJSON,
): ContractCallWithTokenTransactions {
  return {
    sendTx: value.send_tx ? chainTransactionFromJSON(value.send_tx) : null,
    gasPaidTx: value.gas_paid_tx
      ? chainTransactionFromJSON(value.gas_paid_tx)
      : null,
    confirmTx: value.confirm_tx
      ? chainTransactionFromJSON(value.confirm_tx)
      : null,
    approveTx: value.approve_tx
      ? chainTransactionFromJSON(value.approve_tx)
      : null,
    executeTx: value.execute_tx
      ? chainTransactionFromJSON(value.execute_tx)
      : null,
    error: value.error,
  };
}

export function contractCallWithTokenTransactionsToJSON(
  value: ContractCallWithTokenTransactions,
): ContractCallWithTokenTransactionsJSON {
  return {
    send_tx: value.sendTx ? chainTransactionToJSON(value.sendTx) : null,
    gas_paid_tx: value.gasPaidTx
      ? chainTransactionToJSON(value.gasPaidTx)
      : null,
    confirm_tx: value.confirmTx
      ? chainTransactionToJSON(value.confirmTx)
      : null,
    approve_tx: value.approveTx
      ? chainTransactionToJSON(value.approveTx)
      : null,
    execute_tx: value.executeTx
      ? chainTransactionToJSON(value.executeTx)
      : null,
    error: value.error,
  };
}

export function axelarTransferTransactionsFromJSON(
  value: AxelarTransferTransactionsJSON,
): AxelarTransferTransactions {
  if ("contract_call_with_token_txs" in value) {
    return {
      contractCallWithTokenTxs: contractCallWithTokenTransactionsFromJSON(
        value.contract_call_with_token_txs,
      ),
    };
  }

  return {
    sendTokenTxs: sendTokenTransactionsFromJSON(value.send_token_txs),
  };
}

export function axelarTransferTransactionsToJSON(
  value: AxelarTransferTransactions,
): AxelarTransferTransactionsJSON {
  if ("contractCallWithTokenTxs" in value) {
    return {
      contract_call_with_token_txs: contractCallWithTokenTransactionsToJSON(
        value.contractCallWithTokenTxs,
      ),
    };
  }

  return {
    send_token_txs: sendTokenTransactionsToJSON(value.sendTokenTxs),
  };
}

export function axelarTransferInfoFromJSON(
  value: AxelarTransferInfoJSON,
): AxelarTransferInfo {
  return {
    srcChainID: value.src_chain_id,
    dstChainID: value.dst_chain_id,
    type: value.type,
    state: value.state,
    txs: value.txs && axelarTransferTransactionsFromJSON(value.txs),
    axelarScanLink: value.axelar_scan_link,
  };
}

export function axelarTransferInfoToJSON(
  value: AxelarTransferInfo,
): AxelarTransferInfoJSON {
  return {
    src_chain_id: value.srcChainID,
    dst_chain_id: value.dstChainID,
    type: value.type,
    state: value.state,
    txs: value.txs && axelarTransferTransactionsToJSON(value.txs),
    axelar_scan_link: value.axelarScanLink,
  };
}

export function transferEventFromJSON(value: TransferEventJSON): TransferEvent {
  if ("ibc_transfer" in value) {
    return {
      ibcTransfer: transferInfoFromJSON(value.ibc_transfer),
    };
  }

  return {
    axelarTransfer: axelarTransferInfoFromJSON(value.axelar_transfer),
  };
}

export function transferEventToJSON(value: TransferEvent): TransferEventJSON {
  if ("ibcTransfer" in value) {
    return {
      ibc_transfer: transferInfoToJSON(value.ibcTransfer),
    };
  }

  return {
    axelar_transfer: axelarTransferInfoToJSON(value.axelarTransfer),
  };
}

export function transferStatusFromJSON(
  value: TransferStatusJSON,
): TransferStatus {
  return {
    transferSequence: value.transfer_sequence.map(transferEventFromJSON),
    transferAssetRelease:
      value.transfer_asset_release &&
      transferAssetReleaseFromJSON(value.transfer_asset_release),
    error: value.error,
    state: value.state,
    nextBlockingTransfer:
      value.next_blocking_transfer &&
      nextBlockingTransferFromJSON(value.next_blocking_transfer),
  };
}

export function transferStatusToJSON(
  value: TransferStatus,
): TransferStatusJSON {
  return {
    transfer_sequence: value.transferSequence.map(transferEventToJSON),
    transfer_asset_release:
      value.transferAssetRelease &&
      transferAssetReleaseToJSON(value.transferAssetRelease),
    error: value.error,
    state: value.state,
    next_blocking_transfer:
      value.nextBlockingTransfer &&
      nextBlockingTransferToJSON(value.nextBlockingTransfer),
  };
}

export function denomWithChainIDFromJSON(
  value: DenomWithChainIDJSON,
): DenomWithChainID {
  return {
    chainID: value.chain_id,
    denom: value.denom,
  };
}

export function denomWithChainIDToJSON(
  value: DenomWithChainID,
): DenomWithChainIDJSON {
  return {
    chain_id: value.chainID,
    denom: value.denom,
  };
}

export function assetOrErrorFromJSON(value: AssetOrErrorJSON): AssetOrError {
  if ("asset" in value) {
    return { asset: assetFromJSON(value.asset) };
  }

  return { error: value.error };
}

export function assetOrErrorToJSON(value: AssetOrError): AssetOrErrorJSON {
  if ("asset" in value) {
    return { asset: assetToJSON(value.asset) };
  }

  return { error: value.error };
}

export function originAssetsRequestFromJSON(
  value: OriginAssetsRequestJSON,
): OriginAssetsRequest {
  return {
    assets: value.assets.map(denomWithChainIDFromJSON),
  };
}

export function originAssetsRequestToJSON(
  value: OriginAssetsRequest,
): OriginAssetsRequestJSON {
  return {
    assets: value.assets.map(denomWithChainIDToJSON),
  };
}

export function originAssetsResponseFromJSON(
  value: OriginAssetsResponseJSON,
): OriginAssetsResponse {
  return {
    originAssets: value.origin_assets.map(assetOrErrorFromJSON),
  };
}

export function originAssetsResponseToJSON(
  value: OriginAssetsResponse,
): OriginAssetsResponseJSON {
  return {
    origin_assets: value.originAssets.map(assetOrErrorToJSON),
  };
}

export function assetBetweenChainsFromJSON(
  value: AssetBetweenChainsJSON,
): AssetBetweenChains {
  return {
    assetOnSource: assetFromJSON(value.asset_on_source),
    assetOnDest: assetFromJSON(value.asset_on_dest),
    txsRequired: value.txs_required,
    bridges: value.bridges,
  };
}

export function assetBetweenChainsToJSON(
  value: AssetBetweenChains,
): AssetBetweenChainsJSON {
  return {
    asset_on_source: assetToJSON(value.assetOnSource),
    asset_on_dest: assetToJSON(value.assetOnDest),
    txs_required: value.txsRequired,
    bridges: value.bridges,
  };
}

export function assetsBetweenChainsRequestFromJSON(
  value: AssetsBetweenChainsRequestJSON,
): AssetsBetweenChainsRequest {
  return {
    sourceChainID: value.source_chain_id,
    destChainID: value.dest_chain_id,
    includeNoMetadataAssets: value.include_no_metadata_assets,
    includeCW20Assets: value.include_cw20_assets,
    includeEvmAssets: value.include_evm_assets,
    allowMultiTx: value.allow_multi_tx,
  };
}

export function assetsBetweenChainsRequestToJSON(
  value: AssetsBetweenChainsRequest,
): AssetsBetweenChainsRequestJSON {
  return {
    source_chain_id: value.sourceChainID,
    dest_chain_id: value.destChainID,
    include_no_metadata_assets: value.includeNoMetadataAssets,
    include_cw20_assets: value.includeCW20Assets,
    include_evm_assets: value.includeEvmAssets,
    allow_multi_tx: value.allowMultiTx,
  };
}

export function assetsBetweenChainsResponseFromJSON(
  value: AssetsBetweenChainsResponseJSON,
): AssetsBetweenChainsResponse {
  return {
    assetsBetweenChains: value.assets_between_chains.map(
      assetBetweenChainsFromJSON,
    ),
  };
}

export function assetRecommendationRequestFromJSON(
  value: AssetRecommendationRequestJSON,
): AssetRecommendationRequest {
  return {
    sourceAssetDenom: value.source_asset_denom,
    sourceAssetChainID: value.source_asset_chain_id,
    destChainID: value.dest_chain_id,
    reason: value.reason,
  };
}

export function assetRecommendationRequestToJSON(
  value: AssetRecommendationRequest,
): AssetRecommendationRequestJSON {
  return {
    source_asset_denom: value.sourceAssetDenom,
    source_asset_chain_id: value.sourceAssetChainID,
    dest_chain_id: value.destChainID,
    reason: value.reason,
  };
}
