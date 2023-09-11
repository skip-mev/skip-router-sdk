import { toUtf8 } from "@cosmjs/encoding";
import { EncodeObject } from "@cosmjs/proto-signing";
import MsgTransferInjective from "@injectivelabs/sdk-ts/dist/cjs/core/modules/ibc/msgs/MsgTransfer";
import { Msgs } from "@injectivelabs/sdk-ts/dist/cjs/core/modules/msgs";
import MsgExecuteContractInjective from "@injectivelabs/sdk-ts/dist/cjs/core/modules/wasm/msgs/MsgExecuteContract";
import { MsgExecuteContract } from "cosmjs-types/cosmwasm/wasm/v1/tx";
import { MsgTransfer } from "cosmjs-types/ibc/applications/transfer/v1/tx";

import { MultiChainMsg } from "./types";

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
