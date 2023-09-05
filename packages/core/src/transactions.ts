import { toUtf8 } from "@cosmjs/encoding";
import { EncodeObject } from "@cosmjs/proto-signing";
import { StargateClient } from "@cosmjs/stargate";
import {
  ChainRestAuthApi,
  MsgExecuteContract as MsgExecuteContractInjective,
  Msgs,
  MsgTransfer as MsgTransferInjective,
} from "@injectivelabs/sdk-ts";
import axios from "axios";
import { MsgExecuteContract } from "cosmjs-types/cosmwasm/wasm/v1/tx";
import { MsgTransfer } from "cosmjs-types/ibc/applications/transfer/v1/tx";

import { MultiChainMsg } from "./types";

export async function getAccountNumberAndSequence(
  address: string,
  endpoint: string,
  chainID: string,
) {
  if (chainID.includes("evmos")) {
    return getAccountNumberAndSequenceEvmos(address, endpoint);
  }

  if (chainID.includes("injective")) {
    return getAccountNumberAndSequenceInjective(address, endpoint);
  }

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

async function getAccountNumberAndSequenceEvmos(
  address: string,
  endpoint: string,
) {
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

async function getAccountNumberAndSequenceInjective(
  address: string,
  endpoint: string,
) {
  const chainRestAuthApi = new ChainRestAuthApi(endpoint);

  const accountDetailsResponse = await chainRestAuthApi.fetchAccount(address);

  return {
    accountNumber: parseInt(
      accountDetailsResponse.account.base_account.account_number,
    ),
    sequence: parseInt(accountDetailsResponse.account.base_account.sequence),
  };
}

export function getEncodeObjectFromMultiChainMessage(
  message: MultiChainMsg,
): EncodeObject {
  const msgJson = JSON.parse(message.msg);

  if (message.msgTypeURL === "/ibc.applications.transfer.v1.MsgTransfer") {
    return {
      typeUrl: "/ibc.applications.transfer.v1.MsgTransfer",
      value: MsgTransfer.fromJSON({
        sourcePort: msgJson.source_port,
        sourceChannel: msgJson.source_channel,
        token: msgJson.token,
        sender: msgJson.sender,
        receiver: msgJson.receiver,
        timeoutHeight: msgJson.timeout_height,
        timeoutTimestamp: msgJson.timeout_timestamp,
        memo: msgJson.memo,
      }),
    };
  }

  if (message.msgTypeURL === "/cosmwasm.wasm.v1.MsgExecuteContract") {
    return {
      typeUrl: message.msgTypeURL,
      value: MsgExecuteContract.fromPartial({
        sender: msgJson.sender,
        contract: msgJson.contract,
        msg: toUtf8(JSON.stringify(msgJson.msg)),
        funds: msgJson.funds,
      }),
    };
  }

  return {
    typeUrl: message.msgTypeURL,
    value: msgJson,
  };
}

export function getEncodeObjectFromMultiChainMessageInjective(
  message: MultiChainMsg,
): Msgs {
  const msgJson = JSON.parse(message.msg);

  if (message.msgTypeURL === "/ibc.applications.transfer.v1.MsgTransfer") {
    return MsgTransferInjective.fromJSON({
      port: msgJson.source_port,
      channelId: msgJson.source_channel,
      amount: msgJson.token,
      sender: msgJson.sender,
      receiver: msgJson.receiver,
      timeout: msgJson.timeout_timestamp,
      memo: msgJson.memo,
    });
  }

  if (message.msgTypeURL === "/cosmwasm.wasm.v1.MsgExecuteContract") {
    return MsgExecuteContractInjective.fromJSON({
      sender: msgJson.sender,
      contractAddress: msgJson.contract,
      msg: toUtf8(JSON.stringify(msgJson.msg)),
      funds: msgJson.funds,
    });
  }

  throw new Error("Unsupported message type");
}

export function getGasAmountForMessage(message: MultiChainMsg) {
  if (message.msgTypeURL === "/cosmwasm.wasm.v1.MsgExecuteContract") {
    if (message.chainID === "neutron-1") {
      return "2400000";
    }
    return "1200000";
  }
  return "280000";
}
