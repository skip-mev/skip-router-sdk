# @skip-router/core

## 1.3.5

### Patch Changes

- 2429849: fix memo ledger error

## 1.3.4

### Patch Changes

- 76c37d4: fix cosmos ledger signing

## 1.3.3

### Patch Changes

- cc0b2bd: properly encode MsgExecuteContract for Injective

## 1.3.2

### Patch Changes

- a624a2a: Fix a bug in BaseAccount signing for dymension

## 1.3.1

### Patch Changes

- 3fe6bd0: Fixes bugs in signing for ethermint-like chains

## 1.3.0

### Minor Changes

- a61ce2e: Improve stargate account parser, proto signing, and bundling

## 1.2.15

### Patch Changes

- 1cba455: undo cosmjs upgrade
- ae1b120: Register EthAccount proto type

## 1.2.14

### Patch Changes

- e313807: When getting default gas token don't fail on no chain registry data

## 1.2.13

### Patch Changes

- 586a771: Set proper typeUrl on pubkey when it is an ethermint key

## 1.2.12

### Patch Changes

- 9b9cb70: Improve amino/registry types, handle stride account parsing

## 1.2.11

### Patch Changes

- 74643e9: added onTransactionTracked opts

## 1.2.10

### Patch Changes

- b361077: Add allow_multi_tx parameter to route request

## 1.2.9

### Patch Changes

- 491d16a: Add CCTP types to transaction tracking

## 1.2.8

### Patch Changes

- 7411597: Add bridges endpoint and route parameter

## 1.2.7

### Patch Changes

- bdb8183: Fix type error

## 1.2.6

### Patch Changes

- 505ff19: Fix type definitions from generated code

## 1.2.5

### Patch Changes

- fbc169c: Define valid values for experimental features array

## 1.2.4

### Patch Changes

- 803eb8b: rename unsafe to allow_unsafe
- 1ed5e7b: Add `getFeeForMessage`, `getRecommendedGasPrice`, and `getFeeInfoForChain` methods to SkipRouter
- 738dd7d: Update router to support CCTP bridging operations returned by the API

## 1.2.3

### Patch Changes

- c98fb7c: use timeout height instead of timestamp on amino signing

## 1.2.2

### Patch Changes

- 35aa11b: Expose gas methods in SkipRouter

## 1.2.1

### Patch Changes

- 77d97b4: Add 'unsafe' flag to route request

## 1.2.0

### Minor Changes

- e1ce04a: Update recommendAssets to handle multiple requests

## 1.1.3

### Patch Changes

- 579e28b: Add fee fields to Transfer field
- 67a9a04: Add assetsBetweenChains

## 1.1.2

### Patch Changes

- 959b51c: Simulate cosmos transactions to estimate gas
- 89b7472: Add ibcOriginAssets

## 1.1.1

### Patch Changes

- 3a89472: Add fields for price impact and usd amounts

## 1.1.0

### Minor Changes

- c0336ea: recommended asset field added to data models

### Patch Changes

- def7ec0: Handle multi-transfer

## 1.0.5

### Patch Changes

- 018ca30: update onTransactionCompleted callback to include chain id and hash

## 1.0.4

### Patch Changes

- bdd3773: Add description and coingecko id to asset types

## 1.0.3

### Patch Changes

- cd03ff5: Add fee asset field to AxelarTransfer

## 1.0.2

### Patch Changes

- f4f16e2: Utilize client_id parameter in API requests

## 1.0.1

### Patch Changes

- 1dc36fd: Raise gas estimate for MsgExecuteContract calls

## 1.0.0

### Major Changes

- 0b71558: - Adds support for EVM transactions.
  - Rename `getOfflineSigner` to `getCosmosSigner`.
  - Adds `getEVMSigner`.
  - Adds `onTransactionBroadcast` which is called when a transaction is broadcasted to the chain.

### Patch Changes

- b8ada23: Add changesets for proper releases
- 903b43d: - Updates lifecycle tracking types to include the explorer links now provided by the API
  - Renamed `onTransactionSuccess` to `onTransactionCompleted` because it's not only called on success
  - Pass full `TxStatusResponse` to `onTransactionCompleted` instead of abridged data.
