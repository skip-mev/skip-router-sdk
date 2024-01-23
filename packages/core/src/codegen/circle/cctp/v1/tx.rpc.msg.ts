//@ts-nocheck
/* eslint-disable */
import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { MsgDepositForBurn, MsgDepositForBurnResponse } from "./tx";
export interface Msg {
  depositForBurn(request: MsgDepositForBurn): Promise<MsgDepositForBurnResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.depositForBurn = this.depositForBurn.bind(this);
  }
  depositForBurn(request: MsgDepositForBurn): Promise<MsgDepositForBurnResponse> {
    const data = MsgDepositForBurn.encode(request).finish();
    const promise = this.rpc.request("circle.cctp.v1.Msg", "DepositForBurn", data);
    return promise.then(data => MsgDepositForBurnResponse.decode(new BinaryReader(data)));
  }
}