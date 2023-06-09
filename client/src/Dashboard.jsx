import React, { useEffect, useState } from "react";
import StudentRegistry from "../../server/artifacts/contracts/StudentRegistry.sol/StudentRegistry.json";
import NFTABI from "../../server/artifacts/contracts/NFT.sol/CERTNFT.json"
import { useContract } from "@thirdweb-dev/react";
import contrcatAddress from '../../server/contrcatAddress.json'
import { MediaRenderer } from "@thirdweb-dev/react";
import { ThirdwebNftMedia } from "@thirdweb-dev/react";
// import {ModalDialog} from '../src/modal';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
// import Modal from '@mui/material/Modal';
import {generate_metadata, pinFileToIPFS, pinata_api_key1, pinata_secret_api_key1} from './NFT/ipfs';



function Dashboard() {
  const [studentRegistryContract, setContract] = useState(null);
  const [nftContract, setContract2] = useState(null);
  const [students, setStudents] = useState(null);
  let firstName = ''
  let lastName=''
  let degree=''
  let major=''
  let year=''
  const { data } = useContract(
    contrcatAddress.StudentRegistryContractAddress,
    StudentRegistry.abi
  );
 
  const { contract, isLoading, error } = useContract(
    contrcatAddress.NFTContract,
    NFTABI.abi
  );

  function existestudent(list,_firstName,_lastName){
    list.forEach(element => {
      if(element.firstName==_firstName && element.lastName==_lastName){
        console.log(element.firstName)
        return true;
      }
    });
    return false;
  }

  useEffect(() => {
    
    if (studentRegistryContract != null) {
      handleReadStudent()
    }

    if (data) {
      setContract(data.contractWrapper.writeContract);
      setContract2(contract.contractWrapper.writeContract);
    }
  }, [data,contract, studentRegistryContract]);

  const handleCreateStudent = async () => {
    const firstName = 'John';
    const lastName = 'Doe';
    const degree = 'BSc';
    const major = 'Computer Science';
    const year = 2022;
    const res=await studentRegistryContract.getAallStudents();
    if(!existestudent(res,firstName,lastName)){
      console.log("alrady exist sudent")
    }
    else{
      const tx= await studentRegistryContract.createStudent(firstName, lastName, degree, major, year);
      console.log(tx)
    }
    
  };
  function creatnft(student){
    // let student=students[index]
    console.log(student)
  }
  const handelCreatenft=async(student)=>{
    console.log(student.firstName,student.lastName,student.education.degree,student.education.major,parseInt(student.education.year._hex, 16))
    const metadata= generate_metadata(student.firstName,student.lastName,student.education.degree,student.education.major,parseInt(student.education.year._hex, 16))
    const response = await pinFileToIPFS(metadata,pinata_api_key1,pinata_secret_api_key1)
    const IpfsHash=response.data.IpfsHash;
    const tx= await nftContract.mint(IpfsHash)
    const receipt = await tx.wait();
    console.log(receipt)
    const tokenId = receipt.events[1].args[1];
    console.log(tokenId)
    const tokenURI = await nftContract.tokenURI(tokenId);
    console.log(tokenURI)
  }
 
  const handleReadStudent = async () => {
    // console.log(students);
    const res=await studentRegistryContract.getAallStudents();
    setStudents(res);
   
    console.log("syudent: ",students);
    // res.forEach(element => {
    //   console.log(element.firstName);
    // });
  };

  async function form(_firstName ,_lastName ,_degree,_major,_year){
    console.log(_firstName ,_lastName ,_degree,_major,_year)
    const res=await studentRegistryContract.getAallStudents();
    // console.log(res)
    if(existestudent(res,firstName,lastName)){
      console.log("alrady exist sudent")
    }
    else{
      const tx= await studentRegistryContract.createStudent(firstName, lastName, degree, major, year);
      const receipt = await tx.wait();
      console.log(receipt)
      location.reload()
    }

  }
  return (
    <div>
      <h1>Smart Contract Info:</h1>
      <button onClick={handleCreateStudent}>Create Student</button>
      <button onClick={handleReadStudent}>ReadStudent</button>
      <button onClick={handelCreatenft}>nft</button>
      {/* <MediaRenderer src="ipfs://QmTmh7ffdVZKJgMjEMWpy9H4iyW9kSbKA7oHKKSrLiTQdp" /> */}
      
      {/* {Object.keys(students)} */}
      {/* display other relevant information from the smart contract response */}
      <div className="row">
        <div className="container">
          <table class="table">
          <thead>
            <tr>
              <th scope="col">ردیف</th>
              <th scope="col">نام</th>
              <th scope="col">نام خانوادگی</th>
              <th scope="col">رشته تحصیلی </th>
              <th scope="col">مقطع تحصیلی</th>
              <th scope="col">سال فارغ تحصیلی </th>
              <th scope="col">سال فارغ تحصیلی </th>
            </tr>
            {/* <th>
              <tr> نام</tr>
              <tr> نام خانوادگی</tr>
              <tr> رشته </tr>
              <tr> مقطع </tr>
              <tr> سال فارغ تحصیلی </tr>
            </th> */}
          </thead>
          <tbody>
          {students !== null ? students.map((element, index) => {
            // console.log(index)
              return <tr  >
                  <th scope="row">{index+1}</th>
                  <th scope="col">{element.firstName}</th>
                  <th scope="col">{element.lastName}</th>
                  <th scope="col">{element.education.major}</th>
                  <th scope="col">{element.education.degree}</th>
                  <th scope="col">{parseInt(element.education.year._hex, 16)}</th>
                  <td><button onClick={()=> handelCreatenft(students[index])}>صدور گواهینامه </button></td>
                </tr>
            }) : <></>}
           
           
           
            {/* <tr>
              <th scope="row">3</th>
              <td colspan="2">Larry the Bird</td>
              <td>@twitter</td>
              <td><button onClick={handelCreatenft}>nft</button></td>
            </tr> */}
          </tbody>
          </table>
          </div>
      </div>
      {/* <!-- Button trigger modal --> */}
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        افزودن اطلاعات دانشجو
      </button>

      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <main className="container">
             <div className="col-md-7 col-lg-8 mx-auto">
               <div className="row g-5">
                <form className="needs-validation was-validated" />
                 <div className="row g-3">
                   <div className="col-12">
                     <label htmlFor="firstName" className="form-label">
                       نام
                     </label>
                     <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      placeholder=""
                      required=""
                      onChange={(e)=>{
                        firstName = e.target.value
                      }}
                    />
                    <div className="invalid-feedback">
                      Valid first name is required.
                    </div>
                  </div>

                  <div className="col-12">
                    <label htmlFor="lastName" className="form-label">
                      نام خانوادگی
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      placeholder=""
                      required=""
                      onChange={(e)=>{
                        lastName = e.target.value
                      }}
                    />
                    <div className="invalid-feedback">
                      Valid last name is required.
                    </div>
                  </div>

                  <div className="col-12">
                    <label htmlFor="email" className="form-label">
                      تاریخ  
                      <span className="text-body-secondary"></span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="date"
                      placeholder=""
                      onChange={(e)=>{
                        year = e.target.value
                      }}
                    />
                    {/* <div className="invalid-feedback">
                      Please enter a valid email address htmlFor shipping updates.
                    </div> */}
                  </div>
                  <div className="col-12">
                    <label htmlFor="major" className="form-label">
                      رشته
                    </label>
                    <select className="form-select" id="major" required=""  onChange={(e)=>{
                        major = e.target.value
                      }}>
                      <option value="">انتخاب </option>
                      <option>کامپیوتر</option>
                      <option>مکانیک</option>
                      <option>عمران</option>
                    </select>
                    <div className="invalid-feedback">
                      لطفا رشته را به درستی وارد نمایید
                    </div>
                  </div>

                  <div className="col-12">
                    <label htmlFor="degree" className="form-label">
                       مقطع
                    </label>
                    <select className="form-select" id="degree" required="" 
                       onChange={(e)=>{
                        degree = e.target.value
                      }}>
                      <option value="">انتخاب</option>
                      <option>کاردانی </option>
                      <option>کارشناسی </option>
                      <option>کارشناسی ارشد </option>
                    </select>
                    <div className="invalid-feedback">
                      لطفا مقطع را به درستی وارد نمایید
                    </div>
                  </div>

                  
                </div>

                <hr className="my-4" />

                {/* <button className="w-100 btn btn-primary btn-lg" type="submit">
                  Continue to checkout
                </button> */}
              </div>
            </div>
          </main>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" onClick={() => { form(firstName ,lastName ,degree,major,year)}}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
     
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
