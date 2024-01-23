//@ts-nocheck
/* eslint-disable */
import { Rpc } from "../helpers";
export const createRPCMsgClient = async ({
  rpc
}: {
  rpc: Rpc;
}) => ({
  circle: {
    cctp: {
      v1: new (await import("./cctp/v1/tx.rpc.msg")).MsgClientImpl(rpc)
    }
  }
});