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
  chain_id: string;
  pfm_enabled: boolean;
  dest_denom: string;
  supports_memo: boolean;
  fee_amount?: string;
  usd_fee_amount?: string;
  fee_asset?: AssetJSON;
  bridge_id: BridgeType;
};

export type Transfer = {
  port: string;
  channel: string;
  chainID: string;
  pfmEnabled: boolean;
  destDenom: string;
  supportsMemo: boolean;
  feeAmount?: string;
  usdFeeAmount?: string;
  feeAsset?: Asset;
  bridgeID: BridgeType;
};

export type AxelarTransferJSON = {
  from_chain: string;
  from_chain_id: string;
  to_chain: string;
  to_chain_id: string;
  asset: string;
  should_unwrap: boolean;
  fee_amount: string;
  fee_asset: AssetJSON;
  usd_fee_amount: string;
  is_testnet: boolean;
  bridge_id: BridgeType;
};

export type AxelarTransfer = {
  fromChain: string;
  fromChainID: string;
  toChain: string;
  toChainID: string;
  asset: string;
  shouldUnwrap: boolean;
  feeAmount: string;
  feeAsset: Asset;
  usdFeeAmount: string;
  isTestnet: boolean;
  bridgeID: BridgeType;
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

export type CCTPTransferJSON = {
  from_chain_id: string;
  to_chain_id: string;
  burn_token: string;
  bridge_id: BridgeType;
};

export type CCTPTransfer = {
  fromChainID: string;
  toChainID: string;
  burnToken: string;
  bridgeID: BridgeType;
};

export type SwapVenueJSON = {
  name: string;
  chain_id: string;
};

export type SwapVenue = {
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
};

export type Swap = (
  | { swapIn: SwapExactCoinIn }
  | { swapOut: SwapExactCoinOut }
) & {
  estimatedAffiliateFee?: string;
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
