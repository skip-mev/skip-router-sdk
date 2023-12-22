import {
  encodeSecp256k1Pubkey,
  makeSignDoc as makeSignDocAmino,
  OfflineAminoSigner,
} from "@cosmjs/amino";
import {
  createWasmAminoConverters,
  SigningCosmWasmClient,
} from "@cosmjs/cosmwasm-stargate";
import { fromBase64 } from "@cosmjs/encoding";
import { Int53 } from "@cosmjs/math";
import {
  Coin,
  encodePubkey,
  isOfflineDirectSigner,
  makeAuthInfoBytes,
  makeSignDoc,
  OfflineDirectSigner,
  OfflineSigner,
  Registry,
  TxBodyEncodeObject,
} from "@cosmjs/proto-signing";
import { coin } from "@cosmjs/proto-signing";
import {
  AminoTypes,
  createDefaultAminoConverters,
  defaultRegistryTypes,
  SignerData,
  StargateClient,
  StdFee,
} from "@cosmjs/stargate";
import {
  ChainRestAuthApi,
  ChainRestTendermintApi,
} from "@injectivelabs/sdk-ts/dist/cjs/client/chain/rest";
import {
  BigNumberInBase,
  DEFAULT_BLOCK_TIMEOUT_HEIGHT,
} from "@injectivelabs/utils";
import axios from "axios";
import { SignMode } from "cosmjs-types/cosmos/tx/signing/v1beta1/signing";
import { TxRaw } from "cosmjs-types/cosmos/tx/v1beta1/tx";
import { MsgExecuteContract } from "cosmjs-types/cosmwasm/wasm/v1/tx";
import { maxUint256, publicActions, WalletClient } from "viem";

import chains from "./chains";
import { erc20ABI } from "./constants/abis";
import { createTransaction } from "./injective";
import { RequestClient } from "./request-client";
import {
  getEncodeObjectFromMultiChainMessage,
  getEncodeObjectFromMultiChainMessageInjective,
  getGasAmountForMessage,
} from "./transactions";
import {
  Asset,
  AssetBetweenChains,
  assetFromJSON,
  AssetJSON,
  AssetOrError,
  assetRecommendationFromJSON,
  AssetRecommendationJSON,
  AssetsBetweenChainsRequest,
  assetsBetweenChainsRequestToJSON,
  assetsBetweenChainsResponseFromJSON,
  AssetsBetweenChainsResponseJSON,
  AssetsFromSourceRequest,
  AssetsFromSourceRequestJSON,
  assetsFromSourceRequestToJSON,
  AssetsRequest,
  AssetsRequestJSON,
  assetsRequestToJSON,
  Chain,
  chainFromJSON,
  ChainJSON,
  DenomWithChainID,
  EvmTx,
  Msg,
  msgFromJSON,
  MsgsRequest,
  MsgsRequestJSON,
  msgsRequestToJSON,
  MsgsResponseJSON,
  MultiChainMsg,
  originAssetsRequestToJSON,
  originAssetsResponseFromJSON,
  OriginAssetsResponseJSON,
  RecommendAssetsRequest,
  recommendAssetsRequestToJSON,
  RouteRequest,
  RouteRequestJSON,
  routeRequestToJSON,
  RouteResponse,
  routeResponseFromJSON,
  RouteResponseJSON,
  StatusRequestJSON,
  SubmitTxRequestJSON,
  SubmitTxResponse,
  submitTxResponseFromJSON,
  SubmitTxResponseJSON,
  SwapVenue,
  swapVenueFromJSON,
  SwapVenueJSON,
  TrackTxRequestJSON,
  TrackTxResponse,
  trackTxResponseFromJSON,
  TrackTxResponseJSON,
  TxStatusResponse,
  txStatusResponseFromJSON,
  TxStatusResponseJSON,
} from "./types";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const SKIP_API_URL = "https://api.skip.money";

export type EndpointOptions = {
  rpc?: string;
  rest?: string;
};

export interface SkipRouterOptions {
  apiURL?: string;
  clientID?: string;
  getEVMSigner?: (chainID: string) => Promise<WalletClient>;
  getCosmosSigner?: (chainID: string) => Promise<OfflineSigner>;
  endpointOptions?: {
    endpoints?: Record<string, EndpointOptions>;
    getRpcEndpointForChain?: (chainID: string) => Promise<string>;
    getRestEndpointForChain?: (chainID: string) => Promise<string>;
  };
}

export type ExecuteRouteOptions = {
  route: RouteResponse;
  userAddresses: Record<string, string>;
  getEVMSigner?: (chainID: string) => Promise<WalletClient>;
  getCosmosSigner?: (chainID: string) => Promise<OfflineSigner>;
  onTransactionBroadcast?: (txInfo: {
    txHash: string;
    chainID: string;
  }) => Promise<void>;
  onTransactionCompleted?: (
    chainID: string,
    txHash: string,
    status: TxStatusResponse,
  ) => Promise<void>;
  validateGasBalance?: boolean;
  slippageTolerancePercent?: string;
};

export type ExecuteMultiChainMessageOptions = {
  signerAddress: string;
  signer: OfflineSigner;
  message: MultiChainMsg;
  feeAmount: Coin;
};

export type SignMultiChainMessageDirectOptions = {
  signerAddress: string;
  signer: OfflineDirectSigner;
  multiChainMessage: MultiChainMsg;
  fee: StdFee;
  signerData: SignerData;
};

export type SignMultiChainMessageAminoOptions = {
  signerAddress: string;
  signer: OfflineAminoSigner;
  multiChainMessage: MultiChainMsg;
  fee: StdFee;
  signerData: SignerData;
};

export class SkipRouter {
  private requestClient: RequestClient;

  private aminoTypes: AminoTypes;
  private registry: Registry;

  private clientID: string;

  private endpointOptions: {
    endpoints?: Record<string, EndpointOptions>;
    getRpcEndpointForChain?: (chainID: string) => Promise<string>;
    getRestEndpointForChain?: (chainID: string) => Promise<string>;
  };

  private getCosmosSigner?: (chainID: string) => Promise<OfflineSigner>;
  private getEVMSigner?: (chainID: string) => Promise<WalletClient>;

  constructor(options: SkipRouterOptions = {}) {
    this.clientID = options.clientID ?? "skip-router-js";
    this.requestClient = new RequestClient(options.apiURL ?? SKIP_API_URL);

    this.aminoTypes = new AminoTypes({
      ...createDefaultAminoConverters(),
      ...createWasmAminoConverters(),
    });

    this.registry = new Registry(defaultRegistryTypes);
    this.registry.register(
      "/cosmwasm.wasm.v1.MsgExecuteContract",
      MsgExecuteContract,
    );

    this.endpointOptions = options.endpointOptions ?? {};
    this.getCosmosSigner = options.getCosmosSigner;
    this.getEVMSigner = options.getEVMSigner;
  }

  async assets(options: AssetsRequest = {}): Promise<Record<string, Asset[]>> {
    const response = await this.requestClient.get<
      {
        chain_to_assets_map: Record<string, { assets: AssetJSON[] }>;
      },
      AssetsRequestJSON
    >(
      "/v1/fungible/assets",
      assetsRequestToJSON({
        ...options,
        clientID: this.clientID,
      }),
    );

    return Object.entries(response.chain_to_assets_map).reduce(
      (acc, [chainID, { assets }]) => {
        acc[chainID] = assets.map((asset) => assetFromJSON(asset));
        return acc;
      },
      {} as Record<string, Asset[]>,
    );
  }

  async assetsFromSource(
    options: AssetsFromSourceRequest,
  ): Promise<Record<string, Asset[]>> {
    const response = await this.requestClient.post<
      {
        dest_assets: Record<string, { assets: AssetJSON[] }>;
      },
      AssetsFromSourceRequestJSON
    >(
      "/v1/fungible/assets_from_source",
      assetsFromSourceRequestToJSON({
        ...options,
        clientID: this.clientID,
      }),
    );

    return Object.entries(response.dest_assets).reduce(
      (acc, [chainID, { assets }]) => {
        acc[chainID] = assets.map((asset) => assetFromJSON(asset));
        return acc;
      },
      {} as Record<string, Asset[]>,
    );
  }

  async assetsBetweenChains(
    options: AssetsBetweenChainsRequest,
  ): Promise<AssetBetweenChains[]> {
    const response =
      await this.requestClient.post<AssetsBetweenChainsResponseJSON>(
        "/v2/fungible/assets_between_chains",
        assetsBetweenChainsRequestToJSON(options),
      );

    return assetsBetweenChainsResponseFromJSON(response).assetsBetweenChains;
  }

  async chains(
    {
      includeEVM,
    }: {
      includeEVM?: boolean;
    } = { includeEVM: false },
  ): Promise<Chain[]> {
    const response = await this.requestClient.get<{ chains: ChainJSON[] }>(
      "/v1/info/chains",
      {
        include_evm: includeEVM,
        client_id: this.clientID,
      },
    );

    return response.chains.map((chain) => chainFromJSON(chain));
  }

  async executeRoute(options: ExecuteRouteOptions) {
    const { route, userAddresses, validateGasBalance } = options;

    let getOfflineSigner = this.getCosmosSigner;
    if (options.getCosmosSigner) {
      getOfflineSigner = options.getCosmosSigner;
    }

    if (!getOfflineSigner) {
      throw new Error(
        "Unable to get Cosmos signer. Please provide a signer or a function to get a signer",
      );
    }

    const messages = await this.messages({
      sourceAssetDenom: route.sourceAssetDenom,
      sourceAssetChainID: route.sourceAssetChainID,
      destAssetDenom: route.destAssetDenom,
      destAssetChainID: route.destAssetChainID,
      amountIn: route.amountIn,
      amountOut: route.estimatedAmountOut ?? "0",
      addressList: route.chainIDs.map((chainID) => userAddresses[chainID]),
      operations: route.operations,
      slippageTolerancePercent: options.slippageTolerancePercent ?? "1",
    });

    if (validateGasBalance) {
      // check balances on chains where a tx is initiated
      await this.validateGasBalances(messages, userAddresses, getOfflineSigner);
    }

    // execute txs
    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];

      if ("multiChainMsg" in message) {
        const { multiChainMsg } = message;

        const feeInfo = this.getFeeInfoForChain(multiChainMsg.chainID);

        let averageGasPrice = 0;
        if (feeInfo.low_gas_price) {
          averageGasPrice = feeInfo.low_gas_price;
        } else if (feeInfo.average_gas_price) {
          averageGasPrice = feeInfo.average_gas_price;
        }

        const signer = await getOfflineSigner(multiChainMsg.chainID);

        const endpoint = await this.getRpcEndpointForChain(
          multiChainMsg.chainID,
        );

        const client = await SigningCosmWasmClient.connectWithSigner(
          endpoint,
          signer,
        );

        const estimatedGas = await getGasAmountForMessage(
          client,
          userAddresses[multiChainMsg.chainID],
          multiChainMsg,
        );

        const feeAmount = averageGasPrice * parseInt(estimatedGas);

        const tx = await this.executeMultiChainMessage({
          signerAddress: userAddresses[multiChainMsg.chainID],
          signer,
          message: multiChainMsg,
          feeAmount: coin(feeAmount.toFixed(0), feeInfo.denom),
        });

        if (options.onTransactionBroadcast) {
          await options.onTransactionBroadcast({
            chainID: multiChainMsg.chainID,
            txHash: tx.transactionHash,
          });
        }

        const txStatusResponse = await this.waitForTransaction({
          chainID: multiChainMsg.chainID,
          txHash: tx.transactionHash,
        });

        if (options.onTransactionCompleted) {
          await options.onTransactionCompleted(
            multiChainMsg.chainID,
            tx.transactionHash,
            txStatusResponse,
          );
        }
      }

      if ("evmTx" in message) {
        const { evmTx } = message;

        let getEVMSigner = this.getEVMSigner;
        if (options.getEVMSigner) {
          getEVMSigner = options.getEVMSigner;
        }
        if (!getEVMSigner) {
          throw new Error("Unable to get EVM signer");
        }

        const evmSigner = await getEVMSigner(evmTx.chainID);

        const txReceipt = await this.executeEVMTransaction({
          message: evmTx,
          signer: evmSigner,
        });

        if (options.onTransactionBroadcast) {
          await options.onTransactionBroadcast({
            chainID: evmTx.chainID,
            txHash: txReceipt.transactionHash,
          });
        }

        const txStatusResponse = await this.waitForTransaction({
          chainID: evmTx.chainID,
          txHash: txReceipt.transactionHash,
        });

        if (options.onTransactionCompleted) {
          await options.onTransactionCompleted(
            evmTx.chainID,
            txReceipt.transactionHash,
            txStatusResponse,
          );
        }
      }
    }
  }

  async executeMultiChainMessage(options: ExecuteMultiChainMessageOptions) {
    const { signerAddress, signer, message, feeAmount } = options;

    const accounts = await signer.getAccounts();
    const accountFromSigner = accounts.find(
      (account) => account.address === signerAddress,
    );

    if (!accountFromSigner) {
      throw new Error("Failed to retrieve account from signer");
    }

    const endpoint = await this.getRpcEndpointForChain(message.chainID);

    const stargateClient = await SigningCosmWasmClient.connectWithSigner(
      endpoint,
      signer,
    );

    const { accountNumber, sequence } = await this.getAccountNumberAndSequence(
      signerAddress,
      message.chainID,
    );

    const gas = await getGasAmountForMessage(
      stargateClient,
      signerAddress,
      message,
    );

    let rawTx: TxRaw;
    if (isOfflineDirectSigner(signer)) {
      rawTx = await this.signMultiChainMessageDirect({
        signerAddress,
        signer,
        multiChainMessage: message,
        fee: {
          amount: [feeAmount],
          gas,
        },
        signerData: {
          accountNumber,
          sequence,
          chainId: message.chainID,
        },
      });
    } else {
      rawTx = await this.signMultiChainMessageAmino({
        signerAddress,
        signer,
        multiChainMessage: message,
        fee: {
          amount: [feeAmount],
          gas,
        },
        signerData: {
          accountNumber,
          sequence,
          chainId: message.chainID,
        },
      });
    }

    const txBytes = TxRaw.encode(rawTx).finish();

    const tx = await stargateClient.broadcastTx(txBytes);

    return tx;
  }

  async executeEVMTransaction({
    message,
    signer,
  }: {
    message: EvmTx;
    signer: WalletClient;
  }) {
    if (!signer.account) {
      throw new Error("Failed to retrieve account from signer");
    }

    const extendedSigner = signer.extend(publicActions);

    // check for approvals
    for (const requiredApproval of message.requiredERC20Approvals) {
      const allowance = await extendedSigner.readContract({
        address: requiredApproval.tokenContract as `0x${string}`,
        abi: erc20ABI,
        functionName: "allowance",
        args: [
          signer.account.address as `0x${string}`,
          requiredApproval.spender as `0x${string}`,
        ],
      });

      if (allowance > BigInt(requiredApproval.amount)) {
        continue;
      }

      const txHash = await extendedSigner.writeContract({
        account: signer.account,
        address: requiredApproval.tokenContract as `0x${string}`,
        abi: erc20ABI,
        functionName: "approve",
        args: [requiredApproval.spender as `0x${string}`, maxUint256],
        chain: signer.chain,
      });

      const receipt = await extendedSigner.waitForTransactionReceipt({
        hash: txHash,
      });

      if (receipt.status === "reverted") {
        throw new Error(`EVM tx reverted: ${receipt.transactionHash}`);
      }
    }

    // execute tx
    const txHash = await extendedSigner.sendTransaction({
      account: signer.account,
      to: message.to as `0x${string}`,
      data: `0x${message.data}`,
      chain: signer.chain,
      value: message.value === "" ? undefined : BigInt(message.value),
    });

    const receipt = await extendedSigner.waitForTransactionReceipt({
      hash: txHash,
    });

    return receipt;
  }

  async signMultiChainMessageDirect(
    options: SignMultiChainMessageDirectOptions,
  ): Promise<TxRaw> {
    const {
      signer,
      signerAddress,
      multiChainMessage,
      fee,
      signerData: { accountNumber, sequence, chainId },
    } = options;

    if (multiChainMessage.chainID.includes("evmos")) {
      return this.signMultiChainMessageDirectEvmos(
        signerAddress,
        signer,
        multiChainMessage,
        fee,
        { accountNumber, sequence, chainId },
      );
    }

    if (multiChainMessage.chainID.includes("injective")) {
      return this.signMultiChainMessageDirectInjective(
        signerAddress,
        signer,
        multiChainMessage,
        fee,
        { accountNumber, sequence, chainId },
      );
    }

    const accounts = await signer.getAccounts();
    const accountFromSigner = accounts.find(
      (account) => account.address === signerAddress,
    );

    if (!accountFromSigner) {
      throw new Error("Failed to retrieve account from signer");
    }

    const message = getEncodeObjectFromMultiChainMessage(multiChainMessage);

    const pubkey = encodePubkey(
      encodeSecp256k1Pubkey(accountFromSigner.pubkey),
    );

    const txBodyEncodeObject: TxBodyEncodeObject = {
      typeUrl: "/cosmos.tx.v1beta1.TxBody",
      value: {
        messages: [message],
      },
    };

    const txBodyBytes = this.registry.encode(txBodyEncodeObject);

    const gasLimit = Int53.fromString(fee.gas).toNumber();

    const authInfoBytes = makeAuthInfoBytes(
      [{ pubkey, sequence }],
      fee.amount,
      gasLimit,
      fee.granter,
      fee.payer,
    );

    const signDoc = makeSignDoc(
      txBodyBytes,
      authInfoBytes,
      chainId,
      accountNumber,
    );

    const { signature, signed } = await signer.signDirect(
      signerAddress,
      signDoc,
    );

    return TxRaw.fromPartial({
      bodyBytes: signed.bodyBytes,
      authInfoBytes: signed.authInfoBytes,
      signatures: [fromBase64(signature.signature)],
    });
  }

  // TODO: This is previously existing code, just moved to a new function.
  // Using signMultiChainMessageDirect on evmos DOES currently fail.
  // I need to investigate what exactly is even different about this and hopefully remove it all together.
  private async signMultiChainMessageDirectEvmos(
    signerAddress: string,
    signer: OfflineDirectSigner,
    multiChainMessage: MultiChainMsg,
    fee: StdFee,
    { accountNumber, sequence, chainId }: SignerData,
  ): Promise<TxRaw> {
    const accounts = await signer.getAccounts();
    const accountFromSigner = accounts.find(
      (account) => account.address === signerAddress,
    );

    if (!accountFromSigner) {
      throw new Error("Failed to retrieve account from signer");
    }

    const message =
      getEncodeObjectFromMultiChainMessageInjective(multiChainMessage);

    const pk = Buffer.from(accountFromSigner.pubkey).toString("base64");

    const { signDoc } = createTransaction({
      pubKey: pk,
      chainId: chainId,
      message: [message],
      sequence,
      accountNumber,
      timeoutHeight: 0,
      fee,
    });

    const directSignResponse = await signer.signDirect(
      signerAddress,
      // @ts-expect-error TODO: Fix this
      signDoc,
    );

    return TxRaw.fromPartial({
      bodyBytes: directSignResponse.signed.bodyBytes,
      authInfoBytes: directSignResponse.signed.authInfoBytes,
      signatures: [fromBase64(directSignResponse.signature.signature)],
    });
  }

  // TODO: This is previously existing code, just moved to a new function.
  // Using signMultiChainMessageDirect on injective DOES currently fail.
  // I need to investigate what exactly is even different about this and hopefully remove it all together.
  private async signMultiChainMessageDirectInjective(
    signerAddress: string,
    signer: OfflineDirectSigner,
    multiChainMessage: MultiChainMsg,
    fee: StdFee,
    { accountNumber, sequence, chainId }: SignerData,
  ): Promise<TxRaw> {
    const accounts = await signer.getAccounts();
    const accountFromSigner = accounts.find(
      (account) => account.address === signerAddress,
    );

    if (!accountFromSigner) {
      throw new Error("Failed to retrieve account from signer");
    }

    const restEndpoint = await this.getRestEndpointForChain(
      multiChainMessage.chainID,
    );

    /** Block Details */
    const chainRestTendermintApi = new ChainRestTendermintApi(restEndpoint);
    const latestBlock = await chainRestTendermintApi.fetchLatestBlock();
    const latestHeight = latestBlock.header.height;
    const timeoutHeight = new BigNumberInBase(latestHeight).plus(
      DEFAULT_BLOCK_TIMEOUT_HEIGHT,
    );

    const pk = Buffer.from(accountFromSigner.pubkey).toString("base64");

    const message =
      getEncodeObjectFromMultiChainMessageInjective(multiChainMessage);

    const { signDoc } = createTransaction({
      pubKey: pk,
      chainId: chainId,
      message: [message],
      sequence,
      accountNumber,
      timeoutHeight: timeoutHeight.toNumber(),
      fee,
    });

    const directSignResponse = await signer.signDirect(
      signerAddress,
      // @ts-expect-error TODO: Fix this
      signDoc,
    );

    return TxRaw.fromPartial({
      bodyBytes: directSignResponse.signed.bodyBytes,
      authInfoBytes: directSignResponse.signed.authInfoBytes,
      signatures: [fromBase64(directSignResponse.signature.signature)],
    });
  }

  async signMultiChainMessageAmino(
    options: SignMultiChainMessageAminoOptions,
  ): Promise<TxRaw> {
    const {
      signer,
      signerAddress,
      multiChainMessage,
      fee,
      signerData: { accountNumber, sequence, chainId },
    } = options;

    const accounts = await signer.getAccounts();
    const accountFromSigner = accounts.find(
      (account) => account.address === signerAddress,
    );

    if (!accountFromSigner) {
      throw new Error("Failed to retrieve account from signer");
    }

    const message = getEncodeObjectFromMultiChainMessage(multiChainMessage);

    const pubkey = encodePubkey(
      encodeSecp256k1Pubkey(accountFromSigner.pubkey),
    );

    const signMode = SignMode.SIGN_MODE_LEGACY_AMINO_JSON;

    const msgs = [this.aminoTypes.toAmino(message)];

    msgs[0].value.memo = message.value.memo;

    const signDoc = makeSignDocAmino(
      msgs,
      fee,
      chainId,
      "",
      accountNumber,
      sequence,
    );

    const { signature, signed } = await signer.signAmino(
      signerAddress,
      signDoc,
    );

    const signedTxBody = {
      messages: signed.msgs.map((msg) => this.aminoTypes.fromAmino(msg)),
      memo: signed.memo,
    };

    signedTxBody.messages[0].value.memo = message.value.memo;

    const signedTxBodyEncodeObject: TxBodyEncodeObject = {
      typeUrl: "/cosmos.tx.v1beta1.TxBody",
      value: signedTxBody,
    };

    const signedTxBodyBytes = this.registry.encode(signedTxBodyEncodeObject);

    const signedGasLimit = Int53.fromString(signed.fee.gas).toNumber();
    const signedSequence = Int53.fromString(signed.sequence).toNumber();

    const signedAuthInfoBytes = makeAuthInfoBytes(
      [{ pubkey, sequence: signedSequence }],
      signed.fee.amount,
      signedGasLimit,
      signed.fee.granter,
      signed.fee.payer,
      signMode,
    );

    return TxRaw.fromPartial({
      bodyBytes: signedTxBodyBytes,
      authInfoBytes: signedAuthInfoBytes,
      signatures: [fromBase64(signature.signature)],
    });
  }

  async messages(options: MsgsRequest): Promise<Msg[]> {
    const response = await this.requestClient.post<
      MsgsResponseJSON,
      MsgsRequestJSON
    >("/v2/fungible/msgs", {
      ...msgsRequestToJSON(options),
      slippage_tolerance_percent: options.slippageTolerancePercent ?? "0",
      client_id: this.clientID,
    });

    return response.msgs.map((msg) => msgFromJSON(msg));
  }

  async route(options: RouteRequest): Promise<RouteResponse> {
    const response = await this.requestClient.post<
      RouteResponseJSON,
      RouteRequestJSON
    >("/v2/fungible/route", {
      ...routeRequestToJSON(options),
      cumulative_affiliate_fee_bps: options.cumulativeAffiliateFeeBPS ?? "0",
      client_id: this.clientID,
    });

    return routeResponseFromJSON(response);
  }

  async recommendAssets(options: RecommendAssetsRequest) {
    const response = await this.requestClient.post<{
      recommendations: AssetRecommendationJSON[];
    }>(
      "/v1/fungible/recommend_assets",
      recommendAssetsRequestToJSON({
        ...options,
        clientID: this.clientID,
      }),
    );

    return response.recommendations.map((recommendation) =>
      assetRecommendationFromJSON(recommendation),
    );
  }

  async ibcOriginAssets(assets: DenomWithChainID[]): Promise<AssetOrError[]> {
    const response = await this.requestClient.post<OriginAssetsResponseJSON>(
      "/v2/fungible/ibc_origin_assets",
      originAssetsRequestToJSON({
        assets,
      }),
    );

    return originAssetsResponseFromJSON(response).originAssets;
  }

  async submitTransaction({
    chainID,
    tx,
  }: {
    chainID: string;
    tx: string;
  }): Promise<SubmitTxResponse> {
    const response = await this.requestClient.post<
      SubmitTxResponseJSON,
      SubmitTxRequestJSON
    >("/v2/tx/submit", {
      chain_id: chainID,
      tx: tx,
      client_id: this.clientID,
    });

    return submitTxResponseFromJSON(response);
  }

  async trackTransaction({
    chainID,
    txHash,
  }: {
    chainID: string;
    txHash: string;
  }): Promise<TrackTxResponse> {
    const response = await this.requestClient.post<
      TrackTxResponseJSON,
      TrackTxRequestJSON
    >("/v2/tx/track", {
      chain_id: chainID,
      tx_hash: txHash,
      client_id: this.clientID,
    });

    return trackTxResponseFromJSON(response);
  }

  async transactionStatus({
    chainID,
    txHash,
  }: {
    chainID: string;
    txHash: string;
  }): Promise<TxStatusResponse> {
    const response = await this.requestClient.get<
      TxStatusResponseJSON,
      StatusRequestJSON
    >("/v2/tx/status", {
      chain_id: chainID,
      tx_hash: txHash,
      client_id: this.clientID,
    });

    return txStatusResponseFromJSON(response);
  }

  async waitForTransaction({
    chainID,
    txHash,
  }: {
    chainID: string;
    txHash: string;
  }) {
    await this.trackTransaction({
      chainID,
      txHash,
    });

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const txStatusResponse = await this.transactionStatus({
        chainID,
        txHash,
      });

      if (txStatusResponse.status === "STATE_COMPLETED") {
        return txStatusResponse;
      }

      await wait(1000);
    }
  }

  async venues(): Promise<SwapVenue[]> {
    const response = await this.requestClient.get<{ venues: SwapVenueJSON[] }>(
      "/v1/fungible/venues",
      {
        client_id: this.clientID,
      },
    );

    return response.venues.map((venue) => swapVenueFromJSON(venue));
  }

  private async getAccountNumberAndSequence(address: string, chainID: string) {
    if (chainID.includes("evmos")) {
      return this.getAccountNumberAndSequenceEvmos(address, chainID);
    }

    if (chainID.includes("injective")) {
      return this.getAccountNumberAndSequenceInjective(address, chainID);
    }

    const endpoint = await this.getRpcEndpointForChain(chainID);

    const client = await StargateClient.connect(endpoint);

    const account = await client.getAccount(address);

    if (!account) {
      throw new Error("Failed to retrieve account");
    }

    client.disconnect();

    return {
      accountNumber: account.accountNumber,
      sequence: account.sequence,
    };
  }

  private async getAccountNumberAndSequenceEvmos(
    address: string,
    chainID: string,
  ) {
    const endpoint = await this.getRestEndpointForChain(chainID);

    const response = await axios.get(
      `${endpoint}/cosmos/auth/v1beta1/accounts/${address}`,
    );

    const accountNumber = response.data.account.base_account
      .account_number as number;
    const sequence = response.data.account.base_account.sequence as number;

    return {
      accountNumber,
      sequence,
    };
  }

  private async getAccountNumberAndSequenceInjective(
    address: string,
    chainID: string,
  ) {
    const endpoint = await this.getRestEndpointForChain(chainID);

    const chainRestAuthApi = new ChainRestAuthApi(endpoint);

    const accountDetailsResponse = await chainRestAuthApi.fetchAccount(address);

    return {
      accountNumber: parseInt(
        accountDetailsResponse.account.base_account.account_number,
      ),
      sequence: parseInt(accountDetailsResponse.account.base_account.sequence),
    };
  }

  private async getRpcEndpointForChain(chainID: string) {
    if (this.endpointOptions.getRpcEndpointForChain) {
      return this.endpointOptions.getRpcEndpointForChain(chainID);
    }

    if (
      this.endpointOptions.endpoints &&
      this.endpointOptions.endpoints[chainID]
    ) {
      const endpointOptions = this.endpointOptions.endpoints[chainID];

      if (endpointOptions.rpc) {
        return endpointOptions.rpc;
      }
    }

    const chain = chains().find((chain) => chain.chain_id === chainID);

    if (!chain) {
      throw new Error(`Failed to find chain with ID ${chainID} in registry`);
    }

    const endpoint = chain.apis?.rpc?.[0].address;

    if (!endpoint) {
      throw new Error(`Failed to find RPC endpoint for chain ${chainID}`);
    }

    return endpoint;
  }

  private async getRestEndpointForChain(chainID: string) {
    if (this.endpointOptions.getRestEndpointForChain) {
      return this.endpointOptions.getRestEndpointForChain(chainID);
    }

    if (
      this.endpointOptions.endpoints &&
      this.endpointOptions.endpoints[chainID]
    ) {
      const endpointOptions = this.endpointOptions.endpoints[chainID];

      if (endpointOptions.rest) {
        return endpointOptions.rest;
      }
    }

    const chain = chains().find((chain) => chain.chain_id === chainID);
    if (!chain) {
      throw new Error(`Failed to find chain with ID ${chainID} in registry`);
    }

    const endpoint = chain.apis?.rest?.[0].address;

    if (!endpoint) {
      throw new Error(`Failed to find REST endpoint for chain ${chainID}`);
    }

    return endpoint;
  }

  private getFeeInfoForChain(chainID: string) {
    const chain = chains().find((chain) => chain.chain_id === chainID);
    if (!chain) {
      throw new Error(`Failed to find chain with ID ${chainID} in registry`);
    }

    const feeInfo = chain.fees?.fee_tokens[0];
    if (!feeInfo) {
      throw new Error("No fee info found");
    }

    return feeInfo;
  }

  private async validateGasBalances(
    messages: Msg[],
    userAddresses: Record<string, string>,
    getOfflineSigner: (chainID: string) => Promise<OfflineSigner>,
  ) {
    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];

      if ("multiChainMsg" in message) {
        const signer = await getOfflineSigner(message.multiChainMsg.chainID);
        const endpoint = await this.getRpcEndpointForChain(
          message.multiChainMsg.chainID,
        );
        const client = await SigningCosmWasmClient.connectWithSigner(
          endpoint,
          signer,
        );

        await this.validateCosmosGasBalance(
          client,
          userAddresses[message.multiChainMsg.chainID],
          message.multiChainMsg,
        );
      }
    }
  }

  private async validateCosmosGasBalance(
    client: SigningCosmWasmClient,
    signerAddress: string,
    message: MultiChainMsg,
  ) {
    const feeInfo = this.getFeeInfoForChain(message.chainID);

    const gasNeeded = await getGasAmountForMessage(
      client,
      signerAddress,
      message,
    );
    let averageGasPrice = 0;
    if (feeInfo.low_gas_price) {
      averageGasPrice = feeInfo.low_gas_price;
    } else if (feeInfo.average_gas_price) {
      averageGasPrice = feeInfo.average_gas_price;
    }

    const amountNeeded = averageGasPrice * parseInt(gasNeeded);

    const balance = await client.getBalance(signerAddress, feeInfo.denom);

    if (parseInt(balance.amount) < amountNeeded) {
      throw new Error(
        `Insufficient fee token to initiate transfer on ${message.chainID}. Need ${amountNeeded} ${feeInfo.denom}, but only have ${balance.amount} ${feeInfo.denom}.`,
      );
    }
  }
}
