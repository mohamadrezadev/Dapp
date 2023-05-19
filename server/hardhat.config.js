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
task("deploy", "Deploy the smart contracts", async(taskArgs, hre) => {

  const Artwork = await hre.ethers.getContractFactory("CERT");
  const artwork = await Artwork.deploy("CERT Contract", "ART");

  await artwork.deployed();

  await hre.run("verify:verify", {
    address: artwork.address,
    constructorArguments: [
      "CERT Contract",
      "CERT"
    ]
  })

})


// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const INFURA_API_KEY = "74b97dad8e4f427dac16501162cc81f9";
const rinkeby = "69c6e822a217480c9c637ec68fd4a430";
module.exports = {
  solidity: "0.8.4",
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  networks: {
    // mumbai: {
    //   url: "https://matic-testnet-archive-rpc.bwarelabs.com",
    //   accounts: [
    //     process.env.PRIVATE_KEY,
    //   ]},
    // rinkeby: {
    //   url: `https://rinkeby.infura.io/v3/${INFURA_API_KEY}`,
    //   accounts: [rinkeby]
    // },

    development: {
      url: "http://localhost:7545",
      chainId: 1337
    }
  },
};
