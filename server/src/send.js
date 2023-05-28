const Web3 = require('ethers');

async function main() {
  // Configuring the connection to the Polygon node
  const network = 'goerli';
  const INFURA_API_KEY='f421f98821ef4978a3600cfaf2c8be28';
  const SIGNER_PRIVATE_KEY='b242c3e98193e7dd500d8c0cf61889d6e01fbf8873f42ff8b7befcc6446bb67d'
  let web3ocek=`wss://${network}.infura.io/ws/v3/${INFURA_API_KEY}`
  let http=`https://${network}.infura.io/v3/${INFURA_API_KEY}`
  let pylocl='0x1be38f456f5027fbf7bf5e484744c58828eaab8a807ae64493319b4873ee3e1f'
  const web3 = new Web3.providers.JsonRpcProvider(
          'HTTP://127.0.0.1:7545'
  );
  // Creating a signing account from a private key
  const signer = new Web3.ethers.Wallet(pylocl, web3);
  console.log(signer.address)
  const tx = {
          from: signer.address,
          to: "0x7DB15Fe0a93d9B90AFc41a16A7068552350f0deF",
          value: Web3.utils.parseEther("1.0"),
        };
        
        // Assigning the right amount of gas
        tx.gasLimit = await signer.provider.estimateGas(tx);
        
        // Sending the transaction to the network
        const txResponse = await signer.sendTransaction(tx);
        console.log(`Mining transaction ...`);
        console.log(`Transaction hash: ${txResponse.hash}`);
        
        // Wait for the transaction to be mined
  const receipt = await txResponse.wait();
  console.log(`Mined in block ${receipt.blockNumber}`);
}

require("dotenv").config();
main();