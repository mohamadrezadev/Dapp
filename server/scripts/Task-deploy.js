// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // We get the contract to deploy
  const Greeter = await hre.ethers.getContractFactory("Greeter");
  // const StudentRegistry = await hre.ethers.getContractFactory("StudentRegistry");
  // console.log(studentRegistry)
  const TaskContract = await hre.ethers.getContractFactory("TaskContract");
  console.log(TaskContract)
  const  taskContract= await TaskContract.deploy();

  await taskContract.deployed();

  console.log('taskContract deployed to:',taskContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
