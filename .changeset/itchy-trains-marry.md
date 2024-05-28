---
"@skip-router/core": minor
---

- Updated API types to include signer addresses on CosmosTX, EvmTX, and SvmTx
- Updated `getGasPrice` param to (chainID: string, chainType: "cosmos" | "evm" | "svm") => Promise<GasPrice | undefined>
- Added `getFallbackGasAmount` param in `executeRoute`
- Improved jsdoc
