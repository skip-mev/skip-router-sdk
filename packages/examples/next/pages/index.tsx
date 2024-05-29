import { SkipRouter } from "@skip-router/core";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import Head from "next/head";
import { useEffect } from "react";
import { createWalletClient, custom } from "viem";
import { mainnet } from "viem/chains";

export default function Home() {
  const skipClient = new SkipRouter({
    getCosmosSigner: async (chainID) => {
      const offlineSigner = window.keplr?.getOfflineSigner(chainID);
      if (!offlineSigner) throw new Error("Keplr not installed");
      return offlineSigner;
    },
    getEVMSigner: async () => {
      const ethereum = window.ethereum;
      if (!ethereum) throw new Error("MetaMask not installed");
      const client = createWalletClient({
        chain: mainnet,
        transport: custom(window.ethereum),
      });
      return client;
    },
    getSVMSigner: async () => {
      const phantom = new PhantomWalletAdapter();
      return phantom;
    },
    apiURL: `/api/skip`,
  });

  // get Route for 1 USDC from noble to osmosis
  const getRoute = async () => {
    const result = await skipClient.route({
      amountIn: "1000000",
      sourceAssetDenom: "uusdc",
      sourceAssetChainID: "noble-1",
      destAssetDenom:
        "ibc/498A0751C798A0D9A389AA3691123DADA57DAA4FE165D5C75894505B876BA6E4",
      destAssetChainID: "osmosis-1",
      cumulativeAffiliateFeeBPS: "0",
      allowMultiTx: true,
      smartRelay: true,
    });
    console.log(result);
    return result;
  };

  // Execute route to transfer 1 USDC from noble to osmosis
  const onExecuteRoute = async () => {
    console.log("executing route");
    const route = await getRoute();
    try {
      const userAddresses = await Promise.all(
        route.requiredChainAddresses.map(async (chainID) => {
          const key = await window.keplr?.getKey(chainID);
          return {
            chainID,
            address: key?.bech32Address as string,
          };
        }),
      );

      await skipClient.executeRoute({
        route: route,
        userAddresses,
        onTransactionCompleted: async (chainID, txHash) => {
          console.log("Transaction completed", chainID, txHash);
        },
      });
      console.log("Route successfully executed");
    } catch (error) {
      console.error(error);
    }
  };

  const getChains = async () => {
    const chains = await skipClient.chains();
    console.log(chains);
  };

  const getAssets = async () => {
    const assets = await skipClient.assets();
    console.log(assets);
  };

  return (
    <>
      <Head>
        <title>Skip simple example</title>
        <meta
          name="description"
          content="Skip simple example"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <main>
        <div>
          <div>
            <button
              onClick={() => {
                window.ethereum.request({ method: "eth_requestAccounts" });
              }}
            >
              Connect Ethereum
            </button>
            <button
              onClick={async () => {
                await window.keplr?.enable(["cosmoshub-4", "noble-1"]);
              }}
            >
              Connect Cosmos
            </button>
            <button
              onClick={() => {
                const phantom = new PhantomWalletAdapter();
                phantom.connect();
              }}
            >
              Connect SVM
            </button>
          </div>
          <p>Transfer 1 USDC from nobe to osmosis</p>
          <button onClick={onExecuteRoute}>Execute Route</button>
        </div>
      </main>
    </>
  );
}
