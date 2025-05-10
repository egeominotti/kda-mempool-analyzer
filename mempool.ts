const customHeaders = {
  "Content-Type": "application/json",
};

export async function finder() {
  try {
    global.chains.map(async (chain) => {
      const API = `https://${global.host}/chainweb/0.0/mainnet01/chain/${chain}/mempool`;
      console.log(
        `Searching the mempool for pending transactions chain ${chain} host ${host}`
      );
      const reqHashes = await fetch(API + "/getPending", {
        method: "POST",
        headers: customHeaders,
      });
      const pendingHashes = await reqHashes.json();
      if (pendingHashes.hashes.length == 0) return;
      const reqLookup = await fetch(API + "/lookup", {
        method: "POST",
        headers: customHeaders,
        body: JSON.stringify(pendingHashes.hashes),
      });
      const lookupHash = await reqLookup.json();
      lookupHash.map(async (tx: any) => {
        console.log(tx);
      });
    });
  } catch (e) {
    console.error(e);
  }
}
