//@ts-nocheck
/* eslint-disable */
import {
  BaseAccount,
  BaseAccountAmino,
  BaseAccountSDKType,
} from "../../../../../cosmos/auth/v1beta1/auth";
import { BinaryReader, BinaryWriter } from "../../../../../binary";
/**
 * EthAccount implements the authtypes.AccountI interface and embeds an
 * authtypes.BaseAccount type. It is compatible with the auth AccountKeeper.
 */
export interface EthAccount {
  /** base_account is an authtypes.BaseAccount */
  baseAccount?: BaseAccount;
  /** code_hash is the hash calculated from the code contents */
  codeHash: string;
}
export interface EthAccountProtoMsg {
  typeUrl: "/ethermint.types.v1.EthAccount";
  value: Uint8Array;
}
/**
 * EthAccount implements the authtypes.AccountI interface and embeds an
 * authtypes.BaseAccount type. It is compatible with the auth AccountKeeper.
 */
export interface EthAccountAmino {
  /** base_account is an authtypes.BaseAccount */
  base_account?: BaseAccountAmino;
  /** code_hash is the hash calculated from the code contents */
  code_hash?: string;
}
export interface EthAccountAminoMsg {
  type: "/ethermint.types.v1.EthAccount";
  value: EthAccountAmino;
}
/**
 * EthAccount implements the authtypes.AccountI interface and embeds an
 * authtypes.BaseAccount type. It is compatible with the auth AccountKeeper.
 */
export interface EthAccountSDKType {
  base_account?: BaseAccountSDKType;
  code_hash: string;
}
function createBaseEthAccount(): EthAccount {
  return {
    baseAccount: undefined,
    codeHash: "",
  };
}
export const EthAccount = {
  typeUrl: "/ethermint.types.v1.EthAccount",
  encode(
    message: EthAccount,
    writer: BinaryWriter = BinaryWriter.create(),
  ): BinaryWriter {
    if (message.baseAccount !== undefined) {
      BaseAccount.encode(
        message.baseAccount,
        writer.uint32(10).fork(),
      ).ldelim();
    }
    if (message.codeHash !== "") {
      writer.uint32(18).string(message.codeHash);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EthAccount {
    const reader =
      input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEthAccount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.baseAccount = BaseAccount.decode(reader, reader.uint32());
          break;
        case 2:
          message.codeHash = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EthAccount>): EthAccount {
    const message = createBaseEthAccount();
    message.baseAccount =
      object.baseAccount !== undefined && object.baseAccount !== null
        ? BaseAccount.fromPartial(object.baseAccount)
        : undefined;
    message.codeHash = object.codeHash ?? "";
    return message;
  },
  fromAmino(object: EthAccountAmino): EthAccount {
    const message = createBaseEthAccount();
    if (object.base_account !== undefined && object.base_account !== null) {
      message.baseAccount = BaseAccount.fromAmino(object.base_account);
    }
    if (object.code_hash !== undefined && object.code_hash !== null) {
      message.codeHash = object.code_hash;
    }
    return message;
  },
  toAmino(message: EthAccount): EthAccountAmino {
    const obj: any = {};
    obj.base_account = message.baseAccount
      ? BaseAccount.toAmino(message.baseAccount)
      : undefined;
    obj.code_hash = message.codeHash;
    return obj;
  },
  fromAminoMsg(object: EthAccountAminoMsg): EthAccount {
    return EthAccount.fromAmino(object.value);
  },
  fromProtoMsg(message: EthAccountProtoMsg): EthAccount {
    return EthAccount.decode(message.value);
  },
  toProto(message: EthAccount): Uint8Array {
    return EthAccount.encode(message).finish();
  },
  toProtoMsg(message: EthAccount): EthAccountProtoMsg {
    return {
      typeUrl: "/ethermint.types.v1.EthAccount",
      value: EthAccount.encode(message).finish(),
    };
  },
};
