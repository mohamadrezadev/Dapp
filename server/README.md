# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat clean #step 1

npx hardhat compile #step 2

npx hardhat node #step 3

npx hardhat run scripts/deploy.js --network polygon_mumbai #step 4
npx hardhat run scripts/deploy.js --network localhost 
#for verify contract address
npx hardhat verify --network polygon_mumbai 0xc81b885CF934A38BcaBD0cb2A3465705eED622D1 

npx hardhat test #step 5
npx hardhat accounts
node scripts/sample-script.js
npx hardhat run --network localhost   scripts/Student-deploy.js
npx hardhat help
```
