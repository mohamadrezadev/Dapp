import React, { useEffect, useState } from "react";
import StudentRegistry from "../../server/artifacts/contracts/StudentRegistry.sol/StudentRegistry.json";
import NFTABI from "../../server/artifacts/contracts/NFT.sol/CERTNFT.json";
import { useContract } from "@thirdweb-dev/react";
import contrcatAddress from "../../server/contrcatAddress.json";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import { NFTs, Nftlast,NftPreview } from "./components/RenderNft";

import { NotificationManager, __esModule } from "react-notifications";
import "./dashboard.css";
import {
  generate_metadata,
  pinFileToIPFS,
  pinata_api_key1,
  pinata_secret_api_key1,
} from "./utils/ipfs";
import Table from "./components/Table.jsx";
import ModalAdd from "./components/ModalAdd";
import ModalTransfer from "./components/ModalTransfer";
import ModalAddOwner from "./components/Modaladdoperator";

function Dashboard() {
  const [studentRegistryContract, setContract] = useState(null);
  const [nftContract, setContract2] = useState(null);
  const [students, setStudents] = useState(null);
  const [tokenurls, settokenurls] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingNft, setLoadingNft] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [degree, setDegree] = useState("");
  const [major, setMajor] = useState("");
  const [year, setYear] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [address, setaddress] = useState("");
  const [addressnft, setaddressnft] = useState("");
  
  const { data } = useContract(
    contrcatAddress.StudentRegistryContractAddress,
    StudentRegistry.abi
  );

  const { contract } = useContract(contrcatAddress.NFTContract, NFTABI.abi);

  useEffect(() => {
    try {
      if (studentRegistryContract != null) {
        handleReadStudent();
        getalltokenurl();
      }

      if (data) {
        setContract(data.contractWrapper.writeContract);
        setContract2(contract.contractWrapper.writeContract);
      }
    } catch (error) {
      console.log(error);
    }
  }, [data, contract, studentRegistryContract]);
  function existestudent(list, _firstName, _lastName) {
    for (const element of list) {
      if (element.firstName === _firstName && element.lastName === _lastName) {
        console.log(element.firstName, _firstName);
        console.log(element.lastName, _lastName);
        return true;
      }
    }
    return false;
  }
  const handleCreateStudent = async (
    _firstName,
    _lastName,
    _degree,
    _major,
    _year
  ) => {
    try {
      if (
        firstName.trim() === "" ||
        lastName.trim() === "" ||
        degree.trim() === "" ||
        major.trim() === "" ||
        year.trim() === ""
      ) {
        NotificationManager.error("لطفا تمامی فیلدها را پر کنید");
        return;
      }

      setLoading(true);
      const res = await studentRegistryContract.getAallStudents();
      console.log(res);
      console.log(students);
      if (existestudent(students, _firstName, _lastName)) {
        //اگر دانشجو قبلا وجود داشت پیامی را نشان دهد
        console.log("studendcreate:" + students);
        console.log("alrady exist sudent");
        NotificationManager.error("اطلاعات از قبل وجود دارد");
        setFirstName("");
        setLastName("");
        setYear("");
        setDegree("");
        setMajor("");
        setLoading(false);
      } else {
        const tax = await studentRegistryContract.createStudent(
          firstName,
          lastName,
          degree,
          major,
          year
        );
        console.log("data studentcreate :" + year + firstName + lastName);
        const receipt = await tax.wait();
        const evnets = receipt.events[0].args;
        console.log("evnets", evnets);
        if (evnets["code"] === "ACTION_CONFIRME") {
          NotificationManager.success("  اطلاعات با موفقیت ثبت گردید ");
          setLoading(false);
          const res = await studentRegistryContract.getAallStudents();
          console.log("created res ", res);
          setStudents(res);
          setTimeout(async () => {
            const res = await studentRegistryContract.getAallStudents();
            console.log("res", res);
            setStudents(res);
          }, 10000);
        }
        // console.log(tax, "tax");
        // //اطلاعات تراکنش را به کاربر نشان دهد
        // console.log("evnets", evnets);
        // console.log("receipt", receipt);
        // NotificationManager.success( `اطلاعات تراکنش ${receipt} `);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      if (err.code === "ACTION_REJECTED") {
        NotificationManager.error("!تراکنش پذیرفته نشد");
      } else {
        NotificationManager.error(`Erorr ${err}`);
      }
    }
  };

  const handelCreatenft = async (student, index) => {
    setLoadingNft(true);
    try {
      const metadata = generate_metadata(
        student.firstName,
        student.lastName,
        student.education.degree,
        student.education.major,
        student.education.year
      );
      const response = await pinFileToIPFS(
        metadata,
        pinata_api_key1,
        pinata_secret_api_key1,
        student.firstName
      );
      const IpfsHash = response.data.IpfsHash;
      const tx = await nftContract.mint(IpfsHash);
      const receipt = await tx.wait();
      const tokenId = receipt.events[1].args[1];
      console.log("tokenId" + parseInt(tokenId._hex, 16));
      const tokenURI = await nftContract.tokenURI(tokenId);
      console.log(tokenURI);

      const trx = await handelisissuedcertificateStudent(
        index,
        true,
        tokenURI,
        tokenId
      );

      setTimeout(async () => {
        const res = await studentRegistryContract.getAallStudents();
        setStudents(res);
      }, 10000);
      NotificationManager.success(`تراکنش موفق`);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Erorr nft:" + error);

      if (
        error.reason ===
        "execution reverted: Only the owner can call this function."
      ) {
        NotificationManager.error(
          "!آدرس مورد نظر قادر به ایجاد مدرک نمی باشد "
        );
      } else if (error.code === "UNPREDICTABLE_GAS_LIMIT") {
        NotificationManager.error("موجودی ناکافی!!");
      } else if (error.code === "ACTION_REJECTED") {
        NotificationManager.error("!تراکنش پذیرفته نشد");
      }
    }
    setLoadingNft(false);
  };

  const handleReadStudent = async () => {
    const res = await studentRegistryContract.getAallStudents();
    setStudents(res);

  };
  const handelAddoperator = async (address) => {
    try {
      const tax = await nftContract.addOperator(address);
      const response = await tax.wait();
      await   handleReadStudent();
      NotificationManager.success("کاربر  با ادرس جدیدافزوده شد");
    } catch (error) {
      if (
        error.reason ===
        "execution reverted: Only the owner can call this function."
      ) {
        NotificationManager.error(
          " شما نمیتوانید حساب جدیدی را به تایید کنندگان اضافه کنید این کار باید توسط حساب اصلی صورت بگیرد "
        );
      } else if (error.code === "UNPREDICTABLE_GAS_LIMIT") {
        NotificationManager.error("موجودی ناکافی!!");
      } else if (error.code === "ACTION_REJECTED") {
        NotificationManager.error("!تراکنش پذیرفته نشد");
      } else {
        NotificationManager.error(`Erorr ${error}`);
      }
    }
  };
  const handelisissuedcertificateStudent = async (
    studentid,
    isissued,
    tokenURI,
    tokenId
  ) => {
    try {
      const tax = await studentRegistryContract.isissuedcertificate(
        studentid,
        isissued,
        tokenURI,
        tokenId
      );
      const response = tax.wait();
      console.log(response);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  const getalltokenurl = async function () {
    const result = await nftContract.getAllTokenIdsAndUrls();
    settokenurls(result[1]);
    console.log(tokenurls);
  };
  const transfer = async function (from, to, tokenId) {
    //انتقال ان اف تی به کاربران
    try {
      if (
        from.trim() === "" ||
        to.trim() === "" ||
        tokenId.trim() === "" 
        
      ) {
        // NotificationManager.error("لطفا تمامی فیلدها را پر کنید");
        return null;
      }
      else{
        const tx2 = await nftContract.transferFrom(from, to, tokenId);
        const receipt2 =await tx2.wait();
        NotificationManager.success("تراکنش موفق");
        return true;
      }
      
    } catch (error) {
      if (
        error.reason ===
        "execution reverted: Only the owner can call this function."
      ) {
        NotificationManager.error(
          " شما نمیتوانید حساب جدیدی را به تایید کنندگان اضافه کنید این کار باید توسط حساب اصلی صورت بگیرد "
        );
      } else if (error.code === "UNPREDICTABLE_GAS_LIMIT") {
        NotificationManager.error("توکن موجود نیست ");
      } else if (error.code === "ACTION_REJECTED") {
        NotificationManager.error("!تراکنش پذیرفته نشد");
      } else {
        NotificationManager.error(`Erorr ${error}`);
      }
      return false;
    }
  };
  const handelDeleteStudent = async (index) => {
    setLoading(true);
    try {
      const tax = await studentRegistryContract.deleteStudent(index);
      const response = tax.wait();
      console.log(response);
      NotificationManager.success("اطلاعات با موفقیت حذف گردید ");
      const res = await studentRegistryContract.getAallStudents();
      console.log("created res ",res);

      setTimeout(async() => {
        const res = await studentRegistryContract.getAallStudents();
        console.log("res", res);
        setStudents(res);
       }, 10000);
       setLoading(false);

      return true;
    } catch (error) {
      setLoading(false);

      if (error.code === "UNPREDICTABLE_GAS_LIMIT") {
        NotificationManager.error("موجودی ناکافی!!");
      } else if (error.code === "ACTION_REJECTED") {
        NotificationManager.error("!تراکنش پذیرفته نشد");
      }
      return false;
    }
  };
  const handelUpdatestudent = async (
    studentid,
    newfirstName,
    newlastName,
    newdegree,
    newmajor,
    newyear
  ) => {
    setLoading(true);
    try {
      if (
        newfirstName.trim() === "" ||
        newlastName.trim() === "" ||
        newdegree.trim() === "" ||
        newmajor.trim() === "" ||
        newyear.trim() === ""
      ) {
        NotificationManager.error("لطفا تمامی فیلدها را پر کنید");
        setLoading(false);

        return false;
      }
     
      const respone = await studentRegistryContract.updateStudent(
        studentid,
        newfirstName,
        newlastName,
        newdegree,
        newmajor,
        newyear
      );
      console.log("respone", respone);
      if (respone.hash.length > 0) {
        const res = await studentRegistryContract.getAallStudents();
       
        setTimeout(async () => {
          const res = await studentRegistryContract.getAallStudents();
          console.log("res", res);
          setStudents(res);
        }, 10000);
      }
      NotificationManager.success("اطلاعات ویرایش شد ");
      setLoading(false);
    } catch (error) {
      if (
        error.reason ===
        "execution reverted: Only the owner can call this function."
      ) {
        NotificationManager.error(
          " شما نمیتوانید حساب جدیدی را به تایید کنندگان اضافه کنید این کار باید توسط حساب اصلی صورت بگیرد "
        );
      } else if (error.code === "UNPREDICTABLE_GAS_LIMIT") {
        NotificationManager.error("موجودی ناکافی!!");
      } else if (error.code === "ACTION_REJECTED") {
        NotificationManager.error("!تراکنش پذیرفته نشد");
      } else {
        NotificationManager.error(`Erorr ${error}`);
      }
      setLoading(false);

      return false;
    }
  };
  return (
    <div>
      <div
        style={{ direction: "ltr" }}
        className="d-flex gap-2 align-content-center my-2"
      >
        <button
          type="button"
          className="btn btn-warning border d-flex align-items-center  shadow"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal2"
        >
          انتقال
        </button>

        <button
          type="button"
          className="btn btn-primary border d-flex align-items-center shadow "
          data-bs-toggle="modal"
          data-bs-target="#modaladd"
        >
          <i className="fa fa-plus pe-1"></i>
          افرودن دانشجو
        </button>
        <button
          type="button"
          className="btn btn-secondary d-flex align-items-center  shadow "
          data-bs-toggle="modal"
          data-bs-target="#modaladdoperator"
        >
          <i className="fa fa-plus pe-1"></i>
          افزودن تایید کننده
        </button>
      </div>

      <div className="container">
        <div className="row">
          {students !== null ? (
            <Table
              students={students}
              funcs={{
                handelCreatenft,
                loadingNft,
                handelDeleteStudent,
                handelUpdatestudent,
                loading,
                setLoading,
                // setnewFirstName,
                // newfirstName,
                // setnewLastName,
                // newlastName,
                // setnewDegree,
                // newdegree,
                // setnewMajor,
                // newmajor,
                // setnewYear,
                // newyear,
               
              }}
            />
          ) : (
            <div
              className="spinner-border text-light p-4 mx-auto my-3 "
              role="status"
            />
          )}
        </div>
      </div>

      <ModalAdd
        handleCreateStudent={handleCreateStudent}
        loading={loading}
        funcs={{
          setFirstName,
          firstName,
          lastName,
          setLastName,
          degree,
          setDegree,
          major,
          setMajor,
          year,
          setYear,
          setLoading,
        }}
      />
     
      <ModalTransfer
        transfer={transfer}
        funcs={{ from, setFrom, to, setTo, tokenId, setTokenId }}
      />
      <ModalAddOwner
        handelAddoperator={handelAddoperator}
        loading={loading}
        funcs={{ setaddress, address }}
      />
      <div className="container">
        <div className="row">
          <div className="container mt-6">
            <br />
            <h3>مدارک صادر شده اخیر</h3>
          </div>
          <Nftlast />
          
       
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
