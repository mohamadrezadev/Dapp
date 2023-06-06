const f= require('../scripts/file')
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
  };
  f.write(obj)
  // file.write(obj)
  
  
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
