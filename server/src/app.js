const { ethers } = require("ethers");

const infuraUrl = "wss://mainnet.infura.io/ws/v3/f421f98821ef4978a3600cfaf2c8be28";
const provider = new ethers.providers.WebSocketProvider(infuraUrl);

// یک مثال برای نمایش اطلاعات بلوک جاری
provider.getBlockNumber().then((blockNumber) => {
  console.log("Current block number: " + blockNumber);
});
// const https = require('https');
// const projectId = 'f421f98821ef4978a3600cfaf2c8be28';
// const data = JSON.stringify({
//     "jsonrpc":"2.0","method":"eth_blockNumber","params": [],"id":1
//   })
// const options = {
//     host: 'goerli.infura.io',
//     port: 443,
//     path: '/v3/' + projectId,
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//       },
// };
// const req = https.request(options, res => {
//     console.log(`statusCode: ${res.statusCode}`)

//     res.on('data', d => {
//       process.stdout.write(d)
//     })
//   })

//   req.on('error', error => {
//     console.error(error)
//   })

//   req.write(data)
//   req.end()

// var ethers = require('ethers');
// var url = 'https://mainnet.infura.io/v3/f421f98821ef4978a3600cfaf2c8be28';
// var customHttpProvider = new ethers.providers.JsonRpcProvider(url);
// customHttpProvider.getBlockNumber().then((result) => {
//     console.log("Current block number: " + result);
// });


// var Web3 = require('web3');
// var provider = 'https://mainnet.infura.io/v3/<API-KEY>';
// var web3Provider = new Web3.providers.HttpProvider(provider);
// var web3 = new Web3(web3Provider);
// web3.eth.getBlockNumber().then((result) => {
//   console.log("Latest Ethereum Block is ",result);
// });



// const Web3 = require("web3");
// const taskabi=require('../artifacts/contracts/TaskContract.sol/TaskContract.json')
// // Loading the contract ABI and Bytecode
// // (the results of a previous compilation step)
// const fs = require("fs");
// const { abi, bytecode } = JSON.parse(fs.readFileSync(taskabi));

// async function main() {
//   // Configuring the connection to an Ethereum node
//   const network = 'goerli';
//   const apikey="74b97dad8e4f427dac16501162cc81f9"
//   const web3 = new Web3(
//     new Web3.providers.HttpProvider(
//       `https://${network}.infura.io/v3/${apikey}`
//     )
//   );
//   // Creating a signing account from a private key
//   const secret="69c6e822a217480c9c637ec68fd4a430"
//   const signer = web3.eth.accounts.privateKeyToAccount(
//     secret
//   );
//   web3.eth.accounts.wallet.add(signer);

//   // Using the signing account to deploy the contract
//   const contract = new web3.eth.Contract(abi);
//   contract.options.data = bytecode;
//   const deployTx = contract.deploy();
//   const deployedContract = await deployTx
//     .send({
//       from: signer.address,
//       gas: await deployTx.estimateGas(),
//     })
//     .once("transactionHash", (txhash) => {
//       console.log(`Mining deployment transaction ...`);
//       console.log(`https://${network}.etherscan.io/tx/${txhash}`);
//     });
//   // The contract is now deployed on chain!
//   console.log(`Contract deployed at ${deployedContract.options.address}`);
//   console.log(
//     `Add DEMO_CONTRACT to the.env file to store the contract address: ${deployedContract.options.address}`
//   );
// }

// require("dotenv").config();
// main();