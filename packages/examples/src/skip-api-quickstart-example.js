import { SkipRouter } from "@skip-router/core";
import * as chainRegistry from "chain-registry";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { stringToPath } from "@cosmjs/crypto";

// Generates a Cosmos signer for a given chainID, 
// loading the mnemonic from the environment
async function getCosmosSigner(chainID) {
    // load mnemonic from environment
    const mnemonic = process.env.MNEMONIC;
    if (!mnemonic) {
        throw new Error("Mnemonic not set")
    }
    // find chain in chain registry to get bech32 prefix and cointype
    const chain = chainRegistry.chains.find(chain => chain.chain_id==chainID)
    if (!chain.bech32_prefix) {
        throw new Error(`Chain Registry missing prefix for {chainID}`)
    }
    if (!chain.slip44) {
        throw new Error(`Chain Registry missing cointype for {chainID}`)
    }
    // create wallet
    const hdPath = await stringToPath(`m/44'/${chain.slip44}'/0'/0/0`)
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
        prefix: chain.bech32_prefix,
        hdPath: hdPath
    })
    return wallet
}

async function getCosmosAddress(chainID) {
    const signer = await getCosmosSigner(chainID)
    const accounts = await signer.getAccounts()
    return accounts[0].address
}

(async () => { 
    const skipClient = new SkipRouter({
        getCosmosSigner,
    })
    const route = await skipClient.route({
        sourceAssetDenom: "uusdc",
        sourceAssetChainID: "noble-1",
        destAssetDenom: "utia",
        destAssetChainID: "celestia",
        amountIn: "500000", // .5 uusdc
        smartSwapOptions: {
            splitRoutes: true,
        },
        cumulativeAffiliateFeeBPS: "0"
    })
    console.log(route.requiredChainAddresses)
    console.log(route)   
    // get user addresses for each requiredChainAddress
    const userAddresses = await Promise.all(route.requiredChainAddresses.map(async (chainID) => {
        return {
            chainID: chainID,
            address: await getCosmosAddress(chainID)
        }
    }))
    await skipClient.executeRoute({
        route,
        userAddresses,
        onTransactionCompleted: (chainID, txHash, status) => {
            console.log(`Route completed with tx hash: ${txHash} & status: ${status.state}`)
        }
    })
}
)()

