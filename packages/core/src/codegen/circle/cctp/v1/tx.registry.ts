//@ts-nocheck
/* eslint-disable */
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgDepositForBurn } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/circle.cctp.v1.MsgDepositForBurn", MsgDepositForBurn]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    depositForBurn(value: MsgDepositForBurn) {
      return {
        typeUrl: "/circle.cctp.v1.MsgDepositForBurn",
        value: MsgDepositForBurn.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    depositForBurn(value: MsgDepositForBurn) {
      return {
        typeUrl: "/circle.cctp.v1.MsgDepositForBurn",
        value
      };
    }
  },
  fromPartial: {
    depositForBurn(value: MsgDepositForBurn) {
      return {
        typeUrl: "/circle.cctp.v1.MsgDepositForBurn",
        value: MsgDepositForBurn.fromPartial(value)
      };
    }
  }
};