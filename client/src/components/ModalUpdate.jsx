import React from "react";
import { DatePicker } from "react-advance-jalaali-datepicker";
import moment from "jalali-moment";
import Swal from "sweetalert2";
function DatePickerInput(props) {
  return <input className="form-control" {...props} />;
}


 function ModalUpdate({ handelUpdatestudent,student,studentid, loading, funcs }) {
  const {
    setnewFirstName,
    newfirstName,
    newlastName,
    setnewLastName,
    newdegree,
    setnewDegree,
    newmajor,
    setnewMajor,
    newyear,
    setnewYear,setLoading
  } = funcs;
  const date = new moment();
  const handleDateChange = function (timestamp) {
    const date = new Date(timestamp * 1000); // convert Unix timestamp to JavaScript Date object
    const formattedDate = date.toLocaleDateString("fa-IR"); // format the date as a string in the desired format ('fa-IR' for Persian calendar)
    console.log(formattedDate); // logs the selected date in the desired format
    setnewYear(formattedDate)
  };
  
  return (
    <div
      className="modal fade"
      id="modalledit"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      style={{direction:"ltr"}}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              ویرایش اطلاعات 
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <main className="container">
              <div className="col-md-7 col-lg-8 mx-auto">
                <div className="row g-5">
                  <form className="needs-validation was-validated" />
                  <div className="row text-end g-1">
                    <div className="col-12">
                      <label htmlFor="firstName" className="form-label">
                        نام
                      </label>
                      <input
                        type="text"
                        className="form-control text-end"
                        id="firstName"
                        placeholder=""
                        required=""
                        value={student.firstName}
                        onChange={(e) => {
                          setnewFirstName(e.target.value);
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
                        className="form-control text-end"
                        id="lastName"
                        placeholder=""
                        required=""
                        value={student.lastName}
                        onChange={(e) => {
                          setnewLastName(e.target.value);
                        }}
                      />
                      <div className="invalid-feedback">
                        Valid last name is required.
                      </div>
                    </div>

                    <div className="col-12">
                      <label htmlFor="year" className="form-label">
                        تاریخ
                        <span className="text-body-secondary " style={{fontSize:"13px",paddingTop:"5px"}} >  {date.format('jYYYY/jMM/jDD')}</span>
                      </label>
            
                        <DatePicker
                        inputComponent={DatePickerInput}
                        placeholder="انتخاب تاریخ"
                        format="jYYYY/jMM/jDD"
                        className="form-control"
                        preSelected={student.education.year}
                        onChange={handleDateChange}
                        id="datePicker"
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="major" className="form-label">
                        رشته
                      </label>
                      <select
                        className="form-select text-end"
                        id="major"
                        required=""
                        value={student.education.major}
                        onChange={(e) => {
                          setnewMajor(e.target.value);
                        }}
                      >
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
                      <select
                        className="form-select text-end"
                        id="degree"
                        required=""
                        value={student.education.degree}
                        onChange={(e) => {
                          setnewDegree(e.target.value);
                        }}
                      >
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

              
                </div>
              </div>
            </main>
          </div>
          <div className="modal-footer justify-content-start">
            {loading && (
              <div className="spinner-border text-primary " role="status" />
            )}
            <button
              type="button"
              className="btn border"
              data-bs-dismiss="modal"
              onClick={() => setLoading(false)}
            >
              بستن
            </button>

            {/* <button
              type="button"
              className="btn btn-primary "
              disabled={loading}
              onClick={() => {
                handelUpdatestudent(studentid, newfirstName, newlastName, newdegree, newmajor, newyear);
              }}
              // onClick={()=>{console.log(studentid,newfirstName,newlastName,newdegree,newmajor,newyear)}}
            >
              افزودن
            </button> */}
            <button
                type="button"
                className="btn btn-primary "
                disabled={loading}
                
                onClick={() => {
                  Swal.fire({
                    title: "ایا مطمعن هستید ؟",
                    // text: "Do you want to update this student's information?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "ادامه ",
                    cancelButtonText: "بستن ",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      const res=handelUpdatestudent(
                        studentid,
                        newfirstName,
                        newlastName,
                        newdegree,
                        newmajor,
                        newyear
                      );
                      if(res){
                        Swal.fire({
                          title: "اطلاعات ویرایش شد ",
                          text: "اطلاعات شما ویرایش گردید ",
                          icon: "success",
                        });
                      }
                     
                    }
                  });
                }}
              >
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalUpdate;
