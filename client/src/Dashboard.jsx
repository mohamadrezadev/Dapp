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
  const [tokenurls, settokenurls] = useState(null);
  let firstName = ''
  let lastName=''
  let degree=''
  let major=''
  let year=''


  let from=''
  let to=''
  let tokenId=''
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
      getalltokenurl()
    }

    if (data) {
      setContract(data.contractWrapper.writeContract);
      setContract2(contract.contractWrapper.writeContract);
    }
  }, [data,contract, studentRegistryContract]);

  const handleCreateStudent = async (_firstName ,_lastName ,_degree,_major,_year) => {
    console.log(_firstName ,_lastName ,_degree,_major,_year)
    const res=await studentRegistryContract.getAallStudents();
    if(existestudent(res,firstName,lastName)){
      //اگر دانشجو قبلا وجود داشت پیامی را نشان دهد
      console.log("alrady exist sudent")
    }
    else{
      const tax= await studentRegistryContract.createStudent(firstName, lastName, degree, major, year);
      const receipt=await tax.wait();
      const evnets=receipt.events[0].args
      //اطلاعات تراکنش را به کاربر نشان دهد 
      console.log(evnets)
      console.log(receipt)
      // location.reload()
    }
    
  };
  
  const handleUpdateStudent = async (student) => {
    const firstName = 'John';
    const lastName = 'Doe';
    const degree = 'BSc';
    const major = 'Computer Science';
    const year = 2022;
    const res=await studentRegistryContract.getAallStudents();
    if(existestudent(res,student.firstName,student.lastName)){

      const tx= await studentRegistryContract.UpdateStudent(firstName, lastName, degree, major, year);
      console.log(tx)
    }
    else{
      console.log("student not founded")
    }
    
  };

  const handelCreatenft=async(student)=>{
    console.log(student.firstName,student.lastName,student.education.degree,student.education.major,parseInt(student.education.year._hex, 16))
    const metadata= generate_metadata(student.firstName,student.lastName,student.education.degree,student.education.major,parseInt(student.education.year._hex, 16))
    const response = await pinFileToIPFS(metadata,pinata_api_key1,pinata_secret_api_key1,student.firstName);
    const IpfsHash=response.data.IpfsHash;
    console.log(IpfsHash)
    const tx= await nftContract.mint(IpfsHash)
    console.log(tx)
    const receipt = await tx.wait();
    console.log(receipt)
    const tokenId = receipt.events[1].args[1];
    console.log(parseInt(tokenId._hex, 16))
    const tokenURI = await nftContract.tokenURI(tokenId);
    console.log(tokenURI)
  }
 
  const handleReadStudent = async () => {
    // console.log(students);
    const res=await studentRegistryContract.getAallStudents();
    setStudents(res);
   
    console.log("student: ",students);
   
  };

  async function form(_firstName ,_lastName ,_degree,_major,_year){
    console.log(_firstName ,_lastName ,_degree,_major,_year)
    const res=await studentRegistryContract.getAallStudents();
    if(existestudent(res,firstName,lastName)){
      console.log("alrady exist sudent")
    }
    else{
      const tax= await studentRegistryContract.createStudent(firstName, lastName, degree, major, year);
      const receipt=await tax.wait();
      const evnets=receipt.events[0].args
      console.log(evnets)
      const id=receipt.events[0].args[0]
      
      // const tx= await studentRegistryContract.createStudent(firstName, lastName, degree, major, year);
      // const receipt = await tx.wait();
      console.log(receipt)
      // location.reload()
    }

  }
  
  const getalltokenurl=async function(){
    const result=await nftContract.getAllTokenIdsAndUrls();
    settokenurls(result[1])
    console.log(tokenurls)
  }
  const transfer=async function(from,to,tokenId){
    //انتقال ان اف تی به کاربران 
      const tx2=await nftContract.transferFrom(from,to,tokenId)
      const receipt2=tx2.wait();
      console.log(receipt2)
  }
  return (
    <div>
      <h1>Smart Contract Info:</h1>
      <button onClick={handleCreateStudent}>Create Student</button>
      <button onClick={handleReadStudent}>ReadStudent</button>
      <button onClick={handelCreatenft}>nft</button>
      <button onClick={getalltokenurl}>urls</button>
      
      
      
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
              <th scope="col"> </th>
            </tr>
         
          </thead>
          <tbody>
          {students !== null ? students.map((element, index) => {
            
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
      
      <div className="row">
       
        {tokenurls !=null ? tokenurls.map((element,index)=>{
          //برای نمایش دادن ان اف تی های صادر شده 
          console.log(element)
          return(
            <ThirdwebNftMedia
              metadata={element}
              requireInteraction={true}
            />
            // <MediaRenderer src={`QmPFh96YLYXJteKmtJkuMS8oCWzSWvVentVYfxy6VZftS3`}></MediaRenderer>
          )

        }):<></>}

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
              <button type="button" class="btn btn-primary" onClick={() => { handleCreateStudent(firstName ,lastName ,degree,major,year)}}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
      
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal2">
        انتفال 
      </button>

      <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                       ادرس فرستنده
                     </label>
                     <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      placeholder=""
                      required=""
                      onChange={(e)=>{
                        from = e.target.value
                      }}
                    />
                    <div className="invalid-feedback">
                      Valid first name is required.
                    </div>
                  </div>

                  <div className="col-12">
                    <label htmlFor="lastName" className="form-label">
                      ادرس گیرنده
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      placeholder=""
                      required=""
                      onChange={(e)=>{
                        to = e.target.value
                      }}
                    />
                    <div className="invalid-feedback">
                      Valid last name is required.
                    </div>
                  </div>

                  <div className="col-12">
                    <label htmlFor="email" className="form-label">
                      شماره گواهینامه  
                      <span className="text-body-secondary"></span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="date"
                      placeholder=""
                      onChange={(e)=>{
                        tokenId = e.target.value
                      }}
                    />
                    {/* <div className="invalid-feedback">
                      Please enter a valid email address htmlFor shipping updates.
                    </div> */}
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
              <button type="button" class="btn btn-primary" onClick={() => { transfer(from,to,tokenId)}}>Save changes</button>
            </div>
          </div>
        </div>
      </div>

    

    </div>
    
  );


}

export default Dashboard;
