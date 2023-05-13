require("@nomiclabs/hardhat-waffle");
require('dotenv').config()

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const SEPOLIA_PRIVATE_KEY = "bf458ebbe1074d979737bc33398843ca";
const INFURA_API_KEY = "bf458ebbe1074d979737bc33398843ca";
module.exports = {
  solidity: "0.8.4",
  networks: {
    // rinkeby: {
    //   url: `https://rinkeby.infura.io/v3/${INFURA_API_KEY}`,
    //   accounts: [SEPOLIA_PRIVATE_KEY],
    // },
    // rinkeby: {
    //   url: 'https://goerli.infura.io/v3/f421f98821ef4978a3600cfaf2c8be28',
    //   accounts: [`0xf421f98821ef4978a3600cfaf2c8be28`],
    // },
    development: {
      url: "http://localhost:7545",
      chainId: 1337
    }
  },
};
