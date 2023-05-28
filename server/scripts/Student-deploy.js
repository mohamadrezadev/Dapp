
const hre = require("hardhat");

async function main() {
  // We get the contract to deploy
  const StudentRegistry = await hre.ethers.getContractFactory("StudentRegistry");
  console.log(StudentRegistry)
  const  studentRegistry= await StudentRegistry.deploy();
  await studentRegistry.deployed();
  console.log('StudentRegistry deployed to:',studentRegistry.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
