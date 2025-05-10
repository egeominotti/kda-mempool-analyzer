import { finder } from "./mempool";

console.log(`
  _______                                    __      _______               __                         
 |   |   |.-----.--------.-----.-----.-----.|  |    |   _   |.-----.---.-.|  |.--.--.-----.-----.----.
 |       ||  -__|        |  _  |  _  |  _  ||  |    |       ||     |  _  ||  ||  |  |-- __|  -__|   _|
 |__|_|__||_____|__|__|__|   __|_____|_____||__|    |___|___||__|__|___._||__||___  |_____|_____|__|
                           |__|                                                 |_____|               
                                   Author: viperblock.xyz
`);

// You can switch hosts based on latency and where the server this script runs on is located
global.host = "fr1.chainweb.com";
global.chains = [0, 1, 2];

const sleep = (ms: number | undefined) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const start = async () => {
  try {
    while (true) {
      try {
        console.log("Starting new mempool scan...");
        await finder();
        await sleep(250);
      } catch (e) {
        console.error("Error in finder execution:", e);
        await sleep(1000);
      }
    }
  } catch (e) {
    console.error("Critical error in main loop:", e);
    process.exit(1);
  }
};

start();
