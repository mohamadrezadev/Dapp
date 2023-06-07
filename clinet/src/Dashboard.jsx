import React, { useEffect, useState } from "react";
import StudentRegistry from "../../server/artifacts/contracts/StudentRegistry.sol/StudentRegistry.json";
import NFTABI from "../../server/artifacts/contracts/NFT.sol/CERTNFT.json"
import { useContract } from "@thirdweb-dev/react";
import contrcatAddress from '../../server/contrcatAddress.json'
import {generate_metadata, pinFileToIPFS, pinata_api_key1, pinata_secret_api_key1} from './NFT/ipfs';
function Dashboard() {
  const [studentRegistryContract, setContract] = useState(null);
  const [nftContract, setContract2] = useState(null);
  const [students, setStudents] = useState(null);

  const { data } = useContract(
    contrcatAddress.StudentRegistryContractAddress,
    StudentRegistry.abi
  );
 
  const { contract, isLoading, error } = useContract(
    contrcatAddress.NFTContract,
    NFTABI.abi
  );
  // console.log(contract)
  useEffect(() => {
    if (data) {
      setContract(data.contractWrapper.writeContract);
      setContract2(contract.contractWrapper.writeContract);
    }
    
  }, [data,contract]);

  const handleCreateStudent = async () => {
    const firstName = 'John';
    const lastName = 'Doe';
    const degree = 'BSc';
    const major = 'Computer Science';
    const year = 2022;
   const tx= await studentRegistryContract.createStudent(firstName, lastName, degree, major, year);
    // let tx= await contract.createStudent('mohamadreza', 'kiani ', 'tase', 'h', 47);
    console.log(tx)
  };
  const handelCreatenft=async()=>{
    const firstName = 'masod';
    const lastName = 'gorgani';
    const degree = 'BSc';
    const major = 'Computer Science';
    const year = 2023;
    const metadata= generate_metadata(firstName,lastName,degree,major,year)
    const response = await pinFileToIPFS(metadata,pinata_api_key1,pinata_secret_api_key1)
    const IpfsHash=response.data.IpfsHash;
    const tx= await nftContract.mint(IpfsHash)
    const receipt = await tx.wait();
    console.log(receipt)
  }
  const handleReadStudent = async () => {
    console.log(students);
    const res=await studentRegistryContract.getAallStudents();
    const tx=await studentRegistryContract.getAallStudents();
    setStudents(res);
    console.log(tx);
  };
  return (
    <div>
      <h1>Smart Contract Info:</h1>
      <button onClick={handleCreateStudent}>Create Student</button>
      <button onClick={handleReadStudent}>ReadStudent</button>
      <button onClick={handelCreatenft}>nft</button>
      {/* {Object.keys(students)} */}
      {/* display other relevant information from the smart contract response */}
    </div>
  );

// import React, { useEffect, useState } from "react";
// import StudentRegistry from "./assets/StudentRegistry.json";
// import { useContract } from "@thirdweb-dev/react";

// function Dashboard() {
//   const [smartContract, setSmartContract] = useState([]);
//   const [contractWrapper, setContractWrapper] = useState([]);
//   const { data } = useContract(
//     "0x5FbDB2315678afecb367f032d93F642f64180aa3",
//     StudentRegistry.abi
//   );

//   useEffect(() => {
//     if (data) {
//       setSmartContract(data);
//     }
//     if (smartContract.contractWrapper) {
//       setContractWrapper(smartContract.contractWrapper);
//     }
//   }, [data, smartContract]);

//   const contarct = contractWrapper.writeContract;
//   const handlech =()=>{
//     contarct.createStudent('string','string','string','string',454);

//   }
//   return (
//     <div>
//       <h1>Smart Contract Info:</h1>
//       <button onClick={()=>handlech()}>dlksjfhklsdfhkl</button>
//       {/* <p>Contract Address: {smartContract.contractAddress}</p>
//       <p>ABI: {JSON.stringify(StudentRegistry.abi)}</p> */}
//       {/* display other relevant information from the smart contract response */}
//     </div>
//   );

//   return (
//     <main className="container">
//       <div className="col-md-7 col-lg-8 mx-auto">
//         <div className="row g-5">
//           <form className="needs-validation was-validated" />
//           <div className="row g-3">
//             <div className="col-sm-6">
//               <label htmlFor="firstName" className="form-label">
//                 First name
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="firstName"
//                 placeholder=""
//                 required=""
//               />
//               <div className="invalid-feedback">
//                 Valid first name is required.
//               </div>
//             </div>

//             <div className="col-sm-6">
//               <label htmlFor="lastName" className="form-label">
//                 Last name
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="lastName"
//                 placeholder=""
//                 required=""
//               />
//               <div className="invalid-feedback">
//                 Valid last name is required.
//               </div>
//             </div>

//             <div className="col-12">
//               <label htmlFor="email" className="form-label">
//                 Email <span className="text-body-secondary">(Optional)</span>
//               </label>
//               <input
//                 type="email"
//                 className="form-control"
//                 id="email"
//                 placeholder="you@example.com"
//               />
//               <div className="invalid-feedback">
//                 Please enter a valid email address htmlFor shipping updates.
//               </div>
//             </div>

//             <div className="col-12">
//               <label htmlFor="address" className="form-label">
//                 Address
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="address"
//                 placeholder="1234 Main St"
//                 required=""
//               />
//               <div className="invalid-feedback">
//                 Please enter your shipping address.
//               </div>
//             </div>

//             <div className="col-md-5">
//               <label htmlFor="country" className="form-label">
//                 Country
//               </label>
//               <select className="form-select" id="country" required="">
//                 <option value="">Choose...</option>
//                 <option>United States</option>
//               </select>
//               <div className="invalid-feedback">
//                 Please select a valid country.
//               </div>
//             </div>

//             <div className="col-md-4">
//               <label htmlFor="state" className="form-label">
//                 State
//               </label>
//               <select className="form-select" id="state" required="">
//                 <option value="">Choose...</option>
//                 <option>California</option>
//               </select>
//               <div className="invalid-feedback">
//                 Please provide a valid state.
//               </div>
//             </div>

//             <div className="col-md-3">
//               <label htmlFor="zip" className="form-label">
//                 Zip
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="zip"
//                 placeholder=""
//                 required=""
//               />
//               <div className="invalid-feedback">Zip code required.</div>
//             </div>
//           </div>

//           <hr className="my-4" />

//           <button className="w-100 btn btn-primary btn-lg" type="submit">
//             Continue to checkout
//           </button>
//         </div>
//       </div>
//     </main>
//   );
}

export default Dashboard;
