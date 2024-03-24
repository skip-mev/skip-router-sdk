import { BridgeType } from "./unified";

export type IBCAddressJSON = {
  address: string;
  chain_id: string;
};

export type IBCAddress = {
  address: string;
  chainID: string;
};

export type AssetJSON = {
  denom: string;
  chain_id: string;

  origin_denom: string;
  origin_chain_id: string;
  trace: string;
  is_cw20: boolean;
  is_evm: boolean;
  is_svm: boolean;

  symbol: string | undefined;
  name: string | undefined;
  logo_uri: string | undefined;
  decimals: number | undefined;
  token_contract: string | undefined;
  description: string | undefined;
  coingecko_id: string | undefined;
  recommended_symbol: string | undefined;
};

export type Asset = {
  denom: string;
  chainID: string;

  originDenom: string;
  originChainID: string;
  trace: string;
  isCW20: boolean;
  isEVM: boolean;
  isSVM: boolean;

  symbol: string | undefined;
  name: string | undefined;
  logoURI: string | undefined;
  decimals: number | undefined;
  tokenContract: string | undefined;
  description: string | undefined;
  coingeckoID: string | undefined;
  recommendedSymbol: string | undefined;
};

export type TransferJSON = {
  port: string;
  channel: string;
  from_chain_id: string;
  to_chain_id: string;
  pfm_enabled: boolean;
  supports_memo: boolean;

  denom_in: string;
  denom_out: string;

  fee_amount?: string;
  usd_fee_amount?: string;
  fee_asset?: AssetJSON;

  bridge_id: BridgeType;
  rapid_relay: boolean;

  /**
   * @deprecated use `from_chain_id` and `to_chain_id` instead
   */
  chain_id: string;

  /**
   * @deprecated use `denom_out` instead
   */
  dest_denom: string;
};

export type Transfer = {
  port: string;
  channel: string;
  fromChainID: string;
  toChainID: string;
  pfmEnabled: boolean;
  supportsMemo: boolean;

  denomIn: string;
  denomOut: string;

  feeAmount?: string;
  usdFeeAmount?: string;
  feeAsset?: Asset;

  bridgeID: BridgeType;
  rapidRelay: boolean;

  /**
   * @deprecated use `fromChainID` and `toChainID` instead
   */
  chainID: string;

  /**
   * @deprecated use `denomOut` instead
   */
  destDenom: string;
};

export type AxelarTransferJSON = {
  from_chain: string;
  from_chain_id: string;
  to_chain: string;
  to_chain_id: string;
  asset: string;
  should_unwrap: boolean;

  denom_in: string;
  denom_out: string;

  fee_amount: string;
  usd_fee_amount: string;
  fee_asset: AssetJSON;

  is_testnet: boolean;

  ibc_transfer_to_axelar?: TransferJSON;

  bridge_id: BridgeType;
  rapid_relay: boolean;
};

export type AxelarTransfer = {
  fromChain: string;
  fromChainID: string;
  toChain: string;
  toChainID: string;
  asset: string;
  shouldUnwrap: boolean;

  denomIn: string;
  denomOut: string;

  feeAmount: string;
  usdFeeAmount: string;
  feeAsset: Asset;

  isTestnet: boolean;

  ibcTransferToAxelar?: Transfer;

  bridgeID: BridgeType;
  rapidRelay: boolean;
};

export type BankSendJSON = {
  chain_id: string;
  denom: string;
};

export type BankSend = {
  chainID: string;
  denom: string;
};

export type MultiChainMsgJSON = {
  chain_id: string;
  path: string[];
  msg: string;
  msg_type_url: string;
};

export type MultiChainMsg = {
  chainID: string;
  path: string[];
  msg: string;
  msgTypeURL: string;
};

export type CosmosMsgJSON = {
  msg: string;
  msg_type_url: string;
};
export type CosmosMsg = {
  msg: string;
  msgTypeURL: string;
};

export type CosmosTxJSON = {
  chain_id: string;
  path: string[];
  msgs: CosmosMsgJSON[];
};

export type CosmosTx = {
  chainID: string;
  path: string[];
  msgs: CosmosMsg[];
};

export type CCTPTransferJSON = {
  from_chain_id: string;
  to_chain_id: string;
  burn_token: string;
  bridge_id: BridgeType;
  denom_in: string;
  denom_out: string;
  rapid_relay: boolean;
};

export type CCTPTransfer = {
  fromChainID: string;
  toChainID: string;
  burnToken: string;
  bridgeID: BridgeType;
  denomIn: string;
  denomOut: string;
  rapidRelay: boolean;
};

export type HyperlaneTransferJSON = {
  from_chain_id: string;
  to_chain_id: string;
  denom_in: string;
  denom_out: string;
  hyperlane_contract_address: string;
  fee_amount: string;
  usd_fee_amount?: string;
  fee_asset: AssetJSON;
  bridge_id: BridgeType;
  rapid_relay: boolean;
};

export type HyperlaneTransfer = {
  fromChainID: string;
  toChainID: string;
  denomIn: string;
  denomOut: string;
  hyperlaneContractAddress: string;
  feeAmount: string;
  usdFeeAmount?: string;
  feeAsset: Asset;
  bridgeID: BridgeType;
  rapidRelay: boolean;
};

export type SwapVenueJSON = {
  name: string;
  chain_id: string;
  logo_uri: string;
};

export type SwapVenue = {
  name: string;
  chainID: string;
  logoUri: string;
};

export type SwapVenueRequestJSON = {
  name: string;
  chain_id: string;
};

export type SwapVenueRequest = {
  name: string;
  chainID: string;
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

export type SwapExactCoinOutJSON = {
  swap_venue: SwapVenueJSON;
  swap_operations: SwapOperationJSON[];
  swap_amount_out: string;
  price_impact_percent?: string;
};

export type SwapExactCoinOut = {
  swapVenue: SwapVenue;
  swapOperations: SwapOperation[];
  swapAmountOut: string;
  priceImpactPercent?: string;
};

export type SwapExactCoinInJSON = {
  swap_venue: SwapVenueJSON;
  swap_operations: SwapOperationJSON[];
  swap_amount_in?: string;
  price_impact_percent?: string;
};

export type SwapExactCoinIn = {
  swapVenue: SwapVenue;
  swapOperations: SwapOperation[];
  swapAmountIn?: string;
  priceImpactPercent?: string;
};

export type SwapJSON = (
  | { swap_in: SwapExactCoinInJSON }
  | { swap_out: SwapExactCoinOutJSON }
) & {
  estimated_affiliate_fee?: string;
  chain_id: string;
  denom_in: string;
  denom_out: string;
};

export type Swap = (
  | { swapIn: SwapExactCoinIn }
  | { swapOut: SwapExactCoinOut }
) & {
  estimatedAffiliateFee?: string;
  chainID: string;
  denomIn: string;
  denomOut: string;
};

export type AffiliateJSON = {
  basis_points_fee: string;
  address: string;
};

export type Affiliate = {
  basisPointsFee: string;
  address: string;
};

export type Reason = "UNKNOWN" | "BASE_TOKEN" | "MOST_LIQUID" | "DIRECT";

export type CosmWasmContractMsgJSON = {
  contract_address: string;
  msg: string;
};

export type CosmWasmContractMsg = {
  contractAddress: string;
  msg: string;
};

export type AutopilotAction = "LIQUID_STAKE" | "CLAIM";

export type AutopilotMsg = {
  receiver: string;
  action: AutopilotAction;
};

export type PostHandlerJSON =
  | { wasm_msg: CosmWasmContractMsgJSON }
  | { autopilot_msg: AutopilotMsg };

export type PostHandler =
  | { wasmMsg: CosmWasmContractMsg }
  | { autopilotMsg: AutopilotMsg };

export type ERC20ApprovalJSON = {
  token_contract: string;
  spender: string;
  amount: string;
};

export type ERC20Approval = {
  tokenContract: string;
  spender: string;
  amount: string;
};

export type SvmTxJSON = {
  chain_id: string;
  tx: string;
};

export type SvmTx = {
  chainID: string;
  tx: string;
};

export type EvmTxJSON = {
  chain_id: string;
  to: string;
  value: string;
  data: string;
  required_erc20_approvals: ERC20ApprovalJSON[];
};

export type EvmTx = {
  chainID: string;
  to: string;
  value: string;
  data: string;
  requiredERC20Approvals: ERC20Approval[];
};

export type DenomWithChainIDJSON = {
  denom: string;
  chain_id: string;
};

export type DenomWithChainID = {
  denom: string;
  chainID: string;
};

export type ApiError = {
  message: string;
};

export type AssetOrErrorJSON = { asset: AssetJSON } | { error: ApiError };

export type AssetOrError = { asset: Asset } | { error: ApiError };

export type OriginAssetsRequestJSON = {
  assets: DenomWithChainIDJSON[];
};

export type OriginAssetsRequest = {
  assets: DenomWithChainID[];
};

export type OriginAssetsResponseJSON = {
  origin_assets: AssetOrErrorJSON[];
};

export type OriginAssetsResponse = {
  originAssets: AssetOrError[];
};
