//@ts-nocheck
/* eslint-disable */
import { BinaryReader, BinaryWriter } from "../../../binary";
import { bytesFromBase64, base64FromBytes } from "../../../helpers";
export interface MsgDepositForBurn {
  from: string;
  amount: string;
  destinationDomain: number;
  mintRecipient: Uint8Array;
  burnToken: string;
}
export interface MsgDepositForBurnProtoMsg {
  typeUrl: "/circle.cctp.v1.MsgDepositForBurn";
  value: Uint8Array;
}
export interface MsgDepositForBurnAmino {
  from?: string;
  amount?: string;
  destination_domain?: number;
  mint_recipient?: string;
  burn_token?: string;
}
export interface MsgDepositForBurnAminoMsg {
  type: "/circle.cctp.v1.MsgDepositForBurn";
  value: MsgDepositForBurnAmino;
}
export interface MsgDepositForBurnSDKType {
  from: string;
  amount: string;
  destination_domain: number;
  mint_recipient: Uint8Array;
  burn_token: string;
}
export interface MsgDepositForBurnResponse {
  nonce: bigint;
}
export interface MsgDepositForBurnResponseProtoMsg {
  typeUrl: "/circle.cctp.v1.MsgDepositForBurnResponse";
  value: Uint8Array;
}
export interface MsgDepositForBurnResponseAmino {
  nonce?: string;
}
export interface MsgDepositForBurnResponseAminoMsg {
  type: "/circle.cctp.v1.MsgDepositForBurnResponse";
  value: MsgDepositForBurnResponseAmino;
}
export interface MsgDepositForBurnResponseSDKType {
  nonce: bigint;
}
function createBaseMsgDepositForBurn(): MsgDepositForBurn {
  return {
    from: "",
    amount: "",
    destinationDomain: 0,
    mintRecipient: new Uint8Array(),
    burnToken: ""
  };
}
export const MsgDepositForBurn = {
  typeUrl: "/circle.cctp.v1.MsgDepositForBurn",
  encode(message: MsgDepositForBurn, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.from !== "") {
      writer.uint32(10).string(message.from);
    }
    if (message.amount !== "") {
      writer.uint32(18).string(message.amount);
    }
    if (message.destinationDomain !== 0) {
      writer.uint32(24).uint32(message.destinationDomain);
    }
    if (message.mintRecipient.length !== 0) {
      writer.uint32(34).bytes(message.mintRecipient);
    }
    if (message.burnToken !== "") {
      writer.uint32(42).string(message.burnToken);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgDepositForBurn {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDepositForBurn();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.from = reader.string();
          break;
        case 2:
          message.amount = reader.string();
          break;
        case 3:
          message.destinationDomain = reader.uint32();
          break;
        case 4:
          message.mintRecipient = reader.bytes();
          break;
        case 5:
          message.burnToken = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgDepositForBurn>): MsgDepositForBurn {
    const message = createBaseMsgDepositForBurn();
    message.from = object.from ?? "";
    message.amount = object.amount ?? "";
    message.destinationDomain = object.destinationDomain ?? 0;
    message.mintRecipient = object.mintRecipient ?? new Uint8Array();
    message.burnToken = object.burnToken ?? "";
    return message;
  },
  fromAmino(object: MsgDepositForBurnAmino): MsgDepositForBurn {
    const message = createBaseMsgDepositForBurn();
    if (object.from !== undefined && object.from !== null) {
      message.from = object.from;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount;
    }
    if (object.destination_domain !== undefined && object.destination_domain !== null) {
      message.destinationDomain = object.destination_domain;
    }
    if (object.mint_recipient !== undefined && object.mint_recipient !== null) {
      message.mintRecipient = bytesFromBase64(object.mint_recipient);
    }
    if (object.burn_token !== undefined && object.burn_token !== null) {
      message.burnToken = object.burn_token;
    }
    return message;
  },
  toAmino(message: MsgDepositForBurn): MsgDepositForBurnAmino {
    const obj: any = {};
    obj.from = message.from;
    obj.amount = message.amount;
    obj.destination_domain = message.destinationDomain;
    obj.mint_recipient = message.mintRecipient ? base64FromBytes(message.mintRecipient) : undefined;
    obj.burn_token = message.burnToken;
    return obj;
  },
  fromAminoMsg(object: MsgDepositForBurnAminoMsg): MsgDepositForBurn {
    return MsgDepositForBurn.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgDepositForBurnProtoMsg): MsgDepositForBurn {
    return MsgDepositForBurn.decode(message.value);
  },
  toProto(message: MsgDepositForBurn): Uint8Array {
    return MsgDepositForBurn.encode(message).finish();
  },
  toProtoMsg(message: MsgDepositForBurn): MsgDepositForBurnProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.MsgDepositForBurn",
      value: MsgDepositForBurn.encode(message).finish()
    };
  }
};
function createBaseMsgDepositForBurnResponse(): MsgDepositForBurnResponse {
  return {
    nonce: BigInt(0)
  };
}
export const MsgDepositForBurnResponse = {
  typeUrl: "/circle.cctp.v1.MsgDepositForBurnResponse",
  encode(message: MsgDepositForBurnResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.nonce !== BigInt(0)) {
      writer.uint32(8).uint64(message.nonce);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgDepositForBurnResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDepositForBurnResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.nonce = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgDepositForBurnResponse>): MsgDepositForBurnResponse {
    const message = createBaseMsgDepositForBurnResponse();
    message.nonce = object.nonce !== undefined && object.nonce !== null ? BigInt(object.nonce.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MsgDepositForBurnResponseAmino): MsgDepositForBurnResponse {
    const message = createBaseMsgDepositForBurnResponse();
    if (object.nonce !== undefined && object.nonce !== null) {
      message.nonce = BigInt(object.nonce);
    }
    return message;
  },
  toAmino(message: MsgDepositForBurnResponse): MsgDepositForBurnResponseAmino {
    const obj: any = {};
    obj.nonce = message.nonce ? message.nonce.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgDepositForBurnResponseAminoMsg): MsgDepositForBurnResponse {
    return MsgDepositForBurnResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgDepositForBurnResponseProtoMsg): MsgDepositForBurnResponse {
    return MsgDepositForBurnResponse.decode(message.value);
  },
  toProto(message: MsgDepositForBurnResponse): Uint8Array {
    return MsgDepositForBurnResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgDepositForBurnResponse): MsgDepositForBurnResponseProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.MsgDepositForBurnResponse",
      value: MsgDepositForBurnResponse.encode(message).finish()
    };
  }
};