require("@nomiclabs/hardhat-waffle");
require('dotenv').config()
// var tdly = require("@tenderly/hardhat-tenderly");
// tdly.setup({automaticVerifications: false});
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});
// task("deploy", "StudentRegistry Deploy the smart contracts", async(taskArgs, hre) => {

//   const StudentRegistry = await hre.ethers.getContractFactory("StudentRegistry");
//   const studentRegistry = await StudentRegistry.deploy("CERT Contract", "ART");

//   await studentRegistry.deployed();

//   await hre.run("verify:verify", {
//     address: studentRegistry.address,
//   })

// })

//your private key. Make sure this address has some ETH on sepolia
const privateKey = '0x24b8847b73bfed1e817057b5575e9393bcd11691c5fe400263dec1436adcb5ea'
console.log('privateKey : '+ privateKey)
const SIGNER_PRIVATE_KEY='b242c3e98193e7dd500d8c0cf61889d6e01fbf8873f42ff8b7befcc6446bb67d'

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
    }
  },
  tenderly: {
    // replace with project slug in Tenderly
    project: "certficate",
    
    // replace with your Tenderly username
    username: "mohamadreza",
    
    // perform contract verification in private mode
    privateVerification: true,
    
  }
};

