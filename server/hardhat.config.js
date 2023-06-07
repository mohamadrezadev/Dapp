require("@nomiclabs/hardhat-waffle");
require('dotenv').config()
require("@nomiclabs/hardhat-ethers")
require("@nomiclabs/hardhat-etherscan")
 
const API_URL="https://polygon-mumbai.g.alchemy.com/v2/ZinXrRb-UnKcg0y955wyVF-c1FKtcixo";
const PRIVATE_KEY ="b242c3e98193e7dd500d8c0cf61889d6e01fbf8873f42ff8b7befcc6446bb67d";
// task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
//   const accounts = await hre.ethers.getSigners();

//   for (const account of accounts) {
//     console.log(account.address);
//   }
// });


module.exports = {
  // solidity:"0.8.19",
  solidity: {
    version: "0.8.17", // any version you want
    settings: {
      viaIR: true,
      optimizer: {
        enabled: true,
        details: {
          yulDetails: {
            optimizerSteps: "u",
          },
        },
      },
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  },
  networks: {
    test:{
      url:'HTTP://127.0.0.1:6545',
      accounts:['0x5705c1062be8b8c6e6de6e95f5e95fae3d4a706be72bb3eb246c8dbae960b94b']
    },
    development: {
      url: "http://localhost:8545",
      chainId: 1337
    },
    mumbai: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    polygon_mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: ['b242c3e98193e7dd500d8c0cf61889d6e01fbf8873f42ff8b7befcc6446bb67d']
      }
  },
  etherscan: {
    apiKey: 'W3UJSP7FDJHUI6JWG3U77V9YCWVETR4VQ5'
  },
};



// module.exports = {
//     defaultNetwork: "polygon_mumbai",
//       networks: {
//       hardhat: {
//       },
//       polygon_mumbai: {
//       url: "https://rpc-mumbai.maticvigil.com",
//       accounts: [process.env.PRIVATE_KEY]
//       }
//     },
//     etherscan: {
//     apiKey: process.env.POLYGONSCAN_API_KEY
//     },
//     solidity: {
//     version: "0.8.9",
//     settings: {
//     optimizer: {
//     enabled: true,
//     runs: 200
//     }
//     }
//     },
//   }
