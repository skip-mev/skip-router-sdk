//@ts-nocheck
/* eslint-disable */
import * as _1 from "./cctp/v1/tx";
import * as _115 from "./cctp/v1/tx.amino";
import * as _116 from "./cctp/v1/tx.registry";
import * as _117 from "./cctp/v1/tx.rpc.msg";
import * as _195 from "./rpc.tx";
export namespace circle {
  export namespace cctp {
    export const v1 = {
      ..._1,
      ..._115,
      ..._116,
      ..._117
    };
  }
  export const ClientFactory = {
    ..._195
  };
}