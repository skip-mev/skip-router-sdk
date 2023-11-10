---
---

- Updates lifecycle tracking types to include the explorer links now provided by the API
- Renamed `onTransactionSuccess` to `onTransactionCompleted` because it's not only called on success
- Pass full `TxStatusResponse` to `onTransactionCompleted` instead of abridged data.
