import {
  coin,
  encodeSecp256k1Pubkey,
  makeSignDoc as makeSignDocAmino,
  OfflineAminoSigner,
} from "@cosmjs/amino";
import { createWasmAminoConverters } from "@cosmjs/cosmwasm-stargate";
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
import {
  AminoTypes,
  createDefaultAminoConverters,
  defaultRegistryTypes,
  SignerData,
  SigningStargateClient,
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
import { chains } from "chain-registry";
import { SignMode } from "cosmjs-types/cosmos/tx/signing/v1beta1/signing";
import { TxRaw } from "cosmjs-types/cosmos/tx/v1beta1/tx";
import { MsgExecuteContract } from "cosmjs-types/cosmwasm/wasm/v1/tx";

import { createTransaction } from "./injective";
import { RequestClient } from "./request-client";
import {
  getEncodeObjectFromMultiChainMessage,
  getEncodeObjectFromMultiChainMessageInjective,
  getGasAmountForMessage,
} from "./transactions";
import {
  Asset,
  assetFromJSON,
  AssetJSON,
  assetRecommendationFromJSON,
  AssetRecommendationJSON,
  AssetsFromSourceRequest,
  AssetsFromSourceRequestJSON,
  assetsFromSourceRequestToJSON,
  AssetsRequest,
  AssetsRequestJSON,
  assetsRequestToJSON,
  Chain,
  chainFromJSON,
  ChainJSON,
  MsgsRequest,
  MsgsRequestJSON,
  msgsRequestToJSON,
  MsgsResponseJSON,
  MultiChainMsg,
  multiChainMsgFromJSON,
  RecommendAssetsRequest,
  recommendAssetsRequestToJSON,
  RouteRequest,
  RouteRequestJSON,
  routeRequestToJSON,
  RouteResponse,
  routeResponseFromJSON,
  RouteResponseJSON,
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
  TxStatusRequestJSON,
  TxStatusResponse,
  txStatusResponseFromJSON,
  TxStatusResponseJSON,
} from "./types";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const SKIP_API_URL = "https://api.skip.money/v1";

export type EndpointOptions = {
  rpc?: string;
  rest?: string;
};

export interface SkipRouterClientOptions {
  getOfflineSigner?: (chainID: string) => Promise<OfflineSigner>;
  endpointOptions?: {
    endpoints?: Record<string, EndpointOptions>;
    getRpcEndpointForChain?: (chainID: string) => Promise<string>;
    getRestEndpointForChain?: (chainID: string) => Promise<string>;
  };
}

export type ExecuteRouteOptions = {
  getOfflineSigner?: (chainID: string) => Promise<OfflineSigner>;
  onTransactionSuccess?: (txStatus: TxStatusResponse) => Promise<void>;
};

export class SkipRouter {
  private requestClient: RequestClient;

  private aminoTypes: AminoTypes;
  private registry: Registry;

  private endpointOptions: {
    endpoints?: Record<string, EndpointOptions>;
    getRpcEndpointForChain?: (chainID: string) => Promise<string>;
    getRestEndpointForChain?: (chainID: string) => Promise<string>;
  };

  private getOfflineSigner?: (chainID: string) => Promise<OfflineSigner>;

  constructor(apiURL: string, options: SkipRouterClientOptions) {
    this.requestClient = new RequestClient(apiURL);

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
    this.getOfflineSigner = options.getOfflineSigner;
  }

  async assets(options: AssetsRequest = {}): Promise<Record<string, Asset[]>> {
    const response = await this.requestClient.get<
      {
        chain_to_assets_map: Record<string, { assets: AssetJSON[] }>;
      },
      AssetsRequestJSON
    >("/fungible/assets", assetsRequestToJSON(options));

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
    >("/fungible/assets_from_source", assetsFromSourceRequestToJSON(options));

    return Object.entries(response.dest_assets).reduce(
      (acc, [chainID, { assets }]) => {
        acc[chainID] = assets.map((asset) => assetFromJSON(asset));
        return acc;
      },
      {} as Record<string, Asset[]>,
    );
  }

  async chains(): Promise<Chain[]> {
    const response = await this.requestClient.get<{ chains: ChainJSON[] }>(
      "/info/chains",
    );

    return response.chains.map((chain) => chainFromJSON(chain));
  }

  async executeRoute(
    route: RouteResponse,
    userAddresses: Record<string, string>,
    options: ExecuteRouteOptions = {},
  ) {
    const messages = await this.messages({
      sourceAssetDenom: route.sourceAssetDenom,
      sourceAssetChainID: route.sourceAssetChainID,
      destAssetDenom: route.destAssetDenom,
      destAssetChainID: route.destAssetChainID,
      amountIn: route.amountIn,
      amountOut: route.estimatedAmountOut ?? "0",
      addressList: route.chainIDs.map((chainID) => userAddresses[chainID]),
      operations: route.operations,
    });

    const feeInfos: Record<
      string,
      {
        denom: string;
        low_gas_price?: number | undefined;
        average_gas_price?: number | undefined;
      }
    > = {};

    // check balances on chains where a tx is initiated
    for (let i = 0; i < messages.length; i++) {
      const multiHopMsg = messages[i];

      const chain = chains.find(
        (chain) => chain.chain_id === multiHopMsg.chainID,
      );

      if (!chain) {
        throw new Error(
          `Failed to find chain with ID ${multiHopMsg.chainID} in registry`,
        );
      }

      const feeInfo = chain.fees?.fee_tokens[0];
      if (!feeInfo) {
        throw new Error("No fee info found");
      }

      feeInfos[multiHopMsg.chainID] = feeInfo;

      const gasNeeded = getGasAmountForMessage(multiHopMsg);

      let averageGasPrice = 0;
      if (feeInfo.low_gas_price) {
        averageGasPrice = feeInfo.low_gas_price;
      } else if (feeInfo.average_gas_price) {
        averageGasPrice = feeInfo.average_gas_price;
      }

      const amountNeeded = averageGasPrice * parseInt(gasNeeded);

      const endpoint = await this.getRpcEndpointForChain(multiHopMsg.chainID);

      const stargateClient = await StargateClient.connect(endpoint);

      const balance = await stargateClient.getBalance(
        userAddresses[multiHopMsg.chainID],
        feeInfo.denom,
      );

      if (parseInt(balance.amount) < amountNeeded) {
        throw new Error(
          `Insufficient fee token to initiate transfer on ${multiHopMsg.chainID}. Need ${amountNeeded} ${feeInfo.denom}, but only have ${balance.amount} ${feeInfo.denom}.`,
        );
      }
    }

    // execute txs
    for (let i = 0; i < messages.length; i++) {
      const multiHopMsg = messages[i];

      const feeInfo = feeInfos[multiHopMsg.chainID];

      let getOfflineSigner = this.getOfflineSigner;
      if (options.getOfflineSigner) {
        getOfflineSigner = options.getOfflineSigner;
      }

      if (!getOfflineSigner) {
        throw new Error(
          `Unable to find offline signer for chain ${multiHopMsg.chainID}`,
        );
      }

      const signer = await getOfflineSigner(multiHopMsg.chainID);

      const tx = await this.executeMultiChainMessage(
        userAddresses[multiHopMsg.chainID],
        signer,
        multiHopMsg,
        coin(0, feeInfo.denom),
      );

      const txStatusResponse = await this.waitForTransaction(
        multiHopMsg.chainID,
        tx.transactionHash,
      );

      if (options.onTransactionSuccess) {
        await options.onTransactionSuccess(txStatusResponse);
      }
    }
  }

  async executeMultiChainMessage(
    signerAddress: string,
    signer: OfflineSigner,
    message: MultiChainMsg,
    feeAmount: Coin,
  ) {
    const accounts = await signer.getAccounts();
    const accountFromSigner = accounts.find(
      (account) => account.address === signerAddress,
    );

    if (!accountFromSigner) {
      throw new Error("Failed to retrieve account from signer");
    }

    const endpoint = await this.getRpcEndpointForChain(message.chainID);

    const { accountNumber, sequence } = await this.getAccountNumberAndSequence(
      signerAddress,
      message.chainID,
    );

    const gas = getGasAmountForMessage(message);

    let rawTx: TxRaw;
    if (isOfflineDirectSigner(signer)) {
      rawTx = await this.signMultiChainMessageDirect(
        signerAddress,
        signer,
        message,
        {
          amount: [feeAmount],
          gas,
        },
        { accountNumber, sequence, chainId: message.chainID },
      );
    } else {
      rawTx = await this.signMultiChainMessageAmino(
        signerAddress,
        signer,
        message,
        {
          amount: [feeAmount],
          gas,
        },
        { accountNumber, sequence, chainId: message.chainID },
      );
    }

    const txBytes = TxRaw.encode(rawTx).finish();

    const stargateClient = await SigningStargateClient.connectWithSigner(
      endpoint,
      signer,
    );

    const tx = await stargateClient.broadcastTx(txBytes);

    return tx;
  }

  async signMultiChainMessageDirect(
    signerAddress: string,
    signer: OfflineDirectSigner,
    multiChainMessage: MultiChainMsg,
    fee: StdFee,
    { accountNumber, sequence, chainId }: SignerData,
  ): Promise<TxRaw> {
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
      // throw new Error("Injective is not supported yet");
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
  async signMultiChainMessageDirectEvmos(
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
  async signMultiChainMessageDirectInjective(
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
    signerAddress: string,
    signer: OfflineAminoSigner,
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

  async messages(options: MsgsRequest): Promise<MultiChainMsg[]> {
    const response = await this.requestClient.post<
      MsgsResponseJSON,
      MsgsRequestJSON
    >("/fungible/msgs", {
      ...msgsRequestToJSON(options),
      slippage_tolerance_percent: options.slippageTolerancePercent ?? "0",
    });

    return response.msgs.map((msg) => multiChainMsgFromJSON(msg));
  }

  async route(options: RouteRequest): Promise<RouteResponse> {
    const response = await this.requestClient.post<
      RouteResponseJSON,
      RouteRequestJSON
    >("/fungible/route", {
      ...routeRequestToJSON(options),
      cumulative_affiliate_fee_bps: options.cumulativeAffiliateFeeBPS ?? "0",
    });

    return routeResponseFromJSON(response);
  }

  async recommendAssets(options: RecommendAssetsRequest) {
    const response = await this.requestClient.post<{
      recommendations: AssetRecommendationJSON[];
    }>("/fungible/recommend_assets", recommendAssetsRequestToJSON(options));

    return response.recommendations.map((recommendation) =>
      assetRecommendationFromJSON(recommendation),
    );
  }

  async submitTransaction(
    chainID: string,
    tx: string,
  ): Promise<SubmitTxResponse> {
    const response = await this.requestClient.post<
      SubmitTxResponseJSON,
      SubmitTxRequestJSON
    >("/tx/submit", {
      chain_id: chainID,
      tx: tx,
    });

    return submitTxResponseFromJSON(response);
  }

  async trackTransaction(
    chainID: string,
    txHash: string,
  ): Promise<TrackTxResponse> {
    const response = await this.requestClient.post<
      TrackTxResponseJSON,
      TrackTxRequestJSON
    >("/tx/track", {
      chain_id: chainID,
      tx_hash: txHash,
    });

    return trackTxResponseFromJSON(response);
  }

  async transactionStatus(
    chainID: string,
    txHash: string,
  ): Promise<TxStatusResponse> {
    const response = await this.requestClient.get<
      TxStatusResponseJSON,
      TxStatusRequestJSON
    >("/tx/status", {
      chain_id: chainID,
      tx_hash: txHash,
    });

    return txStatusResponseFromJSON(response);
  }

  async waitForTransaction(chainID: string, txHash: string) {
    await this.trackTransaction(chainID, txHash);

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const txStatusResponse = await this.transactionStatus(chainID, txHash);

      if (txStatusResponse.status === "STATE_COMPLETED") {
        return txStatusResponse;
      }

      await wait(1000);
    }
  }

  async venues(): Promise<SwapVenue[]> {
    const response = await this.requestClient.get<{ venues: SwapVenueJSON[] }>(
      "/fungible/venues",
    );

    return response.venues.map((venue) => swapVenueFromJSON(venue));
  }

  async getAccountNumberAndSequence(address: string, chainID: string) {
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

  async getAccountNumberAndSequenceEvmos(address: string, chainID: string) {
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

  async getAccountNumberAndSequenceInjective(address: string, chainID: string) {
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

    const chain = chains.find((chain) => chain.chain_id === chainID);

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

    const chain = chains.find((chain) => chain.chain_id === chainID);

    if (!chain) {
      throw new Error(`Failed to find chain with ID ${chainID} in registry`);
    }

    const endpoint = chain.apis?.rest?.[0].address;

    if (!endpoint) {
      throw new Error(`Failed to find REST endpoint for chain ${chainID}`);
    }

    return endpoint;
  }
}
