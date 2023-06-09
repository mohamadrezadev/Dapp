const f= require('../scripts/file')
const conf= require('../hardhat.config')
const main = async() => {
  //#region  StudentContract
  const StudentRegistry = await hre.ethers.getContractFactory("StudentRegistry");
  console.log(StudentRegistry)
  const  studentRegistry= await StudentRegistry.deploy();
  await studentRegistry.deployed();
  console.log('StudentRegistry  address is :',studentRegistry.address);
  //#endregion
  
  //#region  Greeter contract
  const Greeter = await ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello, Manual Hardhat!");
  await greeter.deployed();
  const address = greeter.address;
  console.log("Greetercontract address  is :", address);
  //#endregion
 
  //#region NFT
  const owners=["0x2Bcf41dc9415e81166D63494322faa2225831aAF"]
  const NFT=await ethers.getContractFactory("CERTNFT");
  const nft=await NFT.deploy(owners,"Certificate of Bozorgmehr Qaenat University","CBQ");
  console.log("NFT Contract  address  is  :"+nft.address)
  //#endregion

  //#region TaskContract
  const contractFactory = await ethers.getContractFactory('TaskContract');
  const contract = await contractFactory.deploy();
  await contract.deployed();
  console.log("TaskContract  deployed address is : ", contract.address);
  //#endregion 
  
  const obj = {
    TaskContractAddress:contract.address,
    GreetercontractAddress:greeter.address,
    StudentRegistryContractAddress:studentRegistry.address,
    NFTContract:nft.address,
    
  };
  f.write(obj)
}

const runMain = async() => {
  try {
    await main();
    process.exit(0);
  } catch(error) {
    console.log(error);
    process.exit(1);
  }
}

runMain();
