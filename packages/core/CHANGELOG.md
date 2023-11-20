# @skip-router/core

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
