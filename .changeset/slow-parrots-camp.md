---
"@skip-router/core": major
---

- Adds support for EVM transactions.
- Rename `getOfflineSigner` to `getCosmosSigner`.
- Adds `getEVMSigner`.
- Rename `onTransactionSuccess` to `onTransactionCompleted` which is called when a transaction is completed, regardless of success or failure.
- Adds `onTransactionBroadcast` which is called when a transaction is broadcasted to the chain.
