import {
  Affiliate,
  AffiliateJSON,
  Asset,
  AssetJSON,
  AssetRecommendation,
  AssetRecommendationJSON,
  AssetsFromSourceRequest,
  AssetsFromSourceRequestJSON,
  AssetsRequest,
  AssetsRequestJSON,
  Chain,
  ChainJSON,
  CosmWasmContractMsg,
  CosmWasmContractMsgJSON,
  FeeAsset,
  FeeAssetJSON,
  MsgsRequest,
  MsgsRequestJSON,
  MultiChainMsg,
  MultiChainMsgJSON,
  Operation,
  OperationJSON,
  PostHandler,
  PostHandlerJSON,
  RecommendAssetsRequest,
  RecommendAssetsRequestJSON,
  RouteRequest,
  RouteRequestJSON,
  RouteResponse,
  RouteResponseJSON,
  SubmitTxRequest,
  SubmitTxRequestJSON,
  SubmitTxResponse,
  SubmitTxResponseJSON,
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
} from "./types";

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
    symbol: assetJSON.symbol,
    name: assetJSON.name,
    logoURI: assetJSON.logo_uri,
    decimals: assetJSON.decimals,
  };
}

export function assetToJSON(asset: Asset): AssetJSON {
  return {
    denom: asset.denom,
    chain_id: asset.chainID,
    origin_denom: asset.originDenom,
    origin_chain_id: asset.originChainID,
    trace: asset.trace,
    symbol: asset.symbol,
    name: asset.name,
    logo_uri: asset.logoURI,
    decimals: asset.decimals,
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
  };
}

export function assetsFromSourceRequestToJSON(
  assetsFromSourceRequest: AssetsFromSourceRequest,
): AssetsFromSourceRequestJSON {
  return {
    source_asset_denom: assetsFromSourceRequest.sourceAssetDenom,
    source_asset_chain_id: assetsFromSourceRequest.sourceAssetChainID,
    allow_multi_tx: assetsFromSourceRequest.allowMultiTx,
  };
}

export function assetsRequestFromJSON(
  assetsRequestJSON: AssetsRequestJSON,
): AssetsRequest {
  return {
    chainID: assetsRequestJSON.chain_id,
    nativeOnly: assetsRequestJSON.native_only,
    includeNoMetadataAssets: assetsRequestJSON.include_no_metadata_assets,
  };
}

export function assetsRequestToJSON(
  assetsRequest: AssetsRequest,
): AssetsRequestJSON {
  return {
    chain_id: assetsRequest.chainID,
    native_only: assetsRequest.nativeOnly,
    include_no_metadata_assets: assetsRequest.includeNoMetadataAssets,
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
    sourceAssetDenom: recommendAssetsRequestJSON.source_asset_denom,
    sourceAssetChainID: recommendAssetsRequestJSON.source_asset_chain_id,
    destChainID: recommendAssetsRequestJSON.dest_chain_id,
    reason: recommendAssetsRequestJSON.reason,
  };
}

export function recommendAssetsRequestToJSON(
  recommendAssetsRequest: RecommendAssetsRequest,
): RecommendAssetsRequestJSON {
  return {
    source_asset_denom: recommendAssetsRequest.sourceAssetDenom,
    source_asset_chain_id: recommendAssetsRequest.sourceAssetChainID,
    dest_chain_id: recommendAssetsRequest.destChainID,
    reason: recommendAssetsRequest.reason,
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
  };
}

export function swapExactCoinInToJSON(
  swapExactCoinIn: SwapExactCoinIn,
): SwapExactCoinInJSON {
  return {
    swap_venue: swapVenueToJSON(swapExactCoinIn.swapVenue),
    swap_operations: swapExactCoinIn.swapOperations.map(swapOperationToJSON),
    swap_amount_in: swapExactCoinIn.swapAmountIn,
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
  };
}

export function swapExactCoinOutToJSON(
  swapExactCoinOut: SwapExactCoinOut,
): SwapExactCoinOutJSON {
  return {
    swap_venue: swapVenueToJSON(swapExactCoinOut.swapVenue),
    swap_operations: swapExactCoinOut.swapOperations.map(swapOperationToJSON),
    swap_amount_out: swapExactCoinOut.swapAmountOut,
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

  return { swap: swapFromJSON(operationJSON.swap) };
}

export function operationToJSON(operation: Operation): OperationJSON {
  if ("transfer" in operation) {
    return { transfer: transferToJSON(operation.transfer) };
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
  };
}

export function submitTxRequestToJSON(
  submitTxRequest: SubmitTxRequest,
): SubmitTxRequestJSON {
  return {
    tx: submitTxRequest.tx,
    chain_id: submitTxRequest.chainID,
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
