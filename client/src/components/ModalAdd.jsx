import React from "react";
import { DatePicker } from "react-advance-jalaali-datepicker";
import moment from 'jalali-moment';
function DatePickerInput(props) {
  return <input className="form-control" {...props} />;
}

const handleDateChange= function (timestamp) {
  const date = new Date(timestamp * 1000); // convert Unix timestamp to JavaScript Date object
  const formattedDate = date.toLocaleDateString('fa-IR'); // format the date as a string in the desired format ('fa-IR' for Persian calendar)
  console.log(formattedDate); // logs the selected date in the desired format

}
function ModalAdd({ handleCreateStudent, loading, funcs }) {
  
  const {
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
  } = funcs;
 
  return (
    <div
      className="modal fade"
      id="exampleModal"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              افزودن اطلاعات دانشجو
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
                  <div className="row g-3 text-end">
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
                        onChange={(e) => {
                          setFirstName(e.target.value);
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
                        onChange={(e) => {
                          setLastName(e.target.value);
                        }}
                      />
                      <div className="invalid-feedback">
                        Valid last name is required.
                      </div>
                    </div>

                    <div className="col-12">
                      <label htmlFor="year" className="form-label">
                        تاریخ
                        <span className="text-body-secondary"></span>
                      </label>
                      {/* <input
                        type="number"
                        className="form-control"
                        id="year"
                        placeholder=""
                        onChange={(e) => {
                          setYear(e.target.value);
                        }}
                      /> */}

                        <DatePicker
                        inputComponent={DatePickerInput}
                        placeholder="انتخاب تاریخ"
                        format="jYYYY/jMM/jDD"
                        className="form-control"
                        selected={moment('1402/04/01', 'jYYYY/jMM/jDD')}
                        // onChange={handleDateChange}
                        onChange={(e)=>setYear(e.toString())}
                        // onChange={}
                        id="datePicker"
                        preSelected="1402/04/01"

                      />
                      
                    </div>
                    <div className="col-12">
                      <label htmlFor="major" className="form-label">
                        رشته
                      </label>
                      <select
                        className="form-select"
                        id="major"
                        required=""
                        onChange={(e) => {
                          setMajor(e.target.value);
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
                        className="form-select"
                        id="degree"
                        required=""
                        onChange={(e) => {
                          setDegree(e.target.value);
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

                  <hr className="my-4" />
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
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              بستن
            </button>

            <button
              type="button"
              className="btn btn-primary "
              disabled={loading}
              onClick={() => {
                handleCreateStudent(firstName, lastName, degree, major, year);
              }}
            >
                افزودن
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalAdd;
