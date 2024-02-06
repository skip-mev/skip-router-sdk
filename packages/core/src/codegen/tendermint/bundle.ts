//@ts-nocheck
/* eslint-disable */
import * as _104 from "./abci/types";
import * as _105 from "./crypto/keys";
import * as _106 from "./crypto/proof";
import * as _107 from "./libs/bits/types";
import * as _108 from "./p2p/types";
import * as _109 from "./types/block";
import * as _110 from "./types/evidence";
import * as _111 from "./types/params";
import * as _112 from "./types/types";
import * as _113 from "./types/validator";
import * as _114 from "./version/types";
export namespace tendermint {
  export const abci = {
    ..._104
  };
  export const crypto = {
    ..._105,
    ..._106
  };
  export namespace libs {
    export const bits = {
      ..._107
    };
  }
  export const p2p = {
    ..._108
  };
  export const types = {
    ..._109,
    ..._110,
    ..._111,
    ..._112,
    ..._113
  };
  export const version = {
    ..._114
  };
}