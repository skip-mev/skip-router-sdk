import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { SkipRouter, SKIP_API_URL } from "@skip-router/core";

const SOURCE_DENOM = "uatom";
const SOURCE_CHAIN_ID = "cosmoshub-4";
const DEST_DENOM = "uosmo";
const DEST_CHAIN_ID = "osmosis-1";

const AMOUNT_IN = "1000000";

const USER_ADDRESSES = {
  "cosmoshub-4": "cosmos...", // <---- UPDATE THIS
  "osmosis-1": "osmo...", // <---- UPDATE THIS
};

const MNEMONIC = ""; // <---- UPDATE THIS

async function main() {
  const client = new SkipRouter({
    apiURL: SKIP_API_URL,
    getOfflineSigner: async (chainID) => {
      return DirectSecp256k1HdWallet.fromMnemonic(MNEMONIC);

      // using the keplr browser extension:
      // if (!window.keplr) {
      //   throw new Error("Keplr extension not installed");
      // }

      // return window.keplr.getOfflineSigner(chainID)
    },
  });

  const route = await client.route({
    amountIn: AMOUNT_IN,
    sourceAssetDenom: SOURCE_DENOM,
    sourceAssetChainID: SOURCE_CHAIN_ID,
    destAssetDenom: DEST_DENOM,
    destAssetChainID: DEST_CHAIN_ID,
    cumulativeAffiliateFeeBPS: "0",
  });

  await client.executeRoute({
    route,
    userAddresses: USER_ADDRESSES,
    onTransactionSuccess: async (tx) => {
      console.log(tx);
    },
  });
}

main();
