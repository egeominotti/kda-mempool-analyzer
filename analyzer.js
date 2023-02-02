const { version } = require("./package.json");
const mempool = require("./mempool");

console.log(`

_______                                    __      _______               __                         
|   |   |.-----.--------.-----.-----.-----.|  |    |   _   |.-----.---.-.|  |.--.--.-----.-----.----.
|       ||  -__|        |  _  |  _  |  _  ||  |    |       ||     |  _  ||  ||  |  |-- __|  -__|   _|
|__|_|__||_____|__|__|__|   __|_____|_____||__|    |___|___||__|__|___._||__||___  |_____|_____|__|  
                        |__|                                                 |_____|                    
             
Version: ${version}
Author: viperblock.xyz
`);

global.host = "fr1.chainweb.com";
global.chains = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
];

const start = async () => {
  try {
    setInterval(async () => {
      try {
        await mempool.finder();
      } catch (e) {
        console.error(e);
      }
    }, 500);
  } catch (e) {
    console.error(e);
  }
};

start();
