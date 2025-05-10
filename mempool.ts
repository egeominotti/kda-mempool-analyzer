import { chains, host } from "./analyzer";

const customHeaders = {
  "Content-Type": "application/json",
};

export async function finder() {
  try {
    await Promise.all(
      chains.map(async (chain: any) => {
        const API = `https://${host}/chainweb/0.0/mainnet01/chain/${chain}/mempool`;
        console.log(
          `Searching the mempool for pending transactions chain ${chain} host ${host}`
        );

        const reqHashes = await fetch(API + "/getPending", {
          method: "POST",
          headers: customHeaders,
        });

        const pendingHashes = await reqHashes.json();

        if (pendingHashes.hashes.length === 0) {
          console.log(`No pending transactions found for chain ${chain}`);
          return;
        }

        console.log(
          `Found ${pendingHashes.hashes.length} pending transactions on chain ${chain}`
        );

        const reqLookup = await fetch(API + "/lookup", {
          method: "POST",
          headers: customHeaders,
          body: JSON.stringify(pendingHashes.hashes),
        });

        const lookupResponse = await reqLookup.json();

        if (Array.isArray(lookupResponse)) {
          lookupResponse.forEach((tx: any) => {
            // TODO: Add transaction details // queue
            console.log("Transaction details:", tx);
          });
        } else if (typeof lookupResponse === "object") {
          Object.entries(lookupResponse).forEach(([hash, txDetails]) => {
            console.log(`Transaction ${hash}:`, txDetails);
          });
        } else {
          console.log("Unexpected response format:", lookupResponse);
        }
      })
    );

    console.log("Completed mempool analysis");
  } catch (e) {
    console.error("Error in mempool finder:", e);
  }
}
