import { OfflineAminoSigner } from "@cosmjs/amino";
import {
  GeneratedType,
  OfflineDirectSigner,
  OfflineSigner,
} from "@cosmjs/proto-signing";
import {
  AminoConverters,
  GasPrice,
  SignerData,
  StdFee,
} from "@cosmjs/stargate";

import { WalletClient } from "viem";

import * as types from "./types";
import { SignerWalletAdapter } from "@solana/wallet-adapter-base";
export type EndpointOptions = {
  rpc?: string;
  rest?: string;
};

export interface SkipRouterOptions {
  apiURL?: string;
  clientID?: string;
  getEVMSigner?: (chainID: string) => Promise<WalletClient>;
  getCosmosSigner?: (chainID: string) => Promise<OfflineSigner>;
  getSVMSigner?: () => Promise<SignerWalletAdapter>;
  endpointOptions?: {
    endpoints?: Record<string, EndpointOptions>;
    getRpcEndpointForChain?: (chainID: string) => Promise<string>;
    getRestEndpointForChain?: (chainID: string) => Promise<string>;
  };
  aminoTypes?: AminoConverters;
  registryTypes?: Iterable<[string, GeneratedType]>;
}

export type ExecuteRouteOptions = {
  route: types.RouteResponse;
  userAddresses: Record<string, string>;
  getEVMSigner?: (chainID: string) => Promise<WalletClient>;
  getCosmosSigner?: (chainID: string) => Promise<OfflineSigner>;
  getSVMSigner?: () => Promise<SignerWalletAdapter>;
  onTransactionBroadcast?: (txInfo: {
    txHash: string;
    chainID: string;
  }) => Promise<void>;
  onTransactionTracked?: (txInfo: {
    txHash: string;
    chainID: string;
  }) => Promise<void>;
  onTransactionCompleted?: (
    chainID: string,
    txHash: string,
    status: types.TxStatusResponse,
  ) => Promise<void>;
  validateGasBalance?: boolean;
  slippageTolerancePercent?: string;
  /**
   * If `getGasPrice` is undefined, or returns undefined, the router will attempt to set the recommended gas price
   **/
  getGasPrice?: (chainID: string) => Promise<GasPrice | undefined>;
  gasAmountMultiplier?: number;
};

export type ExecuteMultiChainMessageOptions = {
  signerAddress: string;
  signer: OfflineSigner;
  message: types.MultiChainMsg;
  fee: StdFee;
};

export type ExecuteCosmosMessage = {
  signerAddress: string;
  getCosmosSigner: (chainID: string) => Promise<OfflineSigner>;
  getGasPrice?: (chainID: string) => Promise<GasPrice | undefined>;
  chainID: string;
  message: types.CosmosMsg;
  gasAmountMultiplier?: number;
};

export type SignMultiChainMessageDirectOptions = {
  signerAddress: string;
  signer: OfflineDirectSigner;
  chainID: string;
  cosmosMsg: types.CosmosMsg;
  fee: StdFee;
  signerData: SignerData;
};

export type SignMultiChainMessageAminoOptions = {
  signerAddress: string;
  signer: OfflineAminoSigner;
  chainID: string;
  cosmosMsg: types.CosmosMsg;
  fee: StdFee;
  signerData: SignerData;
};
