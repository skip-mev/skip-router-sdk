/* eslint-disable */
import * as _0 from "./cctp/v1/tx";
import * as _9 from "./cctp/v1/tx.amino";
import * as _10 from "./cctp/v1/tx.registry";
import * as _11 from "./cctp/v1/tx.rpc.msg";
import * as _12 from "./rpc.tx";
export namespace circle {
  export namespace cctp {
    export const v1 = {
      ..._0,
      ..._9,
      ..._10,
      ..._11
    };
  }
  export const ClientFactory = {
    ..._12
  };
}