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
task("deploy", "StudentRegistry Deploy the smart contracts", async(taskArgs, hre) => {

  const StudentRegistry = await hre.ethers.getContractFactory("StudentRegistry");
  const studentRegistry = await StudentRegistry.deploy("CERT Contract", "ART");

  await studentRegistry.deployed();

  await hre.run("verify:verify", {
    address: studentRegistry.address,
  })

})



/**
 * @type import('hardhat/config').HardhatUserConfig
 */
// const tenderlyUrl = 'https://polygon-mumbai.gateway.tenderly.co/34n3eTX4dGkfk0u6FxhXx6'; //process.env.TENDERLY_URL;
// console.log(tenderlyUrl)
//your private key. Make sure this address has some ETH on sepolia
// b242c3e98193e7dd500d8c0cf61889d6e01fbf8873f42ff8b7befcc6446bb67d
const privateKey = 'b242c3e98193e7dd500d8c0cf61889d6e01fbf8873f42ff8b7befcc6446bb67d'
// b242c3e98193e7dd500d8c0cf61889d6e01fbf8873f42ff8b7befcc6446bb67d ;//process.env.PRIVATE_KEY; 
console.log(privateKey)
const SIGNER_PRIVATE_KEY='b242c3e98193e7dd500d8c0cf61889d6e01fbf8873f42ff8b7befcc6446bb67d'
// let web3ocek=`wss://${network}.infura.io/ws/v3/${INFURA_API_KEY}`

// let http=`https://${network}.infura.io/v3/${INFURA_API_KEY}`
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
      url:'HTTP://127.0.0.1:7545',
      accounts:['0x1be38f456f5027fbf7bf5e484744c58828eaab8a807ae64493319b4873ee3e1f']
    },
    testlocal:{
      url:'HTTP://127.0.0.1:7545',
      accounts:['0x24b8847b73bfed1e817057b5575e9393bcd11691c5fe400263dec1436adcb5ea']
    },
    goerli: {
      url:'https://polygon-mumbai.gateway.tenderly.co/34n3eTX4dGkfk0u6FxhXx6',
      // url: `https://goerli.infura.io/ws/v3/f421f98821ef4978a3600cfaf2c8be28`,
      accounts: [SIGNER_PRIVATE_KEY],
    },
    sepolia_via_tenderly: {
      url: `https://sepolia.infura.iocls/v3/f421f98821ef4978a3600cfaf2c8be28`,
      accounts: [SIGNER_PRIVATE_KEY],
      // url: tenderlyUrl,
      // // this will allow us to use our private key for signing TX later
      // accounts: [`0x${privateKey}`],
      
      // this is the sepolia chain id
      // change it if you are using a different network
      // chainId: 11155111
     
    },
   
   
    hardhat: {
      forking: {
        url: "https://polygon-mumbai.g.alchemy.com/v2/ZinXrRb-UnKcg0y955wyVF-c1FKtcixo",
      }
    },
    development: {
      url: "http://localhost:7545",
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

