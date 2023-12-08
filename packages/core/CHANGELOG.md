# @skip-router/core

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
